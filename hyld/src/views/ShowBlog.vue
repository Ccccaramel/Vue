<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>

    <div class="container">
      <div class="row justify-content alert alert-success mb-0">
        <div class="col-auto">
          <div class="vstack text-center">
            <img :src="blogInfo.userInfo.headPortrait.imageUrl" class="rounded-circle text-center mx-auto d-block" style="max-width: 3rem;"/>
            <span class="text-center" data-bs-toggle="popover" data-bs-trigger="hover focus"
              :data-bs-content="blogInfo.userInfo.name">
              {{blogInfo.userInfo.name}}
            </span>
            <span :class="'badge hyld-bg-' + blogInfo.userInfo.grade + ' rounded-pill mx-auto text-center'" style="max-width: 3rem;">Lv{{ blogInfo.userInfo.grade }}</span>
          </div>
        </div>
        <div class="col">
          <div class="card  alert-light">
            <div class="card-header" role="alert">
              <h3 class="alert-heading fw-bolder">{{blogInfo.title}}</h3>
              <div class="row justify-content">
                <div class="col-auto">
                  <p class="mb-1">{{blogInfo.type.name}}</p>
                </div>
                <div class="col-auto" v-for="blogLabel,i in strToArr(blogInfo.label)" v-bind:key="i">
                  <span class="badge bg-primary">{{blogLabel}}</span>
                </div>
              </div>
              <div class="row justify-content">
                <div class="col-auto">
                  <p class="mb-1">浏览量：{{blogInfo.views}}</p>
                </div>
                <div class="col-auto">
                  <p class="mb-1">发布于：{{blogInfo.address}}</p>
                </div>
                <div class="col-auto">
                  <p class="mb-1">状态：{{blogInfo.power.name}}</p>
                </div>
                <div class="col-auto">
                  <p class="mb-1">创建时间：{{blogInfo.createTimeStr}}</p>
                </div>
                <div class="col-auto">
                  <p class="mb-1">更新时间：{{blogInfo.updateTimeStr}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content card">
        <div class="col">
          <div class="card-body">
              <div class="blog-content" v-html="blogInfo.content"></div>
            </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col">
          <div class="home">
            <tinymce ref="remarkAuthor" v-model="msg" :disabled="disabled" @onClick="onClick"/>
          </div>
        </div>
      </div>

      <div class="container text-center mt-3">
        <div class="row justify-content-between">
          <div class="col-auto">
            <button type="button" class="btn btn-outline-danger me-1" @click="clear()">清空</button>
            <button type="button" class="btn btn-outline-secondary ms-1" @click="disabledOrEnable()">{{disabledOrEnableLabel}}</button>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-outline-success" @click="saveBlogRemark(-1)">发表</button> <!-- -1 表示回复博客作者 -->
          </div>
        </div>
      </div>


      <ul class="list-group mt-2">
        <li class="list-group-item" v-for="blogRemark in blogRemarkList" :key="blogRemark.id">
          <div class="container">
            <div class="row justify-content alert alert-primary mb-0">
              <div class="col-auto">
                <div class="vstack text-center">
                  <img :src="blogRemark.user.headPortrait.imageUrl" class="rounded-circle text-center mx-auto d-block" style="max-width: 3rem;"/>
                </div>
              </div>
              <div class="col">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">
                    {{blogRemark.user.name}}
                    <span :class="'badge hyld-bg-' + blogRemark.user.grade + ' rounded-pill mx-auto text-center'" style="max-width: 3rem;">Lv{{ blogRemark.user.grade }}</span>
                  </div>
                  <div class="blog-content" v-html="blogRemark.remark"></div>
                </div>
                <div class="dropdown-divider"></div>
                <div class="d-flex w-100 justify-content-between bt-6">
                  <div>
                    <small class="ms-1 me-1">{{blogRemark.createTimeStr}}</small>
                    <small class="ms-1 me-1">{{blogRemark.address}}</small>
                  </div>
                  <span class="btn badge bg-success" data-bs-toggle="modal" data-bs-target="#replyModal" @click="reply(blogRemark.id,blogRemark.id)">回复</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 楼中楼 -->
          <ol class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-start" v-for="replyInfo in blogRemark.child" :key="replyInfo.id">
              <div class="container">
                <div class="row">
                  <div class="col-auto">
                    <div class="vstack text-center">
                      <img :src="replyInfo.user.headPortrait.imageUrl" class="rounded-circle text-center mx-auto d-block" style="max-width: 3rem;"/>
                    </div>
                  </div>
                  <div class="col">
                    <div class="ms-2 me-auto">
                      <div class="fw-bold">
                        <span class="text ms-1 me-1">{{replyInfo.user.name}}</span>
                        <span :class="'badge hyld-bg-' + replyInfo.user.grade + ' rounded-pill mx-auto text-center ms-1 me-1'" style="max-width: 3rem;">Lv{{ replyInfo.user.grade }}</span>
                        <span class="badge bg-primary ms-1 me-1" v-if="replyInfo.parentId!=blogRemark.id">回复</span>
                        <span class="text ms-1 me-1" v-if="replyInfo.parentId!=blogRemark.id">{{replyInfo.replyOfUser.name}}</span>
                        <span v-if="replyInfo.parentId!=blogRemark.id" :class="'badge hyld-bg-' + replyInfo.replyOfUser.grade + ' rounded-pill mx-auto text-center ms-1 me-1'" style="max-width: 3rem;">Lv{{ replyInfo.replyOfUser.grade }}</span>
                      </div>
                      <div class="blog-content" v-html="replyInfo.remark"></div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="d-flex w-100 justify-content-between bt-6">
                      <div>
                        <small class="ms-1 me-1">{{replyInfo.createTimeStr}}</small>
                        <small class="ms-1 me-1">{{replyInfo.address}}</small>
                      </div>
                      <span class="btn badge bg-success" data-bs-toggle="modal" data-bs-target="#replyModal" @click="reply(replyInfo.id,blogRemark.id)">回复</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ol>

        </li>
      </ul>

      <!-- 底部分页 -->
      <div class="container">
        <div class="row justify-content-center">
          <div class="col">
            <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
          </div>
        </div>
      </div>

      <!-- 回复弹窗 -->
      <div class="modal fade" id="replyModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">回复</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <tinymce ref="reply" v-model="msg" :disabled="disabled" @onClick="onClick"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="replyModalCloseBtn">取消</button>
              <button type="button" class="btn btn-primary" @click="saveBlogReply()">发送</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { Modal, Toast, Popover } from 'bootstrap';

import Top from "@/components/Top.vue";
import Page from '@/components/Page.vue';
import tinymce from "@/components/Tinymce.vue";

import { checkToken } from "@/api/user";
import { searchPointer, savePointer } from "../api/pointer";

import { getBlogPower, getBlogType } from "../api/dictionary";
import { findBlogById,viewBlog } from "../api/blog";
import { saveBlogRemark,searchBlogRemark } from "../api/blogRemark";
import { jsonp } from 'vue-jsonp';
export default {
  name: "showBlog",
  components: {
    Top,
    Page,
    tinymce
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
      disabled: false,
      msg: 'Welcome to Use Tinymce Editor',
      isabled: false,
      disabledOrEnableLabel: '禁用',
      blogId: 0,
      blogPowerList: [],
      blogTypeList: [],
      blogLabelList: [],
      blogInfo: {
        title: '',
        label: '',
        address: '',
        type: {
          name: ''
        },
        power: {
          name:''
        },
        userInfo: {
          headPortrait: {
            imageUrl: ''
          }
        }
      },
      blogRemarkVo: {
      },
      blogRemarkList: [],
      replyVo: {}
    }
  },
  watch: {
  },
  created() {
    this.blogId = this.$route.params.blogId;

    findBlogById(Object.assign({
      id: this.blogId,
      isEdit: false
    })).then(
      response => {
        if (response.data.code == 0) {
          this.$router.push("/");
        } else {
          const info = response.data.data.blogInfo;
          this.blogInfo = response.data.data.blogInfo;
          if (info.label != null) {
            this.blogInfo.label = info.label;
            this.blogLabelList = info.label.split(",");
          }
        }
      }
    );
    viewBlog(Object.assign({ // 浏览量+1
      id: this.blogId
    })).then({
    })
    this.refresh();
  },
  mounted() {
    this.$refs.top.saveVisitLog("【浏览博客】"+this.blogId);
  },
  methods: {
    commonPageChange(event) {
      this.page = event;
      this.searchBlogRemark();
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
    // 内容
    getContent () {
      // console.log('内容', this.msg)
    },
    // 鼠标单击的事件
    onClick (e, editor) {
      // console.log('Element clicked')
      // console.log(e)
      // console.log(editor)
    },
    // 清空内容
    clear () {
      console.log(this.$refs.remarkAuthor);
      this.$refs.remarkAuthor.clear();
    },
    refresh() {
      this.page.currentPage = 1;
      this.searchBlogRemark();
    },
    disabledOrEnable(){
      this.disabled = !this.disabled;
      if (this.disabled) {
        this.disabledOrEnableLabel = '启用';
      } else {
        this.disabledOrEnableLabel = '禁用';
      }
    },
    saveBlogReply() { // 品论区中的回复
      this.replyVo.blog = this.blogId;
      this.replyVo.remark = this.$refs.reply.textContent;

      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 0) {
              this.commonResponse.msg = "请先登录!";
              this.showToast(response);
            };
            // 判断用户已登录
            const that = this;
            saveBlogRemark(this.replyVo).then(
              response => {
                this.showToast(response);
                this.$refs.reply.clear();
                this.refresh();
                document.getElementById("replyModalCloseBtn").click();
              }
            )
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
    saveBlogRemark(parentId) { // 回复给作者
      this.blogRemarkVo.blog = this.blogId;
      this.blogRemarkVo.remark = this.$refs.remarkAuthor.textContent;
      this.blogRemarkVo.parentId = parentId;
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 0) {
              this.commonResponse.msg = "请先登录!";
              this.showToast(response);
            };
            // 判断用户已登录
            const that = this;
            if (parentId == -1) {
              saveBlogRemark(that.blogRemarkVo).then(
                response => {
                  that.showToast(response);
                  that.$refs.remarkAuthor.clear();
                  that.refresh();
                }
              )
            }
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
    reply(parentId,rootId){
      this.replyVo.parentId = parentId;
      this.replyVo.rootId = rootId;
    },
    searchBlogRemark() {
      searchBlogRemark(Object.assign({
        blog:this.blogId
      },
      this.page
      )).then(
        response => {
          this.blogRemarkList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
    strToArr(str) {
      if (str == null) {
        return ''
      } else {
        return str.split(",");
      }
    }
  },
};
</script>