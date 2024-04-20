<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col">

          <div class="list-group">
            <a class="list-group-item list-group-item-action" aria-current="true" v-for="(topic, i) in topicDataList" :key="i">
              <div class="container">
                <div class="row align-items-start">

                  <div class="col-auto text-center">
                    <div class="vstack text-center">
                      <img :src="topic.userInfo.headPortrait.imageUrl" class="rounded-circle text-center mx-auto d-block" style="width: 3rem;" /> <!-- 头像 -->
                      <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus"
                        :data-bs-content="topic.userInfo.name" style="max-width: 5rem;">
                        <!-- 用户名 -->
                        {{ topic.userInfo.name }}
                      </span>
                      <span :class="'badge hyld-bg-' + topic.userInfo.grade + ' rounded-pill mx-auto text-center'">Lv{{ topic.userInfo.grade }}</span>
                    </div>
                  </div>

                  <div class="col">
                    <h3>{{ topic.rubric }}</h3>
                    <p class="fw-bold" style="white-space: pre-wrap">
                      {{ topic.text }}
                    </p>
                    <div class="vstack">
                      <img class="rounded-3 mb-1" :src="image" style="max-width: 11rem;" v-for="(image,i) in topic.images" :key="i"/>
                    </div>
                    <!-- <div class="container text-center">
                      <div class="row align-items-start">
                        <div class="col-auto" v-for="(image,i) in topic.images" :key="i">
                          <img class="btn rounded" :src="image" style="max-width: 320px;" data-bs-toggle="modal" data-bs-target="#showImageModal" @click="showImage(image)"/>
                        </div>
                      </div>
                    </div> -->
                    <small>{{ topic.createTimeStr }}&emsp;{{ topic.address }}</small>

                    <!-- 楼中楼 -->
                    <div class="container list-group list-group-item-primary" v-if="topic.children != null">
                      <div class="row align-items-start mb-1" v-for="(reply, i) in topic.children" :key="i">
                        <div class="col-auto text-center pe-0">
                          <div class="vstack text-center ps-1 pt-1">
                            <img :src="reply.userInfo.headPortrait.imageUrl" class="rounded-circle text-center mx-auto d-block" style="max-width: 2.5rem;"/>
                            <span class="d-inline-block text-truncate" data-bs-toggle="popover"
                              data-bs-trigger="hover focus" :data-bs-content="reply.userInfo.name"
                              style="max-width: 5rem;">
                              {{ reply.userInfo.name }}
                            </span>
                            <span :class="'badge hyld-bg-' + reply.userInfo.grade + ' rounded-pill text-center mx-auto'">Lv{{ reply.userInfo.grade }}</span>
                          </div>
                        </div>

                        <div class="col-auto text-center pt-1" style="max-width: 1rem" v-if="topic.id != reply.parentId">
                          <font-awesome-icon icon="fa-solid fa-share" />
                        </div>

                        <div class="col-auto text-center pe-0" v-if="topic.id != reply.parentId">
                          <div class="vstack text-center pt-1">
                            <img :src="reply.replyUser.headPortrait.imageUrl" class="rounded-circle text-center mx-auto d-block" style="max-width: 2.5rem;"/>
                            <span class="d-inline-block text-truncate" data-bs-toggle="popover"
                              data-bs-trigger="hover focus" :data-bs-content="reply.replyUser.name"
                              style="max-width: 5rem;">
                              {{ reply.replyUser.name }}
                            </span>
                            <span :class="'badge hyld-bg-' + reply.replyUser.grade + ' rounded-pill text-center mx-auto'">Lv{{ reply.replyUser.grade }}</span>
                          </div>
                        </div>

                        <div class="col pe-0">
                          <h4>{{ reply.rubric }}</h4>
                          <p class="fw-bold" style="white-space: pre-wrap">{{ reply.text }}</p>
                          <div class="container text-center">
                            <div class="row align-items-start">
                              <div class="col-auto" v-for="(image,i) in reply.images" :key="i">
                                <img class="btn rounded" :src="image" style="max-width: 3rem;" data-bs-toggle="modal" data-bs-target="#showImageModal" @click="showImage(image)"/>
                              </div>
                            </div>
                          </div>
                          <small>{{ reply.createTimeStr }}&emsp;{{ reply.address }}</small>
                        </div>
                        <div class="col-auto ms-md-auto ms-1 mt-1">
                          <span class="btn badge bg-primary rounded-pill"
                            @click="replyTopic(reply.id, false, topic.floor)">回复</span>
                        </div>
                      </div>
                    </div>
                    <!-- 楼中楼 END -->

                  </div>
                  <div class="col-auto ms-md-auto">
                    <span class="badge bg-success rounded-pill">#{{ topic.floor }}</span>
                    <span class="btn badge bg-primary rounded-pill ms-1" v-if="topic.floor > 1"
                      @click="replyTopic(topic.id, false, topic.floor)">回复</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>
    <!-- 回复话题 -->
    <div class="modal fade" id="replyTopicModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ replyTopicInfo.title }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="form-floating">
              <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="replyTopicInfo.text"
                  v-model="replyTopicInfo.text" maxlength="200"></textarea>
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

            <!-- 上传文件夹 -->
            <!-- <input  type="file" webkitdirectory/> -->

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="replyTopicModalCloseBtn"
              data-bs-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="saveReplyTopicInfo()">发送</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 点击图片放大 -->
    <div class="modal fade" id="showImageModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">查看图片</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container text-center">
              <div class="row align-items-center">
                <div class="col">
                  <img class="btn rounded" :src="showImageUrl"/>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
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
    <!-- 悬浮按钮 -->
    <nav class="navbar fixed-bottom" style="width:96px;margin-left: 80%;">
      <div class="container-fluid btn" @click="replyTopic(topicId, true)">
        <font-awesome-icon icon="fa-regular fa-comment-dots" size="3x" />
      </div>
      <div class="container-fluid btn" @click="refresh()">
        <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" size="3x" />
      </div>
    </nav>
  </div>
</template>
<script>
import { Modal, Toast, Popover } from 'bootstrap';
import { jsonp } from 'vue-jsonp';
import { useRoute } from 'vue-router';
import Top from "@/components/Top.vue";
import { saveVisitLog } from "../api/welcome";
import Page from '@/components/Page.vue';
import { checkToken } from "@/api/user";
import { getTopicData, saveReplyTopicInfo } from "@/api/topic";
export default {
  name: "replyTopicInfo",
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
      topicId: 0,
      page: { // 通用 Page
        size: 10,
        currentPage: 1, // 偏移量,数据库从0开始
        totalPage: 0,
      },
      route: useRoute(),
      replyTopicInfo: {
        add: true,
        title: '',
        parentId: 0,
        id: 0,
        topicId: 0,
        text: '', // 内容
        replyTopic: true,
        ip: '',
        address: '',
      },
      topicDataList: [],
      imgList: [],
      addState: true, // 当图片达到一定数量时隐藏"添加图片"按钮
      showImageUrl:'',
    }
  },
  created() {
    this.topicId = this.$route.params.id;
    this.replyTopicInfo.id = this.$route.params.id;
    this.refresh();
  },
  watch: {
    imgList: {
      handler() {
        this.checkImgList();
      },
      deep: true
    }
  },
  mounted() {
    saveVisitLog(Object.assign({key:21,data:this.topicId}));
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
      this.getTopicData();
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
      this.getTopicData();
    },
    getTopicData() {
      getTopicData(Object.assign({
        id: this.topicId,
        show: true
      }, this.page)).then(
        response => {
          this.topicDataList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
    /**
     * replyTopic
     *   T: 话题回复
     *   F: 楼中楼
     **/
    replyTopic(parentId, replyTopic, belongToFloor) {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 0) {
              this.commonResponse.msg = "请先登录!";
              this.showToast(response);
            };
            this.replyTopicInfo.add = true;
            this.replyTopicInfo.title = '回复';
            this.replyTopicInfo.text = '';
            this.replyTopicInfo.belongToFloor = belongToFloor;
            this.replyTopicInfo.topicId = this.topicId;
            this.replyTopicInfo.replyTopic = replyTopic;
            this.replyTopicInfo.parentId = parentId;
            var replyTopicModal = document.getElementById('replyTopicModal');
            var modal = new Modal(replyTopicModal);
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
    saveReplyTopicInfo() {
      // this.replyTopicInfo.ip = returnCitySN['cip'];
      // this.replyTopicInfo.address = returnCitySN['cname'];

      var forms = new FormData();
      forms.append('replyTopicVoStr', JSON.stringify(this.replyTopicInfo));

      for (let i = 0; i < this.imgList.length; i++){
        forms.append('imageFiles', this.imgList[i].file);
      }

      saveReplyTopicInfo(forms).then(
        response => {
          document.getElementById("replyTopicModalCloseBtn").click();
          this.showToast(response);
          this.refresh();
        }
      )

    },
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
    // uploadImage: function () {
    //   var form = document.forms.namedItem("fileinfo");
    //   var formData = new FormData(form);
    //   for (var i = 0; i < this.imgList.length; i++) {
    //     formData.append("file" + [i + 1], this.imgList[i].file);
    //     console.log(this.imgList);
    //   }
    // }
    checkImgList() {
      if (this.imgList.length == 3) {
        this.addState = false;
      } else {
        this.addState = true;
      }
    },
    showImage(image) {
      this.showImageUrl = image;
    },
  },
};
</script>

<!-- 留着,做参考 -->
<style scoped lang="less">
.img_box {
  width: 100%;
  padding: 0 2%;
  display: flex;
  flex-wrap: wrap;

  .img_size {
    position: relative;
    width: 1.8rem;
    height: 1.65rem;
    padding: 5px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }

    .remove_logo {
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      background: red;
      border-radius: 25px;
      top: 5px;
      right: 5px;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.5rem;
      color: #777777;
    }
  }

  .add_img {
    width: 1.3rem;
    height: 1.3rem;
    margin-top: 5px;
    text-align: center;
    line-height: 1.3rem;
    font-size: 30px;
    color: #777777;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }
}
</style>