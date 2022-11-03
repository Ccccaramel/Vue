<template>
    <div class="tab-pane fade" id="list-menuManage" role="tabpanel" aria-labelledby="list-menuManage-list">
        <!-- 菜单树 与 编辑菜单 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-4 alert alert-primary">
                <TreeMenu :list="menuTreeInfo" @menuOperation="menuOperation($event)"></TreeMenu>
            </div>
            <div class="col-8">
                <div class="mb-3 row">
                    <label class="col-2 col-form-label">节点名称</label>
                    <div class="col-6">
                        <input type="text" v-model="menuInfo.name" :readonly="menuInfo.option!='edit'" class="form-control">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-2 col-form-label">节点标识</label>
                    <div class="col-6">
                        <input type="text" v-model="menuInfo.mark" :readonly="menuInfo.option!='edit'" class="form-control">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-2 col-form-label">节点类型</label>
                    <div class="col-6">
                        <select class="form-select" :disabled="menuInfo.option!='edit'" v-model="menuInfo.type">
                            <option v-for="menuNoteType in menuNoteTypeList" :key="menuNoteType.id"
                                :value="menuNoteType.id">{{menuNoteType.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-2 col-form-label">备注</label>
                    <div class="col-6">
                        <input type="text" v-model="menuInfo.note" :readonly="menuInfo.option!='edit'" class="form-control">
                    </div>
                </div>
                <hr/>
                <div class="col-auto">
                    <button type="button" class="btn btn-primary mb-3" v-if="menuInfo.option=='edit'"  :disabled="editMenuSaveBtn" @click="saveMenu(menuInfo)">保存修改</button>
                </div>
            </div>
        </form>
         <!-- 新增 -->
         <div class="modal fade" id="addMenuModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{newMenuInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="newMenuInfo.name" required>
                                    <label>节点名称</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="newMenuInfo.mark" required>
                                    <label>节点标识</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <select class="form-select" v-model="newMenuInfo.type">
                                        <option v-for="menuNoteType in menuNoteTypeList" :key="menuNoteType.id"
                                            :value="menuNoteType.id">{{menuNoteType.name}}</option>
                                    </select>
                                    <label>节点类型</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="newMenuInfo.note">
                                    <label>备注</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeAddMenuInfoModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" :disabled="addMenuSaveBtn" @click="saveMenu(newMenuInfo)">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Modal,Toast} from 'bootstrap';
import { getMenuTree, saveMenu, deleteMenu } from "../api/menu";
import { getMenuNoteType } from "../api/dictionary";
import TreeMenu from "@/components/TreeMenu.vue";
export default {
    name: "menuManage",
    components: {
        TreeMenu,
    },
    data() {
        return {
            commonResponse: {
                success: true,
                msg: '',
            },
            editMenuSaveBtn: true,
            addMenuSaveBtn: true,
            menuTreeInfo: {},
            menuInfo: {
                add: false,
                title: '',
                name: '',
                mark: '',
                note: '',
                parentId: '',
                type: ''
            },
            newMenuInfo: {
                add: true,
                title: '',
                name: '',
                mark: '',
                note: '',
                parentId: '',
                type: ''
            },
            menuNoteTypeList:[],
        }
    },
    watch: {
        menuInfo: {
            handler() {
                this.checkMenuInfo();
            },
            deep: true,
        },
        newMenuInfo: {
            handler() {
                this.checkNewMenuInfo();
            },
            deep: true,
        },
    },
    mounted() {
        getMenuNoteType().then(
            response => {
                this.menuNoteTypeList = response.data.data;
            }
        )
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
        getMenuTree() {
            getMenuTree().then(
                response => {
                    this.menuTreeInfo = response.data.data;
                }
            )
        },
        saveMenu(menuInfo) {
            saveMenu(menuInfo).then(
                response => {
                    if(response.data.code!=0){
                        if (menuInfo.add) {
                            document.getElementById("closeAddMenuInfoModal").click();
                            this.cleanNewMenuInfo();
                        }
                        this.getMenuTree();
                    }
                    this.showToast(response);
                }
            )
        },
        cleanMenuInfo() {
            this.menuInfo.name = '';
            this.menuInfo.mark = '';
            this.menuInfo.type = '';
            this.menuInfo.note = '';
        },
        cleanNewMenuInfo() {
            this.newMenuInfo.name = '';
            this.newMenuInfo.mark = '';
            this.newMenuInfo.type = '';
            this.newMenuInfo.note = '';
        },
        menuOperation(event) {
            if(event.option == "delete"){
                deleteMenu(event).then(
                    response => {
                        
                    }
                )
            } else if(event.option == "add") {
                this.newMenuInfo.title = '新增菜单';
                this.newMenuInfo.type = this.menuNoteTypeList[0].id;
                this.newMenuInfo.add = true;
                this.newMenuInfo.parentId = event.id;
                var addMenuModal = document.getElementById('addMenuModal');
                var modal = new Modal(addMenuModal);
                modal.show();
            } else { // show or edit
                this.copyMenuInfo(event);
                this.newMenuInfo.add = false;
            }

        },
        copyMenuInfo(event) { // 点击右侧的树形菜单,将被点击的节点的信息重新拷贝一份,用于右侧信息展示和修改,以及新增
            this.menuInfo.option = event.option;

            this.menuInfo.id = event.id;
            this.menuInfo.name = event.name;
            this.menuInfo.mark = event.mark;
            this.menuInfo.type = event.type.id;
            this.menuInfo.note = event.note;
        },
        checkMenuInfo() {
            if (this.menuInfo.name == '' || this.menuInfo.mark =='') {
                this.editMenuSaveBtn = true;
            }
            else {
                this.editMenuSaveBtn = false;
            }
        },
        checkNewMenuInfo() {
            if (this.newMenuInfo.name == '' || this.newMenuInfo.mark =='') {
                this.addMenuSaveBtn = true;
            }
            else {
                this.addMenuSaveBtn = false;
            }
        },
    },
}
</script>