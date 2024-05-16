<template>
    <div class="tab-pane fade" id="list-credit" role="tabpanel" aria-labelledby="list-credit-list">
        <div v-if="this.teamList.length==0">
            <div class="alert alert-info" role="alert">
            <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" bounce />
            ~~>_&lt;~~你还没有关联任何战队,请先关联战队,<strong>等待审核通过,</strong>然后为你的战队添加队员吧!
            </div>
            <div class="col-md mb-2">
                <div class="form-floating text-center" style="height: 640px;">
                    <img src="../assets/hyld/null.jpg" class="rounded" style="height: 640px;" />
                </div>
            </div>
        </div>
        <div v-if="this.teamList.length>0">
            <!-- 搜索条件 -->
            <form class="row g-3 mt-1 mb-3">
                <div class="col-auto">
                    <select class="form-select" v-model="uwtInfo">
                        <option v-for="team in teamList" v-bind:key="team" :value="team">
                            {{ team.team.name }}</option>
                    </select>
                </div>
                <div class="col-auto">
                    <input type="text" class="form-control" v-model="searchCreditInfo.playerScid" maxlength="15" placeholder="队员SCID标签">
                </div>
                <div class="col-auto">
                    <input type="text" class="form-control" v-model="searchCreditInfo.playerName" maxlength="20" placeholder="队员名称">
                </div>
                <div class="col-auto">
                    <select class="form-select" v-model="searchCreditInfo.teamCompetitionTypeId">
                        <option v-for="searchTeamCompetitionType in searchTeamCompetitionTypeList" :key="searchTeamCompetitionType.id" 
                            :value="searchTeamCompetitionType.id">{{searchTeamCompetitionType.name}}</option>
                    </select>
                </div>
                <div class="col-auto">
                    <select class="form-select" v-model="searchCreditInfo.settlementTime">
                        <option v-for="settlementTime in settlementTimeList" v-bind:key="settlementTime.settlementTime"
                            :value="settlementTime.settlementTime">{{ settlementTime.settlementTimeStr }}</option>
                    </select>
                </div>
                <div class="col-auto">
                    <button type="button" class="btn btn-dark" @click="searchCreditByBtn()">搜索</button>
                </div>
                <div class="col-auto">
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" href="#batchCreditAddModalToggle"
                        role="button" @click="getAllValidTeamMember()" v-if="uwtInfo.playerPositionType.id==1200||uwtInfo.playerPositionType.id==1201">积分录入</button>
                </div>
            </form>
            <!-- 积分录入 -->
            <div>
                <!-- 批量成员积分录入 -->
                <div class="modal fade" id="batchCreditAddModalToggle" aria-hidden="true" aria-labelledby="batchCreditAddModalToggleLabel" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="badge rounded-pill bg-primary" style="font-size:larger">{{uwtInfo.team.teamName}}</div>
                                <h5 class="modal-title" id="batchCreditAddModalToggleLabel">批量队员积分录入</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="col-md mb-2 text-center">
                                    <button class="btn btn-outline-dark" data-bs-target="#singleCreditAddModalToggle" data-bs-toggle="modal">切换至单个成员积分录入</button>
                                </div>
                                <div class="dropdown-divider"></div>
                                <div class="col-md mb-2">
                                    <div class="container">
                                        <div class="row justify-content-center">
                                            <div class="col-3">
                                                <div class="form-floating mb-3">
                                                    <select class="form-select" v-model="creditImportInfo.teamCompetitionTypeId">
                                                        <option v-for="teamCompetitionType in teamCompetitionTypeList" :key="teamCompetitionType.id" :value="teamCompetitionType.id">{{teamCompetitionType.name}}</option>
                                                    </select>
                                                    <label>战队竞赛类型</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="alert alert-danger text-center" role="alert" v-if="allValidTeamMemberList==''">
                                    该战队暂无队员,请先添加队员!
                                </div>
                                <form class="was-validated" novalidate v-for="(validTeamMember,index) in allValidTeamMemberList" :key="index">
                                    <div class="row g-3 align-items-center" v-if="allValidTeamMemberList.length>0">
                                        <div class="col-3">
                                            <div class="alert alert-primary text-truncate" role="alert">
                                                ({{validTeamMember.scid}}){{validTeamMember.playerName}}
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="form-floating mb-3">
                                                <input type="number" class="form-control" v-model="validTeamMember.credit" maxlength="3" required>
                                                <label>积分</label>
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="form-floating mb-3">
                                                <select class="form-select" v-model="validTeamMember.creditTypeId" required>
                                                    <option v-for="creditType in creditTypeList" :key="creditType.id" :value="creditType.id">{{creditType.name}}</option>
                                                </select>
                                                <label>积分类型</label>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="form-floating mb-3">
                                                <input step=1 type="datetime-local" class="form-control" v-model="validTeamMember.settlementTime" required>
                                                <label>结算时间</label>
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="form-floating mb-3">
                                                <input type="text" class="form-control" v-model="validTeamMember.note" maxlength="50">
                                                <label>备注</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="closeBatchCreditAddSaveBtn" data-bs-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary" @click="batchCreditAddSave()" :disabled="batchCreditAddSaveBtn">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 单个成员积分录入 -->
                <div class="modal fade" id="singleCreditAddModalToggle" aria-hidden="true" aria-labelledby="singleCreditAddModalToggleLabel" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="badge rounded-pill bg-primary" style="font-size:larger">{{uwtInfo.team.teamName}}</div>
                                <h5 class="modal-title" id="singleCreditAddModalToggleLabel">单个队员积分录入</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="col-md mb-2 text-center">
                                    <button class="btn btn btn-outline-dark" data-bs-target="#batchCreditAddModalToggle"
                                        data-bs-toggle="modal">切换至批量队员积分录入</button>
                                </div>
                                <div class="dropdown-divider"></div>
                                <div class="col-md mb-2">
                                    <div class="container">
                                        <div class="row justify-content-center">
                                            <div class="col-3">
                                                <div class="form-floating mb-3">
                                                    <select class="form-select"
                                                        v-model="creditImportInfo.teamCompetitionTypeId">
                                                        <option v-for="teamCompetitionType in teamCompetitionTypeList"
                                                            :key="teamCompetitionType.id" :value="teamCompetitionType.id">
                                                            {{teamCompetitionType.name}}</option>
                                                    </select>
                                                    <label>战队竞赛类型</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form class="was-validated" novalidate>
                                    <div class="alert alert-danger text-center" role="alert" v-if="allValidTeamMemberList==''">
                                        该战队暂无队员,请先添加队员!
                                    </div>
                                    <div class="row g-3 align-items-center" v-if="allValidTeamMemberList.length>0">
                                        <div class="col-3">
                                            <div class="form-floating mb-3">
                                                <select class="form-select" v-model="singleTeamMemberCreditInfo.teamMemberId">
                                                    <option v-for="validTeamMember in allValidTeamMemberList" :key="validTeamMember.teamMemberId" :value="validTeamMember.teamMemberId">({{validTeamMember.scid}}){{validTeamMember.playerName}}</option>
                                                </select>
                                                <label>队员</label>
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="form-floating mb-3">
                                                <input type="number" class="form-control" v-model="singleTeamMemberCreditInfo.credit"
                                                maxlength="3" required>
                                                <label>积分</label>
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="form-floating mb-3">
                                                <select class="form-select" v-model="singleTeamMemberCreditInfo.creditTypeId" required>
                                                    <option v-for="creditType in creditTypeList" :key="creditType.id"
                                                        :value="creditType.id">{{creditType.name}}</option>
                                                </select>
                                                <label>积分类型</label>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="form-floating mb-3">
                                                <input step=1 type="datetime-local" class="form-control"
                                                    v-model="singleTeamMemberCreditInfo.settlementTime" required>
                                                <label>结算时间</label>
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="form-floating mb-3">
                                                <input type="text" class="form-control" v-model="singleTeamMemberCreditInfo.note" maxlength="50">
                                                <label>备注</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="closeSingleCreditAddSaveBtn" data-bs-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" @click="singleCreditAddSave()" :disabled="singleCreditAddSaveBtn">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table text-center table-hover caption-top">
                <caption class="text-center alert-primary" role="alert">
                    <h4><span class="badge rounded-pill bg-primary ">{{creditImportInfo.teamName}}</span></h4>
                </caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">队员SCID标签</th>
                        <th scope="col">队员名称</th>
                        <th scope="col">结算时间</th>
                        <th scope="col">积分</th>
                        <th scope="col">战队赛类型</th>
                        <th scope="col">积分类型</th>
                        <th scope="col">备注</th>
                        <th scope="col" v-if="uwtInfo.playerPositionType.id==1200||uwtInfo.playerPositionType.id==1201">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(teamMemberCredit, index) in teamMemberCreditList" :key="teamMemberCredit.creditId"
                        :class="Number(teamMemberCredit.creditTypeId) ==200 ? '': 'table-warning'">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ teamMemberCredit.playerScid }}</td>
                        <td>{{ teamMemberCredit.playerName }}</td>
                        <td>{{ teamMemberCredit.settlementTimeStr }}</td>
                        <td>{{ teamMemberCredit.credit }}</td>
                        <td>{{ teamMemberCredit.teamCompetitionType.name }}</td>
                        <td>{{ teamMemberCredit.creditType.name }}</td>
                        <td>{{ teamMemberCredit.note }}</td>
                        <td>
                            <span class="btn badge rounded-pill bg-primary" v-if="uwtInfo.playerPositionType.id==1200||uwtInfo.playerPositionType.id==1201" @click="editCredit(teamMemberCredit)">编辑</span>
                        </td>
                    </tr>
                    <!-- 编辑队员积分 -->
                    <div class="modal fade" id="editCreditModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header  alert-primary">
                                    <div class="badge rounded-pill bg-primary" style="font-size:larger">{{teamMemberCreditInfo.playerName}}</div>
                                            <h5 class="modal-title" id="addNewTeamMemberModalLabel">编辑队员积分</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-floating mb-3">
                                            <input type="number" class="form-control" maxlength="3"
                                                v-model="teamMemberCreditInfo.credit">
                                            <label>积分</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <select class="form-select"
                                                v-model="teamMemberCreditInfo.teamCompetitionTypeId">
                                                <option v-for="teamCompetitionType in teamCompetitionTypeList"
                                                    :key="teamCompetitionType.id" :value="teamCompetitionType.id">
                                                    {{teamCompetitionType.name}}</option>
                                            </select>
                                            <label>战队竞赛类型</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <select class="form-select" v-model="teamMemberCreditInfo.creditTypeId">
                                                <option v-for="creditType in creditTypeList" :key="creditType.id"
                                                    :value="creditType.id">{{creditType.name}}</option>
                                            </select>
                                            <label>积分类型</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input step=1 type="datetime-local" class="form-control"
                                                v-model="teamMemberCreditInfo.settlementTime">
                                            <label>结算时间</label>
                                        </div>
                                        <div class="form-floating">
                                            <input type="text" class="form-control"
                                                v-model="teamMemberCreditInfo.note" maxlength="50">
                                            <label>备注</label>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" id="editTeamMemberCreditModalCloseBtn" data-bs-dismiss="modal">取消</button>
                                    <button type="button" class="btn btn-primary" @click="saveTeamMemberCreditInfo()" :disabled="saveTeamMemberCreditInfoBtn">保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </tbody>
            </table>
            <!-- :commonPage="page"   发送数据 -->
            <!-- @commonPageChange="commonPageChange($event)"   接收数据 -->
            <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
        </div>
    </div>
</template>

<script>
import Page from '@/components/Page.vue';

import {Modal,Toast} from 'bootstrap';
import { findLeaveType,findJoinWayType,findCreditType,getTeamCompetitionType } from "../api/dictionary";
import { getTeamMemberScoreboard,searchCreditBy,saveTeamMemberCreditInfo,batchCreditAddSave,singleCreditAddSave,getSettlementTimeList } from "../api/credit";
import { getAllTeamMember, changeTeamMemberStatus, addNewTeamMember, getAllValidTeamMember } from "../api/teamWithPlayer";
import { saveTeamInfo,removeTeam,searchMyTeam } from "../api/userWithTeam";
import { getToday } from "../api/common";
export default {
    name: "credit",
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
            creditImportInfo: {
                teamId: '',
                teamName: '',
                teamCompetitionTypeId: '', // 积分录入时用于监听其值
            },
            batchCreditAddSaveBtn: true, // 批量添加积分 > 保存按钮
            singleCreditAddSaveBtn: true, // 单个添加积分 > 保存按钮
            saveTeamMemberCreditInfoBtn: true, // 编辑积分保存按钮
            teamCompetitionTypeList: [], // 新增/修改积分 > 战队赛类型
            searchTeamCompetitionTypeList: [], // 搜索栏 > 战队赛类型(比上一个多了一个无限制)
            creditTypeList: [], // 字典表 > 积分类型
            allValidTeamMemberList: [], // 战队所有正式队员,用于批量积分录入
            singleTeamMemberCreditInfo: { // 单个成员积分录入
                teamMemberId: '',
                creditTypeId: '',
                settlementTime: '',
                note: '',
                teamCompetitionTypeId: '',
                uwtId: ''
            },
            teamMemberCreditList:[], // 队员积分
            teamMemberCreditInfo:{ // 队员积分
                creditId: 0,
                teamName: '',
                scid: '',
                playerName: '',
                credit: 0,
                creditTypeId: 0,
                teamCompetitionTypeId: '',
                note: '',
            },
            settlementTimeList: [],
            searchCreditWithTeamInfo: {
            },
            searchCreditInfo: {
                teamId:'',
                playerName: '',
                playerScid: '',
                settlementTime: '',
            },
            teamList: [],
            uwtInfo: {},
        }
    },
    watch : {
        // 监听对象,注意设置 deep:true
        allValidTeamMemberList:{
            handler() {
                this.checkAllValidTeamMemberList();
            },
            deep: true
        },
        singleTeamMemberCreditInfo: {
            handler() {
                this.checkSingleTeamMemberCreditInfo();
            },
            deep: true
        },
        teamMemberCreditInfo: {
            handler() {
                this.checkTeamMemberCreditInfo();
            },
            deep: true
        },
        uwtInfo:{ // team 和 战队竞赛类型修改时,所有队员的 team 和 战队竞赛类型全部更改
            handler() {
                this.page.currentPage = 1;
                var uwtId = '';
                if (this.uwtInfo.parentId == null) {
                    uwtId = this.uwtInfo.id;
                } else {
                    uwtId = this.uwtInfo.parentId;
                }
                this.searchCreditInfo.uwtId = uwtId;
                this.creditImportInfo.uwtId = uwtId;
                this.searchCreditInfo.teamId = this.uwtInfo.team.id;
                this.creditImportInfo.teamId = this.uwtInfo.team.id;
                this.creditImportInfo.teamName = this.searchCreditWithTeamInfo.name;
                getSettlementTimeList(Object.assign({ // 统计战队赛所有结算时间并搜索该结算时间内所有队员的积分
                    uwtId : uwtId
                })).then(
                    response => {
                        this.settlementTimeList = response.data.data;
                        this.settlementTimeList.unshift({
                            settlementTime: '',
                            settlementTimeStr:'无限制'
                        });
                        if (this.settlementTimeList.length>0) {
                            this.searchCreditInfo.settlementTime = this.settlementTimeList[0].settlementTime;
                            this.searchCreditBy();
                        }
                    }
                )
                this.getAllValidTeamMember(); // 积分导入时需要的数据
            },
        },
        'creditImportInfo.teamCompetitionTypeId':{ // team 和 战队竞赛类型修改时,所有队员的 team 和 战队竞赛类型全部更改
            handler(){
                this.refreshAllValidTeamMemberListTeamCompetitionType();
            },
        },
        // 单个属性监听
        'searchCreditInfo.playerScid':{
            handler(newVal){
                this.searchCreditInfo.playerScid=newVal.toLocaleUpperCase();
            }
        },
    },
    mounted() {
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
        init() {
            getTeamCompetitionType().then(
                response => {
                    this.teamCompetitionTypeList = response.data.data;
                    this.searchTeamCompetitionTypeList = JSON.parse(JSON.stringify(response.data.data)); // 深拷贝,否则值会随 checkStatusList 改变
                    this.searchTeamCompetitionTypeList.unshift({
                        id: '',
                        name:'无限制'
                    });
                    this.searchCreditInfo.teamCompetitionTypeId = '';
                    this.creditImportInfo.teamCompetitionTypeId = this.teamCompetitionTypeList[0].id;
                }
            ).then(
                findCreditType().then(
                    response => {
                        this.creditTypeList = response.data.data;
                        this.refreshEditCreditTypeForm();
                        this.searchMyTeam();
                    }
                ),
            );
        },
        searchMyTeam(){
            searchMyTeam().then(
                response => {
                    this.teamList = response.data.data.data;
                    if (this.teamList.length>0) {
                        this.uwtInfo = this.teamList[0];
                    }
                }
            )
        },
        searchCreditByBtn() {
            this.page.currentPage = 1;
            this.searchCreditBy();
        },
        searchCreditBy() { // 获取队员积分
            searchCreditBy(Object.assign(this.page,this.searchCreditInfo)).then(
                response=>{
                    this.teamMemberCreditList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        editCredit(credit) {
            this.teamMemberCreditInfo.creditId = credit.creditId;
            this.teamMemberCreditInfo.teamName = credit.teamName;
            this.teamMemberCreditInfo.scid = credit.scid;
            this.teamMemberCreditInfo.playerName = credit.playerName;
            this.teamMemberCreditInfo.credit = credit.credit;
            this.teamMemberCreditInfo.creditTypeId = credit.creditType.id;
            this.teamMemberCreditInfo.settlementTime = credit.settlementTime;
            this.teamMemberCreditInfo.teamCompetitionTypeId = credit.teamCompetitionType.id;
            this.teamMemberCreditInfo.note = credit.note;
            var editCreditModal = document.getElementById('editCreditModal');
            var modal = new Modal(editCreditModal);
            modal.show();
        },
        saveTeamMemberCreditInfo() { // 编辑队员积分 > 保存
            this.checkTeamMemberCreditInfo();
            saveTeamMemberCreditInfo(this.teamMemberCreditInfo).then(
                response => {
                    this.searchCreditBy();
                    document.getElementById('editTeamMemberCreditModalCloseBtn').click();
                    this.showToast(response);
                }
            ).catch(error=>{
                console.log("error:"+error);
            });
        },
        refreshEditCreditTypeForm() { // 重置"编辑队员积分"表单
            this.teamMemberCreditInfo.creditId = '';
            this.teamMemberCreditInfo.teamName = '';
            this.teamMemberCreditInfo.scid = '';
            this.teamMemberCreditInfo.playerName = '';
            this.teamMemberCreditInfo.settlementTime = getToday()+'T18:00:00', // 重置日期
            this.teamMemberCreditInfo.credit = '';
            this.teamMemberCreditInfo.creditTypeId = '';
            this.teamMemberCreditInfo.note = '';
        },
        getAllValidTeamMember(){
            getAllValidTeamMember(this.creditImportInfo).then(
                response=>{
                    this.allValidTeamMemberList = response.data.data;
                    if (this.allValidTeamMemberList!= null && this.allValidTeamMemberList.length>0) { // 把【积分录入】的批量模板和单个模板的计算时间重置为今天
                        for (var i = 0; i < this.allValidTeamMemberList.length; i++){
                            this.allValidTeamMemberList[i].teamCompetitionTypeId=this.creditImportInfo.teamCompetitionTypeId;
                            this.allValidTeamMemberList[i].settlementTime=getToday()+'T18:00:00';
                            this.allValidTeamMemberList[i].creditTypeId=this.creditTypeList[0].id;
                            this.allValidTeamMemberList[i].credit = 30;
                            this.allValidTeamMemberList[i].uwtId = this.creditImportInfo.uwtId;
                            
                        }
                        this.singleTeamMemberCreditInfo.uwtId = this.creditImportInfo.uwtId;
                        this.singleTeamMemberCreditInfo.teamMemberId = this.allValidTeamMemberList[0].teamMemberId;
                        this.singleTeamMemberCreditInfo.settlementTime = getToday() + 'T18:00:00';
                        this.singleTeamMemberCreditInfo.creditTypeId = this.creditTypeList[0].id;
                        this.singleTeamMemberCreditInfo.credit = 30;
                        this.singleTeamMemberCreditInfo.teamCompetitionTypeId = this.creditImportInfo.teamCompetitionTypeId;
                    }
                }
            )
        },
        refreshAllValidTeamMemberListTeamCompetitionType(){
            for (var i = 0; i < this.allValidTeamMemberList.length; i++){
                this.allValidTeamMemberList[i].teamCompetitionTypeId = this.creditImportInfo.teamCompetitionTypeId;
                // 600:联赛周 601:任务周
                if(this.creditImportInfo.teamCompetitionTypeId==600){
                    this.allValidTeamMemberList[i].credit= 30;
                } else {
                    this.allValidTeamMemberList[i].credit= 100;
                }
            }
            this.singleTeamMemberCreditInfo.teamCompetitionTypeId = this.creditImportInfo.teamCompetitionTypeId;
            if(this.creditImportInfo.teamCompetitionTypeId==600){
                    this.singleTeamMemberCreditInfo.credit= 30;
                } else {
                    this.singleTeamMemberCreditInfo.credit= 100;
                }
        },
        batchCreditAddSave() { // 批量积分录入
            this.checkAllValidTeamMemberList(); // 再检查一遍,处理通过粘贴的方式输入 01 这样格式的数字
            batchCreditAddSave(this.allValidTeamMemberList).then(
                response=>{
                    document.getElementById("closeBatchCreditAddSaveBtn").click();
                    this.searchCreditByBtn();
                    this.commonResponse.success = true;
                    this.commonResponse.msg = response.data.msg;
                    this.$emit('commonResponse', this.commonResponse);
                    var toastLiveExample = document.getElementById('commonToast');
                    var toast = new Toast(toastLiveExample);
                    toast.show();
                }
            )
        },
        singleCreditAddSave() {
            this.checkSingleTeamMemberCreditInfo(); // 同上
            singleCreditAddSave(this.singleTeamMemberCreditInfo).then(
                response => {
                    
                    document.getElementById("closeSingleCreditAddSaveBtn").click();
                    this.commonResponse.success = true;
                    this.searchCreditByBtn();
                    this.commonResponse.msg= response.data.msg;
                    this.$emit('commonResponse', this.commonResponse);
                    var toastLiveExample = document.getElementById('commonToast');
                    var toast = new Toast(toastLiveExample);
                    toast.show();
                }
            )
        },
        checkAllValidTeamMemberList() { // 积分录入 > 数据检查,检查通过放开批量"保存"按钮
            this.batchCreditAddSaveBtn=false;
            for (var i = 0; i < this.allValidTeamMemberList.length; i++){
                if (typeof(this.allValidTeamMemberList[i].credit)!='number') {
                    this.allValidTeamMemberList[i].credit = 30;
                } else {
                    if (this.allValidTeamMemberList[i].credit<0 || this.allValidTeamMemberList[i].credit>100) {
                        this.allValidTeamMemberList[i].credit = 30;
                    }
                }
                if (this.allValidTeamMemberList[i].settlementTime == '' || this.allValidTeamMemberList[i].settlementTime == null || this.allValidTeamMemberList[i].credit===null || this.allValidTeamMemberList[i].credit==='') {
                    this.batchCreditAddSaveBtn = true;
                    return;
                }
            }
        },
        checkSingleTeamMemberCreditInfo() { // 积分录入 > 数据检查,检查通过放开单个"保存"按钮
            this.singleCreditAddSaveBtn=false;
            if (typeof(this.singleTeamMemberCreditInfo.credit)!='number') {
                this.singleTeamMemberCreditInfo.credit = 30;
            } else {
                if (this.singleTeamMemberCreditInfo.credit<0 || this.singleTeamMemberCreditInfo.credit>100) {
                    this.singleTeamMemberCreditInfo.credit = 30;
                }
            };
            if (this.singleTeamMemberCreditInfo.settlementTime == '' || this.singleTeamMemberCreditInfo.settlementTime == null || this.singleTeamMemberCreditInfo.credit===null || this.singleTeamMemberCreditInfo.credit==='') {
                this.singleCreditAddSaveBtn = true;
                return;
            };
        },
        checkTeamMemberCreditInfo() { // 编辑积分
            this.saveTeamMemberCreditInfoBtn=false;
            if (typeof(this.teamMemberCreditInfo.credit)!='number') {
                this.teamMemberCreditInfo.credit = 30;
            } else {
                if (this.teamMemberCreditInfo.credit<0 || this.teamMemberCreditInfo.credit>100) {
                    this.teamMemberCreditInfo.credit = 30;
                }
            };
            if (this.teamMemberCreditInfo.settlementTime == '' || this.teamMemberCreditInfo.settlementTime == null || this.teamMemberCreditInfo.credit===null || this.teamMemberCreditInfo.credit==='') {
                this.teamMemberCreditInfo = true;
                return;
            };
        },
        commonPageChange(event) {
            this.page = event;
            this.searchCreditBy();
        },
    },
}
</script>