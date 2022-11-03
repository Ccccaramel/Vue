<template>
    <div class="tab-pane fade" id="list-headPortraitManage" role="tabpanel" aria-labelledby="list-headPortraitManage-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="头像名称" v-model="searchHeadPortraitInfo.name">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchHeadPortraitBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#headPortraitModal" @click="addHeadPortraitBtn()">添加</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary"></span></h4></caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">名称</th>
                    <th scope="col">头像</th>
                    <th scope="col">创建时间</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(headPortraitInfo, index) in headPortraitInfoList" :key="headPortraitInfo.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ headPortraitInfo.id }}</td>
                    <td>{{ headPortraitInfo.name }}</td>
                    <td>
                        <img class="col-auto rounded-circle" :src="headPortraitInfo.imageUrl" style="weight:64px;height:64px">
                    </td>
                    <td>{{ headPortraitInfo.createTimeStr }}</td>
                    <td>{{ headPortraitInfo.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#headPortraitModal" @click="editHeadPortrait(headPortraitInfo)">编辑</span>
                        <span class="btn badge rounded-pill bg-danger ms-2" @click="deleteHeadPortrait(headPortraitInfo)">删除</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 编辑头像 -->
        <div class="modal fade" id="headPortraitModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{headPortrait.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="headPortrait.name" required>
                                    <label>名称</label>
                                </div>
                            </div>
                            <!-- 头像 -->
                            <div class="mb-3">
                                <div class="input-group mb-3">
                                    <label class="input-group-text">选择头像</label>
                                    <input type="file" id="headPortrait" class="form-control" @change="tirggerFile($event,'headPortrait','imageUrl')" required>
                                </div>
                            </div>
                            <!-- 回显 -->
                            <div class="input-group mb-3">
                                <div class="form-floating text-center" :style="headPortrait.imageUrl==''?'height: 0px;':'height: 120px;'">
                                    <img v-if="headPortrait.imageUrl!=''" :src="headPortrait.imageUrl" class="rounded" :style="headPortrait.imageUrl==''?'height: 0px;':'height: 120px;'"/>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="headPortrait.note">
                                    <label>备注</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeHeadPortraitModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveHeadPortrait()" :disabled="saveHeadPortraitBtn">保存</button>
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
import { searchHeadPortrait, saveHeadPortrait, deleteHeadPortrait } from "../api/headPortrait";
export default {
    name: "headPortraitManage",
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
            saveHeadPortraitBtn: true,
            headPortraitInfoList: [],
            headPortrait: {
                add: true,
                title: '',
                name: '',
                note: '',
                imageUrl: '',
                
            },
            headPortraitFile: {},
            searchHeadPortraitInfo: [],
        }
    },
    watch: {
        headPortrait: {
            handler() {
                this.checkHeadPortrait();
            },
            deep: true,
        },
    },
    mounted() {
    },
    methods: {
        commonPageChange(event) {
            this.page = event;
            this.searchHeadPortrait();
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
        addHeadPortraitBtn() {
            this.headPortrait.add = true;
            this.headPortrait.title = '新增头像';
            this.cleanHeadPortrait();
        },
        editHeadPortrait(headPortrait) {
            this.headPortrait.add = false;
            this.headPortrait.title = '编辑头像';
            this.headPortrait.id = headPortrait.id;
            this.headPortrait.name = headPortrait.name;
            this.headPortrait.image = headPortrait.image;
            this.headPortrait.imageUrl = headPortrait.imageUrl;
            this.headPortrait.note = headPortrait.note;
            this.headPortraitFile = {};
        },
        searchHeadPortraitBtn() {
            this.page.currentPage = 1;
            this.searchHeadPortrait();
        },
        searchHeadPortrait() {
            searchHeadPortrait(Object.assign(this.page,this.searchHeadPortraitInfo)).then(
                response => {
                    this.headPortraitInfoList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        saveHeadPortrait() {
            var forms = new FormData();
            forms.append('headPortraitFile', this.headPortraitFile);
            forms.append('id', this.headPortrait.id);
            forms.append('add', this.headPortrait.add);
            forms.append('id', this.headPortrait.id);
            forms.append('image', this.headPortrait.image);
            forms.append('name', this.headPortrait.name);
            forms.append('note', this.headPortrait.note);
            saveHeadPortrait(forms).then(
                response => {
                    if (response.data.code != 0) {
                        this.cleanCheckFile('headPortrait');
                        this.cleanHeadPortrait();
                        document.getElementById("closeHeadPortraitModal").click();
                        this.searchHeadPortrait();
                    }
                    this.showToast(response);
                }
            )
        },
        deleteHeadPortrait(headPortraitInfo) {
            deleteHeadPortrait(Object.assign({
                id: headPortraitInfo.id,
                image: headPortraitInfo.image
            }) ).then(
                response => {
                    this.showToast(response);
                }
            )
        },
        cleanCheckFile(fileId) {
            document.getElementById(fileId).value = '';
            this.headPortrait[fileId+'File'] = '';
        },
        cleanHeadPortrait() {
            this.headPortrait.id = '';
            this.headPortrait.name = '';
            this.headPortrait.image = '';
            this.headPortrait.imageUrl = '';
            this.headPortrait.note = '';
            this.headPortrait.imageFile = {};
        },
        checkHeadPortrait() {
            if (this.headPortrait.name == ''|| this.headPortrait.imageUrl=='') {
                this.saveHeadPortraitBtn = true;
            }
            else {
                this.saveHeadPortraitBtn = false;
            }
        },
        // 预览上传图片
        tirggerFile(event, elementId, fileVal) {
            var filetypes = [".jpg", ".png"];
            var file = event.target.files[0];
            this.headPortrait.imageName = '';
            if (event.target.files.length==0) {
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '未选择图片'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                this.headPortrait[fileVal] = '';
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
                this.headPortrait[fileVal] = '';
                this.showToast(checkInfo);
                return;
            }
            if (file == null) {
                this.headPortrait[fileVal] = '';
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
                this.headPortrait[fileVal] = '';
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
                that.headPortrait[fileVal] = 'data:image/png;base64,' + url;
            };
        },
        copyFile(file, elementId){
            if (elementId=='headPortrait') {
                this.headPortraitFile = file;
            }
        },
    },
}
</script>