<template>
  <div>
    <Head ref="head" :commonResponse="commonResponseData"></Head>
    <div class="container mt-2 mb-2">
      <div class="row justify-content-center">
        <div class="col-auto">
          <input type="text" class="form-control" v-model="teamInfo.name" placeholder="战队名称">
        </div>
        <div class="col-auto">
          <input type="text" class="form-control" v-model="teamInfo.scid" placeholder="战队SCID标签">
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
              <tr v-for="(teamInfo,i) in teamInfoList" :key="i">
                <th scope="row">{{i}}</th>
                <td>{{teamInfo.scid}}</td>
                <td>{{teamInfo.name}}</td>
                <td>{{teamInfo.teamType.name }}</td>
                <td>{{teamInfo.eliminationLine}}</td>
                <td>{{teamInfo.excellentLine}}</td>
                <td>{{teamInfo.note}}</td>
                <td>
                  <span class="btn badge rounded-pill bg-primary" @click="getTeamData(teamInfo)">综合数据</span>
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
import Head from "@/components/Head.vue";
import Page from '@/components/Page.vue';

import { searchTeamInfo } from "../api/team";
import { getTeamData } from "../api/credit";
export default {
  name: "searchTeam",
  components: {
    Head,
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
      teamInfoList: [],
      teamInfo: {
        name: '',
        scid: '',
      },
    }
  },
  mounted() {
    this.searchTeamInfoBtn();
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
    searchTeamInfo() {
      searchTeamInfo(Object.assign(this.page, this.teamInfo)).then(
        response => {
          this.teamInfoList = response.data.data.data;
          this.page.totalPage = response.data.data.data.totalPage;
        }
      )
    },
    getTeamData(team) {
      getTeamData(Object.assign({
        teamId: team.id
      })).then(
        response => {
          this.teamModalData.teamName = team.name;
          this.teamModalData.competition = response.data.data.competition;
          this.teamModalData.task = response.data.data.task;
          this.$refs.head.showTeamDataModal(this.teamModalData);
        }
      );
    },
  },
};
</script>