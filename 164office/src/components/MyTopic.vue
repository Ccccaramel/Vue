<template>
    <div class="tab-pane fade" id="list-myTopic" role="tabpanel" aria-labelledby="list-myTopic-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="标题" v-model="searchMyTopicInfo.rubric" maxlength="10">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchMyTopicBtn()">搜索</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert">
                <h4><span class="badge rounded-pill bg-primary "></span></h4>
            </caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">标题</th>
                    <th scope="col">正文</th>
                    <th scope="col">图片</th>
                    <th scope="col">发表时间</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(topic, index) in topicList" :key="topic.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover"
                            data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="topic.rubric==''?' ':topic.rubric"
                            style="max-width: 300px;">
                            {{ topic.rubric }}
                        </span>
                    </td>
                    <td>
                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover"
                            data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="topic.text==''?' ':topic.text"
                            style="max-width: 300px;">
                            {{ topic.text }}
                        </span>
                    </td>
                    <td>
                        <img class="btn rounded" v-for="(image,i) in topic.images" :key="i" :src="image" style="max-width: 64px;"/>
                    </td>
                    <td>{{ topic.createTimeStr }}</td>
                    <td>{{ topic.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-danger" @click="deleteTopic(topic,true)">删除</span>
                        <span class="btn badge rounded-pill bg-primary ms-1" data-bs-toggle="modal"
                            data-bs-target="#myTopicReplyManageModal" @click="myTopicReplyManage(topic)">管理回复</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>

        <!-- 话题回复管理 -->
        <div class="modal fade" id="myTopicReplyManageModal" tabindex="-1" aria-hidden="true">
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
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(topicReplyInfo, index) in topicReplyInfoList" :key="topicReplyInfo.id">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ topicReplyInfo.userInfo.name }}</td>
                                    <td>
                                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover"
                                            data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="topicReplyInfo.text==''?' ':topicReplyInfo.text"
                                            style="max-width: 300px;">
                                            {{ topicReplyInfo.text }}
                                        </span>
                                    </td>
                                    <td>
                                        <img class="btn rounded" v-for="(image,i) in topicReplyInfo.images" :key="i" :src="image" style="max-width: 64px;"/>
                                    </td>
                                    <td>{{ topicReplyInfo.createTimeStr }}</td>
                                    <td>
                                        <span class="btn badge rounded-pill bg-danger" @click="deleteTopic(topicReplyInfo,false)">删除</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Page :commonPage="myTopicReplyPage" @commonPageChange="myTopicReplyPageChange($event)"></Page>
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
import { searchMyTopic, deleteTopic,getTopicReply } from "../api/topic";
export default {
    name: "myTopic",
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
            myTopicReplyPage: { // 管理话题回复
                size: 10,
                currentPage: 1,
                totalPage: 0,
            },
            commonResponse: {
                success: true,
                msg: '',
            },
            searchMyTopicInfo: {
                text: '',
            },
            topicList: [],
            topicReplyInfoList:[],
            topicId:0, // 管理话题回复时需要存储起来
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
            this.searchMyTopic();
        },
        myTopicReplyPageChange(event) { // 管理话题回复 modal 分页
            this.myTopicReplyPage = event;
            this.getTopicReply();
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
        searchMyTopicBtn() {
            this.page.currentPage = 1;
            this.searchMyTopic();
        },
        searchMyTopic() {
            searchMyTopic(Object.assign(this.page, this.searchMyTopicInfo)).then(
                response => {
                    this.topicList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        deleteTopic(topic,sign) {
            deleteTopic(Object.assign({
                id: topic.id
            })).then(
                response => {
                    this.showToast(response);
                    if (sign) {
                        this.searchMyTopicBtn();
                    } else {
                        this.refreshMyTopicReply();
                    }
                }
            )
        },
        myTopicReplyManage(topic) {
            this.topicId = topic.id;
            this.refreshMyTopicReply();
        },
        refreshMyTopicReply() {
            this.myTopicReplyPage.currentPage = 1;
            this.getTopicReply();
        },
        getTopicReply() {
            getTopicReply(Object.assign({
                id: this.topicId,
                manageMyTopic: true
            },this.myTopicReplyPage)).then(
                response => {
                    this.topicReplyInfoList = response.data.data.data;
                    this.myTopicReplyPage.totalPage = response.data.data.totalPage;
                }
            )
        },

    },
}
</script>