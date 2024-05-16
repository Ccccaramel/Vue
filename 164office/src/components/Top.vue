<template>
  <div>
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/">
            <img src="../assets/home.png" class="rounded-2" style="weight:42px;height:42px;" />
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto ms-4 mb-2 justify-content-center mb-md-0">
            <!-- <li><a href="/community" class="nav-link px-2 text-white"><font-awesome-icon icon="fa-regular fa-comments"/>&ensp;社区</a></li>
            <li><a href="/searchTeam" class="nav-link px-2 text-white"><font-awesome-icon icon="fa-solid fa-users-line" />&ensp;搜索战队</a></li>
            <li><a href="/searchPlayer" class="nav-link px-2 text-white"><font-awesome-icon icon="fa-regular fa-user"/>&ensp;搜索玩家</a></li> -->
            <!-- <font-awesome-icon icon="fa-solid fa-shield-halved" /> -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><font-awesome-icon :icon="['fas', 'skull']" style="color: #f1b31e;" />&ensp;BS区</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item text-black" href="/explain"><font-awesome-icon icon="fa-solid fa-book-open-reader" />&ensp;参考前必读!</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-black" href="/community"><font-awesome-icon icon="fa-regular fa-comments"/>&ensp;社区</a></li>
                <li><a class="dropdown-item text-black" href="/searchTeam"><font-awesome-icon icon="fa-solid fa-users-line" />&ensp;搜索战队</a></li>
                <li><a class="dropdown-item text-black" href="/searchPlayer"><font-awesome-icon icon="fa-regular fa-user"/>&ensp;搜索玩家</a></li>
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
              <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><font-awesome-icon icon="fa-solid fa-gamepad" style="color: #9797ff;"/>&ensp;小游戏</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item text-black" href="/gluttonousSnake"><font-awesome-icon icon="fa-solid fa-staff-snake" />&ensp;贪吃蛇</a></li>
                <li><a class="dropdown-item text-black" href="/tetris"><font-awesome-icon icon="fa-solid fa-cubes-stacked" />&ensp;俄罗斯方块</a></li>
                <li><a class="dropdown-item text-black" href="/mineClearance"><font-awesome-icon :icon="['fas', 'land-mine-on']" />&ensp;扫雷</a></li>
                <li><a class="dropdown-item text-black" href="/fruitMachine"><font-awesome-icon :icon="['far', 'lemon']" />&ensp;水果机</a></li>
                <li><a class="dropdown-item text-black" href="/chineseChess"><font-awesome-icon :icon="['far', 'chess-knight']" />&ensp;中国象棋</a></li>
                <!-- <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-black" href="#">more...</a></li> -->
              </ul>
            </li>
            <li><a href="/pointer" class="nav-link px-2 text-white"><font-awesome-icon icon="fa-solid fa-lightbulb" style="color: #ffec59;" />&ensp;反馈与建议</a></li>
            <li><a href="/findYou" class="nav-link px-2 text-white"><font-awesome-icon icon="fa-solid fa-location-crosshairs" style="color: #f85555;" />&ensp;找到你</a></li>
            <li><a href="/blog" class="nav-link px-2 text-white"><font-awesome-icon icon="blog" style="color: #66ccff;" />&ensp;博客</a></li>
            <li><a href="/musicList" class="nav-link px-2 text-white"><font-awesome-icon icon="fa-solid fa-music" style="color: #ff9494;" />&ensp;Music</a></li>
            <li><a href="/chat" class="nav-link px-2 text-white"><font-awesome-icon :icon="['fas', 'comment-dots']" style="color: #c0ff61;" />&ensp;聊天室</a></li>
            <li v-if="weatherFlag==1"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'smog']" fade style="color: #dbdbdb;" /></a></li>
            <li v-if="weatherFlag==2"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'cloud']" fade style="color: #7cd7fe;" /></a></li>
            <li v-if="weatherFlag==3"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'bolt']" fade style="color: #a680ff;" /></a></li>
            <li v-if="weatherFlag==4"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'sun']" fade style="color: #ffe252;" /></a></li>
            <li v-if="weatherFlag==5"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'wind']" fade style="color: #a08231;" /></a></li>
            <li v-if="weatherFlag==6"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'tornado']" fade style="color: #90b1c1;" /></a></li>
            <li v-if="weatherFlag==7"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'snowflake']" fade style="color: #ffc2c2;" /></a></li>
            <li v-if="weatherFlag==8"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'cloud-rain']" fade style="color: #cefd86;" /></a></li>
            <li v-if="weatherFlag==9"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'cloud-meatball']" fade style="color: #a3ffcb;" /></a></li>
            <li v-if="weatherFlag==10"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'meteor']" fade style="color: #fe7171;" /></a></li>
            <li v-if="weatherFlag==11"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'moon']" fade style="color: #fef595;" /></a></li>
            <li v-if="weatherFlag==12"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'cloud-moon']" fade style="color: #3e6ec1;" /></a></li>
            <li v-if="weatherFlag==13"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'cloud-bolt']" fade style="color: #87229b;" /></a></li>
            <li v-if="weatherFlag==14"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'cloud-moon-rain']" fade style="color: #695d83;" /></a></li>
            <li v-if="weatherFlag==15"><a href="/" class="nav-link px-2 text-white" data-bs-toggle="modal" data-bs-target="#weatherModal"><font-awesome-icon :icon="['fas', 'cloud-showers-water']" fade style="color: #376ecd;" /></a></li>
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
    <div class="modal fade" id="trendModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <div class="d-flex align-items-center">
              <div class="badge rounded-pill bg-primary" style="font-size:larger">{{trendData.title}}</div>
              <h4 class="modal-title align-items-center">趋势分析</h4>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row" id="trendModalBody">
                <main class="ms-sm-auto" v-for="e,i in trendData.data" :key="i">
                  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom">
                    <h5>{{e.name}}</h5>
                  </div>
                  <canvas class="my-4 w-100" :id="e.id" width="900" height="380"></canvas>
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

    <!-- 天气详情弹窗 -->
    <div class="modal fade" id="weatherModal" tabindex="-1" aria-labelledby="weatherModal" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5"><span class="badge rounded-pill bg-primary ">{{weatherLocationInfo.name}}</span>天气详情</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container text-center">
              <div class="row align-items-center">
                <div class="col-2">
                  <h5><span class="badge bg-primary">当前天气</span>&ensp;{{weatherNowInfo.text}}</h5>
                </div>
                <div class="col-2">
                  <h5><span class="badge bg-success">当前温度</span>&ensp;{{weatherNowInfo.temp}}</h5>
                </div>
                <div class="col-2">
                  <h5><span class="badge bg-success">当前体感温度</span>&ensp;{{weatherNowInfo.feels_like}}</h5>
                </div>
                <div class="col-2">
                  <h5><span class="badge bg-info">当前相对湿度</span>&ensp;{{weatherNowInfo.rh}}</h5>
                </div>
                <div class="col-2">
                  <h5><span class="badge bg-warning">当前风力等级</span>&ensp;{{weatherNowInfo.wind_class}}</h5>
                </div>
                <div class="col-2">
                  <h5><span class="badge bg-warning">当前风向</span>&ensp;{{weatherNowInfo.wind_dir}}</h5>
                </div>
                <div class="col-12">
                  <table class="table text-center table-hover caption-top">
                    <caption class="text-center alert-primary" role="alert">
                        <h4><span class="badge rounded-pill bg-primary ">未来五天天气预报</span></h4>
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">日期</th>
                            <th scope="col">星期</th>
                            <th scope="col">白天天气</th>
                            <th scope="col">夜晚天气</th>
                            <th scope="col">最高气温</th>
                            <th scope="col">最低气温</th>
                            <th scope="col">白天风力等级</th>
                            <th scope="col">夜晚风力等级</th>
                            <th scope="col">白天风向</th>
                            <th scope="col">夜晚风向</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(info, index) in weatherForecastsInfo" :key="index">
                            <th scope="row">{{ info.date }}</th>
                            <td>{{ info.week }}</td>
                            <td>{{ info.text_day }}</td>
                            <td>{{ info.text_night }}</td>
                            <td>{{ info.high }}</td>
                            <td>{{ info.low }}</td>
                            <td>{{ info.wc_day }}</td>
                            <td>{{ info.wc_night }}</td>
                            <td>{{ info.wd_day }}</td>
                            <td>{{ info.wd_night }}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p hidden="hidden">ding!office!,164office,164office.cn,个人网站,包含博客区,音乐区,小游戏区,荒野乱斗社区等,内置简易账单模块,欢迎使用。</p>
  </div>
</template>

<script>
import bootstrap, { Modal, Toast, Popover } from 'bootstrap';
import { register, login, checkToken,updatePassword } from '@/api/user';
import { getPublicKey, encrypt, encryptWeb, decryptWeb, getExploreName,getWeather } from "@/api/common";
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
      updatePasswordInfo: {},
      trendData: {
        title: '', // 标题
        data:[] // 数据允许多个折线图,每个元素内包含 labelId labelsList dataList
      },
      updatePasswordBtn: true,
      weatherForecastsInfo: [],  // 五天预报
      weatherLocationInfo: {},  // 位置信息
      weatherNowInfo:{},  // 实时信息
      weatherFlag:1,
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
    this.getWeather();
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
    showTrendModal(data) {
      this.trendData = data;
      console.log(">"+JSON.stringify(this.trendData));
      this.$nextTick(() => {
          this.updateTrendData();
      });
    },
    updateTrendData() {
      for (var i = 0; i < this.trendData.data.length; i++) {
        console.log(this.trendData.data[i].id+","+this.trendData.data[i].data.nameList+","+this.trendData.data[i].data.creditList);
        this.setChartData(this.trendData.data[i].id, this.trendData.data[i].data.nameList, this.trendData.data[i].data.creditList);
      }
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
      QC.Login.showPopup({
        appId: "102029041",// 填写在QQ互联上申请的AppId
        redirectURI: "https://www.164office.cn/qqLogin", //填写回调地址 登录成功后会自动跳往该地址
        
      });
    },
    login() {

      this.userLoginInfo.password = encrypt(this.userLoginInfo.password, this.publicKey); // 加密
        login(
          Object.assign(
            this.userLoginInfo
        )).then( // 调用登录接口
          response => {
            if (response.data.code == 1) {
              this.isLogin = true;
              localStorage.setItem('authorization', response.data.data.token);
              localStorage.setItem('power', encryptWeb(response.data.data.power)); // 加密,加密后大小有4KB,Cookie无法满足
              document.cookie = 'power:'+localStorage.getItem('power');
              document.getElementById("closeLoginModal").click(); // 关闭 Modal
              this.refreshUserLoginInfo();
              this.refreshChat();
            } else {
              this.userLoginInfo.password = "";
            }
            this.showToast(response);
          }
        );
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

          this.emailVerifyInfo.title = "找回账号|重置密码";
          this.emailVerifyInfo.fingerprint = encrypt(localStorage.getItem('browserId'), this.publicKey); // 指纹
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
        }
      )
    },
    timer() {
      var now = new Date();
      var det = now - this.start;
      now.setTime(det);
      now.setHours(0);
      // console.log(det);
      this.countDown = 60 - now.getSeconds();
      // console.log("倒计时:"+this.countDown);
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
    refreshChat() {  // 如果当前页面是 chat 则需要刷新 chat 页面
      if (this.$router.currentRoute.value.name == "chat") {
        this.$emit('refreshData');
      }
    },
    getWeather() {
      getWeather().then(
        response => {
          var weatherInfo = response.data.data.weatherInfo.result;
          this.weatherForecastsInfo = weatherInfo.forecasts;
          this.weatherLocationInfo = weatherInfo.location;
          this.weatherNowInfo = weatherInfo.now;
          this.weatherFlagUpdate(weatherInfo.now);
        }
      )
    },
    weatherFlagUpdate(now) {  // 详见 https://lbs.baidu.com/faq/api?title=webapi/download 天气取值对照表
      var time = new Date();
      var h = time.getHours;
      if (['雾','轻雾','浓雾','强浓雾','霾','中度霾','重度霾','大雾','特强浓雾'].includes(now.text)) {
        this.weatherFlag = 1;  // 云+雾
      }
      else if (['多云','阴'].includes(now.text)) {
        if (h>18||h<6) {
          this.weatherFlag = 12;  // 月亮+云
        }
        else {
          this.weatherFlag = 2;  // 云
        }
      }
      else if (['闪电'].includes(now.text)) {
        this.weatherFlag = 3;  // 闪电
      }
      else if (['晴'].includes(now.text)) {
        if (h>18||h<6) {
          this.weatherFlag = 11;  // 月亮
        }
        else {
          this.weatherFlag = 4;  // 太阳
        }
      }
      else if (['沙尘暴','浮尘','扬沙','强沙尘暴'].includes(now.text)) {
        this.weatherFlag = 5;  // 风
      }
      else if (['龙卷风',''].includes(now.text)) {
        this.weatherFlag = 6;  // 龙卷风
      }
      else if (['雪','阵雪','小雪','中雪','大雪','暴雪','小到中雪','中到大雪','大到暴雪','弱高吹雪'].includes(now.text)) {
        this.weatherFlag = 7;  // 雪花
      }
      else if (['小雨','中雨','冻雨','小到中雨','中到大雨','雨'].includes(now.text)) {
        if (h>18||h<6) {
          this.weatherFlag = 14;  // 雨+月亮
        }
        else {
          this.weatherFlag = 8;  // 云+雨
        }
      }
      else if (['雨夹雪'].includes(now.text)) {
        this.weatherFlag = 9;  // 云+雪+冰雹
      }
      else if (['火球'].includes(now.text)) {
        this.weatherFlag = 10;  // 火球
      }
      else if (['月亮'].includes(now.text)) {
        this.weatherFlag = 11;  // 月亮
      }
      else if (['月亮+云'].includes(now.text)) {
        this.weatherFlag = 12;  // 月亮+云
      }
      else if (['阵雨','雷阵雨','雷阵雨伴有冰雹'].includes(now.text)) {
        this.weatherFlag = 13;  // 云+闪电
      }
      else if (['雨+月亮'].includes(now.text)) {
        this.weatherFlag = 14;  // 雨+月亮
      }
      else if (['大雨','暴雨','大暴雨','特大暴雨'].includes(now.text)) {
        this.weatherFlag = 15;  // 大雨+波浪
      }
      else {
        this.weatherFlag = 10;
      }
    },
  }
};
</script>

<style scoped lang="less">

</style>
