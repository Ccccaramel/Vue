<template>
    <div class="tab-pane fade" id="list-role" role="tabpanel" aria-labelledby="list-role-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#roleInfoModal" @click="addRoleBtn()">添加</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary"></span></h4></caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">名称</th>
                    <th scope="col">创建时间</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(roleInfo, index) in roleInfoList" :key="roleInfo.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ roleInfo.id }}</td>
                    <td>{{ roleInfo.name }}</td>
                    <td>{{ roleInfo.createTimeStr }}</td>
                    <td>{{ roleInfo.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#roleInfoModal" @click="editRole(roleInfo)">信息编辑</span>
                        <span class="btn badge rounded-pill bg-primary ms-2" data-bs-toggle="modal" data-bs-target="#rolePowerModal" @click="editRolePower(roleInfo)">权限编辑</span>
                        <span class="btn badge rounded-pill bg-danger ms-2" @click="deleteRolePower(roleInfo)">删除角色</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 编辑角色信息 -->
        <div class="modal fade" id="roleInfoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{roleInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="roleInfo.name" required>
                                    <label>名称</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="roleInfo.note">
                                    <label>备注</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="cleanRoleInfo()" v-if="roleInfo.add">清空</button>
                        <button type="button" class="btn btn-secondary" id="closeRoleInfoModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveRole()" :disabled="saveRoleBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 编辑角色权限 -->
        <div class="modal fade" id="rolePowerModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <div class="badge rounded-pill bg-primary" style="font-size:larger">{{roleName}}</div>
                            <h5 class="modal-title">编辑角色权限</h5>
                        </div>
                        <button type="button" id="editRolePowerModalCloseBtn" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated">
                            <div class="col-auto alert alert-primary">
                                <TreeMenuCheckbox :list="menuTreeInfo"></TreeMenuCheckbox>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="saveRolePower()">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :commonPage="page"  @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import {Modal,Toast} from 'bootstrap';
import { getAllRole, saveRole,saveRolePower,deleteRolePower } from "../api/role";
import TreeMenuCheckbox from "@/components/TreeMenuCheckbox.vue";
import { getRoleMenuTree } from "../api/role";
export default {
    name: "role",
    components: {
        TreeMenuCheckbox,
    },
    data() {
        return {
            commonResponse: {
                success: true,
                msg: '',
            },
            saveRoleBtn: true,
            roleInfoList: [],
            roleInfo: {
                add: true,
                title: '',
                name: '',
                note: '',
            },
            roleName: '',
            roleId: '',
            menuTreeInfo: {},
            checkedRolePowerList: [],
            rolePowerIdList: [],
        }
    },
    watch: {
        roleInfo: {
            handler() {
                this.checkRoleInfo();
            },
            deep: true,
        },
    },
    mounted() {
    },
    methods: {
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
        addRoleBtn() {
            this.cleanRoleInfo();
            this.roleInfo.add = true;
            this.roleInfo.title = '新增角色';
        },
        editRole(role) {
            this.roleInfo.add = false;
            this.roleInfo.title = '编辑角色';
            this.roleInfo.id = role.id;
            this.roleInfo.name = role.name;
            this.roleInfo.note = role.note;
        },
        editRolePower(role) {
            this.roleName = role.name;
            this.roleId = role.id;
            getRoleMenuTree(Object.assign({
                roleId : role.id,
            })).then(
                response => {
                    this.menuTreeInfo = response.data.data;
            })
        },
        getAllRole() {
            getAllRole().then(
                response => {
                    this.roleInfoList = response.data.data;
                }
            )
        },
        cleanRoleInfo() {
            this.roleInfo.id = '';
            this.roleInfo.name = '';
            this.roleInfo.note = '';
        },
        saveRole() {
            saveRole(this.roleInfo).then(
                response => {
                    if(response.data.code!=0){
                        document.getElementById("closeRoleInfoModal").click();
                        this.cleanRoleInfo();
                        this.getAllRole();
                    }
                    this.showToast(response);
                }
            )
        },
        checkRoleInfo() {
            if (this.roleInfo.name == '') {
                this.saveRoleBtn = true;
            }
            else {
                this.saveRoleBtn = false;
            }
        },
        saveRolePower() {
            this.rolePowerIdList = [];
            this.roleTreeToList(this.menuTreeInfo[0]);
            saveRolePower(Object.assign({
                id: this.roleId,
                power: this.rolePowerIdList.join()
            })).then(
                response => {
                    document.getElementById("editRolePowerModalCloseBtn").click();
                    this.showToast(response);
                }
            );
        },
        roleTreeToList(obj) {
            if (obj.have) {
                this.rolePowerIdList.push(obj.id);
            }
            if (obj.children != null && obj.children.length > 0) {
                obj.children.forEach(element => {
                    this.roleTreeToList(element);
                });
            }
        },
        deleteRolePower(role){
            deleteRolePower(Object.assign({
                id: role.id
            })).then(
                response=>{
                    this.showToast(response);
                    this.getAllRole();
                }
            )
        }
    },
}
</script>