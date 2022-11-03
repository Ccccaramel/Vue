<template>
  <div>
    <Top :commonResponse="commonResponseData"></Top>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col">

          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action" aria-current="true" v-for="(topic,i) in topicDataList" :key="i">
              <div class="container">
                <div class="row align-items-start">
                  <div class="col-1 text-center">
                    <img :src="topic.userInfo.headPortrait.imageUrl" class="rounded-circle" style="weight:52px;height:52px;" />
                    <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus" :data-bs-content="topic.userInfo.name" style="max-width: 80px;">
                      {{topic.userInfo.name}}
                    </span>
                  </div>
                  <div class="col">
                    <h3>{{topic.rubric}}</h3>
                    <!-- <span class="d-inline-block text-truncate">
                      {{topic.text}}
                    </span> -->
                    <p class="fw-bold" style="white-space: pre-wrap">{{topic.text}}</p>
                    <!-- <br /> -->
                    <small>{{topic.createTimeStr}}&emsp;{{topic.address}}</small>

                    <!-- 楼中楼 -->
                    <div class="container list-group list-group-item-primary" v-if="topic.children!=null">
                      <div class="row align-items-start" v-for="(reply,i) in topic.children" :key="i">
                        <div class="col-1 text-center">
                          <img :src="reply.userInfo.headPortrait.imageUrl" class="rounded-circle" style="weight:36px;height:36px;" />
                          <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus" :data-bs-content="reply.userInfo.name" style="max-width: 80px;">
                            {{reply.userInfo.name}}
                          </span>
                        </div>
                        <div class="col-1 text-center" style="width:24px;padding:0px" v-if="topic.id!=reply.parentId">
                          <font-awesome-icon icon="fa-solid fa-share" />
                        </div>
                        <div class="col-1 text-center" v-if="topic.id!=reply.parentId">
                          <img :src="reply.replyUser.headPortrait.imageUrl" class="rounded-circle" style="weight:36px;height:36px;" />
                          <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus" :data-bs-content="reply.replyUser.name" style="max-width: 80px;">
                            {{reply.replyUser.name}}
                          </span>
                        </div>
                        <div class="col">
                          <h4>{{reply.rubric}}</h4>
                          <p class="fw-bold" style="white-space: pre-wrap">{{reply.text}}</p>
                          <small>{{reply.createTimeStr}}&emsp;{{reply.address}}</small>
                        </div>
                        <div class="col-auto ms-md-auto">
                          <span class="badge bg-primary rounded-pill ms-1" @click="replyTopic(reply.id,false,topic.floor)">回复</span>
                        </div>
                      </div>
                    </div>
                    <!-- 楼中楼 END -->

                  </div>
                  <div class="col-auto ms-md-auto">
                    <span class="badge bg-success rounded-pill">#{{topic.floor}}</span>
                    <span class="badge bg-primary rounded-pill ms-1" v-if="topic.floor>1" @click="replyTopic(topic.id,false,topic.floor)">回复</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>
    <!-- 回复话题 -->
    <div class="modal fade" id="replyTopicModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{{replyTopicInfo.title}}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="form-floating">
              <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="replyTopicInfo.text" v-model="replyTopicInfo.text"></textarea>
                <label for="floatingInput">内容</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="replyTopicModalCloseBtn"
              data-bs-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="saveReplyTopicInfo()">发送</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部分页 -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col">
          <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
        </div>
      </div>
    </div>
    <!-- 悬浮按钮 -->
    <nav class="navbar fixed-bottom" style="width:96px;margin-left: 90%;">
      <div class="container-fluid btn" @click="replyTopic(topicId,true)">
        <font-awesome-icon icon="fa-regular fa-comment-dots" size="3x" />
      </div>
      <div class="container-fluid btn" @click="refresh()">
        <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" size="3x" />
      </div>
    </nav>
  </div>
</template>
<script>
import { Modal, Toast, Popover } from 'bootstrap';

import { useRoute } from 'vue-router';

import Top from "@/components/Top.vue";
import Page from '@/components/Page.vue';

import { checkToken } from "@/api/user";
import { getTopicData, saveReplyTopicInfo } from "@/api/topic";
export default {
  name: "replyTopicInfo",
  components: {
    Top,
    Page,
  },
  data() {
    return {
      commonResponseData: { // 通用 Modal 弹窗数据
        success: true,
        msg: '',
      },
      topicId: 0,
      page: { // 通用 Page
        size: 10,
        currentPage: 1, // 偏移量,数据库从0开始
        totalPage: 0,
      },
      route : useRoute(),
      replyTopicInfo: {
        add: true,
        title: '',
        parentId: 0,
        id: 0,
        topicId: 0,
        text: '', // 内容
        replyTopic: true,
        ip: '',
        address: '',
      },
      topicDataList: [],
    }
  },
  created() {
    this.topicId = this.$route.params.id;
    this.replyTopicInfo.id = this.$route.params.id;
    this.refresh();
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
    commonPageChange(event) {
      this.page = event;
      this.getTopicData();
    },
    showToast(response) { // 通用信息展示
      if (response.data.code == 0) {
        this.commonResponseData.success = false;
      } else {
        this.commonResponseData.success = true;
      }
      this.commonResponseData.msg = response.data.msg;
      this.$emit('commonResponse', this.commonResponse);
      var toastLive = document.getElementById('commonToast');
      var toast = new Toast(toastLive);
      toast.show();
    },
    refresh() {
      this.page.currentPage = 1;
      this.getTopicData();
    },
    getTopicData() {
      getTopicData(Object.assign({
        id: this.topicId,
        show: true
      },this.page)).then(
        response => {
          this.topicDataList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
    /**
     * replyTopic
     *   T: 话题回复
     *   F: 楼中楼
     **/
    replyTopic(parentId,replyTopic,belongToFloor) {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 0) {
              this.commonResponse.msg = "请先登录!";
              this.showToast(response);
            };
            this.replyTopicInfo.add = true;
            this.replyTopicInfo.title = '回复';
            this.replyTopicInfo.text = '';
            this.replyTopicInfo.belongToFloor = belongToFloor;
            this.replyTopicInfo.topicId = this.topicId;
            this.replyTopicInfo.replyTopic = replyTopic;
            this.replyTopicInfo.parentId = parentId;
            var replyTopicModal = document.getElementById('replyTopicModal');
            var modal = new Modal(replyTopicModal);
            modal.show();
          }
        )
      } else {
        var response = {
          data: {
            code: 0,
            msg: '可是你还没有登录...',
          },
        }
        this.showToast(response);
      }
    },
    saveReplyTopicInfo() {
      this.replyTopicInfo.ip = returnCitySN['cip'];
      this.replyTopicInfo.address = returnCitySN['cname'];
      saveReplyTopicInfo(this.replyTopicInfo).then(
        response => {
          document.getElementById("replyTopicModalCloseBtn").click();
          this.showToast(response);
          this.refresh();
        }
      )
    }
  },
};
</script>