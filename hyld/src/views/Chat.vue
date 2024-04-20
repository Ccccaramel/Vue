<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData" @refreshData="refresh($event)"></Top>

    <div class="container mt-2">
      <div class="row">

        <div class="col-12">
          <div class="list-group">
            <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">  <!-- 大厅 -->
                <button class="nav-link active" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" @click="switchObj(null,0)">
                  <img src="../assets/chat/c-allUser.png" class="rounded border border-1 border-white" style="weight:42px;height:42px;" />
                </button>
              </li>

              <li class="nav-item" role="presentation" v-for="relationshipInfo,i in relationshipInfoList" :key="i">  <!-- 好友列表 -->
                <button class="nav-link" data-bs-toggle="pill" :data-bs-target="'#pills-contact-'+relationshipInfo.id" type="button" role="tab" :aria-controls="'pills-contact-'+relationshipInfo.id" aria-selected="false" @click="switchObj(relationshipInfo.self?relationshipInfo.another.id:relationshipInfo.user.id,(i+1))">  <!-- i=0是对应大厅 -->
                  <img :src="relationshipInfo.self?relationshipInfo.another.headPortrait.imageUrl:relationshipInfo.user.headPortrait.imageUrl" class="rounded-circle border border-1" style="weight:42px;height:42px;" />
                </button>
              </li>

              <li class="nav-item" role="presentation">  <!-- 加好友&申请列表 -->
                <button class="nav-link" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" @click="getMyApplicationList()">
                  <img src="../assets/chat/c-addUser.png" class="rounded border border-1 border-white" style="weight:42px;height:42px;" />
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" role="tabpanel" id="pills-home" tabindex="0">
                
                <div class="container text-center">
                  <div class="row align-items-center">
                    <div class="col-2 align-middle text-center">
                      <div class="vstack align-items-center">
                        <div class="alert alert-warning" role="alert">
                          广告位招租!
                        </div>
                      </div>
                    </div>
                    <div class="col-8 overflow-auto chat-bg mt-2" style="height: 500px;" id="contentWindow-0" @mousewheel="getLastChat" @dblclick="bottom(0)">
                      <div class="container text-center">
                        <div class="spinner-grow text-info" role="status" v-if="searchChatLock">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                        <div :class="'row justify-content-'+(chatInfo.self?'end':'start')+' text-start'" v-for="chatInfo,j in chatList[0]" :id="'chat-0-'+j" :key="j">
                          <div class="col-1" v-if="!chatInfo.self">
                            <img :src="chatInfo.recipient.headPortrait.imageUrl" class="rounded-circle border border-1" style="weight:42px;height:42px;" />
                          </div>
                          <div class="col">
                            <div :class="'alert alert-'+(chatInfo.self?'primary':'success')" role="alert">
                              <div class="blog-content mb-0" v-html="chatInfo.content"></div>
                              {{chatInfo.createTimeStr}}
                            </div>
                          </div>
                          <div class="col-1" v-if="chatInfo.self">
                            <img :src="chatInfo.sender.headPortrait.imageUrl" class="rounded-circle border border-1" style="weight:42px;height:42px;" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-2 overflow-auto" style="height: 500px;">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="hallInfo,i in hallInfoList" :key="i">
                          <span class="d-inline-block text-truncate" data-bs-toggle="popover"
                            data-bs-trigger="hover focus" :data-bs-content="hallInfo.createTimeStr"
                            style="max-width: 164px;">
                            {{hallInfo.content}}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <hr/>
                <div class="container text-center">
                  <div class="row justify-content-center">
                    <div class="col-auto">
                      <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#chatModal">对话</button>
                    </div>
                  </div>
                </div>

              </div>

              <div class="tab-pane fade" role="tabpanel" tabindex="0" v-for="relationshipInfo,i in relationshipInfoList" :key="i" :id="'pills-contact-'+relationshipInfo.id" >
                <div class="container text-center">
                  <div class="row align-items-center">
                    <div class="col-2 align-middle text-center">
                      <div class="vstack align-items-center">
                        <img :src="relationshipInfo.self?relationshipInfo.another.headPortrait.imageUrl:relationshipInfo.user.headPortrait.imageUrl" class="rounded-circle" style="max-width:64px;" />
                        <span :class="'mt-1 badge hyld-bg-' + (relationshipInfo.self?relationshipInfo.another.grade:relationshipInfo.user.grade) + ' rounded-pill mx-auto text-center'" style="max-width: 64px;">Lv{{ relationshipInfo.self?relationshipInfo.another.grade:relationshipInfo.user.grade }}</span>
                        <span>{{ relationshipInfo.self?relationshipInfo.another.name:relationshipInfo.user.name }}</span>
                        <span class="d-inline-block text-truncate" data-bs-toggle="popover"
                          data-bs-trigger="hover focus" :data-bs-content="relationshipInfo.self?relationshipInfo.another.note:relationshipInfo.user.note"
                          style="max-width: 64px;">
                          {{ relationshipInfo.self?relationshipInfo.another.note:relationshipInfo.user.note }}
                        </span>
                        <span :class="'badge text-bg-primary relationship-bg-' + relationshipInfo.type.id+' mt-1'">{{relationshipInfo.type.name}}</span>
                        <button type="button" class="btn btn-outline-info mt-1">聊天记录</button>
                        <button type="button" class="btn btn-outline-danger mt-1">解除关系</button>
                        <button type="button" class="btn btn-outline-dark mt-1">拉黑</button>
                      </div>
                    </div>
                    <div class="col-8 overflow-auto chat-bg mt-2" style="height: 500px;" :id="'contentWindow-'+(i+1)" @mousewheel="getLastChat" @dblclick="bottom(i+1)">
                        <div class="container text-center">
                          <div class="spinner-grow text-info" role="status" v-if="searchChatLock">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                          <div :class="'row justify-content-'+(chatInfo.self?'end':'start')+' text-start'" v-for="chatInfo,j in chatList[i+1]" :id="'chat-'+(i+1)+'-'+j" :key="j">
                            <div class="col-auto">
                              <div :class="'alert alert-'+(chatInfo.self?'primary':'success')" role="alert">
                                <div class="blog-content mb-0" v-html="chatInfo.content"></div>
                                {{chatInfo.createTimeStr}}
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="col-2 align-middle text-center">
                      <div class="vstack align-items-center">
                        <div class="alert alert-warning" role="alert">
                          广告位招租!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr/>
                <div class="container text-center">
                  <div class="row justify-content-center">
                    <div class="col-auto">
                      <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#chatModal" @click="chatBtn()">对话</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tab-pane fade" role="tabpanel" id="pills-profile" tabindex="0">
                <div class="container text-center mt-2">
                  <div class="row justify-content-center">
                    <div class="col-auto align-self-center">
                        <input type="text" class="form-control" v-model="relationshipVo.another" placeholder="用户ID">
                    </div>
                    <div class="col-auto align-self-center">
                        <input type="text" class="form-control" v-model="relationshipVo.note" placeholder="备注">
                    </div>
                    <div class="col-auto align-self-center">
                      <button type="button" class="btn btn-primary" @click="addRelationship()">申请</button>
                    </div>
                  </div>
                </div>
                <div class="container text-center mt-2">
                  <div class="row align-items-center">
                    <div class="col align-self-center">
                      <table class="table table-light">
                        <thead>
                          <tr>
                            <th scope="col">用户</th>
                            <th scope="col">关系</th>
                            <th scope="col">状态</th>
                            <th scope="col">申请时间</th>
                            <th scope="col">留言</th>
                            <th scope="col">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(relationshipInfo,i) in applicationList" :key="i">
                            <td>{{relationshipInfo.another.name}}</td>
                            <td>{{relationshipInfo.type.name }}</td>
                            <td>{{relationshipInfo.status.name }}</td>
                            <td>{{relationshipInfo.createTimeStr }}</td>
                            <td>{{relationshipInfo.note }}</td>
                            <td>
                              <span class="btn badge rounded-pill bg-warning me-1" v-if="relationshipInfo.self && relationshipInfo.status.id==3301" @click="revoke(relationshipInfo.id)">撤销</span>
                              <span class="btn badge rounded-pill bg-danger me-1" v-if="!relationshipInfo.self && relationshipInfo.status.id==3301" @click="refuse(relationshipInfo.id)">拒绝</span>
                              <span class="btn badge rounded-pill bg-success ms-1" v-if="!relationshipInfo.self&& relationshipInfo.status.id==3301" @click="agree(relationshipInfo.id)">同意</span>
                            </td>
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

      </div>
    </div>

    <!-- 回复弹窗 -->
    <div class="modal fade" id="chatModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">回复</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ChatTinymce ref="chat" v-model="msg" @onClick="onClick"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="chatModalCloseBtn">取消</button>
            <button type="button" class="btn btn-primary" @click="sendMessage()">发送</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { Toast, Popover } from 'bootstrap';
import { userIDCheck } from "@/api/common";
import Top from "@/components/Top.vue";
import ChatTinymce from "@/components/ChatTinymce.vue";
import Page from '@/components/Page.vue';
import { getMyRelationship, addRelationship, getMyApplicationList, revoke, refuse, agree } from "../api/relationship";
import { sendMessage, searchChat } from "../api/chat";
export default {
  name: "chat",
  components: {
    Top,
    Page,
    ChatTinymce,
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
      relationshipInfoList: [],
      applicationList: [],
      relationshipVo: {
        another: '',
        note:'',
      },
      currentRecipient: 0,  // 当前聊天对方用户id
      currentWindows: 0,  // 当前的聊天窗口序号
      chatVo: {
      },
      mapList: [0],  // 窗口顺序与对方用户id的映射关系,第一个默认为0,表示大厅窗口,当你接收到消息时,根据此列表找到对应窗口
      chatList: [[]],  // 用于存储每个对话窗口中显示的信息
      pageList: [1],  // 用于存储每个对话窗口中显示的信息的页数
      searchChatLock: false,
      getting: false,  // 拉取新数据
      ws: null,  // WS连接
      hallInfoList: [],  // 大厅消息通知
      refreshLock: false,  // 是否自动滚到最新消息处,只有当前窗口在最底部时才自动滚动至最新消息处
    }
  },
  mounted() {
    this.init();
  },
  updated() { //更新之后.场景:获取更新真实DOM之后
    var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new Popover(popoverTriggerEl)
    });
  },
  beforeUnmount() {  // 关闭页面前关闭websocket连接
    window.removeEventListener('beforeunload', this.closeWindows);
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
    commonTip(code,msg) {
        var response = {
            data: {
                code: code,
                msg: msg,
            },
        }
        this.showToast(response);
    },
    init() {
      this.switchObj(null,0);  // 获取大厅聊天信息,即使用户没有登录
      this.getMyRelationship();
      this.createWS();
    },
    getMyRelationship() {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        getMyRelationship().then(
          response => {
            this.relationshipInfoList = response.data.data.data;
            if (this.relationshipInfoList != null && this.relationshipInfoList.length != 0) {
              for (var i = 0; i < this.relationshipInfoList.length; i++) {
                this.pageList.push(1);
                this.chatList.push([]);
                this.mapList.push(this.relationshipInfoList[i].self?this.relationshipInfoList[i].another.id:this.relationshipInfoList[i].user.id);
              }
            }
          }
        )
      }
    },
    addRelationship() {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        if (!userIDCheck(this.relationshipVo.another)) {
          this.commonTip(0, "请输入用户ID!");
        }
        addRelationship(this.relationshipVo).then(
          response => {
            this.showToast(response);
            this.getMyApplicationList();
          }
        )
      }
      else {
        this.commonTip(0, "请先登录!");
      }
    },
    getMyApplicationList() {
      this.currentRecipient = null;
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        getMyApplicationList().then(
          response => {
            this.applicationList = response.data.data.data;
          }
        )
      }
    },
    revoke(id) {  // 撤销
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        revoke(Object.assign({id:id})).then(
          response => {
            this.showToast(response);
            this.getMyApplicationList();
          }
        )
      }
    },
    refuse(id) {  // 拒绝
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        refuse(Object.assign({id:id})).then(
          response => {
            this.showToast(response);
            this.getMyApplicationList();
          }
        )
      }
    },
    agree(id) {  // 同意
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        agree(Object.assign({id:id})).then(
          response => {
            this.showToast(response);
            this.getMyApplicationList();
            this.getMyRelationship();
          }
        )
      }
    },
    sendMessage() {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        this.chatVo.recipient = this.currentRecipient;
        this.chatVo.content = this.$refs.chat.textContent;
        this.chatVo.currentWindows = this.currentWindows;
        this.ws.send(JSON.stringify(this.chatVo));
      }
      else {
        this.commonTip(0, "请先登录!");
      }
    },
    switchObj(id, index) {  // 切换聊天对象
      this.currentRecipient = id;
      this.currentWindows = index;
      if (this.chatList[this.currentWindows].length == 0) {  // 切换聊天窗口时,只有当数据为空时才会去请求
        this.delayGetChat();
      }
    },
    getLastChat(event) {  // 滚轮浏览至顶部触发
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        if (document.getElementById("contentWindow-"+this.currentWindows).scrollTop==0&&event.deltaY<0) {  // 第二个条件是判断滚轮的方向
          this.delayGetChat();
        }
      }
      else {
        this.commonTip(0, "请先登录!");
      }
    },
    delayGetChat() {  // 有一个拉取的特效,但请求响应太快了,以至特效都看不到,所以加了1s延迟
      if (this.searchChatLock) {
        return;
      }
      else {
        this.searchChatLock = true;
      }
      setTimeout(() => {
          this.searchChat();
      }, 1000);
    },
    searchChat() {  // 搜索滚动拉取历史消息时,要传递当前窗口展示的信息中时间距离最远的id,后台查询时以此id作为起始点,而不是简单的分页,否则随着新的聊天信息的增加,可能会导致拉取历史信息重复
      var locate = true;  // 是否已拉取所有聊天信息
      var point = 10;
      searchChat(Object.assign(
        {
          recipient: this.currentRecipient,
          currentWindows:this.currentWindows
        },
        { // 通用 Page
          size: 10,
          currentPage: this.pageList[this.currentWindows], // 偏移量,数据库从0开始
        },
      )).then(  // 获取与该对象最近最多10条聊天的信息数据
        response => {
          var list = response.data.data.data.reverse();
          this.pageList[this.currentWindows]++;  // 数据条数为最大,可能还有下一页,允许+1
          if(list.length==0){  // 已拉取所有
            locate =false;
            this.pageList[this.currentWindows]--;
            this.commonTip(1,"以获取全部信息");
          }
          else {
            point = list.length;
            if (this.chatList[this.currentWindows]<=10) {
              point--;
            }
            this.chatList[this.currentWindows] = list.concat(this.chatList[this.currentWindows]);  // 合并数组,不要用 unshift
          }
          this.searchChatLock = false;
        }
      ).then(
        () => {
          if(locate){
            document.getElementById("chat-"+this.currentWindows+"-"+point).scrollIntoView({ behavior: "smooth" });
          }
        }
      );
    },
    bottom(i) {  // 当前窗口立即定位至最新消息
      document.getElementById("chat-"+i+"-"+(this.chatList[this.currentWindows].length-1)).scrollIntoView({ behavior: "smooth" });
    },
    bottom2(i) {  // 指定窗口立即定位至最新消息
      document.getElementById("chat-"+i+"-"+(this.chatList[i].length-1)).scrollIntoView({ behavior: "smooth" });
    },
    createWS() {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {  // 登录状态才会主动建立连接
        var url;
        if (process.env.VUE_APP_MODE === "development") {
          console.log("development");
          url = "ws://hyld.office.com/wsLink/linkChat/"+localStorage.getItem('authorization');  // 开发
        } else if (process.env.VUE_APP_MODE==="test") {
          // test
          console.log("test");
        } else if (process.env.VUE_APP_MODE === "production") {
          console.log("production");
          url = "wss://164office.cn/wsLink/linkChat/" + localStorage.getItem('authorization');  // 非开发
        }
        this.ws = new WebSocket(url);  // websocket对象创建,与服务器建立连接,第二个参数可选,指定连接协议
        this.ws.onopen = () => {  // 建立连接时触发
          console.log("ws-连接建立成功!");
        };
        this.ws.onmessage = function (evt) {  // 客户端接收到服务端数据时触发
          console.log("ws-收到新消息!");
          var res = JSON.parse(evt.data);
          if (res.isSystemMessage) {  // 系统消息
            this.hallInfoList.unshift(res.chatInfo);
          }
          else {  // 聊天消息
            var targetWindow = res.chatInfo.recipient.id == res.chatInfo.sender.id ? 0 : (res.chatInfo.self?res.chatInfo.recipient.id:res.chatInfo.sender.id);
            this.chatList[this.mapList.indexOf(targetWindow)].push(res.chatInfo);
            document.getElementById("chatModalCloseBtn").click();
            this.$refs.chat.textContent = "";
            this.$nextTick(() => {
              this.bottom2(this.mapList.indexOf(targetWindow));
            });
          }
        }.bind(this);  // 如果要调用methods中的方法,可通过 bind() 绑定
        this.ws.error = function (evt) {  // 通信发生错误时触发
          console.log("ws-error!");
        };
        this.ws.onclose = function () {  // 连接关闭时触发
          console.log("ws-关闭连接!");
        };
      }
      else {
        this.commonTip(0,"未登录状态将无法即使获取最新消息!");
      }
    },
    refresh() {
      this.init();
    },
    closeWindows() { // 关闭页面
      this.ws.close();
    },
    chatBtn() {
      console.log();
      this.$refs.chat.recipient = this.mapList[this.currentWindows];
    },
  },
};
</script>