<template>
  <div>
    <Top :commonResponse="commonResponseData"></Top>
    <div class="container">

      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">欢迎来到社区!</h4>
        <hr/>
        <p>在这里,友好地与大家交流吧</p>
      </div>

      <div class="row justify-content-center">
        <div class="col">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action" aria-current="true"
              v-for="(topic,i) in topicList" :key="i" @click="browseTopic(topic.id)">
              <div class="container">
                <div class="row align-items-start">
                  <div class="col-1 text-center">
                    <img :src="topic.userInfo.headPortrait.imageUrl" class="rounded-circle"
                      style="weight:52px;height:52px;" />
                    <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus"
                      :data-bs-content="topic.userInfo.name" style="max-width: 80px;">
                      {{topic.userInfo.name}}
                    </span>
                  </div>
                  <div class="col">
                    <h4>{{topic.rubric}}</h4>
                    <span class="d-inline-block text-truncate" style="max-width: 900px;">
                      {{topic.text}}
                    </span>
                    <br />
                    <small>发表于:{{topic.createTimeStr}}&emsp;{{topic.address}}</small>
                  </div>
                  <div class="col-auto ms-md-auto">
                    <span class="badge bg-primary rounded-pill">{{topic.head}}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增话题 -->
    <div class="modal fade" id="addTopicModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">{{topicInfo.title}}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="form-floating">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" placeholder="topicInfo.rubric" v-model="topicInfo.rubric">
                <label for="floatingInput">标题</label>
              </div>
              <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="topicInfo.text" v-model="topicInfo.text"></textarea>
                <label for="floatingInput">内容</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="saveTopicModalCloseBtn"
              data-bs-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="saveTopic()">发送</button>
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
    <!-- 发表话题 -->
    <nav class="navbar fixed-bottom" style="width:96px;margin-left: 80%;">
      <div class="container-fluid btn" @click="editTheme()">
        <font-awesome-icon icon="fa-solid fa-circle-plus" size="3x" />
      </div>
      <div class="container-fluid btn" @click="refresh()">
        <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" size="3x" />
      </div>
    </nav>
  </div>
</template>
<script>
import {  Toast, Popover } from 'bootstrap';
import { useRouter } from "vue-router"; //引入useRouter
import Top from "@/components/Top.vue";
import Page from '@/components/Page.vue';

import { checkToken } from "@/api/user";
import { searchTopic, saveTopic } from "@/api/topic";
export default {
  name: "community",
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
      page: { // 通用 Page
        size: 10,
        currentPage: 1, // 偏移量,数据库从0开始
        totalPage: 0,
      },
      topicInfo: {
        add: true,
        title: '',
        rubric: '', // 标题
        text: '', // 内容
        ip: '',
        address: '',
      },
      topicList: [],
      // router: useRouter(),
    }
  },
  mounted() {
    this.refresh();
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
      this.searchTopic();
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
      this.searchTopic();
    },
    searchTopic() {
      searchTopic(Object.assign({
        show:true,
      },this.page)).then(
        response => {
          this.topicList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
    editTheme() {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 0) {
              this.commonResponse.msg = "请先登录!";
              this.showToast(response);
            };
            this.topicInfo.add = true;
            this.topicInfo.title = '发表话题';
            this.topicInfo.rubric = '';
            this.topicInfo.text = '';
            var addTopicModal = document.getElementById('addTopicModal');
            var modal = new Modal(addTopicModal);
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
    saveTopic() {
      this.topicInfo.ip = returnCitySN['cip'];
      this.topicInfo.address = returnCitySN['cname'];
      saveTopic(this.topicInfo).then(
        response => {
          document.getElementById("saveTopicModalCloseBtn").click();
          this.showToast(response);
        }
      )
    },
    // browseTopic(id) { // 打开一个新页面
    //   const { href } = this.router.resolve({
    //     name: 'topicInfo',
    //     params: {
    //       id: id
    //     }
    //   });
    //   window.open(href, "_blank");
    // },
  },
  // vue3是在setup中进行的,且要引入 useRoute 和useRouter
  setup() {
    const router = useRouter();
    let browseTopic = (id) => {
      let { href } = router.resolve({
        name: "topicInfo",
        params: {
          id: id,
        },
      });
      window.open(href, "_blank");
    };
    // let params = () => {
    //   $router.push({
    //     name: "About",
    //     params: {
    //       id: 1,
    //       aa: "nini",
    //     },
    //   });
    // };
    // let query = () => {
    //   $router.push({
    //     path: "/about",
    //     query: {
    //       id: 2,
    //       age: 13,
    //     },
    //   });
    // };
    return {
      // params,
      // query,
      browseTopic,
    };
  },
};
</script>