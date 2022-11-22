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
import { saveVisitLog } from "../api/visitLog";
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
    this.saveVisitLog();
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

          // 通过 sohu 第三方接口获取用户 ip 和 所在位置,但如果用户使用代理则位置会不准确
          // 在 index.html 中引入 js
          this.visitLogInfo.ip = returnCitySN['cip'];
          this.visitLogInfo.address = returnCitySN['cname'];

          // 这里是明文传输,也就是说你的 key 是完全暴露的,如果想不被他人使用,在上线时去开发者平台配置一下(仅指定 url 可调用)
          jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
            //重点来了
            //腾讯的api上有个callback参数，这是使用指定回调函数
            //使用vue-jsonp时这个参数需要通过callbackQuery和callbackName来设置
            //否vue-jsonp会随机生成一个callback参数这样无论怎么弄都会报签名校验失败
            // callbackQuery: 'callback', // 设置callback参数的key  不设置的话callback参数会自动被赋予一个随机值  md5校验无法通过
            // callbackName: 'jsonpCallback', // 设置callback 参数的值
            //其他参数正常传
            key: 'VQPBZ-GZIKU-QNPV7-B7MD5-PPA2F-TMBES',
            output: 'jsonp'
          }).then(res => {
            var ad_info = res.result.ad_info;
            this.visitLogInfo.trueAddress = ad_info.nation + ad_info.province + ad_info.city + ad_info.district;
            this.visitLogInfo.note = "访问首页";
            var data = encrypt(JSON.stringify(this.visitLogInfo), this.publicKey);
            saveVisitLog(
              data
            ).then(
              response => {
              }
            );
          })
        }
      )
    },
  },
};
</script>
