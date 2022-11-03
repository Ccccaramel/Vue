<template>
    <div class="tab-pane fade show active" id="list-userInfo" role="tabpanel" aria-labelledby="list-userInfo-list">
        <!-- 用户个人基本信息 -->
        <div class="alert" role="alert">
            <div class="mb-3 row">
                <img class="col-auto rounded-circle" :src="currentUserInfo.headPortraitUrl"
                 data-bs-toggle="modal" data-bs-target="#changeHeadPortraitModal" @click="changeHeadPortrait()"
                 style="weight:164px;height:164px">
            </div>
            <div class="mb-3 row">
                <label class="col-1 col-form-label">ID</label>
                <label class="col-6 col-form-label">{{currentUserInfo.id}}</label>
            </div>
            <div class="mb-3 row">
                <label class="col-1 col-form-label">昵称</label>
                <label class="col-6 col-form-label">{{currentUserInfo.name}}</label>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-1 col-form-label">QQ</label>
                <div class="col-6">
                    <input type="text" v-model="currentUserInfo.qq" class="form-control">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-1 col-form-label">个性签名</label>
                <div class="col-6">
                    <input type="text" v-model="currentUserInfo.note" class="form-control">
                </div>
            </div>
            <hr/>
            <div class="col-auto">
                <button type="button" class="btn btn-primary mb-3" @click="updateUserInfo()">保存修改</button>
                <button type="button" class="btn btn-primary ms-3 mb-3" data-bs-toggle="modal" data-bs-target="#editCurrentUserPasswordModal" @click="updateUserPassword()">修改密码</button>
            </div>
        </div>
        <!-- 修改密码 -->
        <div class="modal fade" id="editCurrentUserPasswordModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{userPasswordInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="userPasswordInfo.password" required>
                                    <label>新密码</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="editCurrentUserPasswordModalCloseBtn" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveUserPassword()" :disabled="saveUserPasswordBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改头像 -->
        <div class="modal fade" id="changeHeadPortraitModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{userHeadPortraitInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" id="changeHeadPortraitModalCloseBtn" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container text-center">
                            <div class="row row-cols-12">
                                <div class="col col-lg-1" v-for="headPortraitInfo in allHeadPortraitList" :key="headPortraitInfo.id">
                                    <div class="vstack">
                                        <img class="rounded-circle" :src="headPortraitInfo.imageUrl" @dblclick="saveHeadPortrait(headPortraitInfo.id)">
                                        <p>{{headPortraitInfo.name}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 分页 -->
                        <Page :commonPage="modalPage" @commonPageChange="commonModalPageChange($event)"></Page>
                        <div class="alert alert-warning d-flex align-items-center justify-content-center" role="alert">
                            <!-- 显隐+缩放 交替 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" beat-fade /> -->
                            <!-- 向上跳动 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" bounce /> -->
                            <!-- 显隐交替 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" fade /> -->
                            <!-- y轴旋转 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" flip /> -->
                            <!-- 原点左右摆动 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" shake /> -->
                            <!-- 原点顺时针旋转 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" spin /> -->
                            <!-- 原点逆时针旋转 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" spin spin-reverse /> -->
                            <!-- 原点顺时针每帧60°旋转 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" spin-pulse /> -->
                            <!-- 缩放交替 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" beat/> -->
                            <font-awesome-icon icon="fa-solid fa-circle-question" size="1x" bounce/>
                            <div>
                                ⭐双击即可修改哦!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import { Toast } from 'bootstrap';
import { getCurrentUserInfo,updateUserInfo,saveUserPassword,saveHeadPortrait } from "@/api/user";
import { searchHeadPortrait } from '@/api/headPortrait';
import {getPublicKey,encrypt} from "@/api/common"
export default {
    name: "userInfo",
    components: {
        Page,
    },
    data() {
        return {
            modalPage: {
                size: 48,
                currentPage:1, // 偏移量,数据库从0开始
                totalPage: 0,
                asc: true,
                currentPageSize:0, // 本页搜索结果数
            },
            commonResponse: {
                success: true,
                msg: '',
            },
            currentUserInfo: {
                id: '',
                name: '',
                qq: '',
                note: '',
                headPortraitUrl:''

            },
            userPasswordInfo: {
                title: '',
                id: '',
                password: ''
            },
            saveUserPasswordBtn: true,
            userHeadPortraitInfo: {
                title: '',
                newHeadPortraitId:'',
            },
            allHeadPortraitList: [],
            publicKey: '',
        }
    },
    watch: {
        userPasswordInfo: {
            handler() {
                this.checkUserPasswordInfo();
            },
            deep: true,
        }
    },
    mounted() {
    },
    methods: {
        commonModalPageChange(event) { // 修改头像 modal 的分页
            this.modalPage = event;
            this.searchHeadPortrait();
        },
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
        getCurrentUserInfo() {
            getCurrentUserInfo().then(
                response => {
                    if (response.data.code == 0) { // 进入 个人中心 需要检查 token 有效性
                        this.commonResponse.success = false;
                        this.commonResponse.msg = response.data.msg;
                        this.$emit('commonResponse', this.commonResponse);
                        var toastLiveExample = document.getElementById('commonToast');
                        var toast = new Toast(toastLiveExample);
                        toast.show();
                        localStorage.clear();
                        setTimeout(() => {
                            this.$router.push("/")
                        }, 2000);
                    }
                    this.currentUserInfo.id = response.data.data.id;
                    this.currentUserInfo.name = response.data.data.name;
                    this.currentUserInfo.qq = response.data.data.qq;
                    this.currentUserInfo.note = response.data.data.note;
                    this.currentUserInfo.headPortraitUrl = response.data.data.headPortrait.imageUrl;
                }
            );
        },
        updateUserInfo() {
            updateUserInfo(this.currentUserInfo).then(
                response => {
                    if(response.data.code==1){
                        this.getCurrentUserInfo();
                    }
                    this.showToast(response);
                }
            )
        },
        updateUserPassword() {
            this.userPasswordInfo.id = this.currentUserInfo.id;
            this.userPasswordInfo.title = '修改密码';
        },
        saveUserPassword() {
            getPublicKey().then( // 获取加密密钥
                response => {
                    this.publicKey = response.data.data.publicKey;
                    this.userPasswordInfo.password = encrypt(this.userPasswordInfo.password, this.publicKey); // 加密
                    saveUserPassword(this.userPasswordInfo).then(
                        response => {
                            this.showToast(response);
                            document.getElementById("editCurrentUserPasswordModalCloseBtn").click();
                            this.userPasswordInfo.password = '';
                        }
                    );
                }
            );
        },
        checkUserPasswordInfo() {
            if (this.userPasswordInfo.password == '') {
                this.saveUserPasswordBtn = true;
            }
            else {
                this.saveUserPasswordBtn = false;
            }
        },
        changeHeadPortrait() {
            this.userHeadPortraitInfo.title = "修改头像";
            this.searchHeadPortrait();
        },
        searchHeadPortrait() {
            searchHeadPortrait(this.modalPage).then(
                response => {
                    this.allHeadPortraitList = response.data.data.data;
                    this.modalPage.totalPage = response.data.data.totalPage;
                }
            )
        },
        saveHeadPortrait(headPortraitId) {
            saveHeadPortrait(Object.assign({
                headPortraitId:headPortraitId
            })).then(
                response => {
                    document.getElementById("changeHeadPortraitModalCloseBtn").click();
                    this.showToast(response);
                    this.getCurrentUserInfo();
                }
            )
        },
    },
}
</script>