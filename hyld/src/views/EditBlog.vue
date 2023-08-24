<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>
    <div class="container">
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">写博客</h4>
      </div>

      <div class="row justify-content-center">
        <div class="col">
          <div class="input-group mb-3">
            <span class="input-group-text">标题</span>
            <input type="text" class="form-control" v-model="blogVo.title">
          </div>
        </div>
      </div>

      <div class="row justify-content">
        <div class="col-3">
          <div class="input-group mb-3">
            <span class="input-group-text">标签</span>
            <input type="text" class="form-control" id="blogLabel">
          </div>
        </div>
        <div class="col-1">
          <div class="input-group mb-3">
            <button type="button" class="btn btn-outline-success" @click="addLabel()">添加</button>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <span class="input-group-text">分类</span>
            <select class="form-select" v-model="blogVo.type">
                <option
                    v-for="blogType in blogTypeList"
                    v-bind:key="blogType.id"
                    :value="blogType.id">
                    {{ blogType.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <span class="input-group-text">访问权限</span>
            <select class="form-select" v-model="blogVo.power">
                <option
                    v-for="blogPower in blogPowerList"
                    v-bind:key="blogPower.id"
                    :value="blogPower.id">
                    {{ blogPower.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row justify-content" id="blogLabelListDiv">
        <div class="col-auto" v-for="blogLabel,i in blogLabelList" v-bind:key="i">
          <span class="badge bg-primary">{{blogLabel}} <span class="badge bg-secondary btn" @click="deleteBlogLabel(i)">X</span></span>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col">
          <div class="home">
            <tinymce id="myedit" ref="editor" v-model="msg" :value="value" :disabled="disabled" @contentHasChanged="contentHasChanged()" @onClick="onClick"/>
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
            <button type="button" class="btn btn-outline-success" @click="saveBlog(false)">保存</button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import { Modal, Toast } from 'bootstrap';

import Top from "@/components/Top.vue";
import Page from '@/components/Page.vue';
import tinymce from "@/components/Tinymce.vue";

import { checkToken } from "@/api/user";
import { searchPointer } from "../api/pointer";

import { getBlogPower,getBlogType } from "../api/dictionary";
import { findBlogById,saveBlog } from "../api/blog";
export default {
  name: "editBlog",
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
      blogVo: {},
      lastModifyTime: '', // 上一次保存时间
      interval: 10*1000, // 间隔时间
      autoSaveLock: true,
      timer: null, // 节拍器
    }
  },
  watch: {
    blogLabelList: {
      handler() {
        this.updateBlogVoOfLabel();

        console.log("blogLabelList变更了！");
        this.contentHasChanged();
      },
      deep: true
    },
    blogVo:{
      handler() {
        console.log("blogVo变更了！");
        this.contentHasChanged();
      },
      deep: true
    },
  },
  created() {
    this.getBlogPower();
    this.getBlogType();
    this.blogId = this.$route.params.blogId;
    findBlogById(Object.assign({
      id: this.blogId,
      isEdit: true
    })).then(
      response => {
        if (response.data.code == 0) {
          this.$router.push("/");
          // this.showToast(response);
        } else {
          const info = response.data.data.blogInfo;
          this.blogVo.id = info.id;
          this.blogVo.title = info.title;
          this.blogVo.content = info.content;
          this.$refs.editor.textContent = info.content;
          this.blogVo.label = info.label;
          this.blogVo.status = info.status;

          if (info.label!=null) {
            this.blogVo.label = info.label;
            this.blogLabelList = info.label.split(",");
          }
          if (info.type!=null) {
            this.blogVo.type = info.type.id;
          }
          if (info.power!=null) {
            this.blogVo.power = info.power.id;
          }
        }
      }
    );
  },
  mounted() {
    this.$refs.top.saveVisitLog("【写博客】");
    this.$refs.editor.blogId = this.blogId;

    window.addEventListener('beforeunload', this.closeWindows);
    // window.addEventListener('unload', this.closeWindowTip);

    // this.timer = setTimeout(function () {
    //   console.log('Hello world!');
    // }, 1000); // 延迟1秒执行函数

    // this.timer = setInterval(function () {
    //   console.log('>>>'+new Date().getTime());
    // }, 1000); // 延迟1秒执行函数

    this.timer = setInterval(this.updateLastModifyTime, 1000); // 延迟1秒执行函数
    
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.closeWindows);
    // window.removeEventListener('unload', this.closeWindowTip);
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
      console.log(this.$refs.editor);
      this.$refs.editor.clear();
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
    disabledOrEnable(){
      this.disabled = !this.disabled;
      if (this.disabled) {
        this.disabledOrEnableLabel = '启用';
      } else {
        this.disabledOrEnableLabel = '禁用';
      }
    },
    saveBlog(isAutoSave) {
      this.blogVo.content = this.$refs.editor.textContent;
      this.blogVo.isAutoSave = isAutoSave;
      saveBlog(this.blogVo).then(
        response => {
          if (response.data.code == 0) {
            this.$router.push("/");
          } 
          this.showToast(response);
        }
      )
    },
    getBlogPower() {
      getBlogPower().then(
        response => {
          this.blogPowerList = response.data.data;
          this.blogVo.power = this.blogPowerList[0].id;
        }
      )
    },
    getBlogType() {
      getBlogType().then(
        response => {
          this.blogTypeList = response.data.data;
          this.blogVo.type = this.blogTypeList[0].id;
        }
      )
    },
    addLabel() {
      this.blogLabelList.push(document.getElementById("blogLabel").value);
      document.getElementById("blogLabel").value='';
    },
    deleteBlogLabel(i) {
      this.blogLabelList.splice(i, 1);
    },
    updateBlogVoOfLabel() {
      this.blogVo.label = this.blogLabelList.toString();
    },
    closeWindows() { // 关闭页面前将自动保存
      this.saveBlog(true);
    },
    contentHasChanged() {
      this.autoSaveLock = false;
      this.lastModifyTime = new Date().getTime();
    },
    updateLastModifyTime() {
      if (this.autoSaveLock) {
        this.lastModifyTime = new Date().getTime();
        // console.log("所有改动都已保存，无需其它操作");
      }
      else {
        if ((new Date().getTime()-this.lastModifyTime)>this.interval) { // 修改后的第10秒将自动保存
          this.autoSaveLock = true;
          this.saveBlog(true);

          // var now = new Date().getTime();
          // var sub = now - this.lastModifyTime;
          // console.log("触发自动保存事件"+",距离最近一次修改的时间差:"+sub);
        }
      }

    },
  },
};
</script>