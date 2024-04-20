<template>
  <div class="bg h-100">
      <br/>
      <div class="container mt-8">
        <div class="row">
          <div class="col-3 mb-4" v-for="music,n in musicList" :key="n" @click="musicInfo(music.id)">
            <div class="card shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
              <img :src="music.coverLink" class="card-img-top rounded-2">
              <div class="card-body">
                <h4 class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="music.name" style="max-width: 200px;">
                  {{music.name}}
                </h4>
                <br>
                <p class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="music.singer" style="max-width: 200px;">
                  {{music.singer}}
                </p>
              </div>
            </div>
          </div>

          <div class="col-3 mb-4">
            <div class="card shadow p-3 mb-5 bg-body rounded text-center" style="width: 18rem;">
              <img src="../assets/music/pp.jpg" class="card-img-top rounded-2">
              <div class="card-body">
                <p class="card-text" style="color: #33ddaa;">ララララ～♪</p>
                <a class="btn btn-primary">更多</a>
              </div>
            </div>
          </div>

        </div>
      </div>
  </div>
</template>
<script>
import { Popover } from "bootstrap";
import { Toast } from 'bootstrap';
import Top from "@/components/Top.vue";
import Page from '@/components/Page.vue';
import { saveVisitLog } from "../api/welcome";
import { useRouter } from "vue-router"; //引入useRouter
import { searchMusic } from "../api/music";
export default {
  name: "musicList",
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
        size: 12,
        currentPage: 1, // 偏移量,数据库从0开始
        totalPage: 0,
      },
      musicList: [],
      router: useRouter(),
    }
  },
  mounted() {
    saveVisitLog(Object.assign({ key: 24 }));
    this.getAllMusic();
    // const router = useRouter();
  },
  updated() { //更新之后.场景:获取更新真实DOM之后
    var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new Popover(popoverTriggerEl)
    });
  },
  methods: {
    commonPageChange(event) {
      this.page = event;
      this.searchBlog();
    },
    showToast(response) { // 通用信息展示
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
    getAllMusic() {
      searchMusic(Object.assign(this.page)).then(
          response => {
              this.musicList = response.data.data.data;
          }
      )
    },
    getMusicName(name) {
      return name.slice(0,name.lastIndexOf("."));
    },
    musicInfo(id) {
      let { href } = this.router.resolve({
        name: "music",
        params: {
            musicId: id
        },
      });
      window.open(href, "_blank");
    }
  },
};
</script>