<template>
    <div class="tab-pane fade" id="list-replyMe" role="tabpanel" aria-labelledby="list-replyMe-list">
        <br />
        <div class="container list-group">

            <div class="row align-items-start" v-for="(reply, i) in topicList" :key="i">
                <div class="col-1 text-center">
                    <div>
                        <img :src="reply.userInfo.headPortrait.imageUrl" class="rounded-circle"
                            style="weight:36px;height:36px;" />
                    </div>
                    <div>
                        <span class="d-inline-block text-truncate" data-bs-toggle="popover"
                            data-bs-trigger="hover focus" :data-bs-content="reply.userInfo.name"
                            style="max-width: 80px;">
                            {{ reply.userInfo.name }}
                        </span>
                    </div>
                </div>
                <div class="col">
                    <div class="alert alert-secondary" role="alert">
                        {{reply.parentInfo.text}}
                    </div>
                    <h4>{{ reply.rubric }}</h4>
                    <p class="fw-bold" style="white-space: pre-wrap">{{ reply.text }}</p>
                    <small>{{ reply.createTimeStr }}&emsp;{{ reply.address }}</small>
                </div>
                <div class="col-auto ms-md-auto">
                    <span class="badge btn bg-primary rounded-pill ms-1" data-bs-toggle="modal"
                        data-bs-target="#quickReplyTopicModal" @click="replyTopic(reply, false)">回复</span>
                </div>
                <hr />
            </div>
        </div>

        <!-- 快捷回复(不需要进入话题页面) -->
        <div class="modal fade" id="quickReplyTopicModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">{{ replyTopicInfo.title }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="form-floating">
                            <div class="form-floating mb-3">
                                <textarea class="form-control" placeholder="replyTopicInfo.text"
                                    v-model="replyTopicInfo.text"></textarea>
                                <label for="floatingInput">内容</label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="quickReplyTopicModalCloseBtn"
                            data-bs-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="saveReplyTopicInfo()">发送</button>
                    </div>
                </div>
            </div>
        </div>

        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import { Modal, Toast, Popover } from 'bootstrap';
import { searchReplyMe, saveReplyTopicInfo } from "../api/topic";
export default {
    name: "replyMe",
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
            topicId: 0,
            replyTopicModalCloseBtn: true,
            replyTopicInfo: {},
        }
    },
    mounted() {
        this.searchReplyMe();
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
            this.searchReplyMe();
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
        searchReplyMeBtn() {
            this.page.currentPage = 1;
            this.searchReplyMe();
        },
        searchReplyMe() {
            searchReplyMe(this.page).then(
                response => {
                    this.topicList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        replyTopic(reply, replyTopic) {
            this.replyTopicInfo.add = true;
            this.replyTopicInfo.title = '回复';
            this.replyTopicInfo.text = '';
            this.replyTopicInfo.belongToFloor = reply.belongToFloor;
            this.replyTopicInfo.topicId = reply.topicId;
            this.replyTopicInfo.parentId = reply.id;
            this.replyTopicInfo.replyTopic = replyTopic;
        },
        saveReplyTopicInfo() {
            this.replyTopicInfo.ip = returnCitySN['cip'];
            this.replyTopicInfo.address = returnCitySN['cname'];
            saveReplyTopicInfo(this.replyTopicInfo).then(
                response => {
                    document.getElementById("quickReplyTopicModalCloseBtn").click();
                    this.showToast(response);
                    this.searchReplyMeBtn();
                }
            )
        },
    },
}
</script>