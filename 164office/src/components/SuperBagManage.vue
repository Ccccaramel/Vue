<template>
    <div class="tab-pane fade" id="list-superBagManage" role="tabpanel" aria-labelledby="list-superBagManage-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="name" class="form-control" placeholder="名称" v-model="searchSuperBagInfo.name">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchSuperBagBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#superBagInfoModal" @click="addSuperBagBtn()">添加</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">名称</th>
                    <th scope="col">link</th>
                    <th scope="col">描述</th>
                    <th scope="col">添加时间</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
             <tbody class="table-group-divider">
                <tr v-for="(superBag, index) in superBagList" :key="superBag.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ superBag.name }}</td>
                    <td>
                        <a :href="superBag.link" target="_blank">
                            <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover"
                                data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="superBag.link"
                                style="max-width: 300px;">
                                {{ superBag.link }}
                            </span>
                        </a>
                    </td>
                    <td>
                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover"
                            data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="superBag.note"
                            style="max-width: 300px;">
                            {{ superBag.note }}
                        </span>
                    </td>
                    <td>{{ superBag.createTimeStr }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#superBagInfoModal" @click="editSuperBag(superBag)">编辑</span>
                        <span class="btn badge rounded-pill bg-danger ms-1" @click="deleteSuperBag(superBag)">删除</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 新增 & 编辑 -->
        <div class="modal fade" id="superBagInfoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{superBagInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" required v-model="superBagInfo.name">
                                    <label>名称</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" required v-model="superBagInfo.link">
                                    <label>link</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <textarea class="form-control" v-model="superBagInfo.note" required style="height: 164px"></textarea>
                                    <label>描述</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="cleanSuperBagInfo()" v-if="superBagInfo.add">清空</button>
                        <button type="button" class="btn btn-secondary" id="closeSuperBagInfoModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveSuperBag()" :disabled="saveSuperBagBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';

import { Modal, Toast, Popover } from 'bootstrap';
import { searchSuperBag,saveSuperBag,deleteSuperBag } from "../api/superBag";
export default {
    name: "superBagManage",
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
            saveSuperBagBtn:false,
            superBagList: [],
            searchSuperBagInfo: {
                name: '',
            },
            superBagInfo: {
                add: true,
                name: '',
                id: '',
                note: '',
                link:''
            }
        }
    },
    watch: {
        superBagInfo: {
            handler() {
                this.checkSuperBagInfo();
            },
            deep: true,
        }
    },
    mounted() {
    },
    updated() { //更新之后.场景:获取更新真实DOM之后
        var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new Popover(popoverTriggerEl)
        });
    },
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchSuperBag();
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
            this.searchSuperBagBtn();
        },
        searchSuperBagBtn() {
            this.page.currentPage = 1;
            this.searchSuperBag();
        },
        addSuperBagBtn() {
            this.cleanSuperBagInfo();
            this.superBagInfo.add = true;
            this.superBagInfo.title = '新增标签';
        },
        editSuperBag(superBag) {
            this.superBagInfo.add = false;
            this.superBagInfo.title = '编辑标签';
            this.superBagInfo.id = superBag.id;
            this.superBagInfo.name = superBag.name;
            this.superBagInfo.note = superBag.note;
            this.superBagInfo.link = superBag.link;
        },
        deleteSuperBag(superBag) {
            deleteSuperBag(superBag).then(
                response => {
                    if(response.data.code==1){
                        this.searchSuperBagBtn();
                    }
                    this.showToast(response);
                }
            )
        },
        searchSuperBag() {
            searchSuperBag(Object.assign(this.page,this.searchSuperBagInfo)).then(
                response => {
                    this.superBagList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanSuperBagInfo() {
            this.superBagInfo.id = '';
            this.superBagInfo.name = '';
            this.superBagInfo.note = '';
            this.superBagInfo.link = '';
        },
        saveSuperBag() {
            saveSuperBag(this.superBagInfo).then(
                response => {
                    if(response.data.code==1){
                        document.getElementById("closeSuperBagInfoModal").click();
                        this.cleanSuperBagInfo();
                        this.searchSuperBagBtn();
                    }
                    this.showToast(response);
                }
            )
        },
        checkSuperBagInfo() {
            if (this.superBagInfo.name === ''||this.superBagInfo.link === ''||this.superBagInfo.note === '') {
                this.saveSuperBagBtn = true;
            }
            else {
                this.saveSuperBagBtn = false;
            }
        }
    },
}
</script>