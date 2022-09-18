<template>
    <div class="tab-pane fade show active" id="list-userInfo" role="tabpanel" aria-labelledby="list-userInfo-list">
        <!-- 用户个人基本信息 -->
        <div class="alert" role="alert">
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
    </div>
</template>
<script>
import { Toast } from 'bootstrap';
import { getCurrentUserInfo,updateUserInfo,saveUserPassword } from "@/api/user";
export default {
    name: "userInfo",
    data() {
        return {
            commonResponse: {
                success: true,
                msg: '',
            },
            currentUserInfo: {
                id: '',
                name: '',
                qq: '',
                note: ''
            },
            userPasswordInfo: {
                title: '',
                id: '',
                password: ''
            }
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
            saveUserPassword(this.userPasswordInfo).then(
                response => {
                    this.showToast(response);
                    document.getElementById("editCurrentUserPasswordModalCloseBtn").click();
                    this.userPasswordInfo.password = '';

                }
            )
        },
        checkUserPasswordInfo() {
            if (this.userPasswordInfo.password == '') {
                this.saveUserPasswordBtn = true;
            }
            else {
                this.saveUserPasswordBtn = false;
            }
        },
    },
}
</script>