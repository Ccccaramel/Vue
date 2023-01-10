<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>
    <div class="container mt-2 mb-2">
      <div class="row justify-content-center">
        <div class="col-auto">
          <input type="text" class="form-control" v-model="uwtInfo.teamName" placeholder="战队名称"  maxlength="10">
        </div>
        <div class="col-auto">
          <input type="text" class="form-control" v-model="uwtInfo.teamScid" placeholder="战队SCID标签" maxlength="15">
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
                <th scope="col">战队简介</th>
                <th scope="col">操作</th>
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
                <td>
                  <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="uwtInfo.team.note" style="max-width: 300px;">
                    {{uwtInfo.team.note}}
                  </span>
                </td>
                <td>
                  <span class="btn badge rounded-pill bg-primary" @click="getTeamData(uwtInfo)">综合数据</span>
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
      teamModalData: { // 通用战队 Modal 弹窗数据
        teamName: '',
        competition: [],
        task: []
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
      },
    }
  },
  watch: {
    uwtInfo: {
      handler: function (oldVal, newVal) {
        console.log(JSON.stringify(oldVal)+","+JSON.stringify(newVal));
        this.checkUwtInfo();
      },
      deep: true
    },
  },
  mounted() {
    this.searchTeamInfoBtn();
    this.$refs.top.saveVisitLog("访问【搜索战队】");
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
          this.teamModalData.teamName = uwtInfo.team.name;
          this.teamModalData.competition = response.data.data.competition;
          this.teamModalData.task = response.data.data.task;
          this.$refs.top.showTeamDataModal(this.teamModalData);
        }
      );
    },
    checkUwtInfo() {
      this.uwtInfo.teamScid =this.uwtInfo.teamScid.toLocaleUpperCase();
    },
  },
};
</script>