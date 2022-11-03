<template>
  <div>
    <Top :commonResponse="commonResponseData"></Top>

    <div class="container">
      <div class="row align-items-center">
        <div class="col">
          <div class="card text-center">
            <div class="card-header">
              <h4>欢迎!</h4>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>这是一个可以协助管理你的战队并记录每次战队赛战绩的平台</p>
                <p>在社区模块里你可以(友好的)畅所欲言</p>
                <p>此外,你还可以在这里寻找优秀的队员和战队</p>
                <p>还有丰富的游戏相关的数据提供查阅和参考</p>
                <!-- <footer class="blockquote-footer">充满未知的<cite title="Source Title">野排坑王</cite></footer> -->
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="alert alert-success text-center mb-0" role="alert">
        <h5>更新日志</h5>
      </div>
      <div class="alert alert-success" role="alert" v-for="updateLog in updateLogList" :key="updateLog.id">
        <h4 class="alert-heading">{{updateLog.note}}</h4>
        <!-- <textarea class="form-control" readonly v-model="updateLog.text" rows="3"></textarea> -->
        <p style='white-space: pre-wrap;'>{{updateLog.text}}</p> <!-- 这样就不用使用难看的 textarea 了 -->
        <hr />
        <p class="card-text" v-if="updateLog.note!='undefined'">{{updateLog.createTimeStr}}</p>
      </div>
      <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
    <hr/>
  </div>
</template>


<script>
import { Popover } from "bootstrap";
import Page from '@/components/Page.vue';
import Top from "@/components/Top.vue";
import { searchUpdateLog } from "../api/updateLog";
import { saveVisitLog } from "../api/visitLog";
import {getPublicKey,encrypt} from "@/api/common"
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
    }
  },
  mounted() {
    this.page.currentPage = 1;
    this.searchUpdateLog();
    this.saveVisitLog();
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
      searchUpdateLog().then(
        response => {
          this.updateLogList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
    saveVisitLog() {
      getPublicKey().then( // 获取加密密钥
        response => {
          this.publicKey = response.data.data.publicKey;
          this.visitLogInfo.ip = returnCitySN['cip'];
          this.visitLogInfo.address = returnCitySN['cname'];
          this.visitLogInfo.note = '访问首页';
          saveVisitLog(
            encrypt(JSON.stringify(this.visitLogInfo), this.publicKey)
            // this.visitLogInfo
          ).then(
            response => {
            }
          );
        }
      )
    },
  },
};
</script>
