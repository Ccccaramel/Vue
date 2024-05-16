<template>
    <div class="tab-pane fade" id="list-starPowerManage" role="tabpanel" aria-labelledby="list-starPowerManage-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="名称" v-model="searchStarPowerInfo.name">
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="所属游戏角色" v-model="searchStarPowerInfo.gameRoleName">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchStarPowerBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#starPowerInfoModal" @click="addStarPowerBtn()">添加</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary "></span></h4></caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">所属英雄</th>
                    <th scope="col">名称</th>
                    <th scope="col">标识图</th>
                    <th scope="col">效果</th>
                    <th scope="col">上线时间</th>
                    <th scope="col">创建时间</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(starPower, index) in starPowerList" :key="starPower.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ starPower.gameRole.name }}</td>
                    <td>{{ starPower.name }}</td>
                    <td style="width:10%">
                        <img class="rounded" :src="starPower.imageUrl" style="height:64px"/>
                    </td>
                    <td style="width:40%">{{ starPower.details }}</td>
                    <td style="width:10%">{{ starPower.launchTimeStr }}</td>
                    <td style="width:10%">{{ starPower.createTimeStr }}</td>
                    <td>{{ starPower.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#starPowerInfoModal" @click="editStarPower(starPower)">编辑</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 新增 & 编辑 -->
        <div class="modal fade" id="starPowerInfoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{starPowerInfo.title}}</h4>
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
                                                v-model="starPowerInfo.name" required>
                                            <label for="floatingInput">名称</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <select class="form-select" v-model="starPowerInfo.gameRole">
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
                                                v-model="starPowerInfo.launchTime">
                                            <label>上线时间</label>
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
                                                <input type="file" id="starPowerImage" class="form-control"
                                                    @change="tirggerFile($event,'starPowerImage','imageUrl')" required>
                                            </div>
                                        </div>
                                        <!-- 回显 -->
                                        <div class="input-group mb-3">
                                            <div class="form-floating text-center"
                                                :style="starPowerInfo.imageUrl==''?'height: 0px;':'height: 48px;'">
                                                <img v-if="starPowerInfo.imageUrl!=''" :src="starPowerInfo.imageUrl"
                                                    class="rounded"
                                                    :style="starPowerInfo.imageUrl==''?'height: 0px;':'height: 48px;'" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <textarea class="form-control" v-model="starPowerInfo.details" required></textarea>
                                            <label>效果</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="starPowerInfo.note">
                                            <label for="floatingInput">备注</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeStarPowerInfoModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveStarPower()">保存</button>
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
import { searchStarPower, saveStarPower } from "../api/starPower";
import { getToday } from "../api/common";
export default {
    name: "starPowerManage",
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
            starPowerList: [],
            searchStarPowerInfo: {
                name: '',
                gameRoleName: '',
            },
            starPowerInfo: {
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
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchStarPower();
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
        getBasicGameRole() {
            getBasicForm().then(
                response => {
                    this.gameRoleList = response.data.data;
                }
            )
        },
        searchStarPowerBtn() {
            this.page.currentPage = 1;
            this.searchStarPower();
            this.getBasicGameRole();
        },
        addStarPowerBtn() {
            this.cleanStarPowerInfo();
            this.starPowerInfo.add = true;
            this.starPowerInfo.title = '新增星徽之力';
        },
        editStarPower(starPower) {
            this.starPowerInfo.add = false;
            this.starPowerInfo.title = '编辑星徽之力';
            this.starPowerInfo.id = starPower.id;
            this.starPowerInfo.name = starPower.name;
            this.starPowerInfo.gameRole = starPower.gameRole.id;
            this.starPowerInfo.image = starPower.image;
            this.starPowerInfo.imageUrl = starPower.imageUrl;
            this.starPowerInfo.launchTime = starPower.launchTime;
            this.starPowerInfo.details = starPower.details;
            this.starPowerInfo.note = starPower.note;
            document.getElementById("starPowerImage").value = '';
        },
        searchStarPower() {
            searchStarPower(Object.assign(this.page,this.searchStarPowerInfo)).then(
                response => {
                    this.starPowerList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanStarPowerInfo() {
            this.starPowerInfo.name = '';
            this.starPowerInfo.gameRole = this.gameRoleList[0].id;
            this.starPowerInfo.launchTime = '';
            this.starPowerInfo.image = '';
            this.starPowerInfo.imageUrl = '';
            this.starPowerInfo.details = '';
            this.starPowerInfo.launchTime = getToday()+'T17:00:00';;
            this.starPowerInfo.note = '';
            document.getElementById("starPowerImage").value = '';
            this.image = {};
        },
        saveStarPower() {
            var forms = new FormData();
            forms.append('image', this.image);
            forms.append('starPowerVoStr', JSON.stringify(this.starPowerInfo));
            saveStarPower(forms).then(
                response => {
                    if(response.data.code==1){
                        document.getElementById("closeStarPowerInfoModal").click();
                        this.cleanStarPowerInfo();
                        this.searchStarPowerBtn();
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
                this.starPowerInfo[fileVal] = '';
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
                this.starPowerInfo[fileVal] = '';
                this.showToast(checkInfo);
                return;
            }
            if (file == null) {
                this.starPowerInfo[fileVal] = '';
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
                this.starPowerInfo[fileVal] = '';
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
                that.starPowerInfo[fileVal] = 'data:image/png;base64,' + url;
            };
        },
        copyFile(file, elementId) {
            if (elementId == 'starPowerImage') {
                this.image = file;
            }
        },
    },
}
</script>