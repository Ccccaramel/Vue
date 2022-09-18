<template>
    <div class="tab-pane fade" id="list-myTeam" role="tabpanel" aria-labelledby="list-myTeam-list">
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
                            申请关联新战队
                        </button>
                        <div class="modal fade" id="teamInfoModal" tabindex="-1" aria-labelledby="teamInfoModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div class="d-flex align-items-center">
                                            <h4 class="modal-title align-items-center">{{teamInfo.teamInfoTitle}}</h4>
                                            <div class="badge rounded-pill bg-primary" v-if="teamInfo.add" style="font-size:larger">{{teamInfo.teamName}}</div>
                                        </div>

                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form class="was-validated" novalidate>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" v-if="teamInfo.add" v-model="teamInfo.teamScid" required>
                                                    <label>战队SCID</label>
                                                </div>
                                            </div>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" v-model="teamInfo.teamName" required>
                                                    <label>战队名称</label>
                                                </div>
                                            </div>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <select class="form-select"  v-model="teamInfo.teamType">
                                                        <option v-for="teamType in teamTypeList" :key="teamType.id" :value="teamType.id">{{teamType.name}}</option>
                                                    </select>
                                                    <label>战队类型</label>
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
                                            <div class="col-md mb-2" v-if="teamInfo.add">
                                                <div class="form-floating">
                                                    
                                                    <div class="alert alert-warning d-flex align-items-center" role="alert">
                                                        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" beat/>
                                                        <div>
                                                            ⭐关联之后你还需要【上传验证】以证明目前你是该战队的队长/拥有者<br/>
                                                            ⭐你也可以选择不上传,但之后将无法修改该战队信息,仅验证审核通过后的用户可修改<br/>
                                                            ⭐此外请确保截图清晰完整无遮挡,scid正确(不用加#号)<br/>
                                                            ⭐由于此平台只有本人一个人在开发+维护+管理,精力有限,无法时刻关注审核请求,若需要快点验证通过请进QQ群(475765701)@群主,我会及时处理
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-warning" @click="cleanTeamRelationInfo()" v-if="teamInfo.add">清空</button>
                                        <button type="button" class="btn btn-secondary" id="closeTeamInfoModal" data-bs-dismiss="modal">取消</button>
                                        <button type="button" class="btn btn-primary" @click="saveTeamRelationInfo()" :disabled="teamInfoBtn">保存</button>
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
                    <th scope="col">战队类型</th>
                    <th scope="col">淘汰线</th>
                    <th scope="col">优等线</th>
                    <th scope="col">战队简介</th>
                    <th scope="col">你的职位</th>
                    <th scope="col">验证状态</th>
                    <th scope="col">验证结果备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="teamList.length==0">
                    <td colspan="14">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div>
                                    <div class="alert alert-light" role="alert">
                                    没有被战队绑定!暂无信息!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr v-for="(team, index) in teamList" :key="team.id"
                    :class="team.checkStatus.id==1402?'table-success':(team.checkStatus.id==1403?'table-danger':'')">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ team.team.scid }}</td>
                    <td>{{ team.team.name }}</td>
                    <td>{{ team.team.teamType.name }}</td>
                    <td>{{ team.team.eliminationLine }}</td>
                    <td>{{ team.team.excellentLine }}</td>
                    <td>{{ team.team.note }}</td>
                    <td>{{ team.playerPositionType.name }}</td>
                    <td>{{ team.checkStatus.name }}</td>
                    <td>{{ team.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-success" v-if="team.checkStatus.id!=1402"
                            data-bs-toggle="modal" data-bs-target="#upTeamVerificationInformationModal" @click="upVerificationInformation(team)">上传验证</span>
                        <span class="btn badge rounded-pill bg-primary ms-2" v-if="team.checkStatus.id==1402"
                            data-bs-toggle="modal" data-bs-target="#teamInfoModal" @click="editTeamBtn(team)">编辑</span>
                        <span class="btn badge rounded-pill bg-primary ms-2" v-if="team.checkStatus.id==1402"
                            @click="getTeamData(team)">综合数据</span>
                        <span class="btn badge rounded-pill bg-primary ms-2" v-if="team.checkStatus.id==1402 && team.playerPositionType.id==1200"
                            data-bs-toggle="modal" data-bs-target="#addViceCaptainModal" @click="viceCaptainManage(team)">副队长管理</span>
                        <span class="btn badge rounded-pill bg-danger ms-2" v-if="team.relation.id == 701"
                            @click="relieveTeam(team.id,0)">解除关联</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 样例 -->
        <div class="modal fade" id="upTeamVerificationInformationModalExampleModal" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">上传样例</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-primary text-center" role="alert">
                            准备界面👇
                        </div>
                        <div class="col-md mb-2">
                            <div class="form-floating text-center" style="height: 640px;">
                                <img src="../assets/eg1.jpg" class="rounded" style="height: 640px;" />
                            </div>
                        </div>
                        <div class="alert alert-primary text-center" role="alert">
                            战队界面👇
                        </div>
                        <div class="col-md mb-2">
                            <div class="form-floating text-center" style="height: 640px;">
                                <img src="../assets/eg2.jpg" class="rounded" style="height: 640px;" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" data-bs-target="#upTeamVerificationInformationModal" data-bs-toggle="modal">返回</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 上传 -->
        <div class="modal fade" id="upTeamVerificationInformationModal" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">上传验证信息</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <!-- 准备界面 -->
                            <div class="mb-3">
                                <div class="input-group mb-3">
                                    <label class="input-group-text">选择准备界面</label>
                                    <input type="file" id="controllerPreparePage" class="form-control" @change="tirggerFile($event,'controllerPreparePage','controllerPreparePageFile')" required>
                                </div>
                            </div>
                            <!-- 回显 -->
                            <div class="input-group mb-3">
                                <div class="form-floating text-center" :style="checkData.controllerPreparePageFile==''?'height: 0px;':'height: 480px;'">
                                    <img v-if="checkData.controllerPreparePageFile!=''" :src="checkData.controllerPreparePageFile" class="rounded" :style="checkData.controllerPreparePageFile==''?'height: 0px;':'height: 480px;'"/>
                                </div>
                            </div>
                            <!-- 战队界面 -->
                            <div class="mb-3">
                                <div class="input-group mb-3">
                                    <label class="input-group-text">选择战队界面</label>
                                    <input type="file" id="teamMainPage" class="form-control" @change="tirggerFile($event,'teamMainPage','teamMainPageFile')" required>
                                </div>
                            </div>
                            <!-- 回显 -->
                            <div class="input-group mb-3">
                                <div class="form-floating text-center" :style="checkData.teamMainPageFile==''?'height: 0px;':'height: 480px;'">
                                    <img v-if="checkData.teamPageFile!=''" :src="checkData.teamMainPageFile" class="rounded" :style="checkData.teamMainPageFile==''?'height: 0px;':'height: 480px;'"/>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <div class="alert alert-warning d-flex align-items-center" role="alert">
                                        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" beat/>
                                        <div>
                                            ⭐一张队长准备界面,一张战队信息界面,完整清晰无遮挡且无PS痕迹,每张图片大小不可大于1M<br />
                                            ⭐验证规则:<br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;1.界面的总杯数/头像/昵称是否一致,战队信息界面要显示队长且高亮状态<br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;2.战队信息界面scid和昵称是否与填写的信息一致<br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;3.准备界面的背景图是否为最新赛季背景<br/>
                                            ⭐图片如果太大,可以通过QQ进行压缩:比如把图片发送给自己,不勾选原图/选择标清,发送的图片即为压缩后的图片,再保存下来上传<br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" data-bs-target="#upTeamVerificationInformationModalExampleModal" data-bs-toggle="modal">查看上传样例</button>
                        <button type="button" class="btn btn-secondary" id="closeTeamCheckDataModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveTeamCheckData()" :disabled="saveTeamCheckDataBtn">提交验证信息</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 副队长管理 -->
        <div class="modal fade" id="addViceCaptainModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">副队长管理</h4>
                            <div class="badge rounded-pill bg-primary" style="font-size:larger">{{addViceCaptainModalInfo.teamName}}</div>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container text-center">
                            <div class="row justify-content-center">
                                <div class="col-3">
                                    <input class="form-control" type="text" placeholder="用户ID" v-model="addViceCaptainModalInfo.userId">
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="btn btn-success" @click="addViceCaptain()" :disabled="addViceCaptainBtn">添加</button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <table class="table text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">用户ID</th>
                                                <th scope="col">用户昵称</th>
                                                <th scope="col">职位</th>
                                                <th scope="col">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(viceCaptain,i) in viceCaptainList" :key="i">
                                                <th scope="row">{{i+1}}</th>
                                                <td>{{viceCaptain.user.id}}</td>
                                                <td>{{viceCaptain.user.name}}</td>
                                                <td>{{viceCaptain.playerPositionType.name}}</td>
                                                <td>
                                                    <span class="btn badge rounded-pill bg-danger ms-2"
                                                        @click="relieveTeam(viceCaptain.id,1)">解除关联</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="alert alert-warning d-flex align-items-center" role="alert">
                                        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" beat/>
                                        <div>
                                            ⭐添加可靠的伙伴与你一起共同维护战队数据吧!<br/>
                                            ⭐输入已注册用户的ID,点击添加,他将以副队长的身份协助战队管理<br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <Page :commonPage="modalPage" @commonPageChange="commonModalPageChange($event)"></Page>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <div class="dropdown-divider"></div>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>

<script>
import Page from '@/components/Page.vue';

import { Toast } from 'bootstrap';
import { getTeamType } from "../api/dictionary";
import { saveTeamRelationInfo,relieveTeam,searchMyRelationTeam,saveTeamCheckData,getAllViceCaptain,addViceCaptain } from "../api/userWithTeam";
import { getTeamData } from "../api/credit";
export default {
    name: "myTeam",
    components: {
        Page,
    },
    data() {
        return {
            teamModalData: { // 通用战队 Modal 弹窗数据
                teamName: '',
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
            modalPage: {
                size: 10,
                currentPage:1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
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
                teamType: '',
            },
            searchTeamInfo:{
                teamScid:'',
                teamName:'',
                userId:'',
                userName:'',
            },
            competition: {},
            task: {},
            teamTypeList: [],
            checkData: {
                controllerPreparePageFile: '',
                teamMainPageFile: '',
            },
            controllerPreparePageFile: {},
            teamMainPageFile: {},
            saveTeamCheckDataBtn: true,
            addViceCaptainModalInfo: {
                teamName: '',
                userId: ''
            },
            addViceCaptainBtn: true,
            viceCaptainList:[],
        }
    },
    mounted() {
        getTeamType().then(
            response => {
                this.teamTypeList = response.data.data;
                this.teamInfo.teamType = this.teamTypeList[0].id;
            }
        );
    },
    watch : {
        // 监听对象,注意设置 deep:true
        teamInfo:{
            handler(){
                this.checkTeamInfo();
            },
            deep: true
        },
        checkData: {
            handler() {
                this.checkCheckData();
            },
            deep: true
        },
        'addViceCaptainModalInfo.userId': {
            handler() {
                if (this.addViceCaptainModalInfo.userId=='') {
                    this.addViceCaptainBtn = true;
                } else {
                    this.addViceCaptainBtn = false;
                }
            },
        }
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
            this.searchMyRelationTeam();
        },
        commonModalPageChange(event) {
            this.modalPage = event;
            // this.searchMyRelationTeam();
        },
        checkTeamInfo(){ // 添加队员请求 > 信息返回的提示样式
            if(this.teamInfo.teamName=='' || this.teamInfo.teamScid==''){
                this.teamInfoBtn=true;
            }
            else{
                this.teamInfoBtn=false;
            }
        },
        saveTeamRelationInfo(){
            saveTeamRelationInfo(this.teamInfo).then(
                response => {
                    if(response.data.code==1){
                        document.getElementById("closeTeamInfoModal").click(); // 关闭 Modal
                        this.refreshTeam();
                    }
                    this.showToast(response);
                }
            )
            this.refreshTeam();
        },
        relieveTeam(id,flag){
            relieveTeam(Object.assign({
                id: id
            })).then(
                response => {
                    if (response.data.code == 1) {
                        if (flag == 0) {
                            this.refreshTeam();
                        } else {
                            this.refreshAllViceCaptain();
                        }
                        
                    }
                    this.showToast(response);
                }
            )
        },
        cleanTeamRelationInfo(){
            this.teamInfo.id='';
            this.teamInfo.teamScid='';
            this.teamInfo.teamName = '';
            this.teamInfo.teamEliminationLine= 35,
            this.teamInfo.teamExcellentLine= 20,
            this.teamInfo.teamNote='';
        },
        addTeamBtn(){
            this.cleanTeamRelationInfo();
            this.teamInfo.teamInfoTitle = "关联新战队";
            this.teamInfo.add=true;
        },
        editTeamBtn(team) {
            this.teamInfo.teamInfoTitle = "编辑战队";
            this.teamInfo.add=false;
            this.teamInfo.teamId=team.team.id;
            this.teamInfo.teamScid=team.team.scid;
            this.teamInfo.teamName=team.team.name;
            this.teamInfo.teamNote = team.team.note;
            this.teamInfo.teamEliminationLine = team.team.eliminationLine;
            this.teamInfo.teamExcellentLine = team.team.excellentLine;
            this.teamInfo.id=team.id;
        },
        refreshTeam() {
            this.page.currentPage = 1;
            this.searchMyRelationTeam();
        },
        searchTeamBtn() {
            this.refreshTeam();
        },
        searchMyRelationTeam() {
            searchMyRelationTeam(Object.assign(this.page, this.searchTeamInfo)).then(
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
        saveTeamCheckData() { // 提交验证
            var forms = new FormData();
            forms.append('controllerPreparePageFile', this.controllerPreparePageFile);
            forms.append('teamMainPageFile', this.teamMainPageFile);
            forms.append('relationId', this.checkData.id);
            saveTeamCheckData(forms).then(
                response => {
                    if (response.data.code == 1) {
                        this.cleanCheckFile('controllerPreparePage');
                        this.cleanCheckFile('teamMainPage');
                        document.getElementById('closeTeamCheckDataModal').click();
                        this.searchMyRelationTeam();
                    }
                    this.showToast(response);
                }
            )
        },
        cleanCheckFile(fileId) {
            document.getElementById(fileId).value = '';
            this.checkData[fileId+'File'] = '';
        },
        upVerificationInformation(uwtInfo) {
            this.checkData.id = uwtInfo.id;
            this.checkData.checkStatus = uwtInfo.checkStatus.id;
        },
        pageChange(currentPage) {
            this.page.currentPage = currentPage;
            this.searchMyRelationTeam();
        },
        getTeamData(team) {
            getTeamData(Object.assign({
                teamId:team.team.id
            })).then(
                response => {
                    this.teamModalData.teamName = team.team.name;
                    this.teamModalData.competition = response.data.data.competition;
                    this.teamModalData.task = response.data.data.task;
                    this.$emit('showTeamDataModal', this.teamModalData);
                }
            );
        },
        // 预览上传图片
        tirggerFile(event, elementId, fileVal) {
            var filetypes = [".jpg", ".png"];
            var file = event.target.files[0];
            if (event.target.files.length==0) {
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '未选择图片'
                    }
                }
                var obj = document.getElementById(elementId) ;
                obj.value = '';
                this.checkData[fileVal] = '';
                this.showToast(checkInfo);
                return;
            };
            var fileName = file.name;
            this.copyFile(file,elementId);
            if (filetypes.indexOf(fileName.substring(fileName.lastIndexOf(".")))==-1) { // 检查文件类型
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '图片的格式不支持,支持的格式: jpg png'
                    }
                }
                var obj = document.getElementById(elementId) ;
                obj.value = '';
                this.checkData[fileVal] = '';
                this.showToast(checkInfo);
                return;
            }
            if (file == null) {
                this.checkData[fileVal] = '';
            }
            if (file.size > (1 * 1024 * 1024)) { // 检查文件大小
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '图片大小不能超过 1M(你的图片:'+(file.size/1024/1024).toFixed(2)+'M)'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                this.checkData[fileVal] = '';
                this.showToast(checkInfo);
                return;
            }
            this.file = file;
            let url = '';
            var reader = new FileReader();
            reader.readAsDataURL(file);
            const that = this;
            reader.onload = function (e) {
                url = this.result.substring(this.result.indexOf(',') + 1); // 图像预显base64路径
                that.checkData[fileVal] = 'data:image/png;base64,' + url;
            };
        },
        copyFile(file, elementId){
            if (elementId=='controllerPreparePage') {
                this.controllerPreparePageFile = file;
            }
            else if (elementId=='teamMainPage') {
                this.teamMainPageFile = file;
            }
        },
        checkCheckData() {
            if (this.checkData.controllerPreparePageFile=='' || this.checkData.teamMainPageFile=='') {
                this.saveTeamCheckDataBtn = true;
            }
            else {
                this.saveTeamCheckDataBtn = false;
            }
        },
        viceCaptainManage(team) { // 队长添加副队长
            this.addViceCaptainModalInfo.id = team.id;
            this.addViceCaptainModalInfo.teamId = team.team.id;
            this.addViceCaptainModalInfo.teamName = team.team.name;
            this.getAllViceCaptain();
        },
        refreshAllViceCaptain() {
            this.modalPage.currentPage = 1;
            this.getAllViceCaptain();
        },
        getAllViceCaptain() {
            getAllViceCaptain(Object.assign(this.addViceCaptainModalInfo,this.modalPage)).then(
                response => {
                    this.viceCaptainList = response.data.data.data;
                    this.modalPage.totalPage = response.data.data.totalPage;
                }
            );
        },
        addViceCaptain() {
            addViceCaptain(this.addViceCaptainModalInfo).then(
                response => {
                    if (response.data.code==1) {
                        this.getAllViceCaptain();
                        this.addViceCaptainModalInfo.userId = '';
                    }
                    this.showToast(response);
                }
            )
        },
    },
}
</script>