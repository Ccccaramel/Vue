<template>
    <div class="tab-pane fade" id="list-gearManage" role="tabpanel" aria-labelledby="list-gearManage-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#gearInfoModal" @click="addGearBtn()">添加</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary "></span></h4></caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">名称</th>
                    <th scope="col">一级标识图</th>
                    <th scope="col">二级标识图</th>
                    <th scope="col">三级标识图</th>
                    <th scope="col">稀有度</th>
                    <th scope="col">效果</th>
                    <th scope="col">上线时间</th>
                    <th scope="col">创建时间</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(gear, index) in gearList" :key="gear.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ gear.name }}</td>
                    <td style="width:10%">
                        <img v-if="gear.oneLevelImg!=''" class="rounded" :src="gear.oneLevelImgUrl" style="height:64px"/>
                    </td>
                    <td style="width:10%">
                        <img v-if="gear.twoLevelImg!=''" class="rounded" :src="gear.twoLevelImgUrl" style="height:64px"/>
                    </td>
                    <td style="width:10%">
                        <img v-if="gear.threeLevelImg !=''" class="rounded" :src="gear.threeLevelImgUrl" style="height:64px"/>
                    </td>
                    <td style="width:10%">{{ gear.rarity==null? '':gear.rarity.name }}</td>
                    <td style="width:20%">{{ gear.details }}</td>
                    <td style="width:10%">{{ gear.launchTimeStr }}</td>
                    <td style="width:10%">{{ gear.createTimeStr }}</td>
                    <td>{{ gear.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#gearInfoModal" @click="editGear(gear)">编辑</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 新增 & 编辑 -->
        <div class="modal fade" id="gearInfoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{gearInfo.title}}</h4>
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
                                                v-model="gearInfo.name" required>
                                            <label for="floatingInput">名称</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <select class="form-select" v-model="gearInfo.rarity">
                                                <option v-for="gearRarity in gearRarityList"
                                                    :key="gearRarity.id" :value="gearRarity.id">
                                                    {{gearRarity.name}}</option>
                                            </select>
                                            <label>稀有度</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input step=1 type="datetime-local" class="form-control"
                                                v-model="gearInfo.launchTime">
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
                                                <label class="input-group-text">一级</label>
                                                <input type="file" id="oneLevelImg" class="form-control"
                                                    @change="tirggerFile($event,'oneLevelImg','oneLevelImgUrl')" required>
                                            </div>
                                        </div>
                                        <!-- 回显 -->
                                        <div class="input-group mb-3">
                                            <div class="form-floating text-center"
                                                :style="gearInfo.oneLevelImgUrl==''?'height: 0px;':'height: 48px;'">
                                                <img v-if="gearInfo.oneLevelImgUrl!=''" :src="gearInfo.oneLevelImgUrl"
                                                    class="rounded"
                                                    :style="gearInfo.oneLevelImgUrl==''?'height: 0px;':'height: 48px;'" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <!-- 标识图 -->
                                        <div class="mb-3">
                                            <div class="input-group mb-3">
                                                <label class="input-group-text">二级</label>
                                                <input type="file" id="twoLevelImg" class="form-control"
                                                    @change="tirggerFile($event,'twoLevelImg','twoLevelImgUrl')" required>
                                            </div>
                                        </div>
                                        <!-- 回显 -->
                                        <div class="input-group mb-3">
                                            <div class="form-floating text-center"
                                                :style="gearInfo.twoLevelImgUrl==''?'height: 0px;':'height: 48px;'">
                                                <img v-if="gearInfo.twoLevelImgUrl!='' && gearInfo.twoLevelImg != ''" :src="gearInfo.twoLevelImgUrl"
                                                    class="rounded"
                                                    :style="gearInfo.twoLevelImgUrl==''?'height: 0px;':'height: 48px;'" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <!-- 标识图 -->
                                        <div class="mb-3">
                                            <div class="input-group mb-3">
                                                <label class="input-group-text">三级</label>
                                                <input type="file" id="threeLevelImg" class="form-control"
                                                    @change="tirggerFile($event,'threeLevelImg','threeLevelImgUrl')" required>
                                            </div>
                                        </div>
                                        <!-- 回显 -->
                                        <div class="input-group mb-3">
                                            <div class="form-floating text-center"
                                                :style="gearInfo.threeLevelImgUrl==''?'height: 0px;':'height: 48px;'">
                                                <img v-if="gearInfo.threeLevelImgUrl!='' && gearInfo.threeLevelImg != ''" :src="gearInfo.threeLevelImgUrl"
                                                    class="rounded"
                                                    :style="gearInfo.threeLevelImgUrl==''?'height: 0px;':'height: 48px;'" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <textarea class="form-control" v-model="gearInfo.details" required></textarea>
                                            <label>效果</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="gearInfo.note">
                                            <label for="floatingInput">备注</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeGearInfoModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveGear()">保存</button>
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
import { searchGear, saveGear } from "../api/gear";
import { getToday } from "../api/common";
import { getGearRarity } from "../api/dictionary";

export default {
    name: "gearManage",
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
            gearList: [],
            gearInfo: {
                add: true,
                title: '',
                id: '',
                name:'',
                oneLevelImg: '',
                twoLevelImg: '',
                threeLevelImg: '',
                details: '',
                launchTime: '',
            },
            oneLevelImg: {},
            twoLevelImg: {},
            threeLevelImg: {},
            gearRarityList:[],
        }
    },
    mounted() {
    },
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchGear();
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
            getGearRarity().then(
                response => {
                    this.gearRarityList = response.data.data;
                    this.gearRarityList.unshift({
                        id: -1,
                        name: '<无>',
                    });
                    this.searchGearBtn();
                }
            );
        },
        searchGearBtn() {
            this.page.currentPage = 1;
            this.searchGear();
        },
        addGearBtn() {
            this.cleanGearInfo();
            this.gearInfo.add = true;
            this.gearInfo.title = '新增强化配件';
        },
        editGear(gear) {
            this.cleanGearInfo();
            this.gearInfo.add = false;
            this.gearInfo.title = '编辑强化配件';
            this.gearInfo.id = gear.id;
            this.gearInfo.name = gear.name;
            this.gearInfo.oneLevelImg = gear.oneLevelImg;
            this.gearInfo.oneLevelImgUrl = gear.oneLevelImgUrl;
            this.gearInfo.twoLevelImg = gear.twoLevelImg;
            this.gearInfo.twoLevelImgUrl = gear.twoLevelImgUrl;
            this.gearInfo.threeLevelImg = gear.threeLevelImg;
            this.gearInfo.threeLevelImgUrl = gear.threeLevelImgUrl;
            this.gearInfo.launchTime = gear.launchTime;
            this.gearInfo.rarity = gear.rarity==null?-1:gear.rarity.id;
            this.gearInfo.details = gear.details;
            this.gearInfo.note = gear.note;
            console.log(">>>"+JSON.stringify(this.gearInfo));
            document.getElementById("oneLevelImg").value = '';
            document.getElementById("twoLevelImg").value = '';
            document.getElementById("threeLevelImg").value = '';
        },
        searchGear() {
            searchGear(Object.assign(this.page)).then(
                response => {
                    this.gearList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanGearInfo() {
            this.gearInfo.name = '';
            this.gearInfo.launchTime = '';
            this.gearInfo.oneLevelImg = '';
            this.gearInfo.oneLevelImgUrl = '';
            this.gearInfo.twoLevelImg = '';
            this.gearInfo.twoLevelImgUrl = '';
            this.gearInfo.threeLevelImg = '';
            this.gearInfo.threeLevelImgUrl = '';
            this.gearInfo.details = '';
            this.gearInfo.rarity = -1;
            this.gearInfo.launchTime = getToday()+'T17:00:00';;
            this.gearInfo.note = '';
            document.getElementById("oneLevelImg").value = '';
            document.getElementById("twoLevelImg").value = '';
            document.getElementById("threeLevelImg").value = '';
            this.oneLevelImg = { };
            this.twoLevelImg = { };
            this.threeLevelImg= { };
        },
        saveGear() {
            var forms = new FormData();
            forms.append('oneLevelImg', this.oneLevelImg);
            forms.append('twoLevelImg', this.twoLevelImg);
            forms.append('threeLevelImg', this.threeLevelImg);
            forms.append('gearVoStr', JSON.stringify(this.gearInfo));
            saveGear(forms).then(
                response => {
                    if(response.data.code==1){
                        document.getElementById("closeGearInfoModal").click();
                        this.cleanGearInfo();
                        this.searchGearBtn();
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
                this.gearInfo[fileVal] = '';
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
                this.gearInfo[fileVal] = '';
                this.showToast(checkInfo);
                return;
            }
            if (file == null) {
                this.gearInfo[fileVal] = '';
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
                this.gearInfo[fileVal] = '';
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
                that.gearInfo[fileVal] = 'data:image/png;base64,' + url;
            };
        },
        copyFile(file, elementId) {
            if (elementId == 'oneLevelImg') {
                this.oneLevelImg = file;
            }
            else if (elementId == 'twoLevelImg') {
                this.twoLevelImg = file;
            }
            else if (elementId == 'threeLevelImg') {
                this.threeLevelImg = file;
            }
        },
    },
}
</script>