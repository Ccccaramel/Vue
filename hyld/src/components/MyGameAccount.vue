<template>
    <div class="tab-pane fade" id="list-myGameAccount" role="tabpanel" aria-labelledby="list-myGameAccount-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <!-- 在 form 中的 button 其 type 默认为 submit ,所以必须指定类型 button
                或使用 event.prevent 取消默认事件, vue: @click.stop="delRow()" -->
            <div class="col-auto">
                <!-- 关联新战队 -->
                <div class="container">
                    <div class="row justify-content-start">
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#playerInfoModal" @click="relationPlayerBtn()">
                            关联我的游戏账号
                        </button>
                        <div class="modal fade" id="playerInfoModal" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div class="d-flex align-items-center">
                                            <h4 class="modal-title align-items-center">{{playerInfo.title}}</h4>
                                            <!-- <div class="badge rounded-pill bg-primary" v-if="playerInfo.add" style="font-size:larger">{{playerInfo.name}}</div> -->
                                        </div>

                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form class="was-validated" novalidate>
                                            <div class="col-md mb-2" v-if="playerInfo.add">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control is-invalid"
                                                        v-model="playerInfo.scid" required>
                                                    <label>SCID</label>
                                                </div>
                                            </div>
                                            <div class="col-md mb-2 text-center" v-if="!playerInfo.add">
                                                <h4><span class="badge rounded-pill bg-primary ">SCID:{{playerInfo.scid}}</span></h4>
                                            </div>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" v-model="playerInfo.name"
                                                        required>
                                                    <label>游戏昵称</label>
                                                </div>
                                            </div>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <select class="form-select" v-model="playerInfo.type">
                                                        <option v-for="playerType in playerTypeList"
                                                            :key="playerType.id" :value="playerType.id">
                                                            {{playerType.name}}</option>
                                                    </select>
                                                    <label>账号所在区</label>
                                                </div>
                                            </div>
                                            <div class="col-md mb-2">
                                                <div class="form-floating">
                                                    <div class="alert alert-warning d-flex align-items-center"
                                                        role="alert">
                                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24"
                                                            role="img" aria-label="Warning:">
                                                            <use xlink:href="#exclamation-triangle-fill" />
                                                        </svg>
                                                        <div>
                                                            ⭐关联之后你还需要【上传验证】以证明目前你是该游戏账号的队长/拥有者<br/>
                                                            ⭐你也可以选择不上传,但之后将无法修改该游戏账号信息,仅验证审核通过后的用户可修改<br/>
                                                            ⭐此外请确保截图清晰完整无遮挡,scid正确(不用加#号)<br/>
                                                            ⭐由于此平台只有本人一个人在开发+维护+管理,精力有限,无法时刻关注审核请求,若需要快点验证通过请进QQ群(475765701)@群主,我会及时处理
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-warning" @click="cleanPlayerInfo()" v-if="playerInfo.add">清空</button>
                                        <button type="button" class="btn btn-secondary" id="closeRelationPlayerModal" data-bs-dismiss="modal">取消</button>
                                        <button type="button" class="btn btn-primary" @click="savePlayer()" :disabled="playerInfoBtn">保存</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert">
                <h4><span class="badge rounded-pill bg-primary ">我的游戏账号</span></h4>
            </caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">SCID</th>
                    <th scope="col">游戏昵称</th>
                    <th scope="col">所在区</th>
                    <th scope="col">验证状态</th>
                    <th scope="col">验证结果备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="myGameAccountList.length==0">
                    <td colspan="14">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div>
                                    <div class="alert alert-light" role="alert">
                                        没有绑定任何游戏账号!暂无信息!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr v-for="(myGameAccount, index) in myGameAccountList" :key="myGameAccount.id" :class="myGameAccount.checkStatus.id==1402?'table-success':(myGameAccount.checkStatus.id==1403?'table-danger':'')">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ myGameAccount.player.scid }}</td>
                    <td>{{ myGameAccount.player.name }}</td>
                    <td>{{ myGameAccount.player.playerType.name }}</td>
                    <td>{{ myGameAccount.checkStatus.name }}</td>
                    <td>{{ myGameAccount.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-success" data-bs-toggle="modal" v-if="myGameAccount.checkStatus.id!=1402" data-bs-target="#upPlayerVerificationInformationModal"
                            @click="upVerificationInformation(myGameAccount.id)">上传验证</span>
                        <span class="btn badge rounded-pill bg-primary ms-2" data-bs-toggle="modal" v-if="myGameAccount.checkStatus.id==1402"
                            data-bs-target="#playerInfoModal" @click="editPalyer(myGameAccount)">编辑</span>
                        <span class="btn badge rounded-pill bg-danger ms-2" v-if="myGameAccount.checkStatus.id==1402" @click="relievePlayer(myGameAccount.player.id)">解除关联</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 样例 -->
        <div class="modal fade" id="upPlayerVerificationInformationModalExampleModal" aria-hidden="true" tabindex="-1">
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
                            个人界面👇
                        </div>
                        <div class="col-md mb-2">
                            <div class="form-floating text-center" style="height: 640px;">
                                <img src="../assets/eg2.jpg" class="rounded" style="height: 640px;" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" data-bs-target="#upPlayerVerificationInformationModal" data-bs-toggle="modal">返回</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 上传 -->
        <div class="modal fade" id="upPlayerVerificationInformationModal" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">上传验证信息</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <!-- 个人界面 -->
                            <div class="mb-3">
                                <div class="input-group mb-3">

                                    <label class="input-group-text">选择个人界面</label>
                                    <input type="file" id="playerMainPage" class="form-control" @change="tirggerFile($event,'playerMainPage','playerMainPageFile')" required>
                                </div>
                            </div>
                            <!-- 回显 -->
                            <div class="input-group mb-3">
                                <div class="form-floating text-center" :style="checkData.playerMainPageFile==''?'height: 0px;':'height: 480px;'">
                                    <img v-if="checkData.playerMainPageFile!=''" :src="checkData.playerMainPageFile" class="rounded" :style="checkData.playerMainPageFile==''?'height: 0px;':'height: 480px;'"/>
                                </div>
                            </div>
                            <!-- 准备界面 -->
                            <div class="mb-3">
                                <div class="input-group mb-3">
                                    <label class="input-group-text">选择准备界面</label>
                                    <input type="file" id="playerPreparePage" class="form-control" @change="tirggerFile($event,'playerPreparePage','playerPreparePageFile')" required>
                                </div>
                            </div>
                            <!-- 回显 -->
                            <div class="input-group mb-3">
                                <div class="form-floating text-center" :style="checkData.playerPreparePageFile==''?'height: 0px;':'height: 480px;'">
                                    <img v-if="checkData.playerPreparePageFile!=''" :src="checkData.playerPreparePageFile" class="rounded" :style="checkData.playerPreparePageFile==''?'height: 0px;':'height: 480px;'"/>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <div class="alert alert-warning d-flex align-items-center" role="alert">
                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img"
                                            aria-label="Warning:">
                                            <use xlink:href="#exclamation-triangle-fill" />
                                        </svg>
                                        <div>
                                            ⭐一张个人界面,一张准备界面,完整清晰无遮挡且无PS痕迹,每张图片大小不可大于1M<br />
                                            ⭐验证规则:<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;1.个人界面和准备界面的总杯数,头像,昵称是否一致<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;2.个人界面scid和昵称是否与填写的信息一致<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;3.准备界面的背景图是否为最新赛季背景<br />
                                            ⭐图片如果太大,可以通过QQ进行压缩:比如把图片发送给自己,不勾选原图/选择标清,发送的图片即为压缩后的图片,再保存下来上传<br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" data-bs-target="#upPlayerVerificationInformationModalExampleModal" data-bs-toggle="modal">查看上传样例</button>
                        <button type="button" class="btn btn-secondary" id="closePlayerModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="savePlayerCheckData()" :disabled="saveCheckDataBtn">提交验证信息</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal, Toast } from 'bootstrap';
import { getPlayerType } from "../api/dictionary";
import { savePlayer } from "../api/player";
import { searchMyGameAccount,relievePlayer,savePlayerCheckData } from "../api/userWithPlayer";
export default {
    name: "myGameAccount",
    data() {
        return {
            commonResponse: {
                success: true,
                msg: ''
            },
            playerTypeList: [],
            playerInfo: {
                add: true,
                title: '',
                id: '',
                scid: '',
                name: '',
                type: '',
            },
            playerInfoBtn: true,
            saveCheckDataBtn: true,
            playerList: [],
            myGameAccountList: [],
            checkData: {
                playerMainPageFile: '',
                playerPreparePageFile: '',
            },
            playerMainPageFile: {},
            playerPreparePageFile: {},
            relationId: '',
        }
    },
    mounted() {
        getPlayerType().then(
            response => {
                this.playerTypeList = response.data.data;
                this.playerInfo.type = this.playerTypeList[0].id;
            },
        );
    },
    watch: {
        // 监听对象,注意设置 deep:true
        playerInfo: {
            handler() {
                this.checkPlayerInfo();
            },
            deep: true
        },
        checkData: {
            handler() {
                this.checkCheckData();
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
        searchMyGameAccount() {
            searchMyGameAccount(this.playerInfo).then(
                response => {
                    this.myGameAccountList = response.data.data;
                }
            );
        },
        relationPlayerBtn() {
            this.playerInfo.add = true;
            this.playerInfo.title = "关联新账号";
            this.cleanPlayerInfo();
        },
        savePlayer() { // 关联游戏账号
            savePlayer(this.playerInfo).then(
                response => {
                    if (response.data.code == 1) {
                        this.cleanPlayerInfo();
                        document.getElementById("closeRelationPlayerModal").click();
                        this.searchMyGameAccount();
                    }
                    this.showToast(response);
                }
            )
        },
        savePlayerCheckData() { // 提交验证
            var forms = new FormData();
            forms.append('playerMainPageFile', this.playerMainPageFile);
            forms.append('playerPreparePageFile', this.playerPreparePageFile);
            forms.append('relationId', this.relationId);
            savePlayerCheckData(forms).then(
                response => {
                    if (response.data.code == 1) {
                        this.cleanCheckFile('playerMainPage');
                        this.cleanCheckFile('playerPreparePage');
                        document.getElementById('closePlayerModal').click();
                        this.searchMyGameAccount();
                    }
                    this.showToast(response);
                }
            )
        },
        checkPlayerInfo() {
            if (this.playerInfo.scid == '' || this.playerInfo.name == '') {
                this.playerInfoBtn = true;
            }
            else {
                this.playerInfoBtn = false;
            }
        },
        cleanPlayerInfo() {
            this.playerInfo.id = '';
            this.playerInfo.scid = '';
            this.playerInfo.name = '';
            this.playerInfo.type = this.playerTypeList[0].id;
        },
        cleanCheckFile(fileId) {
            var obj = document.getElementById(fileId) ;
            obj.value = '';
            this.checkData[fileId+'File'] = '';
        },
        upVerificationInformation(relationId) {
            this.relationId = relationId;
        },
        editPalyer(myGameAccount) {
            this.playerInfo.add = false;
            this.playerInfo.title = "编辑游戏账号信息";
            this.playerInfo.id = myGameAccount.player.id;
            this.playerInfo.scid = myGameAccount.player.scid;
            this.playerInfo.name = myGameAccount.player.name;
            this.playerInfo.type = myGameAccount.player.type;
        },
        checkCheckData() {
            if (this.checkData.playerMainPageFile=='' || this.checkData.playerPreparePageFile=='') {
                this.saveCheckDataBtn = true;
            }
            else {
                this.saveCheckDataBtn = false;
            }
        },
        relievePlayer(playerId) {
            relievePlayer(Object.assign({
                playerId: playerId
            })).then(
                response => {
                    this.searchMyGameAccount();
                    this.showToast(response);
                }
            )
        },
        // 预览上传头像图片
        tirggerFile(event, elementId, fileVal) {
            var filetypes =[".jpg",".png"];
            var file = event.target.files[0];
            if (event.target.files.length==0) {
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '未选择图片'
                    }
                }
                var obj = document.getElementById(elementId);
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
                var obj = document.getElementById(elementId);
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
            this.file = file
            let url = ''
            var reader = new FileReader()
            reader.readAsDataURL(file)
            const that = this
            reader.onload = function (e) {
                url = this.result.substring(this.result.indexOf(',') + 1) // 图像预显base64路径
                that.checkData[fileVal] = 'data:image/png;base64,' + url
            }
        },
        copyFile(file, elementId){
            if (elementId=='playerMainPage') {
                this.playerMainPageFile = file;
            }
            else if (elementId=='playerPreparePage') {
                this.playerPreparePageFile = file;
            }
        },
    },
}
</script>