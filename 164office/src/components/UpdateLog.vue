<template>
    <div class="tab-pane fade" id="list-updateLog" role="tabpanel" aria-labelledby="list-updateLog-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="文本内容" v-model="searchUpdateLogInfo.text">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchUpdateLogBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#updateLogInfoModal" @click="addUpdateLogBtn()">添加</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary "></span></h4></caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">更新日志内容</th>
                    <th scope="col">更新时间</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(updateLog, index) in updateLogList" :key="updateLog.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ updateLog.id }}</td>
                    <td>{{ updateLog.text }}</td>
                    <td>{{ updateLog.createTimeStr }}</td>
                    <td>{{ updateLog.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#updateLogInfoModal" @click="editUpdateLog(updateLog)">编辑</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 新增 & 编辑 -->
        <div class="modal fade" id="updateLogInfoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{updateLogInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <textarea class="form-control" v-model="updateLogInfo.text" required style="height: 164px"></textarea>
                                    <label>更新内容</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="updateLogInfo.note">
                                    <label>备注</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="cleanUpdateLogInfo()" v-if="updateLogInfo.add">清空</button>
                        <button type="button" class="btn btn-secondary" id="closeUpdateLogInfoModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveUpdateLog()" :disabled="saveUpdateLogBtn">保存</button>
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
import { searchUpdateLog,saveUpdateLog } from "../api/updateLog";
export default {
    name: "updateLog",
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
            saveUpdateLogBtn:false,
            updateLogList: [],
            searchUpdateLogInfo: {
                text: '',
            },
            updateLogInfo: {
                add: true,
                title: '',
                id: '',
                text: '',
            }
        }
    },
    watch: {
        updateLogInfo: {
            handler() {
                this.checkUpdateLogInfo();
            },
            deep: true,
        }
    },
    mounted() {
    },
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchUpdateLog();
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
        searchUpdateLogBtn() {
            this.page.currentPage = 1;
            this.searchUpdateLog();
        },
        addUpdateLogBtn() {
            this.cleanUpdateLogInfo();
            this.updateLogInfo.add = true;
            this.updateLogInfo.title = '新增更新日志';
        },
        editUpdateLog(updateLog) {
            this.updateLogInfo.add = false;
            this.updateLogInfo.title = '编辑更新日志';
            this.updateLogInfo.id = updateLog.id;
            this.updateLogInfo.text = updateLog.text;
            this.updateLogInfo.note = updateLog.note;
        },
        searchUpdateLog() {
            searchUpdateLog(Object.assign(this.page,this.searchUpdateLogInfo)).then(
                response => {
                    this.updateLogList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanUpdateLogInfo() {
            this.updateLogInfo.id = '';
            this.updateLogInfo.text = '';
            this.updateLogInfo.note = '';
        },
        saveUpdateLog() {
            saveUpdateLog(this.updateLogInfo).then(
                response => {
                    if(response.data.code==1){
                        document.getElementById("closeUpdateLogInfoModal").click();
                        this.cleanUpdateLogInfo();
                        this.searchUpdateLogBtn();
                    }
                    this.showToast(response);
                }
            )
        },
        checkUpdateLogInfo() {
            if (this.updateLogInfo.text === '') {
                this.saveUpdateLogBtn = true;
            }
            else {
                this.saveUpdateLogBtn = false;
            }
        }
    },
}
</script>