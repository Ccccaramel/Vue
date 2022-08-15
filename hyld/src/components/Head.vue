<template>
  <div>
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
              <use xlink:href="#bootstrap" />
            </svg>
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
            <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
            <li><a href="#" class="nav-link px-2 text-white">About</a></li>
          </ul>

          <div class="text-end hide">
            <button type="button" class="btn btn-outline-light me-2" @click="login()">Login</button>
            <button ref="signUp" v-if="show" type="button" class="btn btn-outline-light me-2">Sign-up</button>
          </div>
        </div>
      </div>
    </header>
    <!-- 通用消息弹窗 -->
    <!-- Modal(1055) 比 Toast(默认) 的 z-index 值更高 -->
    <div class="position-fixed top-0 start-50 translate-middle-x p-3" style="z-index: 1100">
      <div id="commonToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
        <div class="toast-header">
          <strong class="me-auto">提示</strong>
          <small>现在</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          <div :class="commonResponse.success ? 'alert-success alert d-flex align-items-center': 'alert-danger alert d-flex align-items-center'" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
              {{commonResponse.msg}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "head",
  data(){
    return{
      show: false,
      commonResponse: {
        success: true,
        msg: '',
      },
    }
  },
  props:["commonResponse"],
  methods:{
    login(){
      this.$router.push("/userCenter");
    },
    getToday(){
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      };
      return year+'-'+month+'-'+strDate;
    },
  }
};
</script>

<style scoped lang="less">
</style>
