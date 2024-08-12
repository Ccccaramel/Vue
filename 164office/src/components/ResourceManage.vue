<template>
    <div class="tab-pane fade" id="list-resourceManage" role="tabpanel" aria-labelledby="list-resourceManage-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="头像名称" v-model="searchResourceInfo.alias">
            </div>
            <div class="col-auto">
                <select class="form-select" v-model="searchResourceInfo.type">
                    <option
                        v-for="resourceType in resourceTypeList"
                        v-bind:key="resourceType.id"
                        :value="resourceType.id">
                        {{ resourceType.name }}</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchResourceBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#resourceModal" @click="addResourceBtn()">添加</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary"></span></h4></caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">名称</th>
                    <th scope="col">文件</th>
                    <th scope="col">类型</th>
                    <th scope="col">创建时间</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
             <tbody class="table-group-divider">
                <tr v-for="(resourceInfo, index) in resourceInfoList" :key="resourceInfo.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ resourceInfo.id }}</td>
                    <td>{{ resourceInfo.alias }}</td>
                    <td>
                        <img class="col-auto rounded-circle" :src="resourceInfo.fileNameUrl" style="weight:64px;height:64px">
                    </td>
                    <td>{{ resourceInfo.type.name }}</td>
                    <td>{{ resourceInfo.createTimeStr }}</td>
                    <td>{{ resourceInfo.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#resourceModal" @click="editResource(resourceInfo)">编辑</span>
                        <span class="btn badge rounded-pill bg-danger ms-2" @click="deleteResource(resourceInfo)">删除</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 编辑头像 -->
        <div class="modal fade" id="resourceModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{resource.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="resource.alias" required>
                                    <label>名称</label>
                                </div>
                            </div>
                            <!-- 头像 -->
                            <div class="mb-3">
                                <div class="input-group mb-3">
                                    <label class="input-group-text">选择头像</label>
                                    <input type="file" id="resource" class="form-control" @change="tirggerFile($event,'resource','fileNameUrl')" required>
                                </div>
                            </div>
                            <!-- 回显 -->
                            <div class="input-group mb-3">
                                <div class="form-floating text-center" :style="resource.fileNameUrl==''?'height: 0px;':'height: 120px;'">
                                    <img v-if="resource.fileNameUrl!=''" :src="resource.fileNameUrl" class="rounded" :style="resource.fileNameUrl==''?'height: 0px;':'height: 120px;'"/>
                                </div>
                            </div>
                            <div class="col-md mb-2 form-floating mb-3">
                                <select class="form-select" v-model="resource.type">
                                    <option v-for="resourceType in resourceTypeList" :key="resourceType.id"
                                        :value="resourceType.id">{{resourceType.name}}</option>
                                </select>
                                <label>资源类型</label>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="resource.note">
                                    <label>备注</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeResourceModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveResource()" :disabled="saveResourceBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :commonPage="page"  @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import { Toast } from 'bootstrap';
import { getResourceType } from "../api/dictionary";
import { searchResource, saveResource, deleteResource } from "../api/resource";
export default {
    name: "resourceManage",
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
            saveResourceBtn: true,
            resourceInfoList: [],
            resource: {
                add: true,
                title: '',
                alias: '',
                note: '',
                fileNameUrl: '',
                
            },
            resourceFile: {},
            searchResourceInfo: {},
            resourceTypeList:[],
        }
    },
    watch: {
        resource: {
            handler() {
                this.checkResource();
            },
            deep: true,
        },
    },
    mounted() {
    },
    methods: {
        init() {
            getResourceType().then(
                response => {
                    this.resourceTypeList = response.data.data;
                    this.searchResourceInfo.type = this.resourceTypeList[0].id;
                    this.searchResourceBtn();
                }
            );
        },
        commonPageChange(event) {
            this.page = event;
            this.searchResource();
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
        addResourceBtn() {
            this.resource.add = true;
            this.resource.title = '新增头像';
            this.cleanResource();
        },
        editResource(resource) {
            this.resource.add = false;
            this.resource.title = '编辑头像';
            this.resource.id = resource.id;
            this.resource.alias = resource.alias;
            this.resource.fileName = resource.fileName;
            this.resource.fileNameUrl = resource.fileNameUrl;
            this.resource.note = resource.note;
            this.resource.type = resource.type.id;
            this.resourceFile = {};
        },
        searchResourceBtn() {
            this.page.currentPage = 1;
            this.searchResource();
        },
        searchResource() {
            searchResource(Object.assign(this.page,this.searchResourceInfo)).then(
                response => {
                    this.resourceInfoList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        saveResource() {
            var forms = new FormData();
            forms.append('resourceFile', this.resourceFile);
            forms.append('id', this.resource.id);
            forms.append('add', this.resource.add);
            forms.append('fileName', this.resource.fileName);
            forms.append('alias', this.resource.alias);
            forms.append('note', this.resource.note);
            forms.append('type', this.resource.type);
            console.log(">>>"+forms);
            saveResource(forms).then(
                response => {
                    if (response.data.code != 0) {
                        this.cleanCheckFile('resource');
                        this.cleanResource();
                        document.getElementById("closeResourceModal").click();
                        this.searchResource();
                    }
                    this.showToast(response);
                }
            )
        },
        deleteResource(resourceInfo) {
            deleteResource(Object.assign({
                id: resourceInfo.id,
                resource: resourceInfo.resource
            }) ).then(
                response => {
                    this.showToast(response);
                }
            )
        },
        cleanCheckFile(fileId) {
            document.getElementById(fileId).value = '';
            this.resource[fileId+'File'] = '';
        },
        cleanResource() {
            this.resource.id = '';
            this.resource.alias = '';
            this.resource.fileName = '';
            this.resource.fileNameUrl = '';
            this.resource.note = '';
            this.resource.type = this.resourceTypeList[0].id;
            this.resource.fileNameFile = {};
        },
        checkResource() {
            if (this.resource.alias == ''|| this.resource.fileNameUrl=='') {
                this.saveResourceBtn = true;
            }
            else {
                this.saveResourceBtn = false;
            }
        },
        // 预览上传图片
        tirggerFile(event, elementId, fileVal) {
            var filetypes = [".jpg", ".png",".gif"];
            var file = event.target.files[0];
            this.resource.fileNameName = '';
            if (event.target.files.length==0) {
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '未选择图片'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                this.resource[fileVal] = '';
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
                this.resource[fileVal] = '';
                this.showToast(checkInfo);
                return;
            }
            if (file == null) {
                this.resource[fileVal] = '';
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
                this.resource[fileVal] = '';
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
                that.resource[fileVal] = 'data:resource/png;base64,' + url;
            };
        },
        copyFile(file, elementId){
            if (elementId=='resource') {
                this.resourceFile = file;
            }
        },
    },
}
</script>