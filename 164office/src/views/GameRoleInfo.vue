<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>

    <div class="container text-center">
      <div class="row alert alert-primary">
        <div class="col-md-2 offset-md-5">
          <h4>角色数据</h4>
        </div>
        <div class="col-md-2 offset-md-3 btn">
          <font-awesome-icon v-if="like == 0 || like != 1" icon="fa-regular fa-thumbs-up" @click="likeBtn(1)" size="2x" />
          <font-awesome-icon v-if="like == 1" icon="fa-solid fa-thumbs-up" @click="likeBtn(0)" size="2x" />
          &emsp;
          <font-awesome-icon v-if="like == 0 || like != 2" icon="fa-regular fa-thumbs-down" @click="likeBtn(2)" size="2x" />
          <font-awesome-icon v-if="like == 2" icon="fa-solid fa-thumbs-down" @click="likeBtn(0)" size="2x" />

        </div>
      </div>
    </div>

    <!-- 简介 & 基本属性 -->
    <div class="container">
      <div class="row justify-content-between">
        <div class="col" style="height:540px;">
          <div class="shadow-lg p-3 mb-5 bg-body rounded h-100">
            <div class="alert alert-primary h-100" role="alert">
              <h2 class="alert-heading">{{ gameRoleInfo.name }}</h2>
              <h5><span class="badge bg-primary me-1">定位</span>{{ gameRoleInfo.position.name }}</h5>
              <h5><span class="badge bg-primary me-1">品质</span>{{ gameRoleInfo.rarity.name }}</h5>
              <h5 style="white-space: pre-wrap"><span class="badge bg-primary me-1">简介</span>{{ gameRoleInfo.profile }}</h5>
              <hr />
              <h5><span class="badge bg-primary me-1">生命值</span>{{ gameRoleInfo.hp }}</h5>
              <h5 style="white-space: pre-wrap"><span class="badge bg-primary me-1">移动速度</span>{{ gameRoleInfo.speed }}</h5>
              <h5 v-if="gameRoleInfo.inborn != ''" style="white-space: pre-wrap"><span class="badge bg-primary me-1">天赋</span>{{ gameRoleInfo.inborn }}</h5>
              <hr>
              <h5><span class="badge bg-primary me-1">上线时间</span>{{ gameRoleInfo.launchTimeStr }}</h5>
            </div>
          </div>
        </div>
        <div class="col text-center" style="height:540px;">
          <div class="shadow-lg p-3 mb-5 bg-body rounded h-100">
            <img :src="gameRoleInfo.portraitUrl" class="rounded-2 h-100" />
          </div>
        </div>
      </div>
    </div>

    <br />

    <!-- 普通攻击 & 超级技能 -->
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="shadow-lg p-3 mb-5 bg-body rounded h-100">
            <div class="alert alert-info h-100" role="alert">
              <h3 class="alert-heading"><span class="badge bg-primary me-1">普通攻击</span>{{
                  gameRoleInfo.normalAttackInfo.name
              }}</h3>
              <h5 style="white-space: pre-wrap"><span class="badge bg-primary me-1">描述</span>{{ gameRoleInfo.normalAttackInfo.details }}</h5>
              <hr />
              <div v-if="gameRoleInfo.normalAttackInfo!=null && gameRoleInfo.normalAttackInfo.normalAttackAttributeInfoList.length > 0">
                <h5
                  v-for="(normalAttackAttributeInfo, id) in gameRoleInfo.normalAttackInfo.normalAttackAttributeInfoList" :key="id" style="white-space: pre-wrap">
                  <span class="badge bg-primary me-1">{{ normalAttackAttributeInfo.name }}</span>
                  {{ normalAttackAttributeInfo.details }}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6" v-for="superSkill in gameRoleInfo.superSkillInfo" :key="superSkill.id">
          <div class="shadow-lg p-3 mb-5 bg-body rounded h-100">
            <div class="alert alert-info h-100" role="alert">
              <h3 class="alert-heading"><span class="badge bg-primary me-1">超级技能</span>{{
                  superSkill.name
              }}</h3>
              <h5 style="white-space: pre-wrap"><span class="badge bg-primary me-1">描述</span>{{ superSkill.details }}</h5>
              <hr />
              <div v-if="superSkill.superSkillAttributeInfoList!=null && superSkill.superSkillAttributeInfoList.length > 0">
                <h5 v-for="(superSkillAttributeInfo, id) in superSkill.superSkillAttributeInfoList" :key="id"  style="white-space: pre-wrap">
                  <span class="badge bg-primary me-1">{{ superSkillAttributeInfo.name }}</span>
                  {{ superSkillAttributeInfo.details }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />

    <!-- 妙具和星辉 -->
    <div class="container">
      <div class="row">
        <div class="col" v-for="gadgetInfo in gameRoleInfo.gadgetInfoList" :key="gadgetInfo.name" style="padding-top: 12px;">
          <div class="shadow-lg rounded alert alert-success h-100">
            <div class="card border-0 alert alert-success">
              <div class="w-100 container text-center">
                <img :src="gadgetInfo.imageUrl" class="card-img-top" style="width:64px;height:64px;" />
              </div>
              <hr />
              <div class="card-body">
                <h5 class="card-title">{{ gadgetInfo.name }}</h5>
                <p class="card-text" style="white-space: pre-wrap"><span class="badge bg-primary me-1">效果</span>{{ gadgetInfo.details }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col" v-for="starPowerInfo in gameRoleInfo.starPowerInfoList" :key="starPowerInfo.name" style="padding-top: 12px;">
          <div class="shadow-lg rounded alert alert-warning h-100">
            <div class="card border-0 alert alert-warning">
              <div class="w-100 container text-center">
                <img :src="starPowerInfo.imageUrl" class="card-img-top" style="width:64px;height:64px;" />
              </div>
              <hr />
              <div class="card-body">
                <h5 class="card-title">{{ starPowerInfo.name }}</h5>
                <p class="card-text" style="white-space: pre-wrap"><span class="badge bg-primary me-1">效果</span>{{ starPowerInfo.details }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container pt-5 text-center" v-if="gameRoleInfo.secondaryForm!=null">
      <div class="row align-items-center">
        <div class="col">
          <div class="alert alert-danger" role="alert">
            <Strong>次级形态</Strong>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二形态 简介 & 基本属性 -->
    <div class="container" v-if="gameRoleInfo.secondaryForm!=null">
      <div class="row justify-content-between">
        <div class="col" style="height:540px;">
          <div class="shadow-lg bg-body rounded h-100">
            <div class="alert alert-primary h-100" role="alert">
              <h2 class="alert-heading">{{ gameRoleInfo.secondaryForm.name }}</h2>
              <h5><span class="badge bg-primary me-1">定位</span>{{ gameRoleInfo.secondaryForm.position.name }}</h5>
              <h5><span class="badge bg-primary me-1">品质</span>{{ gameRoleInfo.secondaryForm.rarity.name }}</h5>
              <h5 style="white-space: pre-wrap"><span class="badge bg-primary me-1">简介</span>{{ gameRoleInfo.secondaryForm.profile }}</h5>
              <hr />
              <h5><span class="badge bg-primary me-1">生命值</span>{{ gameRoleInfo.secondaryForm.hp }}</h5>
              <h5 style="white-space: pre-wrap"><span class="badge bg-primary me-1">移动速度</span>{{ gameRoleInfo.secondaryForm.speed }}</h5>
              <h5 v-if="gameRoleInfo.secondaryForm.inborn != ''"><span class="badge bg-primary me-1">天赋</span>{{ gameRoleInfo.secondaryForm.inborn
              }}
              </h5>
              <hr>
              <h5><span class="badge bg-primary me-1">上线时间</span>{{ gameRoleInfo.secondaryForm.launchTimeStr }}</h5>
            </div>
          </div>
        </div>
        <div class="col text-center" style="height:540px;">
          <div class="shadow-lg p-3 mb-5 bg-body rounded h-100">
            <img :src="gameRoleInfo.secondaryForm.portraitUrl" class="rounded-2 h-100" />
          </div>
        </div>
      </div>
    </div>

    <!-- 第二形态 普通攻击 & 超级技能 -->
    <div class="container mt-5" v-if="gameRoleInfo.secondaryForm!=null">
      <div class="row">
        <div class="col-6">
          <div class="shadow-lg p-3 mb-5 bg-body rounded h-100">
            <div class="alert alert-info h-100" role="alert">
              <h3 class="alert-heading"><span class="badge bg-primary me-1">普通攻击</span>{{
                  gameRoleInfo.secondaryForm.normalAttackInfo.name
              }}</h3>
              <h5 style="white-space: pre-wrap"><span class="badge bg-primary me-1">描述</span>{{ gameRoleInfo.secondaryForm.normalAttackInfo.details }}</h5>
              <hr />
              <div v-if="gameRoleInfo.secondaryForm.normalAttackInfo.normalAttackAttributeInfoList.length > 0">
                <h5
                  v-for="(normalAttackAttributeInfo, id) in gameRoleInfo.secondaryForm.normalAttackInfo.normalAttackAttributeInfoList" :key="id" style="white-space: pre-wrap">
                  <span class="badge bg-primary me-1">{{ normalAttackAttributeInfo.name }}</span>
                  {{ normalAttackAttributeInfo.details }}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="shadow-lg p-3 mb-5 bg-body rounded h-100">
            <div class="alert alert-info h-100" role="alert">
              <h3 class="alert-heading"><span class="badge bg-primary me-1">超级技能</span>{{
                  gameRoleInfo.secondaryForm.superSkillInfo.name
              }}</h3>
              <h5 style="white-space: pre-wrap"><span class="badge bg-primary me-1">描述</span>{{ gameRoleInfo.secondaryForm.superSkillInfo.details }}</h5>
              <hr />
              <div v-if="gameRoleInfo.secondaryForm.superSkillInfo.superSkillAttributeInfoList.length > 0">
                <h5 v-for="(superSkillAttributeInfo, id) in gameRoleInfo.secondaryForm.superSkillInfo.superSkillAttributeInfoList" :key="id"  style="white-space: pre-wrap">
                  <span class="badge bg-primary me-1">{{ superSkillAttributeInfo.name }}</span>
                  {{ superSkillAttributeInfo.details }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div class="container text-center">
      <div class="row alert alert-primary">
        <div class="col">
          <h4>角色评论</h4>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col">

          <div v-if="this.gameRoleCommentList.length==0">
            <div class="alert alert-info" role="alert">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" size="1x" />
                ~~>_&lt;~~居然没人评论?!看样子<strong>沙发</strong>非你莫属了!
            </div>
            <div class="col-md mb-2">
                <div class="form-floating text-center">
                    <img src="../assets/hyld/null.jpg" class="rounded"/>
                </div>
            </div>
          </div>

          <div class="list-group">
            <a  class="list-group-item list-group-item-action" aria-current="true" v-for="(gameRoleComment,i) in gameRoleCommentList" :key="i">
              <div class="container">
                <div class="row align-items-start">
                  <div class="col-auto text-center">
                    <!-- <img :src="gameRoleComment.userInfo.headPortrait.imageUrl" class="rounded-circle" style="weight:52px;height:52px;" />
                    <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus" :data-bs-content="gameRoleComment.userInfo.name" style="max-width: 80px;">
                      {{gameRoleComment.userInfo.name}}
                    </span>
                    <span :class="'badge hyld-bg-'+gameRoleComment.userInfo.grade+' rounded-pill'">Lv{{gameRoleComment.userInfo.grade}}</span> -->
                    <div class="vstack">
                      <img :src="gameRoleComment.userInfo.headPortrait.imageUrl" class="rounded-circle" style="width: 3rem;" />
                      <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus"
                        :data-bs-content="gameRoleComment.userInfo.name" style="max-width: 3rem;">
                        {{gameRoleComment.userInfo.name}}
                      </span>
                      <span :class="'badge hyld-bg-' + gameRoleComment.userInfo.grade + ' rounded-pill mx-auto text-center'">Lv{{ gameRoleComment.userInfo.grade }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <h3>{{gameRoleComment.rubric}}</h3>
                    <p class="fw-bold" style="white-space: pre-wrap">{{gameRoleComment.text}}</p>
                    <small>{{gameRoleComment.createTimeStr}}&emsp;{{gameRoleComment.address}}</small>

                    <!-- 楼中楼 -->
                    <div class="container list-group list-group-item-primary" v-if="gameRoleComment.replyInfo!=null">
                      <div class="row align-items-start mt-1" v-for="(reply,i) in gameRoleComment.replyInfo" :key="i">
                        <div class="col-auto text-center">
                          <!-- <img :src="reply.userInfo.headPortrait.imageUrl" class="rounded-circle" style="weight:36px;height:36px;" />
                          <span :class="'badge hyld-bg-'+reply.userInfo.grade+' rounded-pill'">Lv{{reply.userInfo.grade}}</span>
                          <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus" :data-bs-content="reply.userInfo.name" style="max-width: 60px;">
                            {{reply.userInfo.name}}
                          </span> -->
                          <div class="vstack">
                            <img :src="reply.userInfo.headPortrait.imageUrl" class="rounded-circle" style="width: 3rem;" />
                            <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus"
                              :data-bs-content="reply.userInfo.name" style="max-width: 3rem;">
                              {{reply.userInfo.name}}
                            </span>
                            <span :class="'badge hyld-bg-' + reply.userInfo.grade + ' rounded-pill mx-auto text-center'">Lv{{ reply.userInfo.grade }}</span>
                          </div>
                        </div>
                        <div class="col-1 text-center" style="width:24px;padding:0px" v-if="gameRoleComment.id!=reply.parentId">
                          <font-awesome-icon icon="fa-solid fa-share" />
                        </div>
                        <div class="col-auto text-center" v-if="gameRoleComment.id!=reply.parentId">
                          <!-- <img :src="reply.replyUser.headPortrait.imageUrl" class="rounded-circle" style="weight:36px;height:36px;" />
                          <span :class="'badge hyld-bg-'+reply.replyUser.grade+' rounded-pill'">Lv{{reply.replyUser.grade}}</span>
                          <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus" :data-bs-content="reply.replyUser.name" style="max-width: 60px;">
                            {{reply.replyUser.name}}
                          </span> -->
                          <div class="vstack">
                            <img :src="reply.replyUser.headPortrait.imageUrl" class="rounded-circle" style="width: 3rem;" />
                            <span class="d-inline-block text-truncate" data-bs-toggle="popover" data-bs-trigger="hover focus"
                              :data-bs-content="reply.replyUser.name" style="max-width: 3rem;">
                              {{reply.replyUser.name}}
                            </span>
                            <span :class="'badge hyld-bg-' + reply.replyUser.grade + ' rounded-pill mx-auto text-center'">Lv{{ reply.replyUser.grade }}</span>
                          </div>
                        </div>
                        <div class="col">
                          <h4>{{reply.rubric}}</h4>
                          <p class="fw-bold" style="white-space: pre-wrap">{{reply.text}}</p>
                          <small>{{reply.createTimeStr}}&emsp;{{reply.address}}</small>
                        </div>
                        <div class="col-auto ms-md-auto">
                          <span class="badge btn bg-primary rounded-pill ms-1" @click="replyGameRoleComment(false,gameRoleComment.floor,reply.id)">回复</span>
                        </div>
                      </div>
                    </div>
                    <!-- 楼中楼 END -->

                  </div>
                  <div class="col-auto ms-md-auto">
                    <span class="badge bg-success rounded-pill">#{{gameRoleComment.floor}}</span>
                    <span class="badge btn bg-primary rounded-pill ms-1" @click="replyGameRoleComment(false,gameRoleComment.floor,gameRoleComment.id)">回复</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

        </div>
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

    <!-- 悬浮按钮 -->
    <nav class="navbar fixed-bottom" style="width:96px;margin-left: 90%;">
      <div class="container-fluid btn" @click="replyGameRoleComment(true,null,-1)">
        <font-awesome-icon icon="fa-regular fa-comment-dots" size="3x" />
      </div>
      <div class="container-fluid btn" @click="refreshGameRoleCommentData()">
        <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" size="3x" />
      </div>
    </nav>

    <!-- 回复 -->
    <div class="modal fade" id="replyGameRoleCommentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{{replyGameRoleCommentInfo.title}}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="form-floating">
              <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="replyGameRoleCommentInfo.text" v-model="replyGameRoleCommentInfo.text" maxlength="100"></textarea>
                <label for="floatingInput">内容</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="replyGameRoleCommentModalCloseBtn" data-bs-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="saveReplyGameRoleCommentInfo()">发送</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { Toast,Modal, Popover } from 'bootstrap';
import { useRoute } from 'vue-router';
import Top from "@/components/Top.vue";
import Page from '@/components/Page.vue';
import { checkToken } from "@/api/user";
import { jsonp } from 'vue-jsonp';
import { saveVisitLog } from "../api/welcome";
import { searchGameRoleInfoById } from "../api/gameRole";
import { findByGameRoleId, saveGameRolePopularity } from "../api/gameRolePopularity";
import { getGameRoleCommentData,saveReplyGameRoleCommentInfo } from "../api/gameRoleComment";
export default {
  name: "gameRoleInfo",
  components: {
    Top,
    Page,
  },
  data() {
    return {
      commonResponseData: { // Modal 弹窗数据
        success: true,
        msg: '',
      },
      page: { // 通用 Page
        size: 10,
        currentPage: 1, // 偏移量,数据库从0开始
        totalPage: 0,
      },
      like: 0,
      route: useRoute(),
      gameRoleDataMap: {},
      gameRoleId: 0,
      gameRoleInfo: {
        position: {},
        rarity: {},
        normalAttackInfo: {
          normalAttackAttributeInfoList: [],
        },
        superSkillInfo: {
          superSkillAttributeInfoList: [],
        },
      },
      replyGameRoleCommentInfo: {},
      gameRoleCommentList: [],
    }
  },
  created() {
    this.gameRoleId = this.$route.params.id;
  },
  mounted() {
    this.searchGameRoleInfoById();
    this.findByGameRoleId();
    this.refreshGameRoleCommentData();
    saveVisitLog(Object.assign({key:7,data:this.gameRoleId}));
  },
  updated() { //更新之后.场景:获取更新真实DOM之后
    var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new Popover(popoverTriggerEl)
    });
  },
  methods: {
    commonPageChange(event) {
      this.page = event;
      this.getGameRoleCommentData();
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
    searchGameRoleInfoById() {
      searchGameRoleInfoById(Object.assign({
        id: this.gameRoleId
      })).then(
        response => {
          this.gameRoleInfo = response.data.data;
        }
      )
    },
    likeBtn(val) {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 0) {
              this.commonResponse.msg = "请先登录!";
              this.showToast(response);
            };
            saveGameRolePopularity(Object.assign({
              like: val,
              gameRoleId: this.gameRoleId
            })).then(
              response => {
                this.findByGameRoleId();
                this.showToast(response);
              }
            )
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
      }
    },
    findByGameRoleId() {
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 1) {
              findByGameRoleId(Object.assign({
                gameRoleId: this.gameRoleId
              })).then(
                response => {
                  var res = response.data.data;
                  if (res == null || res.length == 0) {
                    this.like = 0;
                  } else if (res.type.id == 1900) {
                    this.like = 1;
                  } else if (res.type.id == 1901) {
                    this.like = 2;
                  }
                }
              )
            };
          }
        )
      }
    },
    refreshGameRoleCommentData() {
      this.page.currentPage = 1; 
      this.getGameRoleCommentData();
    },
    getGameRoleCommentData() {
      getGameRoleCommentData(Object.assign({
        gameRoleId: this.gameRoleId,
        show:true,
      },this.page)).then(
        response => {
          this.gameRoleCommentList = response.data.data.data;
          this.page.totalPage = response.data.data.totalPage;
        }
      )
    },
    replyGameRoleComment(reply,belongToFloor,parentId) { // 所属楼层,回复楼层id
      if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
        checkToken().then( // 头部已携带
          response => {
            if (response.data.code == 0) {
              this.commonResponse.msg = "请先登录!";
              this.showToast(response);
            };
            this.replyGameRoleCommentInfo.add = true;
            this.replyGameRoleCommentInfo.title = '回复';
            this.replyGameRoleCommentInfo.text = '';
            this.replyGameRoleCommentInfo.belongToFloor = belongToFloor;
            this.replyGameRoleCommentInfo.gameRoleId = this.gameRoleId;
            this.replyGameRoleCommentInfo.reply = reply;
            this.replyGameRoleCommentInfo.parentId = parentId;
            var replyGameRoleCommentModal = document.getElementById('replyGameRoleCommentModal');
            var modal = new Modal(replyGameRoleCommentModal);
            modal.show();
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
      }
    },
    saveReplyGameRoleCommentInfo() {
      saveReplyGameRoleCommentInfo(this.replyGameRoleCommentInfo).then(
        response => {
          document.getElementById("replyGameRoleCommentModalCloseBtn").click();
          this.showToast(response);
          this.refreshGameRoleCommentData();
        }
      )
    },
  },
};
</script>
