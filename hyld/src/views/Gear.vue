<template>
  <div>
    <Top :commonResponse="commonResponseData"></Top>

    <div class="container">
      <div class="alert alert-success  text-center" role="alert">
        <h4 class="alert-heading">强化配件</h4>
      </div>
      <hr />

      
      <div class="alert mb-0" role="alert" v-for="gear in gearList" :key="gear.id">
        <div class="shadow p-3 bg-body rounded">
        <h4 class="alert-heading">{{gear.name}}</h4>
        <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
          <div class="btn-group" role="group" aria-label="First group">
            <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
              <Strong v-if="gear.rarity!=null">品质:{{gear.rarity.name}}</Strong>
              <p style="white-space: pre-wrap">{{gear.details}}</p>
            </div>
          </div>
          <div class="input-group">
            <img :src="gear.oneLevelImgUrl" class="rounded-2" style="height:64px;" />
            <img v-if="gear.twoLevelImg!=''" :src="gear.twoLevelImgUrl" class="rounded-2" style="height:64px;" />
            <img v-if="gear.threeLevelImg!=''" :src="gear.threeLevelImgUrl" class="rounded-2" style="height:64px;" />
          </div>
        </div>
        <hr />
        <p class="card-text" v-if="gear.note!='undefined'">上线时间:{{gear.launchTimeStr}}</p>
      </div>
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
import { searchGear } from "../api/gear";
export default {
  name: "gear",
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
      gearList: [],
    }
  },
  mounted() {
    this.page.currentPage = 1;
    this.searchGear();
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
      this.searchGear();
    },
    searchGear() {
      searchGear(this.page).then(
        response => {
          this.gearList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
  },
};
</script>
