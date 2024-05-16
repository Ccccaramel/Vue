<template>
    <div class="tab-pane fade" id="list-pointer" role="tabpanel" aria-labelledby="list-pointer-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="文本内容" v-model="searchPointerInfo.text">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchPointerBtn()">搜索</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary "></span></h4></caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">名称</th>
                    <th scope="col">反馈内容</th>
                    <th scope="col">反馈时间</th>
                    <th scope="col">回复反馈</th>
                    <th scope="col">回复时间</th>
                    <th scope="col">反馈状态</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pointer, index) in pointerList" :key="pointer.id" :class="pointer.status==1601 ?'table-danger':''">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ pointer.userInfo.id }}</td>
                    <td>{{ pointer.userInfo.name }}</td>
                    <td>{{ pointer.text }}</td>
                    <td>{{ pointer.createTimeStr }}</td>
                    <td>{{ pointer.replyText }}</td>
                    <td>{{ pointer.replyTimeStr }}</td>
                    <td>{{ pointer.status.name }}</td>
                    <td>{{ pointer.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-danger me-1" @click="deletePointer(pointer)">删除</span>
                        <span class="btn badge rounded-pill bg-success me-1" @click="returnPointer(pointer)">恢复</span>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#replyPointerModal" @click="replyPointerBtn(pointer)">回复</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 回复反馈 -->
        <div class="modal fade" id="replyPointerModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{pointerInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <textarea class="form-control" v-model="pointerInfo.text" required style="height: 164px"></textarea>
                                    <label>反馈内容</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <textarea class="form-control" v-model="pointerInfo.replyText" required style="height: 164px"></textarea>
                                    <label>回复内容</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="pointerInfo.note">
                                    <label>备注</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeReplyPointerModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="replyPointer()">保存</button>
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
import { searchPointer,replyPointer,deletePointer,returnPointer } from "../api/pointer";
export default {
    name: "pointer",
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
            pointerList: [],
            searchPointerInfo: {
                text: '',
            },
            pointerInfo: {
                add: true,
                title: '',
                id: '',
                text: '',
                replyText:'',
            }
        }
    },
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchPointer();
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
        searchPointerBtn() {
            this.page.currentPage = 1;
            this.searchPointer();
        },
        searchPointer() {
            searchPointer(Object.assign(this.page,this.searchPointerInfo)).then(
                response => {
                    this.pointerList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        replyPointerBtn(pointer) {
            this.pointerInfo.title = '回复反馈';
            this.pointerInfo.id = pointer.id;
            this.pointerInfo.text = pointer.text;
            this.pointerInfo.replyText = pointer.replyText;
            this.pointerInfo.note = pointer.note;
        },
        replyPointer() {
            replyPointer(this.pointerInfo).then(
                response => {
                    if(response.data.code==1){
                        document.getElementById("closeReplyPointerModal").click();
                        this.searchPointerBtn();
                    }
                    this.showToast(response);
                }
            )
        },
        deletePointer(pointer) {
            deletePointer(Object.assign({
                id:pointer.id
            })).then(
                response => {
                    this.showToast(response);
                    this.searchPointerBtn();
                }
            )
        },
        returnPointer(pointer) {
            returnPointer(Object.assign({
                id:pointer.id
            })).then(
                response => {
                    this.showToast(response);
                    this.searchPointerBtn();
                }
            )
        },
    },
}
</script>