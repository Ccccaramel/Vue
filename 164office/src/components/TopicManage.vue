<template>
    <div class="tab-pane fade" id="list-topicManage" role="tabpanel" aria-labelledby="list-topicManage-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="话题创建者" v-model="searchTopicInfo.userName">
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="标题" v-model="searchTopicInfo.rubric">
            </div>

            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchAllTopicBtn()">搜索</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert">
                <h4><span class="badge rounded-pill bg-primary "></span></h4>
            </caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">话题创建者</th>
                    <th scope="col">标题</th>
                    <th scope="col">正文</th>
                    <th scope="col">图片</th>
                    <th scope="col">发表时间</th>
                    <th scope="col">状态</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(topic, index) in topicList" :key="topic.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ topic.userInfo.name }}</td>
                    <td>
                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover"
                            data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="topic.rubric==''?'<无>':topic.rubric"
                            style="max-width: 300px;">
                            {{ topic.rubric }}
                        </span>
                    </td>
                    <td>
                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover"
                            data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="topic.text==''?'<无>':topic.text"
                            style="max-width: 300px;">
                            {{ topic.text }}
                        </span>
                    </td>
                    <td>
                        <img class="btn rounded" v-for="(image,i) in topic.images" :key="i" :src="image" style="max-width: 64px;"/>
                    </td>
                    <td>{{ topic.createTimeStr }}</td>
                    <td>{{ topic.status.name }}</td>
                    <td>{{ topic.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-danger" @click="frozenTopic(topic,true)">冻结</span>
                        <span class="btn badge rounded-pill bg-success ms-1" @click="returnTopic(topic,true)">恢复</span>
                        <span class="btn badge rounded-pill bg-primary ms-1" data-bs-toggle="modal"
                            data-bs-target="#topicReplyManageModal" @click="topicReplyManage(topic)">管理回复</span>
                        <span class="btn badge rounded-pill bg-primary ms-1" data-bs-toggle="modal"
                            data-bs-target="#showCompleteTopicModal" @click="showCompleteTopic(topic)">查看</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>

        <!-- 话题回复管理 -->
        <div class="modal fade" id="topicReplyManageModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">话题回复管理</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table text-center table-hover caption-top">
                            <caption class="text-center alert-primary" role="alert">
                                <h4><span class="badge rounded-pill bg-primary "></span></h4>
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">用户</th>
                                    <th scope="col">内容</th>
                                    <th scope="col">图片</th>
                                    <th scope="col">回复时间</th>
                                    <th scope="col">状态</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(topicReplyInfo, index) in topicReplyInfoList" :key="topicReplyInfo.id">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ topicReplyInfo.userInfo.name }}</td>
                                    <td>
                                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover"
                                            data-bs-trigger="hover focus" data-bs-placement="top"
                                            :data-bs-content="topicReplyInfo.text==''?'<无>':topicReplyInfo.text" style="max-width: 300px;">
                                            {{ topicReplyInfo.text }}
                                        </span>
                                    </td>
                                    <td>
                                        <img class="btn rounded" v-for="(image,i) in topicReplyInfo.images" :key="i" :src="image" style="max-width: 64px;"/>
                                    </td>
                                    <td>{{ topicReplyInfo.createTimeStr }}</td>
                                    <td>{{ topicReplyInfo.status.name }}</td>
                                    <td>
                                        <span class="btn badge rounded-pill bg-danger" @click="frozenTopic(topicReplyInfo,false)">冻结</span>
                                        <span class="btn badge rounded-pill bg-success ms-1" @click="returnTopic(topicReplyInfo,false)">恢复</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Page :commonPage="topicReplyPage" @commonPageChange="topicReplyPageChange($event)"></Page>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 查看完整话题 -->
        <div class="modal fade" id="showCompleteTopicModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">查看话题</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action" aria-current="true"
                                v-for="(topic,i) in topicDataList" :key="i">
                                <div class="container">
                                    <div class="row align-items-start">
                                        <div class="col-1 text-center">
                                            <img :src="topic.userInfo.headPortrait.imageUrl" class="rounded-circle"
                                                style="weight:52px;height:52px;" />
                                            <span class="d-inline-block text-truncate" data-bs-toggle="popover"
                                                data-bs-trigger="hover focus" :data-bs-content="topic.userInfo.name"
                                                style="max-width: 80px;">
                                                {{topic.userInfo.name}}
                                            </span>
                                        </div>
                                        <div class="col">
                                            <h3>{{topic.rubric}}</h3>
                                            <p class="fw-bold" style="white-space: pre-wrap">{{topic.text}}</p>
                                            <div class="container text-center">
                                                <div class="row align-items-start">
                                                    <div class="col-auto" v-for="(image,i) in topic.images" :key="i">
                                                        <img class="btn rounded" :src="image" style="max-width: 320px;" data-bs-toggle="modal" data-bs-target="#showImageModal" @click="showImage(image)"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <small>{{topic.createTimeStr}}&emsp;{{topic.address}}</small>

                                            <!-- 楼中楼 -->
                                            <div class="container list-group list-group-item-primary"
                                                v-if="topic.children!=null">
                                                <div class="row align-items-start" v-for="(reply,i) in topic.children"
                                                    :key="i">
                                                    <div class="col-1 text-center">
                                                        <img :src="reply.userInfo.headPortrait.imageUrl"
                                                            class="rounded-circle" style="weight:36px;height:36px;" />
                                                        <span class="d-inline-block text-truncate"
                                                            data-bs-toggle="popover" data-bs-trigger="hover focus"
                                                            :data-bs-content="reply.userInfo.name"
                                                            style="max-width: 80px;">
                                                            {{reply.userInfo.name}}
                                                        </span>
                                                    </div>
                                                    <div class="col-1 text-center" style="width:24px;padding:0px"
                                                        v-if="topic.id!=reply.parentId">
                                                        <font-awesome-icon icon="fa-solid fa-share" />
                                                    </div>
                                                    <div class="col-1 text-center" v-if="topic.id!=reply.parentId">
                                                        <img :src="reply.replyUser.headPortrait.imageUrl"
                                                            class="rounded-circle" style="weight:36px;height:36px;" />
                                                        <span class="d-inline-block text-truncate"
                                                            data-bs-toggle="popover" data-bs-trigger="hover focus"
                                                            :data-bs-content="reply.replyUser.name"
                                                            style="max-width: 80px;">
                                                            {{reply.replyUser.name}}
                                                        </span>
                                                    </div>
                                                    <div class="col">
                                                        <h4>{{reply.rubric}}</h4>
                                                        <p class="fw-bold" style="white-space: pre-wrap">{{reply.text}}</p>
                                                        <div class="container text-center">
                                                            <div class="row align-items-start">
                                                                <div class="col-auto" v-for="(image,i) in reply.images" :key="i">
                                                                    <img class="btn rounded" :src="image" style="max-width: 120px;" data-bs-toggle="modal" data-bs-target="#showImageModal" @click="showImage(image)"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <small>{{reply.createTimeStr}}&emsp;{{reply.address}}</small>
                                                    </div>
                                                    <div class="col-auto ms-md-auto">
                                                        <span class="badge bg-primary rounded-pill ms-1"
                                                            @click="replyTopic(reply.id,false,topic.floor)">回复</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- 楼中楼 END -->

                                        </div>
                                        <div class="col-auto ms-md-auto">
                                            <span class="badge bg-success rounded-pill">#{{topic.floor}}</span>
                                            <span class="badge bg-primary rounded-pill ms-1" v-if="topic.floor>1"
                                                @click="replyTopic(topic.id,false,topic.floor)">回复</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <Page :commonPage="showCompleteTopicPage" @commonPageChange="showCompleteTopicPageChange($event)"></Page>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import { Modal, Toast, Popover } from 'bootstrap';
import { searchTopic, frozenTopic, returnTopic, getTopicReply,getTopicData } from "../api/topic";
export default {
    name: "topicManage",
    components: {
        Page,
    },
    data() {
        return {
            page: {
                size: 10,
                currentPage: 1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            topicReplyPage: { // 管理话题回复
                size: 10,
                currentPage: 1,
                totalPage: 0,
            },
            showCompleteTopicPage: { // 查看话题完整信息
                size: 10,
                currentPage: 1,
                totalPage: 0,
            },
            commonResponse: {
                success: true,
                msg: '',
            },
            searchTopicInfo: {
                text: '',
            },
            topicList: [],
            topicReplyInfoList: [],
            topicDataList: [],
            topicId:0,
        }
    },
    watch: {
        topicInfo: {
            handler() {
                this.checkTopicInfo();
            },
            deep: true,
        }
    },
    mounted() {
    },
    updated() { //更新之后.场景:获取更新真实DOM之后
        var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new Popover(popoverTriggerEl)
        });
    },
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchTopic();
        },
        topicReplyPageChange(event) { // 话题回复 modal 分页
            this.showCompleteTopicPage = event;
            this.getTopicReply();
        },
        showCompleteTopicPageChange(event) { // 查看话题 modal 分页
            this.showCompleteTopicPage = event;
            this.getTopicData();
        },
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
        searchAllTopicBtn() {
            this.page.currentPage = 1;
            this.searchTopic();
        },
        searchTopic() {
            searchTopic(Object.assign(this.page, this.searchTopicInfo)).then(
                response => {
                    this.topicList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        frozenTopic(topic,sign) {
            frozenTopic(Object.assign({
                id: topic.id
            })).then(
                response => {
                    this.showToast(response);
                    if (sign) {
                        this.searchAllTopicBtn();
                    }
                    else {
                        this.getTopicReply();
                    }
                }
            )
        },
        returnTopic(topic,sign) {
            returnTopic(Object.assign({
                id: topic.id
            })).then(
                response => {
                    this.showToast(response);
                    if (sign) {
                        this.searchAllTopicBtn();
                    }
                    else {
                        this.getTopicReply();
                    }
                }
            )
        },
        checkTopic(topic) {

        },
        topicReplyManage(topic) {
            this.topicId = topic.id;
            this.refreshTopicReply();
        },
        refreshTopicReply() { // 获取话题
            this.topicReplyPage.currentPage = 1;
            this.getTopicReply();
        },
        getTopicReply() { // 获取话题回复
            getTopicReply(Object.assign({
                id: this.topicId,
                manageMyTopic: false
            }, this.topicReplyPage)).then(
                response => {
                    this.topicReplyInfoList = response.data.data.data;
                    this.topicReplyPage.totalPage = response.data.data.totalPage;
                }
            )
        },
        showCompleteTopic(topic) {
            this.topicId = topic.id;
            this.getTopicData();
        },
        getTopicData() {
            getTopicData(Object.assign({
                id: this.topicId,
                show: false
            },this.showCompleteTopicPage)).then(
                response => {
                this.topicDataList = response.data.data.data;
                this.showCompleteTopicPage.totalPage = response.data.data.totalPage;
                }
            )
            },
    },
}
</script>