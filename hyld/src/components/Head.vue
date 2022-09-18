<template>
  <div>
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/">
            <img src="../assets/home.jpg" style="weight:30px;height:30px;" />
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" class="nav-link px-2 text-white">首页</a></li>
            <li><a href="/searchTeam" class="nav-link px-2 text-white">搜索战队</a></li>
            <li><a href="/searchPlayer" class="nav-link px-2 text-white">搜索玩家</a></li>
          </ul>

          <div class="text-end hide">
            <button type="button" v-if="!isLogin" class="btn btn-outline-light me-2" data-bs-toggle="modal"
              data-bs-target="#loginModal">登录/注册</button>
            <button ref="signUp" v-if="isLogin" type="button" class="btn btn-outline-light me-2"
              @click="userCenter()">个人中心</button>
          </div>
        </div>
      </div>
    </header>
    <div class="modal fade" id="loginModal" aria-hidden="true" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">登录</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" id="closeLoginModal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="col-md mb-2">
              <div class="form-floating">
                <input type="text" class="form-control" v-model="userLoginInfo.account" required>
                <label>用户名/ID</label>
              </div>
            </div>
            <div class="col-md mb-2">
              <div class="form-floating">
                <input type="password" class="form-control" v-model="userLoginInfo.password" required>
                <label>密码</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" data-bs-target="#registerModal" data-bs-toggle="modal">我没有账号,去注册</button>
            <button type="button" class="btn btn-primary" @click="userLogin()" :disabled="userLoginBtn">登录</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="registerModal" aria-hidden="true" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">注册</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" id="closeRegisterModal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="col-md mb-2">
              <div class="form-floating">
                <input type="text" class="form-control" v-model="userRegisterInfo.account" required>
                <label>用户名</label>
              </div>
            </div>
            <div class="col-md mb-2">
              <div class="form-floating">
                <input type="password" class="form-control" v-model="userRegisterInfo.password" required>
                <label>密码</label>
              </div>
            </div>
            <div class="col-md mb-2">
              <div class="form-floating">
                <input type="password" class="form-control" v-model="userRegisterInfo.passwordR" required>
                <label>密码确认</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" data-bs-target="#loginModal" data-bs-toggle="modal">我有账号,去登录</button>
            <button type="button" class="btn btn-primary" :disabled="userRegisterBtn"
              @click="userRegister()">注册</button>
          </div>
        </div>
      </div>
    </div>

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
          <div
            :class="commonResponse.success ? 'alert-success alert d-flex align-items-center' : 'alert-danger alert d-flex align-items-center'"
            role="alert">
            <font-awesome-icon icon="fa-regular fa-circle-check" v-if="commonResponse.success" size="1x" beat/>
            <font-awesome-icon icon="fa-regular fa-circle-xmark" v-if="!commonResponse.success" size="1x" beat/>
            <div>
              &ensp;{{ commonResponse.msg }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 通用图形化数据展示 Model -->
    <div class="modal fade" id="teamDataModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <div class="d-flex align-items-center">
              <div class="badge rounded-pill bg-primary" style="font-size:larger">{{teamName}}</div>
              <h4 class="modal-title align-items-center">综合数据统计</h4>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <main class="ms-sm-auto">
                  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom">
                    <h5>战队联赛周</h5>
                  </div>
                  <canvas class="my-4 w-100" id="competitionChart" width="900" height="380"></canvas>
                </main>
                <main class="ms-sm-auto">
                  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom">
                    <h5>战队任务周</h5>
                  </div>
                  <canvas class="my-4 w-100" id="taskChart" width="900" height="380"></canvas>
                </main>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal,Toast } from 'bootstrap';
import { register, login, checkToken } from '@/api/user';
export default {
  name: "head",
  data() {
    return {
      isLogin: false,
      teamName: '',
      userLoginInfo: {
        account: '',
        password: '',
      },
      userRegisterInfo: {
        account: '',
        password: '',
        passwordR: '',
      },
      userRegisterBtn: true,
      userLoginBtn: true,
      token: '',
    }
  },
  props: ["commonResponse"],
  mounted() {
    this.checkToken();
  },
  watch: {
    userLoginInfo: {
      handler() {
        this.checkUserLoginInfo();
      },
      deep: true
    },
    userRegisterInfo: {
      handler() {
        this.checkUserRegisterInfo();
      },
      deep: true
    },
  },
  methods: {
    showToast(response) { // 通用信息展示
      if (response.data.code == 0) {
        this.commonResponse.success = false;
      } else {
        this.commonResponse.success = true;
      }
      this.commonResponse.msg = response.data.msg;
      this.$emit('commonResponse', this.commonResponse);
      var toastLiveExample = document.getElementById('commonToast');
      var toast = new Toast(toastLiveExample);
      toast.show();
    },
    showTeamDataModal(event) {
      this.teamName = event.teamName;
      this.setChartData("competitionChart", event.competition.nameList, event.competition.creditList);
      this.setChartData("taskChart", event.task.nameList, event.task.creditList);
      var editCreditModal = document.getElementById('teamDataModal');
      var modal = new Modal(editCreditModal);
      modal.show();
    },
    setChartData(labelId, labelsList, dataList) {
      feather.replace({ 'aria-hidden': 'true' })
      var ctx = document.getElementById(labelId)
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labelsList,
          datasets: [{
            data: dataList,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }]
          },
          legend: {
            display: false
          }
        }
      })
    },
    checkToken() { // 检查状态,如果存在token则请求后台检测token是否有效
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 0) {
              localStorage.clear();
              this.commonResponse.success = false;
              this.commonResponse.msg = response.data.msg;
              this.$emit('commonResponse', this.commonResponse);
              var toastLiveExample = document.getElementById('commonToast');
              var toast = new Toast(toastLiveExample);
              toast.show();
              setTimeout(() => {
                this.$router.push("/")
              }, 2000);
            }
            else {
              this.isLogin = true;
            }
          }
        )
      }
      else {
        this.isLogin = false;
      }
    },
    userLogin() {
      login(this.userLoginInfo).then(
        response => {
          if (response.data.code == 0) {
            this.commonResponse.success = false;
          }
          else {
            this.commonResponse.success = true;
            this.isLogin = true;
            localStorage.setItem('authorization', response.data.data);
            document.getElementById("closeLoginModal").click(); // 关闭 Modal
            this.refreshUserLoginInfo();
          }

          this.commonResponse.msg = response.data.msg;
          this.$emit('commonResponse', this.commonResponse);
          var toastLive = document.getElementById('commonToast');
          var toast = new Toast(toastLive);
          toast.show();
        }
      )
    },
    checkUserLoginInfo() {
      this.userLoginBtn = true;
      if (this.userLoginInfo.account != '' && this.userLoginInfo.password != '') {
        this.userLoginBtn = false;
      }
    },
    checkUserRegisterInfo() {
      this.userRegisterBtn = true;
      if (this.userRegisterInfo.account != '' && this.userRegisterInfo.password != '' && this.userRegisterInfo.passwordR != '') {
        this.userRegisterBtn = false;
      }
    },
    userRegister() {
      if (this.userRegisterInfo.password != this.userRegisterInfo.passwordR) {
        this.commonResponse.success = false;
        this.commonResponse.msg = "密码与确认密码不一致!";
        var toastLive = document.getElementById('commonToast');
        var toast = new Toast(toastLive);
        toast.show();
        return;
      };
      register(this.userRegisterInfo).then(
        response => {
          if (response.data.code == 0) {
            this.commonResponse.success = false;
          }
          else {
            this.commonResponse.success = true;
            document.getElementById("closeRegisterModal").click(); // 关闭 Modal
            this.refreshUserRegisterInfo();
          }
          this.commonResponse.msg = response.data.msg;
          this.$emit('commonResponse', this.commonResponse);
          var toastLive = document.getElementById('commonToast');
          var toast = new Toast(toastLive);
          toast.show();
        }
      );
    },
    refreshUserRegisterInfo() {
      this.userRegisterInfo = {
        account: '',
        password: '',
        passwordR: '',
      };
    },
    refreshUserLoginInfo() {
      this.userLoginInfo = {
        account: '',
        password: '',
      };
    },
    userCenter() {
      this.$router.push("/userCenter");
    }
  }
};
</script>

<style scoped lang="less">

</style>
