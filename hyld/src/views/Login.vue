<template>
  <div class="h-100">
    <!-- <form class="row g-3 needs-validation" novalidate @submit.prevent="userLogin"> -->
      <section class="py-5 text-center container h-100">
        <div class="row py-lg-5 h-100">
          <div class="col-lg-3 col-md-8 mx-auto position-absolute top-50 start-50 translate-middle">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model.lazy="loginForm.userId" id="userId" placeholder="name@example.com">
                <label for="floatingInput">账号</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" v-model.lazy="loginForm.password" id="password" placeholder="name@example.com">
                <label for="floatingInput">密码</label>
            </div>
            <div class="dropdown-divider"></div>
            <button class="btn btn-primary" type="button" @click="userLogin()">登录</button>
          </div>
        </div>
      </section>
    <!-- </form> -->
  </div>
</template>

<script>
import { login } from "../api/login";
export default {
  name: "login",
  data() {
    return {
      // login: false
      loginForm: {
        userId: '',
        password: ''
      },
      userVo: {
        account: "1",
        password: '123123'
      },
    }
  },
  mounted() {
    console.log("go");
    // axios.get("localhost:8090/test1")
    //   .then(function (response) {
    //     console.log(response);
    //   }).catch(function (error) {
    //     console.log(error);

    //   });
  },
  methods: {
    userLogin() {
      var Ip=returnCitySN['cip']
      var cityname=returnCitySN['cname']
      localStorage.setItem('Ip', Ip)
      console.log(localStorage.getItem('Ip', Ip))
      localStorage.setItem('cityname', cityname)
      console.log(localStorage.getItem('cityname', cityname))
      login(this.userVo).then(
        response=>{
          console.log(">>>:"+response.data.msg);
        }
      )
    },
  },
};
</script>