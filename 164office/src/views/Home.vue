<template>
  <div>
    <Top :commonResponse="commonResponseData"></Top>

    <div class="container">
      <div class="row align-items-center">
        <div class="col">
          <div class="card text-center">
            <div class="card-header">
              <h4>欢迎来到<Strong>ding!office!</Strong>🥂</h4>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>可以写写博客，玩玩小游戏，没了</p>
                <footer class="blockquote-footer">建议手机横屏操作，PC/平板浏览最佳</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div class="row align-items-center">
        <div class="col">
          <div class="card text-center">
            <div class="card-header">
              <h4>首页通知!</h4>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>{{homeNotice.v}}</p>
                <footer class="blockquote-footer">{{homeNotice.updateTimeStr}}</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="alert alert-success text-center mb-0" role="alert">
        <h5>平台日志</h5>
      </div>
      <div class="alert alert-success" role="alert" v-for="updateLog in updateLogList" :key="updateLog.id">
        <h4 class="alert-heading">{{ updateLog.note }}</h4>
        <!-- <textarea class="form-control" readonly v-model="updateLog.text" rows="3"></textarea> -->
        <p style='white-space: pre-wrap;'>{{ updateLog.text }}</p> <!-- 这样就不用使用难看的 textarea 了 -->
        <hr />
        <p class="card-text" v-if="updateLog.note != 'undefined'">{{ updateLog.createTimeStr }}</p>
      </div>
      <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
    <hr />
  </div>
</template>


<script>
import { Popover } from "bootstrap";
import Page from '@/components/Page.vue';
import Top from "@/components/Top.vue";
import { searchUpdateLog } from "../api/updateLog";
import { saveVisitLog } from "../api/welcome";
import { getPublicKey, encrypt,decrypt,getBrowserType } from "@/api/common";
import { getHomeNotice } from "../api/systemConfig";
import { jsonp } from 'vue-jsonp';

export default {
  name: "home",
  components: {
    Top,
    Page
  },
  data() {
    return {
      page: {
        size: 10,
        currentPage: 1, // 偏移量,数据库从0开始
        totalPage: 0,
      },
      commonResponseData: { // Modal 弹窗数据
        success: true,
        msg: '',
      },
      updateLogList: [],
      visitLogInfo: {},
      publicKey: '',
      privateKey: '',
      ip: '',
      homeNotice:{},
    }
  },
  mounted() {
    this.page.currentPage = 1;
    this.searchUpdateLog();
    saveVisitLog(Object.assign({key:0}));
    getHomeNotice().then(
      response => {
        this.homeNotice = response.data.data;
      }
    )
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
    commonPageChange(event) { // 通用分页
      this.page = event;
      this.searchUpdateLog();
    },
    searchUpdateLog() {
      searchUpdateLog(Object.assign(this.page)).then(
        response => {
          this.updateLogList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
  },
};
</script>
