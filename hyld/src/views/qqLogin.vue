<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>

    <br/>

    <figure class="text-center">
      <blockquote class="blockquote">
        <img src="../assets/qq/qq_250x300.png" class="rounded-2" style="height:64px;" />
        <p>还差最后一步,设置密码就完成了\^o^/</p>
      </blockquote>
    </figure>

    <form class="was-validated">
      <div class="container text-center mb-3">
        <div class="row justify-content-center">
          <div class="col-5">
            <div class="input-group has-validation">
              <div class="form-floating is-invalid w-100">
                <input type="text" class="form-control is-invalid" placeholder="昵称" v-model="userInfo.account" required>
                <label for="floatingPassword">昵称</label>
              </div>
              <div class="invalid-feedback" v-if="userInfo.account==null || userInfo.account==''">
                昵称可不为空!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container text-center mb-3">
        <div class="row justify-content-center">
          <div class="col-5">
            <div class="input-group has-validation">
              <div class="form-floating is-invalid w-100">
                <input type="password" class="form-control is-invalid" placeholder="密码" v-model="userInfo.password" required>
                <label for="floatingPassword">密码</label>
              </div>
              <div class="invalid-feedback" v-if="userInfo.password==null || userInfo.password==''">
                密码可不为空!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container text-center mb-3">
        <div class="row justify-content-center">
          <div class="col-5">
            <div class="input-group has-validation">
              <div class="form-floating is-invalid w-100">
                <input type="password" class="form-control is-invalid" placeholder="密码确认" v-model="userInfo.passwordR" required>
                <label for="floatingPassword">密码确认</label>
              </div>
              <div class="invalid-feedback" v-if="passwordRTip">
                两次密码不一致!
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col">
          <hr/>
        </div>
      </div>
    </div>

    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-auto">
          <button type="button" class="btn btn-outline-dark" role="button" @click="qqUserLogin()" :disabled="qqUserLoginBtn">提交</button>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { Modal, Toast, Popover } from 'bootstrap';
import Fingerprint2 from 'fingerprintjs2';
import { getPublicKey, encrypt,encryptWeb } from "@/api/common";
import { jsonp } from 'vue-jsonp';
import Top from "@/components/Top.vue";
import { qqLogin } from '@/api/user';
import { saveVisitLog } from "../api/welcome";
import { qqUserInfoRecord } from '@/api/qqUser';
export default {
  name: "qqLogin",
  components: {
    Top
  },
  data() {
    return {
      commonResponseData: { // Modal 弹窗数据
        success: true,
        msg: '',
      },
      openId: '',
      accessToken: '',
      userInfo: {},
      qqUserInfo: {},
      qqUserLoginBtn: true,
      passwordRTip: true,
      publicKey: '', 
      visitLogInfo:{},
    }
  },
  watch: {
    userInfo: {
      handler() {
        this.check();
      },
      deep: true
    },
  },
  mounted() {
    saveVisitLog(Object.assign({key:15}));
  },
  created() {
    // this.visitLogInfo.ip = returnCitySN['cip'];
    // this.visitLogInfo.address = returnCitySN['cname'];
    /**
     * 抛弃使用上述方法获取
     *   1.不稳定时不时报未定义或403导致代码无法继续往下执行严重影响QQ登录功能
     *   2.定位完全不准确,提供的地址毫无准确性(搞着玩似的)
     * 直接使用QQ提供的API,可靠准确
     **/
    this.createFingerprint();
    // 检查是否登录
    if (QC.Login.check()) {
      var that = this;
        QC.Login.getMe(function (openId, accessToken) { // 无需从 url 中截取这两个参数
          if (openId !== undefined) { // QQ 已登陆,获得 openId
            that.userInfo.qqOpenId = openId; //openId 是用户的唯一标识
            that.accessToken = accessToken;
            that.createFingerprint(); // 创建指纹

            getPublicKey().then( // 获取加密密钥
              response => {
                that.publicKey = response.data.data.publicKey;
                that.userInfo.no = encrypt(localStorage.getItem('browserId'), that.publicKey); // 指纹

                qqLogin(
                  Object.assign(
                    that.userInfo,
                    {
                      data: encrypt(JSON.stringify(that.visitLogInfo), that.publicKey)
                    },
                  )).then(
                    response => {
                      if (response.data.code == 1) { // 一键登录成功!
                        localStorage.setItem('authorization', response.data.data.token);
                        localStorage.setItem('power', encryptWeb(response.data.data.power)); // 加密
                        that.showToast(response);
                        setTimeout(() => {
                          that.$router.push("/")
                        }, 2000);
                      };
                    }
                  );
                  // 先将信息保存至变量
                  // ret 返回码,0: 正确返回,其它: 失败。错误码说明详见公共返回码说明
                  // msg 如果ret<0，会有相应的错误信息提示，返回数据全部用UTF-8编码
                  // is_lost 已丢失
                  QC.api('get_user_info').success(function (s) { // 指定接口访问成功的接收函数，s为成功返回Response对象
                    that.qqUserInfo = s.data;// 成功回调，通过s.data获取OpenAPI的返回数据
                    that.qqUserInfo.openId = openId;// 成功回调，通过s.data获取OpenAPI的返回数据
                    that.userInfo.account = that.qqUserInfo.nickname;
                  }).error(function (f) {
                    // 失败回调
                    alert('获取用户信息失败！')
                  });
              }
            );
          }
        })
        // console.log('qq成功登录!')
      } else {
        // console.log('qq登录失败!')
      }
  },
  methods: {
    commonPageChange(event) { // 通用分页
      this.page = event;
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
    qqUserLogin() {
      this.userInfo.password = encrypt(this.userInfo.password, this.publicKey); // 加密
      this.userInfo.no = encrypt(localStorage.getItem('browserId'), this.publicKey); // 指纹
      qqLogin(
        Object.assign(
          this.userInfo,
          {
            data: encrypt(JSON.stringify(this.visitLogInfo), this.publicKey)
          },
          this.qqUserInfo,
        )).then(
          response => {
            if (response.data.code == 1) {
              this.showToast(response);
              localStorage.setItem('authorization', response.data.data.token);
              localStorage.setItem('power', encryptWeb(response.data.data.power)); // 加密
              setTimeout(() => {
                this.$router.push("/")
              }, 2000);
            } else {
              this.userInfo.password = "";
              this.showToast(response);
            }
        }
      );
    },
    check() {
      this.qqUserLoginBtn = false;
      if (this.userInfo.passwordR==this.userInfo.password) {
        this.passwordRTip = false;
      } else {
        this.passwordRTip = true;
        this.qqUserLoginBtn = true;
      }
      if (this.userInfo.account==null || this.userInfo.account=='') {
        this.qqUserLoginBtn = true;
      }
      if (this.userInfo.password==null || this.userInfo.password=='') {
        this.qqUserLoginBtn = true;
      }
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
  },
};
</script>