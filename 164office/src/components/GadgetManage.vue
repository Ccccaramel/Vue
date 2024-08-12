<template>
    <div class="tab-pane fade" id="list-gadgetManage" role="tabpanel" aria-labelledby="list-gadgetManage-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="所属角色" v-model="searchGadgetInfo.gameRoleName">
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="妙具名称" v-model="searchGadgetInfo.name">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchGadgetBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#gadgetInfoModal" @click="addGadgetBtn()">添加</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <!-- <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary "></span></h4></caption> -->
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" style="width:10%">所属英雄</th>
                    <th scope="col">名称</th>
                    <th scope="col">标识图</th>
                    <th scope="col" style="width:40%">效果</th>
                    <th scope="col">可用次数</th>
                    <th scope="col" style="width:10%">上线时间</th>
                    <th scope="col" style="width:10%">创建时间</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
             <tbody class="table-group-divider">
                <tr v-for="(gadget, index) in gadgetList" :key="gadget.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ gadget.gameRole.name }}</td>
                    <td>{{ gadget.name }}</td>
                    <td>
                        <img class="rounded" :src="gadget.imageUrl" style="height:64px"/>
                    </td>
                    <td>{{ gadget.details }}</td>
                    <td>{{ gadget.duraMax }}</td>
                    <td>{{ gadget.launchTimeStr }}</td>
                    <td>{{ gadget.createTimeStr }}</td>
                    <!-- <td>{{ gadget.note }}</td> -->
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#gadgetInfoModal" @click="editGadget(gadget)">编辑</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 新增 & 编辑 -->
        <div class="modal fade" id="gadgetInfoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{gadgetInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control"
                                                v-model="gadgetInfo.name" required>
                                            <label for="floatingInput">名称</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <select class="form-select" v-model="gadgetInfo.gameRole">
                                                <option v-for="gameRole in gameRoleList"
                                                    :key="gameRole.id" :value="gameRole.id">
                                                    {{gameRole.name}}</option>
                                            </select>
                                            <label>所属游戏角色</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input step=1 type="datetime-local" class="form-control"
                                                v-model="gadgetInfo.launchTime">
                                            <label>上线时间</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control"
                                                v-model="gadgetInfo.duraMax" required>
                                            <label for="floatingInput">使用次数</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <!-- 标识图 -->
                                        <div class="mb-3">
                                            <div class="input-group mb-3">
                                                <label class="input-group-text">选择标识图</label>
                                                <input type="file" id="image" class="form-control"
                                                    @change="tirggerFile($event,'image','imageUrl')" required>
                                            </div>
                                        </div>
                                        <!-- 回显 -->
                                        <div class="input-group mb-3">
                                            <div class="form-floating text-center"
                                                :style="gadgetInfo.imageUrl==''?'height: 0px;':'height: 48px;'">
                                                <img v-if="gadgetInfo.imageUrl!=''" :src="gadgetInfo.imageUrl"
                                                    class="rounded"
                                                    :style="gadgetInfo.imageUrl==''?'height: 0px;':'height: 48px;'" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <textarea class="form-control" v-model="gadgetInfo.details" required></textarea>
                                            <label>效果</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="gadgetInfo.note">
                                            <label for="floatingInput">备注</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeGadgetInfoModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveGadget()">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';

import { Modal, Toast } from 'bootstrap'; 
import { getBasicForm } from "../api/gameRole";
import { searchGadget, saveGadget } from "../api/gadget";
import { getToday } from "../api/common";
export default {
    name: "gadgetManage",
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
            gadgetList: [],
            searchGadgetInfo: {
                gameRoleName: '',
            },
            gadgetInfo: {
                add: true,
                title: '',
                id: '',
                image: '',
                gameRole: 0,
            },
            image: {},
            gameRoleList:[],
        }
    },
    mounted() {
    },
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchGadget();
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
            getBasicForm().then(
                response => {
                    this.gameRoleList = response.data.data;
                    this.searchGadgetBtn();
                }
            );
        },

        searchGadgetBtn() {
            this.page.currentPage = 1;
            this.searchGadget();
        },
        addGadgetBtn() {
            this.cleanGadgetInfo();
            this.gadgetInfo.add = true;
            this.gadgetInfo.title = '新增随身妙具';
        },
        editGadget(gadget) {
            this.gadgetInfo.add = false;
            this.gadgetInfo.title = '编辑随身妙具';
            this.gadgetInfo.id = gadget.id;
            this.gadgetInfo.name = gadget.name;
            this.gadgetInfo.gameRole = gadget.gameRole.id;
            this.gadgetInfo.image = gadget.image;
            this.gadgetInfo.imageUrl = gadget.imageUrl;
            this.gadgetInfo.launchTime = gadget.launchTime;
            this.gadgetInfo.duraMax = gadget.duraMax;;
            this.gadgetInfo.details = gadget.details;
            this.gadgetInfo.note = gadget.note;
            document.getElementById("image").value = '';
        },
        searchGadget() {
            searchGadget(Object.assign(this.page,this.searchGadgetInfo)).then(
                response => {
                    this.gadgetList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanGadgetInfo() {
            this.gadgetInfo.name = '';
            this.gadgetInfo.gameRole = this.gameRoleList[0].id;
            this.gadgetInfo.launchTime = '';
            this.gadgetInfo.image = '';
            this.gadgetInfo.imageUrl = '';
            this.gadgetInfo.details = '';
            this.gadgetInfo.duraMax = 0;
            this.gadgetInfo.launchTime = getToday()+'T17:00:00';;
            this.gadgetInfo.note = '';
            document.getElementById("image").value = '';
            this.image = {};
        },
        saveGadget() {
            var forms = new FormData();
            forms.append('image', this.image);
            forms.append('gadgetVoStr', JSON.stringify(this.gadgetInfo));
            saveGadget(forms).then(
                response => {
                    if(response.data.code==1){
                        document.getElementById("closeGadgetInfoModal").click();
                        this.cleanGadgetInfo();
                        this.searchGadgetBtn();
                    }
                    this.showToast(response);
                }
            )
        },
        // 预览上传图片
        tirggerFile(event, elementId, fileVal) {
            var filetypes = [".jpg", ".png"];
            var file = event.target.files[0];
            if (event.target.files.length == 0) {
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '未选择图片'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                this.gadgetInfo[fileVal] = '';
                this.showToast(checkInfo);
                return;
            };
            var fileName = file.name;
            this.copyFile(file, elementId);
            if (filetypes.indexOf(fileName.substring(fileName.lastIndexOf("."))) == -1) { // 检查文件类型
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '图片的格式不支持,支持的格式: jpg png'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                this.gadgetInfo[fileVal] = '';
                this.showToast(checkInfo);
                return;
            }
            if (file == null) {
                this.gadgetInfo[fileVal] = '';
            }
            if (file.size > (1 * 1024 * 1024)) { // 检查文件大小
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '图片大小不能超过 1M(你的图片:' + (file.size / 1024 / 1024).toFixed(2) + 'M)'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                this.gadgetInfo[fileVal] = '';
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
                that.gadgetInfo[fileVal] = 'data:image/png;base64,' + url;
            };
        },
        copyFile(file, elementId) {
            if (elementId == 'image') {
                this.image = file;
            }
        },
    },
}
</script>