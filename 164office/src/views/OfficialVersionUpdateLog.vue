<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>

    <div class="container">

      <div class="row align-items-center">
        <div class="col">
          <div class="card text-center">
            <div class="card-header">
              <h4>官方版本更新日志</h4>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>与国际服保持同步,记录官方最新版本更新日志</p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div class="container mt-2 mb-2">
        <div class="row justify-content-center">
          <div class="col-auto">
            <input type="text" class="form-control" v-model="officialVersionUpdateLogInfo.text" placeholder="关键字">
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-dark" @click="searchOfficialVersionUpdateLogBtn()" maxlength="10">搜索</button>
          </div>
        </div>
      </div>
      
      <div class="alert alert-success text-center mb-0" role="alert">
        <h5>更新日志</h5>
      </div>
      <div class="alert alert-success" role="alert" v-for="officialVersionUpdateLog in officialVersionUpdateLogList" :key="officialVersionUpdateLog.id">
        <h4 class="alert-heading">{{officialVersionUpdateLog.name}}</h4>
        <p style="white-space: pre-wrap">{{officialVersionUpdateLog.details}}</p>
        <hr />
        <p class="card-text" v-if="officialVersionUpdateLog.note!='undefined'">{{officialVersionUpdateLog.updateTimeStr}}</p>
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
import { searchOfficialVersionUpdateLog } from "../api/officialVersionUpdateLog";
import { saveVisitLog } from "../api/welcome";
export default {
  name: "officialVersionUpdateLog",
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
      officialVersionUpdateLogList: [],
      officialVersionUpdateLogInfo:{},
    }
  },
  mounted() {
    this.page.currentPage = 1;
    this.searchOfficialVersionUpdateLog();
    saveVisitLog(Object.assign({key:13}));
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
      this.searchOfficialVersionUpdateLog();
    },
    searchOfficialVersionUpdateLogBtn() {
      this.page.currentPage = 1;
      this.searchOfficialVersionUpdateLog();
    },
    searchOfficialVersionUpdateLog() {
      searchOfficialVersionUpdateLog(Object.assign(this.officialVersionUpdateLogInfo,this.page)).then(
        response => {
          this.officialVersionUpdateLogList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
  },
};
</script>
