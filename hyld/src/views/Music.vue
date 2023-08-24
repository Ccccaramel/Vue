<template>
  <div class="bg h-100">
      <br/>
      <div class="container mt-8">
        <div class="row justify-content-center">
          <div class="col-3 mb-4" v-for="n in 11" :key="n">
            <div class="card" style="width: 18rem;">
              <img src="../assets/COVER.jpg" class="card-img-top rounded-2">
              <div class="card-body">
                <h4 class="card-title">イントロダクション</h4>
                <p class="card-text">Poppin'Party</p>
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
import { useRouter } from "vue-router"; //引入useRouter
import Page from '@/components/Page.vue';
import { initBlog, searchBlog } from "../api/blog";
import { getBlogType } from "../api/dictionary";
import { jsonp } from 'vue-jsonp';
import { checkToken } from "@/api/user";
export default {
  name: "music",
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
  mounted() {
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
};
</script>