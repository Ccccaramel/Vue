<template>
    <div class="tab-pane fade" id="list-player" role="tabpanel" aria-labelledby="list-player-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-2">
                <input type="text" class="form-control" placeholder="游戏昵称" v-model="searchPlayerInfo.name">
            </div>
            <div class="col-2">
                <select class="form-select" v-model="searchPlayerInfo.type">
                    <option
                        v-for="playerType in playerTypeList"
                        v-bind:key="playerType.id"
                        :value="playerType.id">
                        {{ playerType.name }}</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="cleanSearchPlayerBtn()">清空</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchPlayerBtn()">搜索</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">

            <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary"></span></h4></caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">SCID</th>
                    <th scope="col">游戏昵称</th>
                    <th scope="col">账号类型</th>
                    <th scope="col">创建时间</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(playerInfo, index) in playerInfoList" :key="playerInfo.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ playerInfo.scid }}</td>
                    <td>{{ playerInfo.name }}</td>
                    <td>{{ playerInfo.playerType.name }}</td>
                    <td>{{ playerInfo.createTime }}</td>
                    <td>{{ playerInfo.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#playerInfoManageModal" @click="editPlayer(playerInfo)">编辑</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 编辑 -->
        <div class="modal fade" id="playerInfoManageModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{playerInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="playerInfo.scid">
                                    <label>SCID</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="playerInfo.name" required>
                                    <label>游戏昵称</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <select class="form-select"  v-model="playerInfo.type">
                                        <option v-for="playerType in playerTypeList" :key="playerType.id" :value="playerType.id">{{playerType.name}}</option>
                                    </select>
                                    <label>所在区</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="playerInfo.note">
                                    <label>个性签名</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="editPlayerInfoModalCloseBtn" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updatePlayer()" :disabled="updatePlayerBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :commonPage="page"  @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import {Toast} from 'bootstrap';
import { searchPlayerInfo,updatePlayer } from "../api/player";
import { getPlayerType,getPlayerStatus } from "../api/dictionary";
export default {
    name: "player",
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
            updatePlayerBtn: true,
            playerInfoList: [],
            playerInfo: {
                title: '',
                id: '',
                name: '',
                qq: '',
                type: '',
                status: '',
                note: '',
            },
            playerTypeList: [],
            playerStatusList: [],
            searchPlayerInfo: {
                name: '',
                type: '',
                status: '',
            },
            playerPasswordInfo: {
                title: '',
                id: '',
                password: ''
            }
        }
    },
    watch: {
        playerInfo: {
            handler() {
                this.checkPlayerInfo();
            },
            deep: true,
        },
        playerPasswordInfo: {
            handler() {
                this.checkPlayerPasswordInfo();
            },
            deep: true,
        }
    },
    mounted() {
    },
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchPlayer();
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
        init() {
            getPlayerType().then(
                response => {
                    this.playerTypeList = response.data.data;
                    this.playerTypeList.unshift({
                                id: '',
                                name:'无限制'
                    });
                    this.searchPlayerInfo.type = this.playerTypeList[0].id;
                    this.searchPlayerBtn();
                }
            );
        },
        editPlayer(player) {
            this.playerInfo.add = false;
            this.playerInfo.title = '编辑游戏账号信息';
            this.playerInfo.id = player.id;
            this.playerInfo.scid = player.scid;
            this.playerInfo.name = player.name;
            this.playerInfo.type = player.type;
            this.playerInfo.note = player.note;
        },
        searchPlayerBtn() {
            this.page.currentPage = 1;
            this.searchPlayer();
        },
        searchPlayer(){
            searchPlayerInfo(Object.assign(this.page,this.searchPlayerInfo)).then(
                response => {
                    this.playerInfoList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanSearchPlayerBtn() {
            this.searchPlayerInfo.name = '';
            this.searchPlayerInfo.type = this.playerTypeList[0].id;
            this.searchPlayerInfo.status = this.playerStatusList[0].id;
        },
        updatePlayer() {
            updatePlayer(this.playerInfo).then( // 不与【个人信息】的修改共用接口且可修改的属性更多,本接口预计为未来可以修改其他用户密码,为管理员所用
                response => {
                    this.searchPlayerBtn();
                    document.getElementById('editPlayerInfoModalCloseBtn').click();
                    this.showToast(response);
                }
            )
        },
        editPlayerPassword(player) {
            this.playerPasswordInfo.title = '修改用户密码';
            this.playerPasswordInfo.id = player.id;
        },
        checkPlayerInfo() {
            if (this.playerInfo.name == '') {
                this.updatePlayerBtn = true;
            }
            else {
                this.updatePlayerBtn = false;
            }
        },
    },
}
</script>