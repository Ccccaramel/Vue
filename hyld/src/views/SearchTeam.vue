<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>
    <div class="container mt-2 mb-2">
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">漫江碧透，百舸争流。</h4>
        <hr/>
        <!-- <p>以前招队员：总揽英雄，思贤如渴。</p> -->
        <!-- <p>以前找战队：绕树三匝，何枝可依？</p> -->
        <!-- <p>想加入一个优秀的战队？无论是国服还是国际服，活跃战队任你挑。</p> -->
        <!-- <p>想让他人了解你的战队？入驻本平台录入战队赛，高手必不请自来。</p> -->
        <p>注：搜索结果是依据战队管理者在本平台的活跃度来排序。</p>
      </div>

      <div class="row justify-content-center">
        <div class="col-auto">
          <input type="text" class="form-control" v-model="uwtInfo.teamName" placeholder="战队名称"  maxlength="10">
        </div>
        <div class="col-auto">
          <input type="text" class="form-control" v-model="uwtInfo.teamScid" placeholder="战队SCID标签" maxlength="15">
        </div>
        <div class="col-auto">
          <input type="number" class="form-control" v-model="uwtInfo.eliminationLine" placeholder="淘汰线" maxlength="2">
        </div>
        <!-- 战队类型 -->
        <div class="col-auto">
          <select class="form-select" v-model="uwtInfo.teamType">
              <option v-for="teamType in teamTypeList" :key="teamType.id"
                  :value="teamType.id">{{ teamType.name }}</option>
          </select>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-dark" @click="searchTeamInfo()">搜索</button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row text-center">
        <div class="col">
          <table class="table table-light">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">战队SCID</th>
                <th scope="col">战队名称</th>
                <th scope="col">战队所在服</th>
                <th scope="col">淘汰线</th>
                <th scope="col">优高线</th>
                <th scope="col" style="width: 50%;">战队简介</th>
                <th scope="col">战队赛</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(uwtInfo,i) in uwtInfoList" :key="i">
                <th scope="row">{{i}}</th>
                <td>{{uwtInfo.team.scid}}</td>
                <td>{{uwtInfo.team.name}}</td>
                <td>{{uwtInfo.team.type.name }}</td>
                <td>{{uwtInfo.team.eliminationLine}}</td>
                <td>{{uwtInfo.team.excellentLine}}</td>
                <td>{{uwtInfo.team.note}}</td>
                <!-- <td>
                  <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="uwtInfo.team.note" style="max-width: 300px;">
                    {{uwtInfo.team.note}}
                  </span>
                </td> -->
                <td>
                  <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#trendModal" @click="getTeamData(uwtInfo)">综合数据</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="container">
      <div class="row text-center">
        <div class="col">
          <div class="dropdown-divider"></div>
          <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Popover } from "bootstrap";
import Top from "@/components/Top.vue";
import Page from '@/components/Page.vue';
import { saveVisitLog } from "../api/welcome";
import { getTeamType } from "../api/dictionary";
import { searchValidTeamInfo } from "../api/userWithTeam";
import { getTeamData } from "../api/credit";
export default {
  name: "searchTeam",
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
      trendModalData: { // 通用战队 Modal 弹窗数据
        title: '',
        data: []
      },
      page: { // 通用 Page
        size: 10,
        currentPage: 1, // 偏移量,数据库从0开始
        totalPage: 0,
      },
      uwtInfoList: [],
      uwtInfo: {
        teamName: '',
        teamScid: '',
        teamType: '',
      },
      teamTypeList: [], // 战队类型
    }
  },
  watch: {
    uwtInfo: {
      handler: function (oldVal, newVal) {
        // console.log(JSON.stringify(oldVal)+","+JSON.stringify(newVal));
        this.checkUwtInfo();
      },
      deep: true
    },
  },
  mounted() {
    getTeamType().then(
      response => {
        this.teamTypeList = response.data.data;
        this.teamTypeList.unshift({
            id: '',
            name:'无限制'
        });
      }
    );
    this.searchTeamInfoBtn();
    saveVisitLog(Object.assign({key:17}));
    // var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    // var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    //   return new Popover(popoverTriggerEl)
    // });
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
    commonPageChange(event) {
      this.page = event;
      this.searchPlayerInfoBtn();
    },
    searchTeamInfoBtn() {
      this.page.currentPage = 1;
      this.searchTeamInfo();
    },
    /**
     * 仅搜索已关联并验证通过的战队的 team 信息,而不是所有的 team 信息
     */
    searchTeamInfo() {
      searchValidTeamInfo(Object.assign(this.page, this.uwtInfo)).then(
        response => {
          this.uwtInfoList = response.data.data.data;
          this.page.totalPage = response.data.data.data.totalPage;
        }
      )
    },
    getTeamData(uwtInfo) {
      getTeamData(Object.assign({
        uwtId: uwtInfo.id
      })).then(
        response => {
          this.trendModalData.title = uwtInfo.team.name;
          // this.trendModalData.time = Date.parse(new Date());
          this.trendModalData.data = [];
          this.trendModalData.data.push({
              name: '战队联赛周',
              id: 1, // 待优化
              data: response.data.data.competition
          });
          this.trendModalData.data.push({
              name: '战队任务周',
              id: 2,
              data: response.data.data.task
          });
          this.$refs.top.showTrendModal(this.trendModalData);
        }
      );
    },
    checkUwtInfo() {
      this.uwtInfo.teamScid = this.uwtInfo.teamScid.toLocaleUpperCase();
      if (this.uwtInfo.eliminationLine<0 || this.uwtInfo.eliminationLine>63) {
        this.uwtInfo.eliminationLine = '';
      }
    },
  },
};
</script>