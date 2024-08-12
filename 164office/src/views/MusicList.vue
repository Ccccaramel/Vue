<template>
  <div>
    <br/>

    <div class="container">
      <div class="row">

        <div class="col-3" v-for="music,n in musicList" :key="n" @click="musicInfo(music.id)">
          <div class="card shadow p-3 mb-5 bg-body rounded" style="width: 18rem;cursor: pointer;">
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
            <div>
              <font-awesome-icon :icon="['fas', 'heart']" style="color:#FFEEAA;"/>&nbsp;<font-awesome-icon :icon="['fas', 'heart']" style="color: #DDBBFF;" v-if="music.hot>1"/>&nbsp;<font-awesome-icon :icon="['fas', 'heart']" style="color: #FF88BB;" v-if="music.hot>10"/>&nbsp;<font-awesome-icon :icon="['fas', 'heart']" style="color: #99DD88;" v-if="music.hot>100"/>&nbsp;<font-awesome-icon :icon="['fas', 'heart']" style="color: #55DDEE;" v-if="music.hot>1000"/>
            </div>
          </div>
        </div>

        <!-- 初次进入本页面只显示PP的歌,点击更多后将展示所有歌曲,可刷新 -->
        <div class="col-3" v-if="this.type==3700">
          <div class="card shadow p-3 mb-5 bg-body rounded text-center" style="width: 18rem;">
            <img src="../assets/music/pp.jpg" class="card-img-top rounded-2">
            <div class="card-body">
              <p class="card-text" style="color: #33ddaa;">ララララ～♪</p>
              <a class="btn btn-primary" @click="searchMusic(3701)">更多</a>
            </div>
          </div>
        </div>

      </div>

      <div class="row">
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
      </div>

    </div>

    
    <br/>
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
        size: 7,
        currentPage: 1, // 偏移量,数据库从0开始
        totalPage: 0,
      },
      musicList: [],
      router: useRouter(),
      type: 3700,  // 3700:精选 3701:所有歌
    }
  },
  mounted() {
    document.title = "Music列表";
    saveVisitLog(Object.assign({ key: 24 }));
    this.searchMusic(3700);
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
      this.searchMusic(this.type);
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
    searchMusic(type) {
      this.type = type;
      if (this.type == 3701) {
        if (this.page.size ==7) {
          this.page.currentPage = 1;
        }
        this.page.size = 8;
      }
      searchMusic(Object.assign({
        type:this.type
      },this.page)).then(
          response => {
          this.musicList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
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
          musicId: id,
            type:this.type
        },
      });
      window.open(href, "_blank");
    },
  },
};
</script>