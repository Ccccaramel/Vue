<template>
  <div>
    <Top :commonResponse="commonResponseData"></Top>
    <div class="container">

      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">欢迎来到社区!</h4>
        <hr/>
        <p>{{communityNotice.v}}</p>
        <footer class="blockquote-footer">{{communityNotice.updateTimeStr}}</footer>
      </div>

      <div class="row justify-content-center">
        <div class="col">
          <div class="list-group">
            <a class="list-group-item list-group-item-action btn" aria-current="true"
              v-for="(topic,i) in topicList" :key="i" @click="browseTopic(topic.id)">
              <div class="container">
                <div class="row align-items-start">

                  <div class="col-auto text-center">
                    <div class="vstack text-center">
                      <img :src="topic.userInfo.headPortrait.imageUrl" class="rounded-circle text-center mx-auto d-block" style="max-width: 3rem;"/>
                      <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus"
                        :data-bs-content="topic.userInfo.name" style="max-width: 5rem;">
                        {{topic.userInfo.name}}
                      </span>
                      <span :class="'badge hyld-bg-' + topic.userInfo.grade + ' rounded-pill mx-auto text-center'" style="max-width: 3rem;">Lv{{ topic.userInfo.grade }}</span>
                    </div>
                  </div>

                  <div class="col">
                    <h4>{{topic.rubric}}</h4>
                    <!-- <span class="d-inline-block text-truncate" style="max-width: 50rem;">
                      {{topic.text}}
                    </span> -->
                    <span class="d-inline-block">
                      {{topic.text}}
                    </span>

                    <!-- <div class="hstack"> -->
                    <div class="vstack">
                      <img class="rounded-3 mb-1" :src="image" style="max-width: 11rem;" v-for="(image,i) in topic.images" :key="i"/>
                    </div>

                    <br />
                    <small>发表于:{{topic.createTimeStr}}&emsp;{{topic.address}}</small>
                  </div>

                  <div class="col-auto">
                    <span class="badge bg-primary rounded-pill">{{topic.head}}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增话题 -->
    <div class="modal fade" id="addTopicModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">{{topicInfo.title}}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="form-floating">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" placeholder="topicInfo.rubric" v-model="topicInfo.rubric" maxlength="20">
                <label for="floatingInput">标题</label>
              </div>
              <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="topicInfo.text" v-model="topicInfo.text" maxlength="100"></textarea>
                <label for="floatingInput">内容</label>
              </div>
              <!-- 已添加图片回显 -->
              <div class="form-floating mb-3" style="max-width: 240px;" v-for="(img, index) of imgList" :key="index"
                v-show="imgList.length != 0">
                <div class="card text-bg-dark">
                  <img :src="img.file.src" class="card-img">
                  <div class="card-img-overlay text-end">
                    <font-awesome-icon icon="fa-solid fa-circle-xmark" @click="fileDel(index)" />
                  </div>
                </div>
              </div>

              <!-- 添加图片按钮 -->
              <div class="form-floating mb-3" v-show="addState">
                <font-awesome-icon icon="fa-regular fa-images" size="2x" @click="addImage()" />
                <input name="files" class="form-control" ref="file" type="file" @change="fileChange($event)" accept="image/jpg, image/png" style="display: none;" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="saveTopicModalCloseBtn"
              data-bs-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="saveTopic()">发送</button>
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
    <!-- 发表话题 -->
    <nav class="navbar fixed-bottom" style="width:96px;margin-left: 80%;">
      <div class="container-fluid btn" @click="editTheme()">
        <font-awesome-icon icon="fa-solid fa-circle-plus" size="3x" />
      </div>
      <div class="container-fluid btn" @click="refresh()">
        <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" size="3x" />
      </div>
    </nav>
  </div>
</template>
<script>
import { Modal,Toast, Popover } from 'bootstrap';
import { useRouter } from "vue-router"; //引入useRouter
import Top from "@/components/Top.vue";
import Page from '@/components/Page.vue';

import { checkToken } from "@/api/user";
import { searchTopic, saveTopic } from "@/api/topic";
import { getCommunityNotice } from "@/api/systemConfig";
export default {
  name: "community",
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
      topicInfo: {
        add: true,
        title: '',
        rubric: '', // 标题
        text: '', // 内容
        ip: '',
        address: '',
      },
      topicList: [],
      // router: useRouter(),
      communityNotice: {},
      imgList: [],
      addState: true, // 当图片达到一定数量时隐藏"添加图片"按钮
    }
  },
  mounted() {
    this.refresh();
    getCommunityNotice().then(
      response => {
        this.communityNotice = response.data.data;
      }
    )
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
      this.searchTopic();
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
    refresh() {
      this.page.currentPage = 1;
      this.searchTopic();
    },
    searchTopic() {
      searchTopic(Object.assign({
        show:true,
      },this.page)).then(
        response => {
          this.topicList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
    editTheme() {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 0) {
              this.commonResponse.msg = "请先登录!";
              this.showToast(response);
            };
            this.topicInfo.add = true;
            this.topicInfo.title = '发表话题';
            this.topicInfo.rubric = '';
            this.topicInfo.text = '';
            var addTopicModal = document.getElementById('addTopicModal');
            var modal = new Modal(addTopicModal);
            modal.show();
          }
        )
      } else {
        var response = {
          data: {
            code: 0,
            msg: '可是你还没有登录...',
          },
        }
        this.showToast(response);
      }
    },
    saveTopic() {

      // 通过腾讯API获取地址
      jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
        key: 'VQPBZ-GZIKU-QNPV7-B7MD5-PPA2F-TMBES',
        output: 'jsonp'
      }).then(res => {
        // this.topicInfo.ip = returnCitySN['cip'];
        // this.topicInfo.address = returnCitySN['cname'];
        var ad_info = res.result.ad_info;
        this.topicInfo.ip = res.result.ip;
        this.topicInfo.address = ad_info.nation + ad_info.province;

        var forms = new FormData();
        forms.append('topicVoStr', JSON.stringify(this.topicInfo));

        for (let i = 0; i < this.imgList.length; i++){
          forms.append('imageFiles', this.imgList[i].file);
        }

        saveTopic(forms).then(
          response => {
            document.getElementById("saveTopicModalCloseBtn").click();
            this.showToast(response);
          }
        )
      });


    },
    // browseTopic(id) { // 打开一个新页面
    //   const { href } = this.router.resolve({
    //     name: 'topicInfo',
    //     params: {
    //       id: id
    //     }
    //   });
    //   window.open(href, "_blank");
    // },
    addImage() {
      this.$refs.file.click();
    },
    fileChange(el) {
      if (!el.target.files[0].size) {
        return
      };
      this.fileList(el.target);
      el.target.value = "";
    },
    fileList(fileList) {
      var files = fileList.files;
      for (let i = 0; i < files.length; i++) {
        if (files[i].type != "") {
          this.fileAdd(files[i]);
        }
      }
    },
    fileAdd(file) {
      var fileSize = this.bytesToSize(file.size);
      if (file.size > 1024*1024) {
        var response = {
          data: {
            code: 0,
            msg: '图片太大('+fileSize+'),单张图片不可超过1MB!',
          }
        };
        this.showToast(response);
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      var that = this;
      reader.onload = function () {
        file.src = this.result;
        console.log(">>>"+file);
        that.imgList.push({
          file
        });
      };
    },
    fileDel(index) {
      this.imgList.splice(index, 1);
    },
    bytesToSize(bytes) {
      if (bytes === 0) return "0 B";
      let k = 1000, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    },
    checkImgList() {
      if (this.imgList.length == 3) {
        this.addState = false;
      } else {
        this.addState = true;
      }
    },
  },
  // vue3是在setup中进行的,且要引入 useRoute 和useRouter
  setup() {
    const router = useRouter();
    let browseTopic = (id) => {
      let { href } = router.resolve({
        name: "topicInfo",
        params: {
          id: id,
        },
      });
      window.open(href, "_blank");
    };
    // let params = () => {
    //   $router.push({
    //     name: "About",
    //     params: {
    //       id: 1,
    //       aa: "nini",
    //     },
    //   });
    // };
    // let query = () => {
    //   $router.push({
    //     path: "/about",
    //     query: {
    //       id: 2,
    //       age: 13,
    //     },
    //   });
    // };
    return {
      // params,
      // query,
      browseTopic,
    };
  },
};
</script>