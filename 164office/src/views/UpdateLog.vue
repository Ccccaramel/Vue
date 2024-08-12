<template>
  <div>

    <Top ref="top" :commonResponse="commonResponseData"></Top>

    <div class="alert text-center mb-0" role="alert">
      <h3><span class="badge rounded-pill text-bg-primary">平台更新日志</span></h3>
      <!-- <h3 class="ding-text-5"><strong>平台更新日志</strong></h3> -->
    </div>

    <div class="container">
      <div class="row align-items-center">
        <div class="col">

          <!-- 平台更新日志 -->
          <div class="alert border-1" role="alert" v-for="updateLog in updateLogList" :key="updateLog.id">
            <!-- <h4 class="alert-heading">{{ updateLog.note }}</h4> -->
            <h5><strong><font-awesome-icon :icon="['fas', 'file-signature']" style="color: #8accff;" /> &nbsp;{{ updateLog.note }}</strong></h5>
            <p style='white-space: pre-wrap;'>{{ updateLog.text }}</p>
            <hr />
            <p class="card-text" v-if="updateLog.note != 'undefined'">{{ updateLog.createTimeStr }}</p>
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

  </div>
</template>
<script>
import { Toast } from 'bootstrap';
import Top from "@/components/Top.vue";
import { useRouter } from "vue-router"; //引入useRouter
import Page from '@/components/Page.vue';
import { saveVisitLog } from "../api/welcome";
import { searchUpdateLog } from "../api/updateLog";
export default {
  name: "updateLog",
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
      router: useRouter(),
      updateLogList: [],
    }
  },
  mounted() {
    document.title = "平台更新日志";
    saveVisitLog(Object.assign({key:28}));
    this.searchUpdateLog();
  },
  methods: {
    commonPageChange(event) {
      this.page = event;
      this.searchUpdateLog();
    },
    showToast(response) {  // 通用信息展示
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