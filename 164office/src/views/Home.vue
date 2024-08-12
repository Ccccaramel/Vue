<template>
  <div class="h-100 ding-text" style="display: flex; flex-direction: column;">
    <div style="flex: 0;">
      <Top :commonResponse="commonResponseData"></Top>
    </div>

    <!-- nohup java -Djasypt.encryptor.password=? -jar ?.jar & -->

    <div class="container text-center" style="flex: 1;">
      <div class="row justify-content-center" style="height:100%">
        <div class="col-6 align-self-center">

            <main class="px-3">
              <h1>Hi！Welcome to 164office!</h1>
              <p class="lead" id="revealText"></p>
              <p class="lead">
                <a href="/updateLog" class="btn btn-lg btn-light fw-bold border-black bg-white">更新日志</a>
              </p>
            </main>

        </div>
      </div>
    </div>


    <div style="flex: 0;">
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col">
            <footer class="mt-auto text-black-50">
              <p><span class="text-black fw-bold">164office</span> All Rights Reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>



  <!-- <div class="cover-container d-flex w-100 p-3 mx-auto flex-column bg-dark">
    <main class="px-3 h-100">
      <h1>Cover your page.</h1>
      <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the
        text, and add your own fullscreen background photo to make it your own.</p>
      <p class="lead">
        <a href="#" class="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</a>
      </p>
    </main>

    <footer class="mt-auto text-white-50">
      <p>Cover template for <a href="https://getbootstrap.com/" class="text-white">Bootstrap</a>, by <a
          href="https://twitter.com/mdo" class="text-white">@mdo</a>.</p>
    </footer>
  </div> -->

    <!-- <div class="container">
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
        <p style="white-space: pre-wrap;">{{ updateLog.text }}</p>
        <hr />
        <p class="card-text" v-if="updateLog.note != 'undefined'">{{ updateLog.createTimeStr }}</p>
      </div>
      <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
      <hr />
    </div> -->
    
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
      homeNotice: {},
      intervalId: null, // 用于存储 setInterval 的 ID
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
    );
    // this.revealText();  // 方法一
    this.showText();  // 方法二
    document.title = "ding！office！";
  },
  updated() {  // 更新之后.场景:获取更新真实DOM之后
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
    revealText() {
      if (!this.intervalId) {
        this.intervalId = setInterval(this.customFunction, 100); // 每秒执行一次
      }
    },
    customFunction() {
      const text = "这是一个普通的个人平台，在这里你可以写写博客，听听歌，在线聊天，玩玩小游戏，此外还包含简易记账本，以及BS数据参考";
      const textElement = document.getElementById("revealText");
      var len = textElement.innerHTML==null?"":textElement.innerHTML.length;
      if (len<text.length) {
        textElement.innerHTML = textElement.innerHTML+text[len];
      }
      else {
        clearInterval(this.intervalId);
      }
    },
    showText() {
      const text = "这是一个普通的个人平台，在这里你可以写写博客，听听歌，在线聊天，玩玩小游戏，此外还包含简易记账本，以及BS数据参考";
      const textElement = document.getElementById("revealText");
      var len = textElement.innerHTML.length;  // 获取以显示的文本长度
      if (len<text.length) {  // 比较总长度
        textElement.innerHTML = textElement.innerHTML + text[len];
        setTimeout(() => {
          this.showText();
        }, 50);
      }
    },
  },
};
</script>
<style>
  .fade-in-text {  
  opacity: 0; /* 初始状态为透明 */  
  transition: opacity 2s ease-in-out; /* 过渡效果，透明度在2秒内平滑变化 */  
} 
</style>