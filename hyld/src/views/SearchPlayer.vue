<template>
  <div>
    <Head :commonResponse="commonResponseData"></Head>

    <div class="container mt-2 mb-2">
      <div class="row justify-content-center">
        <div class="col-auto">
            <input type="text" class="form-control" v-model="playerInfo.scid" placeholder="队员SCID标签">
        </div>
        <div class="col-auto">
            <input type="text" class="form-control" v-model="playerInfo.name" placeholder="队员名称">
        </div>
        <div class="col-auto">
            <button type="button" class="btn btn-dark" @click="searchPlayerInfoBtn()">搜索</button>
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
                <th scope="col">玩家SCID</th>
                <th scope="col">玩家名称</th>
                <th scope="col">所在服</th>
                <th scope="col">备注信息</th>
                <th scope="col">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(playerInfo,i) in playerInfoList" :key="i">
                <th scope="row">{{i}}</th>
                <td>{{playerInfo.scid}}</td>
                <td>{{playerInfo.name}}</td>
                <td>{{playerInfo.playerType.name}}</td>
                <td>{{playerInfo.note}}</td>
                <td>
                  <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#playerAllCreditRecordModal" @click="searchCreditBy(playerInfo)">查看战队赛战绩</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


    <div class="container">
      <div class="row justify-content-center">
        <div class="col">
          <Page :commonPage="page"  @commonPageChange="commonPageChange($event)"></Page>
          <!-- 弹窗 -->
          <div class="modal fade" id="playerAllCreditRecordModal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title"><span class="badge rounded-pill bg-dark">{{playerMemberName}}</span>的积分记录</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                          <table class="table table-sm">
                              <thead>
                                  <tr>
                                      <th scope="col">结算时间</th>
                                      <th scope="col">积分</th>
                                      <th scope="col">积分类型</th>
                                      <th scope="col">备注信息</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="playerCredit in playerCreditList" :key="playerCredit.id">
                                      <th>{{playerCredit.settlementTimeStr}}</th>
                                      <td>{{playerCredit.credit}}</td>
                                      <td>{{playerCredit.creditType.name}}</td>
                                      <td>{{playerCredit.note}}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Head from "@/components/Head.vue";
import Page from '@/components/Page.vue';
import { searchPlayerInfo } from "../api/player";
import { searchCreditBy } from "../api/credit";
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
      page: { // 通用 Page
          size: 10,
          currentPage:1, // 偏移量,数据库从0开始
          totalPage: 0,
      },
      playerInfoList: [],
      playerCreditList: [],
      playerMemberName: '',
      playerInfo: {
        scid: '',
        name: '',
      },
    }
  },
  mounted() {
    this.searchPlayerInfo();
  },
  methods: {
    commonPageChange(event) {
        this.page = event;
        this.searchPlayerInfo();
    },
    searchPlayerInfoBtn() {
      this.page.currentPage = 1;
      this.searchPlayerInfo();
    },
    searchPlayerInfo() {
      searchPlayerInfo(Object.assign(this.page,this.playerInfo)).then(
        response => {
          this.playerInfoList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
    searchCreditBy(playerInfo){
        this.playerMemberName=playerInfo.name;
        searchCreditBy(Object.assign({
            playerId:playerInfo.id
        })).then(
          response=>{
            this.playerCreditList = response.data.data.data;
          }
        )
    },
  },
};
</script>