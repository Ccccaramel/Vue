<template>
  <div>

    <Top ref="top" :commonResponse="commonResponseData"></Top>

    <br/>

    <div class="container">
      <div class="row justify-content-start">
        <div class="col-auto" v-for="superBag in superBagList" :key="superBag.id">
          <div class="shadow p-3 mb-3 bg-body-tertiary rounded">
            <strong style="cursor:pointer;" @click="goLink(superBag.link)">{{ superBag.name }}</strong>
            &nbsp;
            <font-awesome-icon :icon="['fas', 'circle-info']" style="color: #74C0FC;" 
              tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" :data-bs-content="superBag.note"/>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部分页 -->
    <!-- <div class="container">
      <div class="row justify-content-center">
        <div class="col">
          <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
        </div>
      </div>
    </div> -->

  </div>
</template>
<script>
import { Modal, Toast, Popover } from 'bootstrap';
import Top from "@/components/Top.vue";
import { useRouter } from "vue-router"; //引入useRouter
import Page from '@/components/Page.vue';
import { searchSuperBag } from "../api/superBag";
export default {
  name: "superBagInfo",
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
        size: 100,
        currentPage: 1, // 偏移量,数据库从0开始
        totalPage: 0,
      },
      router: useRouter(),
      superBagList: [],
    }
  },
  mounted() {
    document.title = "百宝箱";
    this.searchSuperBag();
  },
  methods: {
    commonPageChange(event) {
      this.page = event;
      this.searchSuperBag();
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
    searchSuperBag() {
      searchSuperBag(Object.assign(this.page)).then(
        response => {
          this.superBagList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
    goLink(link) {
      window.open(link, '_blank');
    },
  },
};
</script>