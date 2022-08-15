<template>
    <div class="tab-pane fade show active" id="list-team" role="tabpanel" aria-labelledby="list-team-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" v-model="searchTeamInfo.teamScid" class="form-control" placeholder="战队标签">
            </div>
            <div class="col-auto">
                <input type="text" v-model="searchTeamInfo.teamName" class="form-control" placeholder="战队名称">
            </div>
            <div class="col-auto">
                <input type="text" v-model="searchTeamInfo.userId" class="form-control" placeholder="关联者ID">
            </div>
            <div class="col-auto">
                <input type="text" v-model="searchTeamInfo.userName" class="form-control" placeholder="关联者名称">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark me-2" @click="cleanSearchTeam()">清空</button>
                <button type="button" class="btn btn-dark" @click="searchTeamBtn()">搜索</button>
            </div>
            <!-- 在 form 中的 button 其 type 默认为 submit ,所以必须指定类型 button
                或使用 event.prevent 取消默认事件, vue: @click.stop="delRow()" -->
            <div class="col-auto">
                <!-- 关联新战队 -->
                <div class="container">
                    <div class="row justify-content-start">
                        <button type="button" class="btn btn-success" data-bs-toggle="modal"
                            data-bs-target="#teamInfoModal" @click="addTeamBtn()">
                            关联新战队
                        </button>
                        <div class="modal fade" id="teamInfoModal" tabindex="-1" aria-labelledby="teamInfoModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div class="d-flex align-items-center">
                                            <h4 class="modal-title align-items-center">{{teamInfo.teamInfoTitle}}</h4><div class="badge rounded-pill bg-primary" style="font-size:larger">{{teamInfo.teamName}}</div>
                                        </div>

                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form class="was-validated" novalidate>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control is-invalid" v-if="teamInfo.add" v-model="teamInfo.teamScid" required>
                                                    <label>战队SCID标签</label>
                                                </div>
                                            </div>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" v-if="teamInfo.add" v-model="teamInfo.teamName" required>
                                                    <label>战队名称</label>
                                                </div>
                                            </div>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" v-model="teamInfo.teamEliminationLine" required>
                                                    <label>淘汰线</label>
                                                </div>
                                            </div>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" v-model="teamInfo.teamExcellentLine" required>
                                                    <label>优等线</label>
                                                </div>
                                            </div>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" v-model="teamInfo.teamNote">
                                                    <label>战队简介</label>
                                                </div>
                                            </div>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" v-model="teamInfo.userNote">
                                                    <label>备注信息</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-warning" @click="cleanTeamInfo()" v-if="teamInfo.add">清空</button>
                                        <button type="button" class="btn btn-secondary" id="closeTeamModal" data-bs-dismiss="modal">取消</button>
                                        <button type="button" class="btn btn-primary" @click="saveTeamInfo()" :disabled="teamInfoBtn">保存</button>
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
            <caption class="text-center alert-primary" role="alert">
                <h4><span class="badge rounded-pill bg-primary ">我的战队</span></h4>
            </caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">战队标签</th>
                    <th scope="col">战队名称</th>
                    <th scope="col">淘汰线</th>
                    <th scope="col">优等线</th>
                    <th scope="col">战队状态</th>
                    <th scope="col">战队简介</th>
                    <th scope="col">战队关联者ID</th>
                    <th scope="col">战队关联者</th>
                    <th scope="col">战队关联状态</th>
                    <th scope="col">关联备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="teamList.length==0">
                    <td colspan="12">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div>
                                    <div class="alert alert-light" role="alert">
                                    请修改搜索条件或关联新战队!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr v-for="(team, index) in teamList" :key="team.id"
                    :class="Number(team.uwtStatus.id)!=702 ? '':'table-danger'">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ team.team.scid }}</td>
                    <td>{{ team.team.name }}</td>
                    <td>{{ team.team.eliminationLine }}</td>
                    <td>{{ team.team.excellentLine }}</td>
                    <td>{{ team.teamStatus.name }}</td>
                    <td>{{ team.team.note }}</td>
                    <td>{{ team.user.id }}</td>
                    <td>{{ team.user.name }}</td>
                    <td>{{ team.uwtStatus.name }}</td>
                    <td>{{ team.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary me-2" data-bs-toggle="modal"
                            data-bs-target="#teamInfoModal " @click="editTeamBtn(team)">编辑</span>
                        <span class="btn badge rounded-pill bg-danger" v-if="team.uwtStatus.id == 701" @click="removeTeam(team.id)">解除关联</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 分页 -->
        <div class="dropdown-divider"></div>
        <nav>
            <ul class="pagination justify-content-center">
                <li class="page-item me-1">
                    <button type="button" class="btn btn-outline-dark" @click="pageChange(1)">{{1}}</button>
                </li>
                <li :class="(i==1&&page.currentPage-3>1)||(i==page.totalPage&&(page.currentPage+3)<page.totalPage)?'page-item disabled':'page-item'"  v-for="i in page.totalPage" :key="i">
                    <button class="btn btn-outline-secondary" href="#"  disabled v-if="(i==1&&page.currentPage-3>1)||(i==page.totalPage&&(page.currentPage+3)<page.totalPage)">...</button>
                    <button type="button" class="btn btn-outline-dark" @click="pageChange(i)" v-if="i>1&&(i+3)>page.currentPage && (i-3)<page.currentPage&&i<page.totalPage">{{i}}</button>
                </li>
                <li class="page-item ms-1">
                    <button type="button" class="btn btn-outline-dark" v-if="page.totalPage>1" @click="pageChange(page.totalPage)">{{page.totalPage}}</button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import {Modal,Toast} from 'bootstrap';
import { findLeaveType,findJoinWayType,findCreditType,getTeamCompetitionType } from "../api/dictionary";
import { saveTeamInfo,removeTeam,searchTeam } from "../api/userWithTeam";
import { getAllTeamMember,changeTeamMemberStatus,addNewTeamMember,getAllValidTeamMember } from "../api/teamWithPlayer";
import { getToday } from "../api/common";
export default {
    name: "team",
    data() {
        return {
            teamInfoBtn: true, // 添加战队 > 信息完整才放开"保存"按钮
            teamList: [],
            teamInfo: {
                teamInfoTitle: '',
                add: true,
                id: '', // uwt 的 id
                teamId: '', // team 的 id
                teamScid: '',
                teamName: '',
                teamEliminationLine: 35,
                teamExcellentLine: 20,
                teamNote: '',
                userNote: ''
            },
            commonResponse: {
                success: true,
                msg: '123666'
            },
            searchTeamInfo:{
                teamScid:'',
                teamName:'',
                userId:'',
                userName:'',
            },
            page: {
                size: 10,
                currentPage:1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
        }
    },
    mounted() {
        findJoinWayType().then(
            response => {
                this.joinWayList = response.data.data;
            }
        );
    },
    watch : {
        // 监听对象,注意设置 deep:true
        teamInfo:{
            handler(newVal,oldVal){
                this.checkteamInfo();
            },
            deep: true
        },
    },
    methods: {
        checkteamInfo(){ // 添加队员请求 > 信息返回的提示样式
            if(this.teamInfo.teamName=='' || this.teamInfo.teamScid==''){
                this.teamInfoBtn=true;
            }
            else{
                this.teamInfoBtn=false;
            }
        },
        saveTeamInfo(){
            saveTeamInfo(this.teamInfo).then(
                response => {
                    if(response.data.code==0){
                        this.commonResponse.success=false;
                    }
                    else{
                        this.commonResponse.success = true;
                        document.getElementById("closeTeamModal").click(); // 关闭 Modal
                        this.refreshTeam();
                    }
                    this.commonResponse.msg= response.data.msg;
                    this.$emit('commonResponse', this.commonResponse);
                    var toastLive = document.getElementById('commonToast');
                    var toast = new Toast(toastLive);
                    toast.show();
                }
            )
            this.refreshTeam();
        },
        removeTeam(teamId){
            removeTeam(Object.assign({
                teamId: teamId
            })
            ).then(
                response=>{
                    this.commonResponse.success = false;
                    this.commonResponse.msg= response.data.msg;
                    this.$emit('commonResponse', this.commonResponse);
                    var toastLive = document.getElementById('commonToast');
                    var toast = new Toast(toastLive);
                    toast.show();
                }
            )
        },
        cleanTeamInfo(){
            this.teamInfo.id='';
            this.teamInfo.teamScid='';
            this.teamInfo.teamName = '';
            this.teamInfo.teamEliminationLine= 35,
            this.teamInfo.teamExcellentLine= 20,
            this.teamInfo.teamNote='';
            this.teamInfo.userNote='';
        },
        addTeamBtn(){
            this.cleanTeamInfo();
            this.teamInfo.teamInfoTitle = "关联新战队";
            this.teamInfo.add=true;
        },
        editTeamBtn(team) {
            console.log(JSON.stringify(team));
            this.teamInfo.teamInfoTitle = "编辑战队";
            this.teamInfo.add=false;
            this.teamInfo.teamId=team.team.id;
            this.teamInfo.teamScid=team.team.scid;
            this.teamInfo.teamName=team.team.name;
            this.teamInfo.teamNote = team.team.note;
            this.teamInfo.teamEliminationLine = team.team.eliminationLine;
            this.teamInfo.teamExcellentLine = team.team.excellentLine;
            this.teamInfo.id=team.id;
            this.teamInfo.userNote = team.note;
        },
        refreshTeam(){
            this.searchTeam(this.page);
        },
        searchTeamBtn() {
            this.page.currentPage = 1;
            this.searchTeam();
        },
        searchTeam() {
            searchTeam(Object.assign(this.page, this.searchTeamInfo)).then(
                response=>{
                    this.teamList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanSearchTeam(){
            this.searchTeamInfo={
                teamScid:'',
                teamName: '',
                userId:'',
                userName:'',
            };
        },
        pageChange(currentPage) {
            this.page.currentPage = currentPage;
            this.searchTeam();
        }
    },
}
</script>