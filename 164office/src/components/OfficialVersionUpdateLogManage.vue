<template>
    <div class="tab-pane fade" id="list-officialVersionUpdateLogManage" role="tabpanel" aria-labelledby="list-officialVersionUpdateLogManage-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="文本内容" v-model="searchOfficialVersionUpdateLogInfo.text">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchOfficialVersionUpdateLogBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#officialVersionUpdateLogInfoModal" @click="addOfficialVersionUpdateLogBtn()">添加</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <!-- <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary "></span></h4></caption> -->
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">标题</th>
                    <th scope="col">更新日志内容</th>
                    <th scope="col">更新时间</th>
                    <th scope="col">创建时间</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
             <tbody class="table-group-divider">
                <tr v-for="(officialVersionUpdateLog, index) in officialVersionUpdateLogList" :key="officialVersionUpdateLog.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ officialVersionUpdateLog.name }}</td>
                    <td>
                        <span class="d-inline-block text-truncate" data-bs-placement="top" data-bs-toggle="popover"
                            data-bs-trigger="hover focus" :data-bs-content="officialVersionUpdateLog.details" style="max-width: 360px;">
                            {{ officialVersionUpdateLog.details }}
                        </span>
                    </td>
                    <td>{{ officialVersionUpdateLog.updateTimeStr }}</td>
                    <td>{{ officialVersionUpdateLog.createTimeStr }}</td>
                    <td>{{ officialVersionUpdateLog.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#officialVersionUpdateLogInfoModal" @click="editOfficialVersionUpdateLog(officialVersionUpdateLog)">编辑</span>
                        <span class="btn badge rounded-pill bg-danger ms-1" @click="deleteOfficialVersionUpdateLog(officialVersionUpdateLog)">删除</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 新增 & 编辑 -->
        <div class="modal fade" id="officialVersionUpdateLogInfoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{officialVersionUpdateLogInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="officialVersionUpdateLogInfo.name">
                                    <label>标题</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <textarea class="form-control" v-model="officialVersionUpdateLogInfo.details" required style="height: 164px"></textarea>
                                    <label>更新内容</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input step=1 type="datetime-local" class="form-control"
                                            v-model="officialVersionUpdateLogInfo.updateTime">
                                        <label>更新时间</label>
                                </div>
                            </div>
 
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="officialVersionUpdateLogInfo.note">
                                    <label>备注</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="cleanOfficialVersionUpdateLogInfo()" v-if="officialVersionUpdateLogInfo.add">清空</button>
                        <button type="button" class="btn btn-secondary" id="closeOfficialVersionUpdateLogInfoModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveOfficialVersionUpdateLog()" :disabled="saveOfficialVersionUpdateLogBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import { getToday } from "../api/common";
import {Modal,Toast,Popover} from 'bootstrap';
import { searchOfficialVersionUpdateLog,saveOfficialVersionUpdateLog,deleteOfficialVersionUpdateLog } from "../api/officialVersionUpdateLog";
export default {
    name: "officialVersionUpdateLog",
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
            saveOfficialVersionUpdateLogBtn:false,
            officialVersionUpdateLogList: [],
            searchOfficialVersionUpdateLogInfo: {
                details: '',
            },
            officialVersionUpdateLogInfo: {
                add: true,
                title: '',
                id: '',
                name:'',
                details: '',
                note:'',
            }
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
            this.searchOfficialVersionUpdateLog();
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
        searchOfficialVersionUpdateLogBtn() {
            this.page.currentPage = 1;
            this.searchOfficialVersionUpdateLog();
        },
        addOfficialVersionUpdateLogBtn() {
            this.cleanOfficialVersionUpdateLogInfo();
            this.officialVersionUpdateLogInfo.add = true;
            this.officialVersionUpdateLogInfo.title = '新增更新日志';
        },
        editOfficialVersionUpdateLog(officialVersionUpdateLog) {
            this.officialVersionUpdateLogInfo.add = false;
            this.officialVersionUpdateLogInfo.title = '编辑更新日志';
            this.officialVersionUpdateLogInfo.id = officialVersionUpdateLog.id;
            this.officialVersionUpdateLogInfo.name = officialVersionUpdateLog.name;
            this.officialVersionUpdateLogInfo.updateTime = officialVersionUpdateLog.updateTime;
            this.officialVersionUpdateLogInfo.details = officialVersionUpdateLog.details;
            this.officialVersionUpdateLogInfo.note = officialVersionUpdateLog.note;
        },
        searchOfficialVersionUpdateLog() {
            searchOfficialVersionUpdateLog(Object.assign(this.page,this.searchOfficialVersionUpdateLogInfo)).then(
                response => {
                    this.officialVersionUpdateLogList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanOfficialVersionUpdateLogInfo() {
            this.officialVersionUpdateLogInfo.id = '';
            this.officialVersionUpdateLogInfo.name = '';
            this.officialVersionUpdateLogInfo.details = '';
            this.officialVersionUpdateLogInfo.note = '';
            this.officialVersionUpdateLogInfo.updateTime =  getToday() + 'T17:00:00';;
        },
        saveOfficialVersionUpdateLog() {
            saveOfficialVersionUpdateLog(this.officialVersionUpdateLogInfo).then(
                response => {
                    if(response.data.code==1){
                        document.getElementById("closeOfficialVersionUpdateLogInfoModal").click();
                        this.cleanOfficialVersionUpdateLogInfo();
                        this.searchOfficialVersionUpdateLogBtn();
                    }
                    this.showToast(response);
                }
            )
        },
        checkOfficialVersionUpdateLogInfo() {
            if (this.officialVersionUpdateLogInfo.text === '') {
                this.saveOfficialVersionUpdateLogBtn = true;
            }
            else {
                this.saveOfficialVersionUpdateLogBtn = false;
            }
        },
        deleteOfficialVersionUpdateLog(officialVersionUpdateLog) {
            deleteOfficialVersionUpdateLog(officialVersionUpdateLog).then(
                response => {
                    this.showToast(response);
                    this.searchOfficialVersionUpdateLogBtn();
                }
            )
        },
    },
}
</script>