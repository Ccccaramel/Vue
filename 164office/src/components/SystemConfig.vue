<template>
    <div class="tab-pane fade" id="list-systemConfig" role="tabpanel" aria-labelledby="list-systemConfig-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="名称" v-model="searchSystemConfigInfo.name">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchSystemConfigBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#systemConfigInfoModal" @click="addSystemConfigBtn()">添加</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <!-- <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary "></span></h4></caption> -->
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">名称</th>
                    <th scope="col">key</th>
                    <th scope="col">值</th>
                    <th scope="col">更新时间</th>
                    <th scope="col">创建时间</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
             <tbody class="table-group-divider">
                <tr v-for="(systemConfig, index) in systemConfigList" :key="systemConfig.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ systemConfig.id }}</td>
                    <td>{{ systemConfig.name }}</td>
                    <td>{{ systemConfig.k }}</td>
                    <td style="width:25%">{{ systemConfig.v }}</td>
                    <td>{{ systemConfig.updateTimeStr }}</td>
                    <td>{{ systemConfig.createTimeStr }}</td>
                    <td style="width:25%">{{ systemConfig.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#systemConfigInfoModal" @click="editSystemConfig(systemConfig)">编辑</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 新增 & 编辑 -->
        <div class="modal fade" id="systemConfigInfoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{systemConfigInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="systemConfigInfo.name">
                                    <label>名称</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="systemConfigInfo.k">
                                    <label>key</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <textarea class="form-control" v-model="systemConfigInfo.v" required style="height: 164px"></textarea>
                                    <label>值</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="systemConfigInfo.note">
                                    <label>备注</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="cleanSystemConfigInfo()" v-if="systemConfigInfo.add">清空</button>
                        <button type="button" class="btn btn-secondary" id="closeSystemConfigInfoModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveSystemConfig()" :disabled="saveSystemConfigBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';

import {Modal,Toast} from 'bootstrap';
import { searchSystemConfig,saveSystemConfig } from "../api/systemConfig";
export default {
    name: "systemConfig",
    components: {
        Page,
    },
    data() {
        return {
            page: {
                size: 10,
                currentPage:1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            commonResponse: {
                success: true,
                msg: '',
            },
            saveSystemConfigBtn:false,
            systemConfigList: [],
            searchSystemConfigInfo: {
                name: '',
                k: '',
                v: '',
            },
            systemConfigInfo: {
                add: true,
                title: '',
                id: '',
                name: '',
                k: '',
                v: '',
            }
        }
    },
    watch: {
        systemConfigInfo: {
            handler() {
                this.checkSystemConfigInfo();
            },
            deep: true,
        }
    },
    mounted() {
    },
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchSystemConfig();
        },
        showToast(response) { // 通用信息展示
            if(response.data.code==0){
                this.commonResponse.success= false;
            }else{
                this.commonResponse.success = true;
            }
            this.commonResponse.msg= response.data.msg;
            this.$emit('commonResponse', this.commonResponse);
            var toastLiveExample = document.getElementById('commonToast');
            var toast = new Toast(toastLiveExample);
            toast.show();
        },
        init() {
            this.searchSystemConfigBtn();
        },
        searchSystemConfigBtn() {
            this.page.currentPage = 1;
            this.searchSystemConfig();
        },
        addSystemConfigBtn() {
            this.cleanSystemConfigInfo();
            this.systemConfigInfo.add = true;
            this.systemConfigInfo.title = '新增更新日志';
        },
        editSystemConfig(systemConfig) {
            this.systemConfigInfo.add = false;
            this.systemConfigInfo.title = '编辑更新日志';
            this.systemConfigInfo.id = systemConfig.id;
            this.systemConfigInfo.name = systemConfig.name;
            this.systemConfigInfo.k = systemConfig.k;
            this.systemConfigInfo.v = systemConfig.v;
            this.systemConfigInfo.note = systemConfig.note;
        },
        searchSystemConfig() {
            searchSystemConfig(Object.assign(this.page,this.searchSystemConfigInfo)).then(
                response => {
                    this.systemConfigList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanSystemConfigInfo() {
            this.systemConfigInfo.id = '';
            this.systemConfigInfo.name = '';
            this.systemConfigInfo.k = '';
            this.systemConfigInfo.v = '';
            this.systemConfigInfo.note = '';
        },
        saveSystemConfig() {
            saveSystemConfig(this.systemConfigInfo).then(
                response => {
                    if(response.data.code==1){
                        document.getElementById("closeSystemConfigInfoModal").click();
                        this.cleanSystemConfigInfo();
                        this.searchSystemConfigBtn();
                    }
                    this.showToast(response);
                }
            )
        },
        checkSystemConfigInfo() {
            if (this.systemConfigInfo.name === ''||this.systemConfigInfo.k === ''||this.systemConfigInfo.v === '') {
                this.saveSystemConfigBtn = true;
            }
            else {
                this.saveSystemConfigBtn = false;
            }
        }
    },
}
</script>