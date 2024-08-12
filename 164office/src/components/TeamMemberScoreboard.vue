<template>
    <div class="tab-pane fade" id="list-teamMemberScoreboard" role="tabpanel" aria-labelledby="list-teamMemberScoreboard-list">
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
            <div class="container mt-2 mb-2">
                <div class="row justify-content-center">
                    <div class="col-auto">
                        <select class="form-select" v-model="uwtInfo">
                            <option
                                v-for="team in teamList"
                                v-bind:key="team"
                                :value="team">
                                {{ team.team.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <table class="table text-center table-hover caption-top">
                <caption class="text-center alert-primary" role="alert">
                        <div class="form-check form-check-inline" v-for="(teamCompetitionType,i) in teamCompetitionTypeList" v-bind:key="teamCompetitionType.id">
                            <input class="form-check-input" type="radio" name="teamCompetitionType" v-model="searchTeamMemberScoreboardInfo.teamCompetitionTypeId" :value="teamCompetitionType.id" :checked="i==0">
                            <span class="badge rounded-pill bg-primary">{{teamCompetitionType.name}}</span>
                        </div>
                </caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">玩家SCID标签</th>
                        <th scope="col">名称</th>
                        <th scope="col">平均积分排名</th>
                        <th scope="col">
                            <span tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus"
                                data-bs-placement="top"
                                data-bs-content="平均积分=战队赛总积分/参与次数">
                                平均积分
                                <font-awesome-icon icon="fa-regular fa-circle-question" />
                            </span>
                        </th>
                        <th scope="col">参与次数</th>
                        <th scope="col">请假次数</th>
                        <th scope="col">
                            <span tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus"
                                data-bs-placement="top"
                                data-bs-content="所有正常积分之和">
                                战队赛总积分
                                <font-awesome-icon icon="fa-regular fa-circle-question" />
                            </span>
                        </th>
                        <th scope="col">额外积分</th>
                        <th scope="col">
                            <span tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus"
                                data-bs-placement="top"
                                data-bs-content="所有正常积分、请假积分、额外积分之和">
                                总积分
                                <font-awesome-icon icon="fa-regular fa-circle-question" />
                            </span>
                        </th>
                        <th scope="col" v-if="uwtInfo.playerPositionType.id==1200||uwtInfo.playerPositionType.id==1201">操作</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-if="teamMemberScoreboardList.length==0">
                        <td colspan="12">
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div>
                                        <div class="alert alert-light" role="alert">
                                        暂无积分统计数据,请到「战队赛积分明细」菜单里录入队员积分!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr :class="searchTeamMemberScoreboardInfo.teamCompetitionTypeId==601?'':(Number(teamMemberScoreboard.averageCredit) >= uwtInfo.team.eliminationLine ? (Number(teamMemberScoreboard.averageCredit) >= uwtInfo.team.excellentLine ? 'table-primary' : '') : 'table-danger')"
                        v-for="(teamMemberScoreboard, index) in teamMemberScoreboardList"
                        :key="teamMemberScoreboard.teamMemberId">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ teamMemberScoreboard.playerScid }}</td>
                        <td>{{ teamMemberScoreboard.playerName }}</td>
                        <td>{{ teamMemberScoreboard.averageCreditRank }}</td>
                        <td>{{ teamMemberScoreboard.averageCredit }}</td>
                        <td>{{ teamMemberScoreboard.matchSettlementTimes }}</td>
                        <td>{{ teamMemberScoreboard.restTimes }}</td>
                        <td>{{ teamMemberScoreboard.matchTotalCredit }}</td>
                        <td>{{ teamMemberScoreboard.exCredit }}</td>
                        <td>{{ teamMemberScoreboard.totalCredit }}</td>
                        <td>
                            <span class="btn badge bg-danger" data-bs-toggle="modal" data-bs-target="#kickOutModal-teamMemberScoreboard"
                                v-if="uwtInfo.playerPositionType.id==1200||uwtInfo.playerPositionType.id==1201" @click="setTeamMemberId(teamMemberScoreboard.teamMemberId)">踢出</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 踢出 -->
        <div class="modal fade" id="kickOutModal-teamMemberScoreboard" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <form>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">离队原因</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-3 align-items-center mb-2">
                                <div class="col-12">
                                    <select class="form-select"
                                        v-model="leave.teamMemberStatus">
                                        <option
                                            v-for="teamMemberStatus in teamMemberStatusList"
                                            v-bind:key="teamMemberStatus.id"
                                            :value="teamMemberStatus">
                                            {{ teamMemberStatus.name }}</option>
                                    </select>
                                    <div class="form-text">{{leave.teamMemberStatus.note}}</div>
                                </div>
                            </div>
                            <div class="form-floating mb-2">
                                <textarea class="form-control" placeholder="Leave a comment here" v-model="leave.note"></textarea>
                                <label>备注信息</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input step=1 type="datetime-local" class="form-control" v-model="leave.time"/>
                                <label>离队时间</label>
                            </div>
                            <hr/>
                            <div class="row g-3">
                                <div class="col-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                                        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                        </symbol>
                                    </svg>
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
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="changeTeamMemberStatusModalCloseBtn">关闭</button>
                            <button type="button" class="btn btn-primary" @click="changeTeamMemberStatus()">保存</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { Popover } from 'bootstrap';
import { findLeaveType,findJoinWayType,findCreditType,getTeamCompetitionType } from "../api/dictionary";
import { getTeamMemberScoreboard,getCredit,saveTeamMemberCreditInfo } from "../api/credit";
import { getAllTeamMember, changeTeamMemberStatus, addNewTeamMember, getAllValidTeamMember } from "../api/teamWithPlayer";
import { saveTeamInfo,removeTeam,searchMyTeam } from "../api/userWithTeam";
import { getToday } from "../api/common";
export default {
    name: "teamMemberScoreboard",
    data() {
        return {
            teamMemberScoreboardList: [],
            teamCompetitionTypeList: [],
            leave:{ // "踢出"弹窗数据绑定
                teamMemberStatus: {},
                note: '',
                time: ''
            },
            changeTeamMemberStatusInfo: { // "踢出">提交数据
                teamMemberId: 0,
                teamMemberStatusId: 0,
                note: '',
                time: ''
            },
            teamList: [],
            searchTeamMemberScoreboardInfo: {
                uwtId:'',
                teamId: '',
                teamCompetitionTypeId: '',
                eliminationLine: '',
                excellentLine: ''
            },
            uwtInfo: {},
            teamMemberStatusList:[],
        }
    },
    watch: {
        uwtInfo: {
            handler() {
                if (this.uwtInfo.parentId == null) {
                    this.searchTeamMemberScoreboardInfo.uwtId = this.uwtInfo.id;
                } else {
                    this.searchTeamMemberScoreboardInfo.uwtId = this.uwtInfo.parentId;
                }
                // this.searchTeamMemberScoreboardInfo.uwtId = this.uwtInfo.id;
                this.searchTeamMemberScoreboardInfo.teamId = this.uwtInfo.team.id;
                this.searchTeamMemberScoreboardInfo.eliminationLine = this.uwtInfo.team.eliminationLine;
                this.searchTeamMemberScoreboardInfo.excellentLine = this.uwtInfo.team.excellentLine;
                this.getTeamMemberScoreboard();
            },
            deep: true
        },
        'searchTeamMemberScoreboardInfo.teamCompetitionTypeId': {
            handler() {
                this.getTeamMemberScoreboard();
            },
        },
    },
    updated() { //更新之后.场景:获取更新真实DOM之后
        var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new Popover(popoverTriggerEl)
        });
    },
    mounted() {

    },
    methods: {
        init() {
            findLeaveType().then( // 获取所有"离队原因"的类型
                response => {
                    this.teamMemberStatusList = response.data.data;
                    this.refreshLeaveForm();
                    this.reset();
                }
            );
        },
        reset() {
            this.searchMyTeam();
            this.getTeamCompetitionType();
        },
        searchMyTeam() {
            searchMyTeam().then( // 搜索条件:战队
                response => {
                    this.teamList = response.data.data.data;
                    if (this.teamList.length>0) {
                        this.uwtInfo = this.teamList[0];
                    }
                }
            )
        },
        getTeamCompetitionType() {
            getTeamCompetitionType().then( // 搜索条件:战队赛类型
                response => {
                    this.teamCompetitionTypeList = response.data.data;
                    this.searchTeamMemberScoreboardInfo.teamCompetitionTypeId =this.teamCompetitionTypeList[0].id;
                }
            )
        },
        /**
         * 获取战队联赛周统计数据
         * 触发条件:
         *   搜索条件任意一个改变时
         */
        getTeamMemberScoreboard() {
            getTeamMemberScoreboard(this.searchTeamMemberScoreboardInfo).then(
                response => {
                    this.teamMemberScoreboardList = response.data.data;
                }
            )
        },
        setTeamMemberId(teamMemberId){ // 点击"踢出"按钮,暂存该队员id
            this.changeTeamMemberStatusInfo.teamMemberId=teamMemberId;
        },
        changeTeamMemberStatus(){ // 踢出 > 提交
            this.changeTeamMemberStatusInfo.note=this.leave.note;
            this.changeTeamMemberStatusInfo.time=this.leave.time;
            this.changeTeamMemberStatusInfo.teamMemberStatusId=this.leave.teamMemberStatus.id;
            changeTeamMemberStatus(this.changeTeamMemberStatusInfo).then(
                response => {
                    document.getElementById('changeTeamMemberStatusModalCloseBtn').click();
                }
            ).then(
                res=>{
                    this.refreshLeaveForm(); // 刷新弹窗表单,否则上次数据依旧存在
                    this.getTeamMemberScoreboard(); // 刷新战队统计数据表格
                }
            )
        },
        refreshLeaveForm(){ // 重置"离队原因"表单
            this.leave={
                teamMemberStatus: this.teamMemberStatusList[0], // 默认选择第一个"离队原因"类型
                note: '', // 重置 备注
                time: getToday()+'T18:00:00' // 重置日期
            };
        },
    },
}
</script>