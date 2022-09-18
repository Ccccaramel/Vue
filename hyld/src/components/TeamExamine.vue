<template>
    <div class="tab-pane fade" id="list-TeamExamine" role="tabpanel" aria-labelledby="list-TeamExamine-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <!-- 在 form 中的 button 其 type 默认为 submit ,所以必须指定类型 button
                或使用 event.prevent 取消默认事件, vue: @click.stop="delRow()" -->
            <div class="col-1">
                <input type="text" class="form-control" v-model="searchRelationInfo.userId" placeholder="用户ID">
            </div>
            <div class="col-2">
                <input type="text" class="form-control" v-model="searchRelationInfo.userName" placeholder="用户昵称">
            </div>
            <div class="col-2">
                <input type="text" class="form-control" v-model="searchRelationInfo.teamScid" placeholder="战队SCID">
            </div>
            <div class="col-2">
                <input type="text" class="form-control" v-model="searchRelationInfo.teamName" placeholder="战队名称">
            </div>
            <!-- 游戏账号类型 -->
            <div class="col-auto">
                <select class="form-select" v-model="searchRelationInfo.teamType">
                    <option v-for="teamType in teamTypeList" v-bind:key="teamType.id"
                        :value="teamType.id">
                        {{ teamType.name }}</option>
                </select>
            </div>
            <!-- 关联状态 -->
            <div class="col-auto">
                <select class="form-select" v-model="searchRelationInfo.relationStatus">
                    <option v-for="relationStatus in relationStatusList" v-bind:key="relationStatus.id"
                        :value="relationStatus.id">
                        {{ relationStatus.name }}</option>
                </select>
            </div>
            <!-- 验证状态 -->
            <div class="col-auto">
                <select class="form-select" v-model="searchRelationInfo.checkStatus">
                    <option v-for="checkStatus in checkStatusList" v-bind:key="checkStatus.id"
                        :value="checkStatus.id">
                        {{ checkStatus.name }}</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="cleanSearchRelationInfo()">清空</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchTeamExamineBtn()">搜索</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert">
                <h4><span class="badge rounded-pill bg-primary ">战队关联审核</span></h4>
            </caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">用户ID</th>
                    <th scope="col">用户昵称</th>
                    <th scope="col">职位</th>
                    <th scope="col">SCID</th>
                    <th scope="col">战队名称</th>
                    <th scope="col">所在区</th>
                    <th scope="col">验证状态</th>
                    <th scope="col">关联状态</th>
                    <th scope="col">关联时间</th>
                    <th scope="col">验证结果备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="teamExamineList.length==0">
                    <td colspan="14">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div>
                                    <div class="alert alert-light" role="alert">
                                        暂无游戏账号绑定申请!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr v-for="(teamExamine, index) in teamExamineList" :key="teamExamine.id" :class="teamExamine.relation.id==702?'table-secondary':(teamExamine.checkStatus.id==1402?'table-success':(teamExamine.checkStatus.id==1403?'table-danger':(teamExamine.checkStatus.id==1401?'table-warning':'')))">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ teamExamine.user.id }}</td>
                    <td>{{ teamExamine.user.name }}</td>
                    <td>{{ teamExamine.playerPositionType.name }}</td>
                    <td>{{ teamExamine.team.scid }}</td>
                    <td>{{ teamExamine.team.name }}</td>
                    <td>{{ teamExamine.team.teamType.name }}</td>
                    <td>{{ teamExamine.checkStatus.name }}</td>
                    <td>{{ teamExamine.relation.name }}</td>
                    <td>{{ teamExamine.createTimeStr }}</td>
                    <td>{{ teamExamine.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary ms-2" data-bs-toggle="modal"
                            data-bs-target="#showTeamExamineInfoModal" @click="showTeamExamineInfo(teamExamine)">审核</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 审核信息 -->
        <div class="modal fade" id="showTeamExamineInfoModal" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="badge rounded-pill bg-primary" style="font-size:larger">{{teamExamineInfo.teamScid}}({{teamExamineInfo.teamName}})</div>
                        <h4 class="modal-title align-items-center">验证信息</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-primary text-center" role="alert">
                            准备界面
                        </div>
                        <div class="col-md mb-2">
                            <div class="form-floating text-center" style="height: 640px;">
                                <img :src="teamExamineInfo.controllerPreparePage" class="rounded" style="height: 640px;" />
                            </div>
                        </div>
                        <div class="alert alert-primary text-center" role="alert">
                            个人界面
                        </div>
                        <div class="col-md mb-2">
                            <div class="form-floating text-center" style="height: 640px;">
                                <img :src="teamExamineInfo.teamMainPage" class="rounded" style="height: 640px;" />
                            </div>
                        </div>
                        <hr/>
                        <div class="col-md mb-2">
                            <div class="form-floating mb-3">
                                <select class="form-select" v-model="teamExamineInfo.checkStatus">
                                    <option v-for="checkStatus in checkStatusListToModal" :key="checkStatus.id" :value="checkStatus.id">{{checkStatus.name}}</option>
                                </select>
                                <label>审核状态</label>
                            </div>
                        </div>
                        <div class="col-md mb-2">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" v-model="teamExamineInfo.note">
                                <label>备注</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeTeamExamineSaveBtn" data-bs-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="teamExamineSave()">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- :commonPage="page"   发送数据 -->
        <!-- @commonPageChange="commonPageChange($event)"   接收数据 -->
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>

<script>
import Page from '@/components/Page.vue';
import { Modal, Toast } from 'bootstrap';
import { getTeamType,getCheckStatus,getRelationStatus } from "../api/dictionary";
import { searchTeamExamine,teamExamineCheck } from "../api/userWithTeam";
export default {
    name: "teamExamine",
    components: {
        Page,
    },
    data() {
        return {
            page: { // 通用 Page
                size: 10,
                currentPage:1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            commonResponse: { // 通用 Toast
                success: true,
                msg: '',
            },
            teamTypeList: [],
            checkStatusList: [],
            checkStatusListToModal: [],
            relationStatusList: [],
            teamExamineList: [],
            checkData: {
                controllerPreparePageUrl: '',
                teamMainPageUrl: '',
            },
            teamMainPageFile: {},
            searchRelationInfo: {
                userId: '',
                userName: '',
                teamScid: '',
                teamName: '',
                teamType: '',
                relationStatus: '',
                checkStatus: '',
            },
            teamExamineInfo: {
                checkStatus: ''
            },
        }
    },
    mounted() {
        getTeamType().then( // 游戏账号所在区
            response => {
                this.teamTypeList = response.data.data;
                this.teamTypeList.unshift({
                    id: '',
                    name:'无限制'
                });
            },
        );
        getCheckStatus().then( // 验证状态
            response => {
                this.checkStatusList = response.data.data;
                this.checkStatusListToModal = JSON.parse(JSON.stringify(response.data.data)); // 深拷贝,否则值会随 checkStatusList 改变
                this.checkStatusList.unshift({
                    id: '',
                    name:'无限制'
                });
            },
        );
        getRelationStatus().then( // 关联状态
            response => {
                this.relationStatusList = response.data.data;
                this.relationStatusList.unshift({
                    id: '',
                    name:'无限制'
                });
            },
        );
    },
    watch: {
    },
    methods: {
        showToast(response) { // 通用信息展示
            if (response.data.code == 0) {
                this.commonResponse.success = false;
            } else {
                this.commonResponse.success = true;
            }
            this.commonResponse.msg = response.data.msg;
            this.$emit('commonResponse', this.commonResponse);
            var toastLiveExample = document.getElementById('commonToast');
            var toast = new Toast(toastLiveExample);
            toast.show();
        },
        commonPageChange(event) {
            this.page = event;
            this.searchTeamExamine();
        },
        cleanSearchRelationInfo() {
            this.searchRelationInfo.userId = '';
                this.searchRelationInfo.userName = '';
                this.searchRelationInfo.teamScid = '';
                this.searchRelationInfo.teamName = '';
                this.searchRelationInfo.teamType = '';
                this.searchRelationInfo.relationStatus = '';
                this.searchRelationInfo.checkStatus = '';
        },
        searchTeamExamineBtn() { 
            this.page.currentPage = 1;
            this.searchTeamExamine();
        },
        searchTeamExamine() {
            searchTeamExamine(Object.assign(this.page,this.searchRelationInfo)).then(
                response => {
                    this.teamExamineList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            );
        },
        showTeamExamineInfo(teamExamine) {
            this.teamExamineInfo.id = teamExamine.id;
            this.teamExamineInfo.teamScid = teamExamine.team.scid;
            this.teamExamineInfo.teamName = teamExamine.team.name;
            this.teamExamineInfo.controllerPreparePage = teamExamine.controllerPreparePage;
            this.teamExamineInfo.teamMainPage = teamExamine.teamMainPage;
            this.teamExamineInfo.checkStatus = teamExamine.checkStatus.id;
            this.teamExamineInfo.note = teamExamine.note;
        },
        teamExamineSave() {
            teamExamineCheck(this.teamExamineInfo).then(
                response => {
                    if (response.data.code == 1) {
                        document.getElementById("closeTeamExamineSaveBtn").click();
                        this.searchTeamExamine();
                    }
                    this.showToast(response);
                }
            )
        },
    },
}
</script>