<template>
    <div>
      <Top :commonResponse="commonResponseData"></Top>
  
      <div class="container">
        <div class="row align-items-center">
          <div class="col">
            <div class="card text-center">
              <div class="card-header">
                <h4>第三方登录-QQ!</h4>
              </div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>QQ扫码一键(注册并)登录!</p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
   
  <script>
  import Top from "@/components/Top.vue";
  export default {
    name: "qq",
    components: {
      Top
    },
    data() {
      return {
        commonResponseData: { // Modal 弹窗数据
          success: true,
          msg: '',
        },
      }
    },
    mounted() {
    },
    methods: {
      commonPageChange(event) { // 通用分页
        this.page = event;
        this.searchOfficialVersionUpdateLog();
      },
      //在回调页面要定时触发，检测用户是否登录，用户登录后传openId和accessToken到后端进行自己的业务编写
      qqLogin(){
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        // var that = this; // 先将vue这个对象保存在_self对象中
        //检查是否登录
        if (QC.Login.check()) {
          QC.Login.getMe(function (openId, accessToken) {
            if (  openId != undefined ){
              HttpManager.QqLoginUrl(accessToken,openId).then((res) => {
                $message({
                  message: "登陆成功",
                  type: "success",
                });
                if (res.code==200) {
                  console.log("登录成功请求用户数据成功！")
                } else {
                  console.log("登录成功但请求用户数据失败！")
                }
              }).catch(err => {
                console.error(err)
              })
            }
          });
        } else {
          console.log('未登录!')
        }
      },
    },
  };
  </script>