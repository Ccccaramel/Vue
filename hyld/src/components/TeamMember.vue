<template>
    <div class="tab-pane fade" id="list-teamMember" role="tabpanel" aria-labelledby="list-teamMember-list">
        <div v-if="this.teamList.length==0">
            <div class="alert alert-info" role="alert">
                <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" beat-fade /> -->
                <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" bounce />
                <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" fade /> -->
                <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" flip /> -->
                <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" shake /> -->
                <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" spin /> -->
                <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" spin spin-reverse /> -->
                <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" spin-pulse /> -->
                <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" beat/> -->
                ~~>_&lt;~~你还没有关联任何战队,请先关联战队,然后为你的战队添加队员吧!
            </div>
            <div class="col-md mb-2">
                <div class="form-floating text-center" style="height: 640px;">
                    <img src="../assets/null.jpg" class="rounded" style="height: 640px;" />
                </div>
            </div>
        </div>
        <div v-if="this.teamList.length>0">
            <!-- 搜索条件 -->
            <form class="row g-3 mt-1 mb-3">
                <div class="col-auto">
                    <select class="form-select" v-model="teamInfo">
                        <option
                            v-for="team in teamList"
                            v-bind:key="team.team"
                            :value="team.team">
                            {{ team.team.name }}</option>
                    </select>
                </div>
                <div class="col-auto">
                    <input type="text" class="form-control" v-model="teamMemberInfo.scid" placeholder="队员SCID标签">
                </div>
                <div class="col-auto">
                    <input type="text" class="form-control" v-model="teamMemberInfo.name" placeholder="队员名称">
                </div>
                <div class="col-auto">
                    <select class="form-select" v-model="teamMemberInfo.teamMemberStatusId">
                        <option
                            v-for="teamMemberStatus in teamMemberStatusList"
                            v-bind:key="teamMemberStatus.id"
                            :value="teamMemberStatus.id">
                            {{ teamMemberStatus.name }}</option>
                    </select>
                </div>
                
                <div class="col-auto">
                    <button type="button" class="btn btn-dark" @click="refreshSearchForm()">清空</button>
                </div>
                <div class="col-auto">
                    <button type="button" class="btn btn-dark" @click="searchTeamMemberBtn()">搜索</button>
                </div>
                <div class="col-auto">
                    <!-- 添加新队员 -->
                    <div class="container">
                        <div class="row justify-content-start">
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addNewTeamMemberModal">
                                添加新队员
                            </button>
                            <div class="modal fade" id="addNewTeamMemberModal" tabindex="-1" aria-labelledby="addNewTeamMemberModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <div class="badge rounded-pill bg-primary" style="font-size:larger">{{teamInfo.name}}</div>
                                            <h5 class="modal-title" id="addNewTeamMemberModalLabel">添加新队员</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form class="was-validated" novalidate>
                                                <div class="col-md mb-2">
                                                    <div class="form-floating">
                                                    <input type="text" class="form-control is-invalid" v-model="newTeamMemberInfo.scid" placeholder="newTeamMemberInfo_scid" required>
                                                    <label>队员SCID标签</label>
                                                    </div>
                                                </div>
                                                <div class="col-md mb-2">
                                                    <div class="form-floating">
                                                    <input type="text" class="form-control" v-model="newTeamMemberInfo.name" placeholder="newTeamMemberInfo_name" required>
                                                    <label>队员名称</label>
                                                    </div>
                                                </div>
                                                <div class="col-md mb-2">
                                                    <div class="form-floating">
                                                    <input step=1 type="datetime-local" class="form-control" v-model="newTeamMemberInfo.time" placeholder="newTeamMemberInfo_time"/>
                                                    <label>加入时间</label>
                                                    </div>
                                                </div>
                                                <div class="col-md mb-2">
                                                    <div class="form-floating">
                                                        <select class="form-select"  v-model="newTeamMemberInfo.joinWay">
                                                            <option v-for="joinWay in joinWayList" :key="joinWay.id" :value="joinWay.id">{{joinWay.name}}</option>
                                                        </select>
                                                        <label>加入方式</label>
                                                    </div>
                                                </div>
                                                <div class="col-md mb-2">
                                                    <div class="form-floating">
                                                    <input type="text" class="form-control" v-model="newTeamMemberInfo.note" placeholder="newTeamMemberInfo_note">
                                                    <label>备注</label>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" id="addNewTeamMemberCloseBtn" data-bs-dismiss="modal">取消</button>
                                            <button type="button" class="btn btn-primary" @click="addNewTeamMember()" :disabled="newTeamMemberInfoBtn">保存</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <!-- <div class="dropdown-divider"></div> -->
            <table class="table text-center table-hover caption-top">
                <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary ">{{teamInfo.name}}</span></h4></caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" style="width:12%">队员SCID标签</th>
                        <th scope="col">队员名称</th>
                        <th scope="col">加入时间</th>
                        <th scope="col" style="width:8%">加入方式</th>
                        <th scope="col" style="width:10%">状态</th>
                        <th scope="col">退出时间</th>
                        <th scope="col">备注</th>
                        <th scope="col" style="width:25%">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="teamMemberList.length==0">
                        <td colspan="9">
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div>
                                        <div class="alert alert-light" role="alert">
                                        请修改搜索条件或添加队员!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr v-for="(teamMember, index) in teamMemberList" :key="teamMember.teamMemberId"
                        :class="Number(teamMember.statusId)==100 ? '':'table-danger'">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ teamMember.scid }}</td>
                        <td>{{ teamMember.name }}</td>
                        <td>{{ teamMember.joinTime }}</td>
                        <td>{{ teamMember.joinWay }}</td>
                        <td>{{ teamMember.status }}</td>
                        <td>{{ teamMember.leaveTime }}</td>
                        <td>{{ teamMember.note }}</td>
                        <td>
                            <span class="btn badge rounded-pill bg-primary me-2" data-bs-toggle="modal" data-bs-target="#teamMemberAllCreditRecordModal"
                                @click="getTeamMemberAllCreditRecord(teamMember)">查看战队赛记录</span>
                            <span class="btn badge rounded-pill bg-success me-2" data-bs-toggle="modal" data-bs-target="#teamMemberAllCreditRecordModal"
                                @click="updateTeamMemberInfo(teamMember)" v-if="teamMember.statusId==100">编辑队员信息</span>
                            <span class="btn badge rounded-pill bg-danger" data-bs-toggle="modal" data-bs-target="#kickOutModal-teamMember"
                                @click="setTeamMemberId(teamMember)" v-if="teamMember.statusId==100">踢出</span>
                            <div class="modal fade" id="kickOutModal-teamMember" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog">
                                    <form>
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <div class="badge rounded-pill bg-primary" style="font-size:larger">{{changeTeamMemberStatusInfo.teamMemberName}}</div><h5 class="modal-title">离队原因</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="row g-3 align-items-center mb-2">
                                                    <div class="col-12">
                                                        <select class="form-select" v-model="leave.teamMemberStatus">
                                                            <option
                                                                v-for="teamMemberStatus in teamMemberLeaveTypeList"
                                                                v-bind:key="teamMemberStatus.id"
                                                                :value="teamMemberStatus">
                                                                {{ teamMemberStatus.name }}</option>
                                                        </select>
                                                        <div class="form-text">{{leave.teamMemberStatus.note}}</div>
                                                    </div>
                                                </div>
                                                <div class="form-floating mb-2">
                                                    <textarea class="form-control" placeholder="Leave a comment here" v-model="changeTeamMemberStatusInfo.note" id="floatingTextarea2"></textarea>
                                                    <label for="floatingTextarea2">备注信息</label>
                                                </div>
                                                <div class="form-floating mb-2">
                                                    <input step=1 type="datetime-local" class="form-control" v-model="changeTeamMemberStatusInfo.time"/>
                                                    <label for="floatingTextarea2">离队时间</label>
                                                </div>
                                                <hr/>
                                                <div class="row g-3">
                                                    <div class="col-12">
                                                        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" beat/>
                                                        <div class="alert alert-danger d-flex" role="alert">
                                                            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                                            <div class="text-start">
                                                                离队后无法撤销!谨慎操作!<br/>
                                                                数据将作为历史数据存,仅可查看!<br/>
                                                                再次加入将以新成员身份需重新录入成员信息!<br/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="leaveTeamModalCloseBtn">关闭</button>
                                                <button type="button" class="btn btn-primary" @click="changeTeamMemberStatus()">保存</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Page :commonPage="page"  @commonPageChange="commonPageChange($event)"></Page>
            <!-- 弹窗 -->
            <div class="modal fade" id="teamMemberAllCreditRecordModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"><span class="badge rounded-pill bg-dark">{{teamMember.name}}</span>的积分记录</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">结算时间</th>
                                        <th scope="col">积分</th>
                                        <th scope="col">积分类型</th>
                                        <th scope="col">备注信息</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="teamMemberCredit in teamMemberCreditList" :key="teamMemberCredit.id">
                                        <th>{{teamMemberCredit.settlementTimeStr}}</th>
                                        <td>{{teamMemberCredit.credit}}</td>
                                        <td>{{teamMemberCredit.creditType.name}}</td>
                                        <td>{{teamMemberCredit.note}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Page from '@/components/Page.vue';

import {Modal,Toast} from 'bootstrap';
import { findLeaveType,getTeamMemberStatusType,findJoinWayType,findCreditType,getTeamCompetitionType } from "../api/dictionary";
import { getTeamMemberAllCreditRecord } from "../api/credit";
import { saveTeamInfo,removeTeam,searchMyTeam } from "../api/userWithTeam";
import { searchTeamMember,changeTeamMemberStatus,addNewTeamMember,getAllValidTeamMember } from "../api/teamWithPlayer";
import { getToday } from "../api/common";
export default {
    name: "teamMember",
    components: {
        Page,
    },
    data() {
        return {
            joinWayList: [],
            teamMemberList: [],
            newTeamMemberInfoBtn: false, // "新增成员"弹窗的保存按钮
            newTeamMemberInfo:{ // "新增成员"弹窗数据绑定
                teamId: '',
                name: '',
                scid: '',
                joinWay: 0,
                time: '',
                note: '',
            },
            commonResponse: {
                success: true,
                msg: '',
            },
            teamMember:{},
            teamMemberCreditList: [],
            teamMemberStatusList: [], // 队员所有状态
            teamMemberLeaveTypeList: [], // 队员离开的类型
            teamMemberInfo: {
                scid: '',
                name: '',
                teamMemberStatusId: '',
                teamId: '',
            },
            page: {
                size: 10,
                currentPage:1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            teamList: [],
            teamInfo: {
                id: '',
                name: ''
            },
            leave:{ // "踢出"弹窗数据绑定
                teamMemberStatus: {},
                note: '',
                time: ''
            },
            changeTeamMemberStatusInfo: { // "踢出">提交数据
                teamMemberId: 0,
                teamMemberName: '',
                teamMemberStatusId: 0,
                note: '',
                time: ''
            },
        }
    },
    mounted() {
        findLeaveType().then( // 获取所有"离队原因"的类型
            response => {
                this.teamMemberLeaveTypeList = response.data.data;
                this.refreshLeaveForm();
            }
        );
        findJoinWayType().then(
            response => {
                this.joinWayList = response.data.data;
                this.cleanNewTeamMemberInfo();
            }
        );
        getTeamMemberStatusType().then( // 获取所有"离队原因"的类型
            response => {
                this.teamMemberStatusList = response.data.data;
                this.teamMemberStatusList.unshift({
                    id: 0,
                    name:'无限制',
                });
                this.searchMyTeam(); // 为什么在这里 searchMyTeam ? getTeamMemberStatusType 和 searchMyTeam 确实是相互独立的,独立的话无法确保谁先谁后,并且我只想写一个 refreshSearchForm
            }
        );
    },
    watch : {
        // 监听对象,注意设置 deep:true
        newTeamMemberInfo:{
            handler(){
                this.checkNewTeamMemberInfo();
            },
            deep: true
        },
        'teamInfo': {
            handler() {
                this.newTeamMemberInfo.teamId = this.teamInfo.id; // 设置【添加新成员】
                this.searchTeamMemberBtn();

            },
            deep: true
        },
    },
    methods: {
        searchMyTeam() {
            searchMyTeam().then( // 结果为"关联战队信息",包含"关联者信息","战队信息","关联状态信息"等等;而并非是"战队信息"
                response => {
                    this.teamList = response.data.data.data;
                    if (this.teamList.length>0) {
                        this.teamInfo = this.teamList[0].team;
                        this.refreshSearchForm();
                    }
                }
            )
        },
        addNewTeamMember(){ // 添加新队员 > 提交
            this.newTeamMemberInfo.scid=this.newTeamMemberInfo.scid.toLocaleUpperCase(); // 将战队标签中字母转换为大写
            addNewTeamMember(this.newTeamMemberInfo).then(
                response=>{
                    if(response.data.code==0){
                        this.commonResponse.success= false;
                    }else{
                        this.commonResponse.success = true;
                        document.getElementById("addNewTeamMemberCloseBtn").click(); // 关闭 Modal
                        this.cleanNewTeamMemberInfo(); // 清空表单
                        this.searchTeamMemberBtn(); // 重新搜索
                    }
                    this.commonResponse.msg= response.data.msg;
                    this.$emit('commonResponse', this.commonResponse);
                    var toastLiveExample = document.getElementById('commonToast');
                    var toast = new Toast(toastLiveExample);
                    toast.show();
                }
            )
        },
        checkNewTeamMemberInfo() { // 添加队员请求 > 信息返回的提示样式
            if(this.newTeamMemberInfo.name=='' || this.newTeamMemberInfo.scid==''){
                this.newTeamMemberInfoBtn=true;
            }
            else{
                this.newTeamMemberInfoBtn=false;
            }
        },
        cleanNewTeamMemberInfo() { // 重置"新增成员"表单
        this.newTeamMemberInfo.teamId = '';
            this.newTeamMemberInfo.name = '';
            this.newTeamMemberInfo.scid = '';
            this.newTeamMemberInfo.joinWay = this.joinWayList[0].id;
            this.newTeamMemberInfo.time = getToday()+'T18:00:00';
            this.newTeamMemberInfo.note = '';
        },
        getTeamMemberAllCreditRecord(teamMember){
            this.teamMember=teamMember;
            getTeamMemberAllCreditRecord(Object.assign({
                teamMemberId:teamMember.teamMemberId
            })).then(
                response=>{
                    this.teamMemberCreditList=response.data.data;
                }
            )
        },
        refreshSearchForm() {
            this.teamMemberInfo.scid = '';
            this.teamMemberInfo.name = '';
            this.teamMemberInfo.teamMemberStatusId = this.teamMemberStatusList[0].id;
            this.teamMemberInfo.teamId = this.teamList[0].team.id;
            this.newTeamMemberInfo.teamId = this.teamList[0].team.id;
        },
        searchTeamMemberBtn() {
            this.page.currentPage = 1;
            this.searchTeamMember();
        },
        searchTeamMember() {
            this.teamMemberInfo.teamId = this.teamInfo.id; // 搜索条件
            if (this.teamMemberInfo.teamId=='') {
                return;
            }
            searchTeamMember(Object.assign(this.page,this.teamMemberInfo)).then(
                response => {
                    this.teamMemberList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        commonPageChange(event) {
            this.page = event;
            this.searchTeamMember();
        },
        setTeamMemberId(teamMember) { // 点击"踢出"按钮,暂存该队员id
            this.changeTeamMemberStatusInfo.teamMemberId = teamMember.teamMemberId;
            this.changeTeamMemberStatusInfo.teamMemberName=teamMember.name;
        },
        changeTeamMemberStatus(){ // 踢出 > 提交
            this.changeTeamMemberStatusInfo.teamMemberStatusId=this.leave.teamMemberStatus.id;
            changeTeamMemberStatus(this.changeTeamMemberStatusInfo).then(
                response => {
                    document.getElementById('leaveTeamModalCloseBtn').click();
                }
            ).then(
                res=>{
                    this.refreshLeaveForm(); // 刷新弹窗表单,否则上次数据依旧存在
                    this.searchTeamMember(); // 刷新战队统计数据表格
                }
            )
        },
        refreshLeaveForm(){ // 重置"离队原因"表单
            this.leave.teamMemberStatus = this.teamMemberLeaveTypeList[0]; // 默认选择第一个"离队原因"类型
            this.changeTeamMemberStatusInfo.note = ''; // 重置备注
            this.changeTeamMemberStatusInfo.time = getToday() + 'T18:00:00'; // 重置日期
        },
    },
}
</script>