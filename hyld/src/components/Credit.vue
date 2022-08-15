<template>
    <div class="tab-pane fade" id="list-credit" role="tabpanel" aria-labelledby="list-credit-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <select class="form-select" v-model="searchCreditInfo.team">
                    <option v-for="team in teamList" v-bind:key="team.team" :value="team.team">
                        {{ team.team.name }}</option>
                </select>
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" v-model="searchCreditInfo.playerName" placeholder="队员名称">
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" v-model="searchCreditInfo.playerScid" placeholder="队员SCID标签">
            </div>
            <div class="col-auto">
                <select class="form-select" v-model="searchCreditInfo.settlementTimeObj">
                    <option v-for="settlementTime in settlementTimeList" v-bind:key="settlementTime"
                        :value="settlementTime">
                        {{ settlementTime.settlementTimeStr }}</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchTeamMemberCreditBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" href="#batchCreditAddModalToggle"
                    role="button" @click="getAllValidTeamMember()">积分录入</button>
            </div>
        </form>
        <div>
            <!-- 积分录入 -->
            <div class="modal fade" id="batchCreditAddModalToggle" aria-hidden="true" aria-labelledby="batchCreditAddModalToggleLabel" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
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
                                            <div class="form-floating">
                                                <select class="form-select" v-model="creditImportInfo.teamId">
                                                    <option v-for="team in teamList" :key="team.team.id" :value="team.team.id">{{team.team.name}}</option>
                                                </select>
                                                <label>战队</label>
                                            </div>
                                        </div>
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
                                            <input type="text" class="form-control" v-model="validTeamMember.credit" required>
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
                                            <input type="text" class="form-control" v-model="validTeamMember.note">
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
            <div class="modal fade" id="singleCreditAddModalToggle" aria-hidden="true" aria-labelledby="singleCreditAddModalToggleLabel" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div>
                                <h5 class="modal-title" id="singleCreditAddModalToggleLabel">单个队员积分录入</h5>
                            </div>
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
                                            <div class="form-floating">
                                                <select class="form-select" v-model="creditImportInfo.teamId">
                                                    <option v-for="team in teamList" :key="team.team.id"
                                                        :value="team.team.id">{{team.team.name}}</option>
                                                </select>
                                                <label>战队</label>
                                            </div>
                                        </div>
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
                                            <input type="text" class="form-control" v-model="singleTeamMemberCreditInfo.credit"
                                                required>
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
                                            <input type="text" class="form-control" v-model="singleTeamMemberCreditInfo.note">
                                            <label>备注</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" id="closeSingleCreditAddSaveBtn" data-bs-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="singleCreditAddSave()" :disabled="batchCreditAddSaveBtn">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert">
                <h4><span class="badge rounded-pill bg-primary ">{{searchCreditInfo.team.name}}</span></h4>
            </caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">队员SCID标签</th>
                    <th scope="col">队员名称</th>
                    <th scope="col">结算时间</th>
                    <th scope="col">积分</th>
                    <th scope="col">积分类型</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(teamMemberCredit, index) in teamMemberCreditList" :key="teamMemberCredit.creditId"
                    :class="Number(teamMemberCredit.creditTypeId) ==200 ? '': 'table-warning'">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ teamMemberCredit.scid }}</td>
                    <td>{{ teamMemberCredit.playerName }}</td>
                    <td>{{ teamMemberCredit.settlementTimeStr }}</td>
                    <td>{{ teamMemberCredit.credit }}</td>
                    <td>{{ teamMemberCredit.creditType.name }}</td>
                    <td>{{ teamMemberCredit.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" @click="editCredit(teamMemberCredit)">编辑</span>
                    </td>
                </tr>
                <!-- 编辑队员积分 -->
                <div class="modal fade" id="editCreditModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header  alert-primary">
                                <h3>编辑队员<span
                                        class="badge rounded-pill bg-dark">{{teamMemberCreditInfo.playerName}}</span>的积分
                                </h3>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="4"
                                            v-model="teamMemberCreditInfo.credit">
                                        <label>积分</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <select class="form-select" v-model="teamMemberCreditInfo.creditType.id">
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
                                        <input type="text" class="form-control" id="1"
                                            v-model="teamMemberCreditInfo.note">
                                        <label>备注</label>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="editTeamMemberCreditModalCloseBtn" data-bs-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" @click="saveTeamMemberCreditInfo()">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </tbody>
        </table>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>

<script>
import Page from '@/components/Page.vue';

import {Modal,Toast} from 'bootstrap';
import { findLeaveType,findJoinWayType,findCreditType,getTeamCompetitionType } from "../api/dictionary";
import { getTeamMemberScoreboard,searchTeamMemberCredit,saveTeamMemberCreditInfo,batchCreditAddSave,singleCreditAddSave,getSettlementTimeList } from "../api/credit";
import { getAllTeamMember, changeTeamMemberStatus, addNewTeamMember, getAllValidTeamMember } from "../api/teamWithPlayer";
import { saveTeamInfo,removeTeam,searchTeam } from "../api/userWithTeam";
import { getToday } from "../api/common";
export default {
    name: "credit",
    components: {
        Page,
    },
    data() {
        return {
            
            creditImportInfo: {
                teamId: '',
                teamCompetitionTypeId: '', // 积分录入时用于监听其值
            },
            batchCreditAddSaveBtn: false, // 批量添加积分 > 保存按钮
            teamCompetitionTypeList: [],
            creditTypeList: [], // 字典表 > 积分类型
            allValidTeamMemberList: [], // 战队所有正式队员,用于批量积分录入
            singleTeamMemberCreditInfo: {
                teamMemberId: '',
                creditTypeId: '',
                settlementTime: '',
                note: '',
                teamCompetitionType: '',
            },
            teamMemberCreditList:[], // 队员积分
            teamMemberCreditInfo:{ // 队员积分
                creditId: 0,
                teamName: '',
                scid: '',
                playerName: '',
                credit: 0,
                creditType: {},
                creditTypeId: 0,
                note: '',
            },
            page: {
                size: 10,
                currentPage:1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            settlementTimeList: [],
            searchCreditInfo: {
                team: {
                    id: '',
                    name: '',
                },
                playerName: '',
                playerScid: '',
                settlementTimeObj: {},
            },
            teamList: [],
        }
    },
    watch : {
        // 监听对象,注意设置 deep:true
        allValidTeamMemberList:{
            handler() {
                console.log("allValidTeamMemberList");
                this.checkAllValidTeamMemberList();
            },
            deep: true
        },
        'creditImportInfo.teamId':{ // team 和 战队竞赛类型修改时,所有队员的 team 和 战队竞赛类型全部更改
            handler(){
                this.getAllValidTeamMember();
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
        'searchCreditInfo.team':{
            handler(newVal){
                getSettlementTimeList(Object.assign({
                    teamId : newVal.id
                })).then(
                    response => {
                        this.settlementTimeList = response.data.data;
                        this.settlementTimeList.unshift({
                            settlementTime: '',
                            settlementTimeStr:'无限制'
                        });
                        if (this.settlementTimeList.length>0) {
                            this.searchCreditInfo.settlementTimeObj = this.settlementTimeList[0];
                            this.searchTeamMemberCredit();
                        }
                    }
                )
            }
        }
    },
    mounted() {
        searchTeam().then(
            response => {
                this.teamList = response.data.data.data;
                if (this.teamList.length>0) {
                    this.searchCreditInfo.team = this.teamList[0].team;
                    this.creditImportInfo.teamId = this.teamList[0].team.id;
                    // this.getSettlementTimeList(); // 必须在 team 加载完后,将第一个 team 作为条件去获取该 team 的所有结算时间
                }
            }
        ),
        getTeamCompetitionType().then(
            response => {
                this.teamCompetitionTypeList = response.data.data;
                this.creditImportInfo.teamCompetitionTypeId = this.teamCompetitionTypeList[0].id;
            }
        );
        findCreditType().then(
            response => {
                this.creditTypeList = response.data.data;
                this.refreshEditCreditTypeForm();
            }
        );
    },
    methods: {
        searchTeamMemberCreditBtn() {
            this.page.currentPage = 1;
            this.searchTeamMemberCredit();
        },
        searchTeamMemberCredit() { // 获取队员积分
            this.searchCreditInfo.teamId = this.searchCreditInfo.team.id;
            this.searchCreditInfo.settlementTime =this.searchCreditInfo.settlementTimeObj.settlementTime;
            searchTeamMemberCredit(Object.assign(this.page,this.searchCreditInfo)).then(
                response=>{
                    this.teamMemberCreditList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        editCredit(credit){
            this.teamMemberCreditInfo=credit;
            var editCreditModal = document.getElementById('editCreditModal');
            var modal = new Modal(editCreditModal);
            modal.show();
        },
        saveTeamMemberCreditInfo(){
            saveTeamMemberCreditInfo(this.teamMemberCreditInfo).then(
                response => {
                    this.searchTeamMemberCredit();
                    document.getElementById('editTeamMemberCreditModalCloseBtn').click();
                }
            ).catch(error=>{
                console.log("error:"+error);
            });
        },
        refreshEditCreditTypeForm(){ // 重置"编辑队员积分"表单
            this.teamMemberCreditInfo={ // 队员积分
                creditId: 0,
                teamName: '',
                scid: '',
                playerName: '',
                settlementTime: getToday()+'T18:00:00', // 重置日期,
                credit: 0,
                creditType: {},
                creditTypeId: 0,
                note: '',
            };
        },
        getAllValidTeamMember(){
            getAllValidTeamMember(this.creditImportInfo).then(
                response=>{
                    this.allValidTeamMemberList = response.data.data;
                    if (this.allValidTeamMemberList!= null) {
                        for(var i=0;i<this.allValidTeamMemberList.length;i++){
                            this.allValidTeamMemberList[i].settlementTime=getToday()+'T18:00:00';
                            this.allValidTeamMemberList[i].creditTypeId=this.creditTypeList[0].id;
                            this.allValidTeamMemberList[i].credit=30;
                        }
                        this.singleTeamMemberCreditInfo.teamMemberId = this.allValidTeamMemberList[0].teamMemberId;
                        this.singleTeamMemberCreditInfo.settlementTime = getToday() + 'T18:00:00';
                        this.singleTeamMemberCreditInfo.creditTypeId = this.creditTypeList[0].id;
                        this.singleTeamMemberCreditInfo.credit = 30;
                    }
                }
            )
        },
        refreshAllValidTeamMemberListTeamCompetitionType(){
            for (var i = 0; i < this.allValidTeamMemberList.length; i++){
                this.allValidTeamMemberList[i].teamCompetitionType=this.creditImportInfo.teamCompetitionTypeId;
            }
            this.singleTeamMemberCreditInfo.teamCompetitionType=this.creditImportInfo.teamCompetitionTypeId;
        },
        batchCreditAddSave(){
            batchCreditAddSave(this.allValidTeamMemberList).then(
                response=>{
                    this.commonResponse.success = true;
                    document.getElementById("closeBatchCreditAddSaveBtn").click();
                    this.searchTeamMemberCreditBtn();

                    this.commonResponse.msg= response.data.msg;
                    this.$emit('commonResponse', this.commonResponse);
                    var toastLiveExample = document.getElementById('commonToast');
                    var toast = new Toast(toastLiveExample);
                    toast.show();
                }
            )
        },
        singleCreditAddSave() {
            singleCreditAddSave(this.singleTeamMemberCreditInfo).then(
                response => {
                    this.commonResponse.success = true;
                    document.getElementById("closeSingleCreditAddSaveBtn").click();
                    this.searchTeamMemberCreditBtn();

                    this.commonResponse.msg= response.data.msg;
                    this.$emit('commonResponse', this.commonResponse);
                    var toastLiveExample = document.getElementById('commonToast');
                    var toast = new Toast(toastLiveExample);
                    toast.show();
                }
            )
        },
        checkAllValidTeamMemberList() { // 积分录入 > 数据检查,检查通过放开"保存"按钮
            if (this.allValidTeamMemberList.length==0) {
                    this.batchCreditAddSaveBtn = true;
                    return;
            }
            this.batchCreditAddSaveBtn=false;
            for(var i=0;i<this.allValidTeamMemberList.length;i++){
                if(this.allValidTeamMemberList[i].settlementTime==''||this.allValidTeamMemberList[i].settlementTime==null|| this.allValidTeamMemberList[i].credit==null|| this.allValidTeamMemberList[i].credit==''){
                    this.batchCreditAddSaveBtn = true;
                    return;
                }
            }
        },
        commonPageChange(event) {
            this.page = event;
            this.searchTeamMemberCredit();
        },
    },
}
</script>