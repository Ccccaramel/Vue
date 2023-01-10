<template>
  <div>
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/">
            <img src="../assets/home.jpg" class="rounded-2" style="weight:30px;height:30px;" />
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto ms-4 mb-2 justify-content-center mb-md-0">
            <li><a href="/community" class="nav-link px-2 text-white"><font-awesome-icon icon="fa-regular fa-comments"/>&ensp;社区</a></li>
            <li><a href="/searchTeam" class="nav-link px-2 text-white"><font-awesome-icon icon="fa-solid fa-users-line" />&ensp;搜索战队</a></li>
            <li><a href="/searchPlayer" class="nav-link px-2 text-white"><font-awesome-icon icon="fa-regular fa-user"/>&ensp;搜索玩家</a></li>
            <!-- <font-awesome-icon icon="fa-solid fa-shield-halved" /> -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><font-awesome-icon icon="fa-solid fa-book" />&ensp;档案馆</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item text-black" href="/explain"><font-awesome-icon icon="fa-solid fa-book-open-reader" />&ensp;参考前必读!</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-black" href="/gameRole"><font-awesome-icon icon="fa-solid fa-skull" />&ensp;游戏角色</a></li>
                <li><a class="dropdown-item text-black" href="/gear"><font-awesome-icon icon="fa-solid fa-shield-halved" />&ensp;强化装备</a></li>
                <li><a class="dropdown-item text-black" href="/honorRoadInfo"><font-awesome-icon icon="fa-solid fa-code-commit" />&ensp;荣誉之路奖励一览</a></li>
                <li><a class="dropdown-item text-black" href="/heroLeagueInfo"><font-awesome-icon icon="fa-solid fa-award" />&ensp;荣誉联赛星光奖励一览</a></li>
                <li><a class="dropdown-item text-black" href="/starlightLeagueInfo"><font-awesome-icon icon="fa-solid fa-medal" />&ensp;星光联赛奖励一览</a></li>
                <li><a class="dropdown-item text-black" href="/goldCouponRewardInfo"><font-awesome-icon icon="fa-solid fa-timeline" />&ensp;乱斗金券奖励一览</a></li>
                <li><a class="dropdown-item text-black" href="/clubLeagueInfo"><font-awesome-icon icon="fa-solid fa-ranking-star" />&ensp;战队竞赛奖励一览</a></li>
                <li><a class="dropdown-item text-black" href="/officialVersionUpdateLog"><font-awesome-icon icon="fa-solid fa-clipboard" />&ensp;官方版本更新日志</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><font-awesome-icon icon="fa-solid fa-gamepad"/>&ensp;小游戏</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item text-black" href="/gluttonousSnake"><font-awesome-icon icon="fa-solid fa-staff-snake" />&ensp;贪吃蛇</a></li>
                <li><a class="dropdown-item text-black" href="/tetris"><font-awesome-icon icon="fa-solid fa-cubes-stacked" />&ensp;俄罗斯方块</a></li>
                <!-- <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-black" href="#">more...</a></li> -->
              </ul>
            </li>
            <li><a href="/pointer" class="nav-link px-2 text-white"><font-awesome-icon icon="fa-solid fa-comment-dots" />&ensp;反馈与建议</a></li>
            <li><a href="/findYou" class="nav-link px-2 text-white"><font-awesome-icon icon="fa-solid fa-location-crosshairs" />&ensp;找到你</a></li>
            <!-- <font-awesome-icon icon="fa-solid fa-circle-question" /> -->
          </ul>
          <div class="text-end hide">
            <button type="button" v-if="!isLogin" class="btn btn-outline-light me-2" data-bs-toggle="modal"
              data-bs-target="#loginModal"><font-awesome-icon icon="fa-solid fa-right-to-bracket" />&ensp;登录/注册</button>
            <button ref="signUp" v-if="isLogin" type="button" class="btn btn-outline-light me-2"
              @click="userCenter()"><font-awesome-icon icon="fa-regular fa-circle-user" />&ensp;个人中心</button>
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
                <input type="text" class="form-control" v-model="userLoginInfo.account" maxlength="20" required>
                <label>用户名/ID</label>
              </div>
            </div>
            <div class="col-md mb-2">
              <div class="form-floating">
                <input type="password" class="form-control" v-model="userLoginInfo.password" maxlength="20" required>
                <label>密码</label>
              </div>
            </div>
            <div class="col-md mb-2 btn" data-bs-target="#resetPasswordByEmailCodeModal" data-bs-toggle="modal" @click="resetPasswordByEmailCode()">
                忘记了账号与密码?<label class="blockquote-footer">通过邮箱找回账号并修改密码</label>
            </div>
            <hr/>
            <div class="col-md mb-2">
              <div class="form-floating">
                <Strong>第三方注册/登录</Strong>
              </div>
            </div>
            <div class="col-md mb-2">
              <div class="d-grid gap-2">
                <button type="button" class="btn btn-outline-dark" @click="qqLogin()"><font-awesome-icon icon="fa-brands fa-qq"/>&ensp;使用QQ注册/登录</button>
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
                <input type="text" class="form-control" v-model="userRegisterInfo.account" maxlength="20" required>
                <label>用户名</label>
              </div>
            </div>
            <div class="col-md mb-2">
              <div class="form-floating">
                <input type="password" class="form-control" v-model="userRegisterInfo.password" maxlength="20" required>
                <label>密码</label>
              </div>
            </div>
            <div class="col-md mb-2">
              <div class="form-floating">
                <input type="password" class="form-control" v-model="userRegisterInfo.passwordR" maxlength="20" required>
                <label>密码确认</label>
              </div>
            </div>
            <div class="col-md mb-2">
              <div class="form-floating">
                <hr/>
                <Strong>第三方注册/登录</Strong>
              </div>
            </div>
            <div class="col-md mb-2">
              <div class="d-grid gap-2">
                <button type="button" class="btn btn-outline-dark" @click="qqLogin()"><font-awesome-icon icon="fa-brands fa-qq"/>&ensp;使用QQ注册/登录</button>
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

    <div class="modal fade" id="resetPasswordByEmailCodeModal" aria-hidden="true" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">找回账号并重置密码</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" id="closeLoginModal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="was-validated" novalidate>
                <div class="col-md mb-2">
                    <div class="form-floating">
                        <input type="text" class="form-control" v-model="emailVerifyInfo.email" maxlength="20" required>
                        <label>邮箱</label>
                    </div>
                </div>
                <div class="col-md mb-2">
                    <div class="form-floating">
                        <input type="text" class="form-control" v-model="emailVerifyInfo.emailCode" maxlength="20" required>
                        <label>验证码</label>
                    </div>
                </div>
                <div class="col-md mb-2 text-center">
                    <button type="button" class="btn btn-outline-success" :disabled="sendEmailCodeBtn" @click="sendEmailCode()">{{countDownBtnInfo}}{{countDown}}</button>
                </div>
            </form>
            <div class="alert alert-warning d-flex align-items-center justify-content-center" role="alert">
                <font-awesome-icon icon="fa-solid fa-circle-info" size="1x" bounce/>
                <div>
                    ⭐请在发送验证码后1分钟之内完成绑定,建议提前打开自己的邮箱
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="emailVerifyModalCloseBtn" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="emailVerify()" :disabled="emailVerifyBtn">确定</button>
          </div>
        </div>
      </div>
    </div>

    
    <div class="modal fade" id="updatePasswordModal" aria-hidden="true" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">重置密码</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" id="closeLoginModal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="was-validated" novalidate>
                <div class="col-md mb-2">
                    <div class="form-floating">
                        <input type="text" class="form-control" v-model="updatePasswordInfo.password" maxlength="20" required>
                        <label>密码</label>
                    </div>
                    <div class="invalid-feedback" v-if="updatePasswordInfo.password==null || updatePasswordInfo.password==''">
                      密码可不为空!
                    </div>
                </div>
                <div class="col-md mb-2">
                    <div class="form-floating">
                        <input type="text" class="form-control" v-model="updatePasswordInfo.passwordR" maxlength="20" required>
                        <label>密码确认</label>
                    </div>
                    <div class="invalid-feedback" v-if="updatePasswordInfo.password != updatePasswordInfo.passwordR">
                      密码与确认密码不一致!
                    </div>
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="updatePasswordModalCloseBtn" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updatePassword()" :disabled="updatePasswordBtn">确定</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 通用消息弹窗 -->
    <!-- Modal(1055) 比 Toast(默认) 的 z-index 值更高 -->
    <div class="position-fixed top-0 start-50 translate-middle-x p-3" style="z-index: 1100">
      <div id="commonToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="1000">
        <div class="toast-header">
          <strong class="me-auto">提示</strong>
          <small>现在</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          <div
            :class="commonResponse.success ? 'alert-success alert d-flex align-items-center' : 'alert-danger alert d-flex align-items-center'"
            role="alert">
            <font-awesome-icon icon="fa-regular fa-circle-check" v-if="commonResponse.success" size="1x" beat />
            <font-awesome-icon icon="fa-regular fa-circle-xmark" v-if="!commonResponse.success" size="1x" beat />
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
import { Modal, Toast, Popover } from 'bootstrap';
import { register, login, checkToken,updatePassword } from '@/api/user';
import { saveVisitLog } from "../api/visitLog";
import { getPublicKey, encrypt, encryptWeb, decryptWeb, getExploreName } from "@/api/common";
import { sendEmailCode,emailVerify } from '@/api/emailCode';
import { jsonp } from 'vue-jsonp';
import Fingerprint2 from 'fingerprintjs2';
export default {
  name: "top",
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
      visitLogInfo: {},
      publicKey: '',
      privateKey: '',
      emailVerifyInfo: {},
      countDownBtnInfo: '发送验证码',
      countDown: '',
      sendEmailCodeBtn: true,
      emailVerifyBtn: true,
      updatePasswordInfo:{},
    }
  },
  props: ["commonResponse"],
  updated() { //更新之后.场景:获取更新真实DOM之后
      var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new Popover(popoverTriggerEl)
      });
  },
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
    emailVerifyInfo: {
      handler() {
          this.checkEmailInfo();
      },
      deep: true,
    },
    updatePasswordInfo: {
      handler() {
          this.checkUpdatePasswordInfo();
      },
      deep: true,
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
          }],
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
        },
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
              this.showToast(this.commonResponse);
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
      getPublicKey().then( // 获取加密密钥
        response => {
          this.publicKey = response.data.data.publicKey;
          this.login();
        }
      )
    },
    qqLogin() { // qq 登录/注册
      console.log("qq登录");
      QC.Login.showPopup({
        appId: "102029041",// 填写在QQ互联上申请的AppId
        redirectURI: "https://www.164office.cn/qqLogin", //填写回调地址 登录成功后会自动跳往该地址
        
      });
    },
    login() {
      jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
        key: 'VQPBZ-GZIKU-QNPV7-B7MD5-PPA2F-TMBES',
        output: 'jsonp'
      }).then(res => {
        var ad_info = res.result.ad_info;
        this.visitLogInfo.trueAddress = ad_info.nation + ad_info.province + ad_info.city + ad_info.district;
        this.visitLogInfo.ip = res.result.ip;
        this.visitLogInfo.address = ad_info.nation + ad_info.province;

        this.userLoginInfo.password = encrypt(this.userLoginInfo.password, this.publicKey); // 加密
        login(
          Object.assign(
            this.userLoginInfo,
            {
              data: encrypt(JSON.stringify(this.visitLogInfo), this.publicKey)
            }
        )).then( // 调用登录接口
          response => {
            if (response.data.code == 1) {
              this.isLogin = true;
              localStorage.setItem('authorization', response.data.data.token);
              localStorage.setItem('power', encryptWeb(response.data.data.power)); // 加密
              document.getElementById("closeLoginModal").click(); // 关闭 Modal
              this.refreshUserLoginInfo();
            } else {
              this.userLoginInfo.password = "";
            }
            this.showToast(response);
          }
        );
      });
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
        this.showToast(this.commonResponse);
        return;
      };
      this.createFingerprint();
      getPublicKey().then( // 获取加密密钥
        response => {
          this.publicKey = response.data.data.publicKey;
          this.userRegisterInfo.password = encrypt(this.userRegisterInfo.password, this.publicKey); // 加密
          this.userRegisterInfo.no = encrypt(localStorage.getItem('browserId'), this.publicKey); // 指纹
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
              this.showToast(response);
            }
          );
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
    },
    // 创建浏览器指纹
    createFingerprint() {
      var options = {
        fonts: {
          extendedJsFonts: true,
        },
        excludes: {
          audio: true,
          userAgent: true,
          enumerateDevices: true,
          touchSupport: true,
        }
      };
      var fingerprint = Fingerprint2.get(options,(components) => { // 参数只有回调函数时,默认浏览器指纹依据所有配置信息进行生成
        var values = components.map(compoent => compoent.value); // 配置的值的数组
        var murmur = Fingerprint2.x64hash128(values.join(''), 31); // 生成浏览器指纹
        // console.log("components:" + components);
        // console.log("values:" + values);
        // console.log("murmur:" + murmur);
        // alert(murmur);
        localStorage.setItem('browserId', murmur); // 存储浏览器指纹,在项目中用于校验用户身份和埋点
      });
    },
    resetPasswordByEmailCode() {
      document.getElementById("closeLoginModal").click();
    },
    checkEmailInfo() {
      this.sendEmailCodeBtn = true;
      this.emailVerifyBtn = true;
      var patt = /^[0-9a-zA-Z]{2,20}@[0-9a-zA-Z]{2,10}.[0-9a-zA-Z]{2,5}$/;
      if (patt.test(this.emailVerifyInfo.email)) {
          this.sendEmailCodeBtn = false;
          this.countDownBtnInfo = '发送验证码';
          if (this.emailVerifyInfo.emailCode !=null && this.emailVerifyInfo.emailCode != '') {
              this.emailVerifyBtn = false;
          }
      }
    },
    checkUpdatePasswordInfo() {
      this.updatePasswordBtn = true;
      if (this.updatePasswordInfo.password!=null && this.updatePasswordInfo.passwordR!=null && this.updatePasswordInfo.password==this.updatePasswordInfo.passwordR) {
        this.updatePasswordBtn = false;
      }
    },
    sendEmailCode() {
      this.createFingerprint();
      getPublicKey().then( // 获取加密密钥
        response => {
          this.publicKey = response.data.data.publicKey;
          jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
              key: 'VQPBZ-GZIKU-QNPV7-B7MD5-PPA2F-TMBES',
              output: 'jsonp'
          }).then(res => {
            var ad_info = res.result.ad_info;
            this.visitLogInfo.trueAddress = ad_info.nation + ad_info.province + ad_info.city + ad_info.district;
            this.visitLogInfo.ip = res.result.ip;
            this.visitLogInfo.address = ad_info.nation + ad_info.province;
            this.emailVerifyInfo.title = "找回账号|重置密码";
            this.emailVerifyInfo.fingerprint = encrypt(localStorage.getItem('browserId'), this.publicKey); // 指纹
            this.emailVerifyInfo.data = encrypt(JSON.stringify(this.visitLogInfo), this.publicKey);
            sendEmailCode(this.emailVerifyInfo).then(
              response => {
                if (response.data.code == 1) {
                  this.bindEmailReadonly = true;
                  this.start = new Date();
                  this.countDown = 60;
                  this.countDownBtnInfo = '验证码已发送-';
                  this.sendEmailCodeBtn = true;
                  var that = this;
                  this.countDownObj = setInterval(function () {
                    that.timer()
                  }, 1000);
                }
                this.showToast(response);
              }
            )
          });
        }
      )
    },
    timer() {
      var now = new Date();
      var det = now - this.start;
      now.setTime(det);
      now.setHours(0);
      console.log(det);
      this.countDown = 60 - now.getSeconds();
      console.log("倒计时:"+this.countDown);
      if (this.countDown == 60) {
          this.countDown = 0;
          clearInterval(this.countDownObj);
          this.countDownBtnInfo = '发送验证码';
          this.countDown = '';
          this.bindEmailReadonly = false;
          this.sendEmailCodeBtn = false;
      }
    },
    emailVerify() {
      emailVerify(this.emailVerifyInfo).then(
        response => {
          this.showToast(response);
          if (response.data.code == 1) { // 验证通过
            localStorage.setItem('emailToken', response.data.data);
            var updatePasswordModal = document.getElementById('updatePasswordModal');
            var modal = new Modal(updatePasswordModal);
            modal.show();
          }
          document.getElementById('emailVerifyModalCloseBtn').click();
        }
      )
    },
    updatePassword() {
      updatePassword(Object.assign({
        password: encrypt(this.updatePasswordInfo.password, this.publicKey), // 加密
        emailToken: localStorage.getItem('emailToken')
      })).then(
        response => {
          this.showToast(response);
          document.getElementById("updatePasswordModalCloseBtn").click();
        }
      )
    },
    // 公共接口,为其它页面提供
    saveVisitLog(info) {
      getPublicKey().then( // 获取加密密钥
        response => {
          this.publicKey = response.data.data.publicKey;
          jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
            key: 'VQPBZ-GZIKU-QNPV7-B7MD5-PPA2F-TMBES',
            output: 'jsonp'
          }).then(res => {
            var ad_info = res.result.ad_info;
            this.visitLogInfo.trueAddress = ad_info.nation + ad_info.province + ad_info.city + ad_info.district;
            this.visitLogInfo.ip = res.result.ip;
            this.visitLogInfo.address = ad_info.nation + ad_info.province;
            this.visitLogInfo.note = info;
            var data = encrypt(JSON.stringify(this.visitLogInfo), this.publicKey);
            saveVisitLog(
              data
            ).then(
              response => {
              }
            );
          })
        }
      )
    },
  }
};
</script>

<style scoped lang="less">

</style>
