<template>
    <div class="tab-pane fade" id="list-teamManage" role="tabpanel" aria-labelledby="list-teamManage-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" v-model="searchTeamInfo.scid" class="form-control" placeholder="战队标签">
            </div>
            <div class="col-auto">
                <input type="text" v-model="searchTeamInfo.name" class="form-control" placeholder="战队名称">
            </div>
            <div class="col-auto">
                <input type="text" v-model="searchTeamInfo.status" class="form-control" placeholder="战队状态">
            </div>
            <div class="col-auto">
                <input type="text" v-model="searchTeamInfo.type" class="form-control" placeholder="战队类型">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark me-2" @click="cleanSearchTeam()">清空</button>
                <button type="button" class="btn btn-dark" @click="searchTeamBtn()">搜索</button>
            </div>
            <!-- 在 form 中的 button 其 type 默认为 submit ,所以必须指定类型 button
                或使用 event.prevent 取消默认事件, vue: @click.stop="delRow()" -->
        </form>
        <!-- <hr/> -->
        <table class="table text-center table-hover caption-top">
            <!-- <caption class="text-center alert-primary" role="alert">
                <h4><span class="badge rounded-pill bg-primary ">我的战队</span></h4>
            </caption> -->
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" style="width:10%;">战队标签</th>
                    <th scope="col" style="width:10%;">战队名称</th>
                    <th scope="col" style="width:10%;">战队类型</th>
                    <th scope="col" style="width:10%;">淘汰线</th>
                    <th scope="col" style="width:10%;">优等线</th>
                    <th scope="col" style="width:10%;">战队状态</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
             <tbody class="table-group-divider">
                <tr v-if="teamList.length==0">
                    <td colspan="14">
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
                    :class="Number(team.status.id)==2 ? 'table-danger':''">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ team.scid }}</td>
                    <td>{{ team.name }}</td>
                    <td>{{ team.type.name }}</td>
                    <td>{{ team.eliminationLine }}</td>
                    <td>{{ team.excellentLine }}</td>
                    <td>{{ team.status.name }}</td>
                    <td>{{ team.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary me-2" data-bs-toggle="modal" data-bs-target="#editTeamInfoModal" @click="editTeamBtn(team)">编辑</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 编辑战队信息 -->
        <div class="modal fade" id="editTeamInfoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{teamInfo.title}}</h4>
                            <div class="badge rounded-pill bg-primary" style="font-size:larger">{{teamInfo.name}}</div>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control is-invalid" v-model="teamInfo.scid" required>
                                    <label>战队SCID标签</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="teamInfo.name" required>
                                    <label>战队名称</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <select class="form-select"  v-model="teamInfo.type">
                                        <option v-for="teamType in teamTypeList" :key="teamType.id" :value="teamType.id">{{teamType.name}}</option>
                                    </select>
                                    <label>战队类型</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <select class="form-select"  v-model="teamInfo.status">
                                        <option v-for="teamStatus in teamStatusList" :key="teamStatus.id" :value="teamStatus.id">{{teamStatus.name}}</option>
                                    </select>
                                    <label>战队状态</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="teamInfo.eliminationLine" required>
                                    <label>淘汰线</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="teamInfo.excellentLine" required>
                                    <label>优等线</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="teamInfo.note">
                                    <label>战队简介</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="cleanTeamInfo()" v-if="teamInfo.add">清空</button>
                        <button type="button" class="btn btn-secondary" id="closeEditTeamInfoModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveTeamInfo()" :disabled="teamInfoBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>

<script>
import Page from '@/components/Page.vue';

import { Modal, Toast } from 'bootstrap';
import { getTeamType,getTeamStatusType } from "../api/dictionary";
import { searchAllTeam,saveTeamInfo } from "../api/team";
export default {
    name: "teamManage",
    components: {
        Page,
    },
    data() {
        return {
            teamModalData: { // 通用战队 Modal 弹窗数据
                name: '',
                competition: [],
                task: []
            },
            commonResponse: {
                success: true,
                msg: ''
            },
            page: {
                size: 10,
                currentPage:1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            name: '',
            teamInfoBtn: true, // 添加战队 > 信息完整才放开"保存"按钮
            teamList: [],
            teamInfo: {
                title: '',
                add: true,
                id: '',
                scid: '',
                name: '',
                eliminationLine: 35,
                excellentLine: 20,
                note: '',
                type: '',
            },
            searchTeamInfo:{
                scid:'',
                name:'',
                type:'',
                status:'',
            },
            competition: {},
            task: {},
            teamTypeList: [],
            teamStatusList: [],
        }
    },
    mounted() {
    },
    watch : {
        // 监听对象,注意设置 deep:true
        teamInfo:{
            handler(){
                this.checkTeamInfo();
            },
            deep: true
        },
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
            this.searchAllTeam();
        },
        init() {
            getTeamType().then(
                response => {
                    this.teamTypeList = response.data.data;
                    this.teamInfo.type = this.teamTypeList[0].id;
                }
            ).then(
                getTeamStatusType().then(
                    response => {
                        this.teamStatusList = response.data.data;
                        this.teamInfo.status = this.teamStatusList[0].id;
                        this.searchAllTeam();
                    }
                ),
            );
        },
        checkTeamInfo(){ // 添加队员请求 > 信息返回的提示样式
            if(this.teamInfo.name=='' || this.teamInfo.scid==''){
                this.teamInfoBtn=true;
            }
            else{
                this.teamInfoBtn=false;
            }
        },
        saveTeamInfo(){
            saveTeamInfo(this.teamInfo).then(
                response => {
                    if(response.data.code==1){
                        document.getElementById("closeEditTeamInfoModal").click(); // 关闭 Modal
                        this.refreshTeam();
                    }
                    this.showToast(response);
                }
            )
        },
        cleanTeamInfo(){
            this.teamInfo.id='';
            this.teamInfo.scid='';
            this.teamInfo.name = '';
            this.teamInfo.eliminationLine= '',
            this.teamInfo.excellentLine= '',
            this.teamInfo.note='';
            this.teamInfo.userNote='';
        },
        editTeamBtn(team) {
            this.teamInfo.title = "编辑战队";
            this.teamInfo.add = false;
            this.teamInfo.id=team.id;
            this.teamInfo.scid=team.scid;
            this.teamInfo.name=team.name;
            this.teamInfo.eliminationLine = team.eliminationLine;
            this.teamInfo.excellentLine = team.excellentLine;
            this.teamInfo.type = team.type.id;
            this.teamInfo.status = team.status.id;
            this.teamInfo.note = team.note;
        },
        refreshTeam() {
            this.page.currentPage = 1;
            this.searchAllTeam();
        },
        searchTeamBtn() {
            this.searchAllTeam();
        },
        searchAllTeam() {
            searchAllTeam(Object.assign(this.page, this.searchTeamInfo)).then(
                response=>{
                    this.teamList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanSearchTeam(){
            this.searchTeamInfo={
                scid:'',
                name: '',
                status:'',
                type:'',
            };
        },
    },
}
</script>