<template>
    <div class="tab-pane fade" id="list-user" role="tabpanel" aria-labelledby="list-user-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-2">
                <input type="text" class="form-control" placeholder="昵称" v-model="searchUserInfo.name">
            </div>
            <div class="col-2">
                <select class="form-select" v-model="searchUserInfo.role">
                    <option
                        v-for="userRole in userRoleListOfSearch"
                        v-bind:key="userRole.id"
                        :value="userRole.id">
                        {{ userRole.name }}</option>
                </select>
            </div>
            <div class="col-2">
                <select class="form-select" v-model="searchUserInfo.status">
                    <option
                        v-for="userStatus in userStatusListOfSearch"
                        v-bind:key="userStatus.id"
                        :value="userStatus.id">
                        {{ userStatus.name }}</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="cleanSearchUserBtn()">清空</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchUserBtn()">搜索</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">

            <!-- <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary"></span></h4></caption> -->
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">昵称</th>
                    <th scope="col">QQ</th>
                    <th scope="col">账号类型</th>
                    <th scope="col">账号状态</th>
                    <th scope="col">注册时间</th>
                    <th scope="col">个性签名</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
             <tbody class="table-group-divider">
                <tr v-for="(userInfo, index) in userInfoList" :key="userInfo.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ userInfo.id }}</td>
                    <td>{{ userInfo.name }}</td>
                    <td>{{ userInfo.qq }}</td>
                    <td>{{ userInfo.role.name }}</td>
                    <td>{{ userInfo.status.name }}</td>
                    <td>{{ userInfo.createTimeStr }}</td>
                    <td>{{ userInfo.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#userInfoModal" @click="editUser(userInfo)">编辑</span>
                        <span class="btn badge rounded-pill bg-primary ms-1" data-bs-toggle="modal" data-bs-target="#editUserPasswordModal" @click="editUserPassword(userInfo)">修改密码</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 编辑 -->
        <div class="modal fade" id="userInfoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{userInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="userInfo.name" required>
                                    <label>昵称</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="userInfo.qq">
                                    <label>QQ</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <select class="form-select"  v-model="userInfo.role">
                                        <option v-for="userRole in userRoleList" :key="userRole.id" :value="userRole.id">{{userRole.name}}</option>
                                    </select>
                                    <label>账号类型</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <select class="form-select"  v-model="userInfo.status">
                                        <option v-for="userStatus in userStatusList" :key="userStatus.id" :value="userStatus.id">{{userStatus.name}}</option>
                                    </select>
                                    <label>账号状态</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="userInfo.note">
                                    <label>备注</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="editUserInfoModalCloseBtn" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveUser()" :disabled="saveUserBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
         <!-- 修改密码 -->
         <div class="modal fade" id="editUserPasswordModal" tabindex="-1" aria-hidden="true">
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
                        <button type="button" class="btn btn-secondary" id="editUserPasswordModalCloseBtn" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveUserPassword()" :disabled="saveUserPasswordBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :commonPage="page"  @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import {Modal,Toast} from 'bootstrap';
import { searchUser,saveUser,saveUserPassword } from "../api/user";
import {  getUserStatus } from "../api/dictionary";
import { getAllRole } from "../api/role";
import { getPublicKey, encrypt } from "@/api/common"
export default {
    name: "user",
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
            saveUserBtn: true,
            saveUserPasswordBtn: true,
            userInfoList: [],
            userInfo: {
                title: '',
                id: '',
                name: '',
                qq: '',
                role: '',
                status: '',
                note: '',
            },
            userRoleList: [],
            userStatusList: [],
            userRoleListOfSearch: [],
            userStatusListOfSearch: [],
            searchUserInfo: {
                name: '',
                role: '',
                status: '',
            },
            userPasswordInfo: {
                title: '',
                id: '',
                password: ''
            }
        }
    },
    watch: {
        userInfo: {
            handler() {
                this.checkUserInfo();
            },
            deep: true,
        },
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
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchUserBtn();
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
            getAllRole().then(
                response => {
                    this.userRoleListOfSearch = response.data.data;
                    this.userRoleList = JSON.parse(JSON.stringify(response.data.data));
                    this.userRoleListOfSearch.unshift({
                                id: '',
                                name:'无限制'
                    });
                    
                    this.searchUserInfo.role = this.userRoleListOfSearch[0].id;
                }
            ).then(
                getUserStatus().then(
                    response => {
                        this.userStatusListOfSearch = response.data.data;
                        this.userStatusList = JSON.parse(JSON.stringify(response.data.data));
                        this.userStatusListOfSearch.unshift({
                                    id: '',
                                    name:'无限制'
                        });
                        this.searchUserInfo.status = this.userStatusListOfSearch[0].id;
                        this.searchUserBtn();
                    }
                ),
            );
        },
        editUser(user) {
            this.userInfo.title = '编辑用户';
            this.userInfo.id = user.id;
            this.userInfo.qq = user.qq;
            this.userInfo.role = user.role.id;
            this.userInfo.status = user.status.id;
            this.userInfo.name = user.name;
            this.userInfo.note = user.note;
        },
        searchUserBtn() {
            searchUser(Object.assign(this.page,this.searchUserInfo)).then(
                response => {
                    this.userInfoList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanSearchUserBtn() {
            this.searchUserInfo.name = '';
            this.searchUserInfo.role = this.userRoleList[0].id;
            this.searchUserInfo.status = this.userStatusList[0].id;
        },
        saveUser() {
            saveUser(this.userInfo).then( // 不与【个人信息】的修改共用接口且修改的属性更多,本接口预计为未来可以修改其他用户密码,为管理员所用
                response => {
                    this.searchUserBtn();
                    document.getElementById('editUserInfoModalCloseBtn').click();
                    this.showToast(response);
                }
            )
        },
        saveUserPassword() {
            getPublicKey().then( // 获取加密密钥
                response => {
                    this.publicKey = response.data.data.publicKey;
                    this.userPasswordInfo.password = encrypt(this.userPasswordInfo.password, this.publicKey);

                    saveUserPassword(this.userPasswordInfo).then(
                        response => {
                            document.getElementById('editUserPasswordModalCloseBtn').click();
                            this.showToast(response);
                            this.userPasswordInfo.password = '';
                        }
                    )
                }
            );
        },
        editUserPassword(user) {
            this.userPasswordInfo.title = '修改用户密码';
            this.userPasswordInfo.id = user.id;
        },
        checkUserInfo() {
            if (this.userInfo.name == '') {
                this.saveUserBtn = true;
            }
            else {
                this.saveUserBtn = false;
            }
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