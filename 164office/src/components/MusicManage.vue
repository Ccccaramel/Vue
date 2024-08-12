<template>
    <div class="tab-pane fade" id="list-musicManage" role="tabpanel" aria-labelledby="list-musicManage-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="标题" v-model="musicInfo.keywords">
            </div>
            <div class="col-auto">
                <select class="form-select" v-model="musicInfo.status">
                    <option
                        v-for="musicStatus in musicStatusList"
                        v-bind:key="musicStatus.id"
                        :value="musicStatus.id">
                        {{ musicStatus.name }}</option>
                </select>
            </div>
            <div class="col-auto">
                <select class="form-select" v-model="musicInfo.type">
                    <option
                        v-for="musicType in musicTypeList"
                        v-bind:key="musicType.id"
                        :value="musicType.id">
                        {{ musicType.name }}</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="cleanSearchMusicBtn()">清空</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchMusicBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success"  @click="addMusic()" data-bs-toggle="modal" data-bs-target="#musicModal"><font-awesome-icon icon="pen-to-square" />+Music</button>
            </div>
        </form>

        <div class="container text-center">
            <div class="row align-items-start">
                <div class="row align-items-center">
                    <div class="col">
                        <table class="table text-center table-hover caption-top">
                            <thead>
                                <tr>
                                    <th scope="col">曲名</th>
                                    <th scope="col">封面</th>
                                    <th scope="col">作词</th>
                                    <th scope="col">作曲</th>
                                    <th scope="col">编曲</th>
                                    <th scope="col">演唱</th>
                                    <th scope="col">分类</th>
                                    <th scope="col">状态</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                             <tbody class="table-group-divider">
                                <tr v-for="music in musicList" :key="music.id">
                                    <th scope="row">
                                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="music.name" style="max-width: 200px;">
                                            {{music.name}}
                                        </span>
                                    </th>
                                    <td>
                                        <img class="col-auto rounded" :src="music.coverLink" style="height:64px" />
                                    </td>
                                    <td>
                                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="music.composing" style="max-width: 80px;">
                                            {{music.composing}}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="music.lyrics" style="max-width: 80px;">
                                            {{music.lyrics}}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="music.arranger" style="max-width: 80px;">
                                            {{music.arranger}}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="music.singer" style="max-width: 200px;">
                                            {{music.singer}}
                                        </span>
                                    </td>
                                    <td>{{ music.type.name }}</td>
                                    <td>{{ music.status.name }}</td>
                                    <td>
                                        <span class="btn badge rounded-pill bg-success"
                                            @click="restoreMusic(music.id)">恢复</span>
                                        <span class="btn badge rounded-pill bg-danger ms-1 me-1"
                                            @click="deleteMusic(music.id)">删除</span>
                                        <span class="btn badge rounded-pill bg-primary me-1" data-bs-toggle="modal" data-bs-target="#musicLyricListModal"
                                            @click="showMusicLyric(music.id)">歌词</span>
                                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#musicModal"
                                            @click="editMusic(music)">编辑</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>

         <!-- 音频基本信息 新增 & 编辑 -->
         <div class="modal fade" id="musicModal" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{musicVo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- 如果仅判断输入框中是否有填入数据,可以使用下述 class 并将又要判断的加上 required 即可 -->
                        <!-- <form class="was-validated" novalidate> -->
                        <form class="row g-3"> <!-- 如果需要自定义判断,添加 is-invalid 或 is-valid 即可 -->

                            <div class="col-12">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicVo.name">
                                    <label>曲名</label>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="form-floating">
                                    <!-- 封面 -->
                                    <div class="input-group">
                                        <label class="input-group-text">封面</label>
                                        <input type="file" id="cover" class="form-control"
                                            @change="tirggerFile($event,'cover','coverLink')" required>
                                    </div>
                                    <!-- 回显 -->
                                    <div class="input-group mt-3">
                                        <div class="form-floating"
                                            :style="musicVo.coverLink==''?'height: 0px;':'height: 164px;'">
                                            <img v-if="musicVo.coverLink!=''" :src="musicVo.coverLink"
                                                class="rounded"
                                                :style="musicVo.coverLink==''?'height: 0px;':'height: 164px;'" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicVo.lyrics">
                                    <label>作词</label>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicVo.composing">
                                    <label>作曲</label>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicVo.arranger">
                                    <label>编曲</label>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicVo.singer">
                                    <label>演唱</label>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicVo.album">
                                    <label>所属专辑</label>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="form-floating">
                                    <input step=1 type="datetime-local" class="form-control" v-model="musicVo.releaseTime">
                                    <label>发布时间</label>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-floating">
                                    <select class="form-select" v-model="musicVo.type">
                                        <option v-for="musicType in musicTypeList"
                                            :key="musicType.id" :value="musicType.id">
                                            {{musicType.name}}</option>
                                    </select>
                                    <label>分类</label>
                                </div>

                                <!-- <div class="form-floating">
                                    <input step=1 type="datetime-local" class="form-control" v-model="musicVo.releaseTime">
                                    <label>分类</label>
                                </div> -->
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicVo.mvLink">
                                    <label>MV链接</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <div class="input-group">
                                        <label class="input-group-text">音频资源</label>
                                        <input type="file" id="audio" class="form-control" @change="musicCheck($event,'audio','audioRef')" required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="alert alert-success" role="alert">
                                {{musicVo.audioName}}
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicVo.info">
                                    <label>额外信息</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicVo.note">
                                    <label>备注</label>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="cleanMusicVo()" v-if="musicVo.add">清空</button>
                        <button type="button" class="btn btn-secondary" id="closeMusicModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveMusic()" :disabled="savemusicVoBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 音频歌词列表 -->
        <div class="modal fade" id="musicLyricListModal" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center"><span class="badge rounded-pill bg-primary">{{musicLyricModalTitle}}</span></h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <table class="table text-center table-hover caption-top">
                            <thead>
                                <tr>
                                    <th scope="col">序号</th>
                                    <th scope="col">内容</th>
                                    <th scope="col">时刻</th>
                                    <th scope="col">状态</th>
                                    <th scope="col">备注</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                             <tbody class="table-group-divider">
                                <tr v-for="musicLyric in musicLyricList" :key="musicLyric.id">
                                    <th scope="row">{{ musicLyric.number }}</th>
                                    <td>
                                        <span v-if="getcolorsLength(musicLyric.color)==0">{{ musicLyric.text }}</span>
                                        <span v-if="getcolorsLength(musicLyric.color)==1" :style="'color: '+musicLyric.color+';'">{{ musicLyric.text }}</span>
                                        <span v-if="getcolorsLength(musicLyric.color)>1" :style="'background: linear-gradient(to right,'+musicLyric.color+');-webkit-background-clip: text;background-clip: text;color: transparent;'">{{ musicLyric.text }}</span>
                                    </td>
                                    <td>{{ musicLyric.minutes }}:{{ musicLyric.second }}</td>
                                    <td>{{ musicLyric.status.name }}</td>
                                    <td>{{ musicLyric.note }}</td>
                                    <td>
                                        <!-- <span class="btn badge rounded-pill bg-success" @click="restoreMusicLyric(musicLyric.id)">恢复</span>
                                        <span class="btn badge rounded-pill bg-danger ms-1 me-1" @click="deleteMusicLyric(musicLyric.id)">删除</span> -->
                                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#musicLyricModal" @click="editMusicLyric(musicLyric)">编辑</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Page :commonPage="musicLyricPage" @commonPageChange="musicLyricPageChange($event)"></Page>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-target="#musicLyricModal" data-bs-toggle="modal" @click="addMusicLyric()">新增</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 音频歌词 新增 & 编辑 -->
        <div class="modal fade" id="musicLyricModal" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{musicLyricModalTitle}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- 如果仅判断输入框中是否有填入数据,可以使用下述 class 并将又要判断的加上 required 即可 -->
                        <!-- <form class="was-validated" novalidate> -->
                        <form class="row g-3"> <!-- 如果需要自定义判断,添加 is-invalid 或 is-valid 即可 -->
                            <div class="col-12">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicLyricVo.text">
                                    <label>歌词</label>
                                    <!-- <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">歌词</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="musicLyricVo.text"></textarea>
                                    </div> -->
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicLyricVo.number">
                                    <label>序号</label>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="form-floating">
                                    <input type="time" class="form-control" v-model="point">
                                    <label>时刻</label>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="form-floating">
                                    <!-- <input type="text" class="form-control" v-model="musicLyricVo.status"> -->
                                    <select class="form-select" v-model="musicLyricVo.status">
                                        <option
                                            v-for="musicLyricStatus in musicLyricStatusList"
                                            v-bind:key="musicLyricStatus.id"
                                            :value="musicLyricStatus.id">
                                            {{ musicLyricStatus.name }}</option>
                                    </select>
                                    <label>状态</label>
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="form-floating">
                                    <input type="color" class="form-control" id="color">
                                    <label>颜色</label>
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="form-floating">
                                    <div class="alert alert-success btn" role="alert" @click="addColor()">添加</div>
                                </div>
                            </div>
                            <div class="col-5">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="musicLyricVo.note">
                                    <label>备注</label>
                                </div>
                            </div>
                            <div class="col-1 mt-0 btn" v-for="color,i in colors" :key="i" @click="removeColor(i)">
                                    <span :style="'color: '+color+';'">颜色{{i}}</span>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <span v-if="colors.length==0" style="font-size: 24px;font-weight: bold;">歌词颜色预览:{{ musicLyricVo.text }}</span>
                                    <span v-if="colors.length==1" :style="'font-size: 24px;font-weight: bold;color: '+colors+';'">歌词颜色预览:{{ musicLyricVo.text }}</span>
                                    <span v-if="colors.length>1" :style="'font-size: 24px;font-weight: bold;background: linear-gradient(to right,'+colors+');-webkit-background-clip: text;background-clip: text;color: transparent;'">歌词颜色预览:{{ musicLyricVo.text }}</span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="cleanMusicLyricVo()" v-if="musicLyricVo.add">清空</button>
                        <button type="button" class="btn btn-secondary" data-bs-target="#musicLyricListModal" data-bs-toggle="modal">返回</button>
                        <button type="button" class="btn btn-primary" @click="saveMusicLyric()" :disabled="savemusicLyricVoBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import { Toast,Popover } from 'bootstrap';
import { getMusicStatus,getMusicLyricStatus,getMusicType } from "../api/dictionary";
import { searchMusic, saveMusic, restoreMusic, deleteMusic } from "../api/music";
import { getMusicLyric,saveMusicLyric } from "../api/musicLyric";
import { getToday } from "../api/common";
export default {
    name: "musicManage",
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
            musicLyricPage: {
                size: 10,
                currentPage:1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            commonResponse: {
                success: true,
                msg: '',
            },
            saveDictionaryInfoBtn:false,
            musicList: [],
            musicInfo: {
                keywords: '',
                status: '',
            },
            musicStatusList: [],
            musicTypeList:[],
            musicVo: {
                title: '',
                name: '',
                coverRef: '',
                composing: '',
                arranger: '',
                lyrics:'',
                singer: '',
                album: '',
                audioName: '',
                audioRef:'',
                mvLink: '',
                releaseTime: '',
                note: '',
                add: ''
            },
            cover: {},  // 封面
            audio: {},  // 音频
            musicVoNameVaild: false,
            musicLyricModalTitle: '',
            musicId: 0,
            musicLyricList:[],
            musicLyricVo: {
                add : true,
                music: 0,
                number: 0,
                minutes: 0,
                second:0,
                text: '',
                color: '',
                status: 0,
                note:''
            },
            point:"00:00",  // 时刻
            colors: [],  // 字体颜色集
            musicLyricStatusList: [],
            currentMusicId: 0,
        }
    },
    created() {
        getMusicLyricStatus().then(
            response => {
                this.musicLyricStatusList = response.data.data;
                this.musicLyricVo.status = this.musicLyricStatusList[0].id;
            }
        )
    },
    mounted() {
    },
    updated() { //更新之后.场景:获取更新真实DOM之后
        /**
         * 尝试一下放在 updated() 和 mounted() 中分别有什么区别
         */
        var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new Popover(popoverTriggerEl)
        });
    },
    methods: {
        commonPageChange(event) {
            this.page = event;
            this.searchMusic();
        },
        musicLyricPageChange(event) {
            this.musicLyricPage = event;
            this.getMusicLyric();
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
            this.initMusicStatus();
        },
        initMusicStatus() {
            getMusicStatus().then(
                response => {
                    this.musicStatusList = response.data.data;
                    this.musicStatusList.unshift({
                        id: '',
                        name:'无限制',
                    });
                    this.musicInfo.status = '';
                    this.initMusicType();
                }
            ); 
        },
        initMusicType() {
            getMusicType().then(
                response => {
                    this.musicTypeList = response.data.data;
                    this.musicInfo.type = this.musicTypeList[0].id;
                    this.searchMusicBtn();
                }
            );
        },
        addMusic() {
            this.musicVo.title = "新增";
            this.musicVo.add = true;
            this.cleanMusicVo();
        },
        editMusic(musicInfo) {
            this.musicVo.title = "编辑";
            this.musicVo.add = false;

            this.musicVo.id = musicInfo.id;
            this.musicVo.name = musicInfo.name;
            this.musicVo.coverRef = musicInfo.coverRef;
            this.musicVo.coverLink = musicInfo.coverLink;
            this.musicVo.composing = musicInfo.composing;
            this.musicVo.lyrics = musicInfo.lyrics;
            this.musicVo.arranger = musicInfo.arranger;
            this.musicVo.singer = musicInfo.singer;
            this.musicVo.album = musicInfo.album;
            this.musicVo.mvLink = musicInfo.mvLink;
            this.musicVo.releaseTime = musicInfo.releaseTime;
            this.musicVo.info = musicInfo.info;
            this.musicVo.note = musicInfo.note;
            this.musicVo.audioName = musicInfo.audioName;
            this.musicVo.type = musicInfo.type.id;

            document.getElementById("cover").value = '';
            this.cover = {};
        },
        cleanMusicVo() {
            this.musicVo.name = "";
            this.musicVo.coverRef = "";
            this.musicVo.composing = "";
            this.musicVo.lyrics = "";
            this.musicVo.arranger = "";
            this.musicVo.singer = "";
            this.musicVo.mvLink = "";
            this.musicVo.album = "";
            this.musicVo.releaseTime = getToday() + 'T17:00:00';
            this.musicVo.type = this.musicTypeList[0].id;
            this.musicVo.note = "";
            document.getElementById("cover").value = '';
            this.cover = {};
        },
        saveMusic() {
            var forms = new FormData();
            forms.append('cover', this.cover);
            forms.append('audio', this.audio);
            forms.append('musicVoStr', JSON.stringify(this.musicVo));
            saveMusic(forms).then(
                response => {
                    this.showToast(response);
                    this.searchMusicBtn();
                }
            );
            document.getElementById("closeMusicModal").click();
            
        },
        cleanSearchMusicBtn() {
            this.musicInfo = {
                keywords: '',
                status: ''
            }
        },
        searchMusicBtn() {
            this.page.currentPage = 1;
            this.searchMusic();
        },
        searchMusic() {
            searchMusic(Object.assign(this.page,this.musicInfo)).then(
                response => {
                    this.musicList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        restoreMusic(id) {
            restoreMusic(Object.assign({
                id:id
            })).then(
                response => {
                    this.showToast(response);
                    this.searchMusic();
                }
            );
        },
        deleteMusic(id) {
            deleteMusic(Object.assign({
                id:id
            })).then(
                response => {
                    this.showToast(response);
                    this.searchMusic();
                }
            );
        },
        showMusicLyric(musicId) {
            this.currentMusicId = musicId;
            this.getMusicLyric();
        },
        getMusicLyric() {
            getMusicLyric(Object.assign(this.musicLyricPage,{music:this.currentMusicId})).then(
                response => {
                    this.musicLyricList = response.data.data.data;
                    this.musicLyricPage.totalPage = response.data.data.totalPage;
                }
            );
            this.musicLyricVo.music = this.currentMusicId;
        },
        editMusicLyric(musicLyric) {
            this.musicLyricVo.add = false;

            this.musicLyricVo.id = musicLyric.id;
            this.musicLyricVo.music = musicLyric.music;
            this.musicLyricVo.number = musicLyric.number;
            this.musicLyricVo.minutes = musicLyric.minutes;
            this.musicLyricVo.second = musicLyric.second;
            this.musicLyricVo.text = musicLyric.text;
            this.musicLyricVo.color = musicLyric.color;
            this.musicLyricVo.note = musicLyric.note;
            this.colors = this.musicLyricVo.color.split(",");
            this.point = (this.musicLyricVo.minutes < 10 ? ("0" + this.musicLyricVo.minutes) : this.musicLyricVo.minutes) + ":" + (this.musicLyricVo.second < 10 ? ("0" + this.musicLyricVo.second) : this.musicLyricVo.second);
            this.musicLyricVo.status = musicLyric.status.id;
        },
        musicCheck(event,elementId,fileVal) {  // 类型检查
            var filetypes = [".mp3", ".wav", ".flac",".alac",".ogg"];
            var file = event.target.files[0];
            if (event.target.files.length == 0) {
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '未选择音频资源'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                // this.musicVo[fileVal] = '';
                this.showToast(checkInfo);
                return;
            };
            var fileName = file.name;
            if (filetypes.indexOf(fileName.substring(fileName.lastIndexOf("."))) == -1) { // 检查文件类型
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '音频的格式不支持,支持的格式: mp3 wav flac alac ogg"'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                // this.musicVo[fileVal] = '';
                this.showToast(checkInfo);
                return;
            }
            // if (file == null) {
            //     this.musicVo[fileVal] = '';
            // }
            this.copyFile(file, elementId);  // 复制给单独存放资源文件的变量
        },
        addColor() {
            this.colors.push(document.getElementById("color").value);
            console.log(">>>"+this.colors);
        },
        removeColor(i) {
            this.colors.splice(i, 1);
        },
        saveMusicLyric() {
            this.musicLyricVo.color = this.colors.join();
            var pointArr=this.point.split(":");
            this.musicLyricVo.minutes = parseInt(pointArr[0]);
            this.musicLyricVo.second = parseInt(pointArr[1]);
            saveMusicLyric(this.musicLyricVo).then(
                response => {
                    this.showToast(response);
                    this.getMusicLyric(this.musicLyricVo.music);
                }
            )
        },
        getcolorsLength(color){
            return color.split(",").length;
        },
        addMusicLyric() {
            this.musicLyricVo.add = true;
        },
        cleanMusicLyricVo() {
            this.musicLyricVo.music = 0;
            this.musicLyricVo.number = 0;
            this.musicLyricVo.minutes = 0;
            this.musicLyricVo.second = 0;
            this.musicLyricVo.text = '';
            this.musicLyricVo.color = '';
            this.musicLyricVo.note = '';
            this.colors.length = 0;
            this.point = "00:00";
        },
        // 预览上传图片
        tirggerFile(event, elementId, fileVal) {
            var filetypes = [".jpg",".jpeg", ".png"];
            var file = event.target.files[0];
            if (event.target.files.length == 0) {
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '未选择图片'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';  // 将文件框内的资源名称置空
                this.musicVo[fileVal] = '';  // 将回显的资源置空
                this.showToast(checkInfo);
                return;
            };
            var fileName = file.name;
            this.copyFile(file, elementId);
            if (filetypes.indexOf(fileName.substring(fileName.lastIndexOf("."))) == -1) { // 检查文件类型
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '图片的格式不支持,支持的格式: jpg png jpeg'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                this.musicVo[fileVal] = '';
                this.showToast(checkInfo);
                return;
            }

            if (file == null) {
                this.musicVo[fileVal] = '';
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
                this.musicVo[fileVal] = '';
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
                that.musicVo[fileVal] = 'data:image/png;base64,' + url;
            };
        },
        copyFile(file, elementId) {
            if (elementId == 'cover') {
                this.cover = file;
            }
            else if (elementId == 'audio') {
                this.audio = file;
            }
        },
    },
}
</script>