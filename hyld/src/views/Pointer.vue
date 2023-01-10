<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>
    <div class="container">
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">反馈与建议</h4>
        <hr/>
        <p>写下你的使用感受,让平台可以做得更好</p>
        <p>如果有什么好的建议也可以在这里告诉我</p>
        <p class="text-decoration-line-through">如果发现了 bug 也请务必...</p>
      </div>

      <div class="row justify-content-center">
        <div class="col">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action" aria-current="true"
              v-for="(pointer,i) in pointerList" :key="i">
              <div class="container">
                <div class="row align-items-start">
                  <div class="col-auto text-center">
                    <div class="vstack">
                      <img :src="pointer.userInfo.headPortrait.imageUrl" class="rounded-circle" style="width: 3rem;" />
                      <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus"
                        :data-bs-content="pointer.userInfo.name" style="max-width: 3rem;">
                        {{pointer.userInfo.name}}
                      </span>
                      <span :class="'badge hyld-bg-' + pointer.userInfo.grade + ' rounded-pill mx-auto text-center'">Lv{{ pointer.userInfo.grade }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <h4>{{pointer.rubric}}</h4>
                    <span class="d-inline-block text-truncate" style="max-width: 900px;">
                      {{pointer.text}}
                    </span>
                    <br />
                    <small>发表于:{{pointer.createTimeStr}}&emsp;{{pointer.address}}</small>

                    <!-- 回复 -->
                    <div class="container list-group list-group-item-primary" v-if="pointer.replyText!=null">
                      <div class="row align-items-start">
                        <div class="col-auto text-center ms-2 mt-1 pe-0">
                          <span>
                            回复:
                          </span>
                        </div>
                        <div class="col mt-1">
                          <h5>{{pointer.replyText}}</h5>
                          <small>{{pointer.replyTimeStr}}</small>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑话题 -->
    <div class="modal fade" id="addPointerModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">{{pointerInfo.title}}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="form-floating">
              <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="pointerInfo.text" v-model="pointerInfo.text" maxlength="100"></textarea>
                <label for="floatingInput">反馈内容</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="savePointerModalCloseBtn"
              data-bs-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="savePointer()">提交</button>
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
    <!-- 发表建议 -->
    <nav class="navbar fixed-bottom" style="width:96px;margin-left: 80%;">
      <div class="container-fluid btn" @click="editPointer()">
        <font-awesome-icon icon="fa-solid fa-circle-plus" size="3x" />
      </div>
      <div class="container-fluid btn" @click="refresh()">
        <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" size="3x" />
      </div>
    </nav>
  </div>
</template>
<script>
import { Modal, Toast, Popover } from 'bootstrap';
import Top from "@/components/Top.vue";
import Page from '@/components/Page.vue';
import { searchPointer, savePointer } from "../api/pointer";
import { jsonp } from 'vue-jsonp';
import { checkToken } from "@/api/user";
export default {
  name: "pointer",
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
      pointerList: [],
      pointerInfo: {
        title: '',
        text: '', // 内容
        ip: '',
        address: '',
      },
    }
  },
  mounted() {
    this.searchPointer();
    this.$refs.top.saveVisitLog("访问【反馈与建议】");
  },
  methods: {
    commonPageChange(event) {
      this.page = event;
      this.searchPointer();
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
      this.searchPointer();
    },
    searchPointer() {
      searchPointer(Object.assign({
        show:true
      }, this.page)).then(
        response => {
          this.pointerList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
    editPointer() {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 0) {
              this.commonResponse.msg = "请先登录!";
              this.showToast(response);
            };
            this.pointerInfo.title = '提交反馈';
            this.pointerInfo.text = '';
            var addPointerModal = document.getElementById('addPointerModal');
            var modal = new Modal(addPointerModal);
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
    savePointer() {
      // this.pointerInfo.ip = returnCitySN['cip'];
      // this.pointerInfo.address = returnCitySN['cname'];


      // 通过腾讯API获取地址
      jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
        key: 'VQPBZ-GZIKU-QNPV7-B7MD5-PPA2F-TMBES',
        output: 'jsonp'
      }).then(res => {
        var ad_info = res.result.ad_info;
        this.pointerInfo.ip = res.result.ip;
        this.pointerInfo.address = ad_info.nation + ad_info.province;

        savePointer(this.pointerInfo).then(
          response => {
            document.getElementById("savePointerModalCloseBtn").click();
            this.showToast(response);
            this.refresh();
          }
        )
      });


    },
  },
};
</script>