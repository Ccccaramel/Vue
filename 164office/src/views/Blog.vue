<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>
    <div class="container">
      <!-- <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">博客</h4>
      </div> -->

      <div class="row justify-content-center mt-2">
        <div class="col-auto">
            <input type="text" class="form-control" placeholder="标题" v-model="blogVo.title">
        </div>
        <div class="col-auto">
            <input type="text" class="form-control" placeholder="标签" v-model="blogVo.label">
        </div>
        <div class="col-auto">
            <select class="form-select" v-model="blogVo.type">
                <option
                    v-for="blogType in blogTypeList"
                    v-bind:key="blogType.id"
                    :value="blogType.id">
                    {{ blogType.name }}</option>
            </select>
        </div>
        <div class="col-auto">
            <button type="button" class="btn btn-dark" @click="cleanSearchBlogBtn()">清空</button>
        </div>
        <div class="col-auto">
            <button type="button" class="btn btn-dark" @click="searchBlogBtn()">搜索</button>
        </div>
        <div class="col-auto">
            <button type="button" class="btn btn-success"  @click="writeBlog(-1)"><font-awesome-icon icon="pen-to-square" />写博客</button>
        </div>
      </div>

      <hr/>
    </div>

    

    <!-- 博客列表 -->
    <div class="container">
      <div class="list-group">
        <a class="list-group-item list-group-item-action" aria-current="true" v-for="blog in blogList" :key="blog.id">
          <div class="d-flex w-100 justify-content-between btn" @click="showBlog(blog.id)">
            <h5 class="mb-1" style="text-align: left;">{{blog.title}}</h5>
            <small><font-awesome-icon :icon="['fas', 'eye']" style="color: #74C0FC;"/> {{blog.views}}</small>
          </div>
          <div class="row justify-content">
            <div class="col-auto">
              <!-- <p class="mb-1">{{blog.type.name}}</p> -->
              <span class="badge rounded-pill bg-secondary">{{blog.type.name}}</span>
            </div>
            <div class="col-auto" v-for="blogLabel,i in strToArr(blog.label)" v-bind:key="i">
              <span class="badge bg-primary">{{blogLabel}}</span>
            </div>
          </div>
          <div class="d-flex w-100 justify-content-between">
            <small>发布于:&nbsp;{{blog.createTimeStr}}</small>
          </div>
        </a>
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
  </div>
</template>
<script>
import { Modal, Toast, Popover } from 'bootstrap';
import Top from "@/components/Top.vue";
import { useRouter } from "vue-router"; //引入useRouter
import Page from '@/components/Page.vue';
import { initBlog, searchBlog } from "../api/blog";
import { getBlogType } from "../api/dictionary";
import { checkToken } from "@/api/user";
export default {
  name: "blog",
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
      blogVo: {
          title: '',
          label: '',
          type: '',
      },
      blogList: [],
      router: useRouter(),
      blogTypeList : []
    }
  },
  setup() {
    const router = useRouter();
    let showBlog = (id) => {
        let { href } = router.resolve({
            name: "showBlog",
            params: {
                blogId: id
            },
        });
        window.open(href, "_blank");
    };
    return {
        showBlog
    };
  },
  mounted() {
    document.title = "博客空间";
    getBlogType().then(
      response => {
          this.blogTypeList = response.data.data;
          this.blogTypeList.unshift({
              id: '',
              name:'无限制',
          });
          this.blogVo.type = '';
          this.searchBlog();
      }
    );
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
    cleanSearchBlogBtn() {
        this.blogVo = {
            title: '',
            type: '',
            label: '',
        }
    },
    searchBlogBtn() {
        this.page.currentPage = 1;
        this.searchBlog();
    },
    searchBlog() {
      searchBlog(Object.assign( this.blogVo, this.page)).then(
        response => {
          this.blogList = response.data.data.data;
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
    },
    writeBlog(id) {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 0) {
              this.commonResponse.msg = "请先登录!";
              this.showToast(response);
            };

            // 判断用户已登录
            const that = this;
            if (id == -1) {
              initBlog(id).then(
                response => {
                  let { href } = that.router.resolve({
                    name: "editBlog",
                    params: {
                        blogId: response.data.data.blogId
                    },
                  });
                  window.open(href, "_blank");
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
        return false;
      }
    },
  },
};
</script>