<template>
  <div>
    <Top :commonResponse="commonResponseData"></Top>
    <!-- <img class="rounded-circle" src="http://127.0.0.1:8090/hyld/ppp.jpg"> 见后台资源处理器配置 -->
    <div class="container">
      <nav>
        <div class="nav nav-tabs mt-1" role="tablist">
          <button :class="id == 0 ? 'btn btn-outline-dark ms-1 mb-1 active' : ' btn btn-outline-dark ms-1 mb-1'" data-bs-toggle="tab"
            :data-bs-target="'#list-' + id" type="button" role="tab" aria-controls="nav-home" aria-selected="true"
            v-for="(name, id) in gameRoleDataMap.gameRoleRarityNameList" :key="id">{{ name }}</button>
        </div>
      </nav>
      <div class="tab-content mt-1">
        <div :class="id == 0 ? 'tab-pane fade show active' : 'tab-pane fade'" :id="'list-' + id" role="tabpanel" tabindex="0"
          v-for="(gameRoleList, id) in gameRoleDataMap.gameRoleData" :key="id">
          <div class="container text-center">
            <div class="row row-cols-12">
              <div class="col col-1" v-for="gameRole in gameRoleList" :key="gameRole.id" @click="showGameRoleInfo(gameRole.id)">
                <div class="vstack">
                  <img class="rounded-circle btn" :src="gameRole.headImgUrl">
                  <p>{{ gameRole.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="alert alert-warning d-flex align-items-center justify-content-center" role="alert">
          <font-awesome-icon icon="fa-solid fa-circle-question" size="1x" bounce />
          <div>
            ⭐点击头像查看角色属性!
          </div>
        </div>
      </div>

      <hr />

      <div class="alert alert-primary text-center" role="alert">
        <Strong>最受欢迎英雄排行Top-10</Strong>
      </div>

      <div class="container text-center">
        <div class="row align-items-center mb-1" v-for="(gameRolePopularity,i) in gameRolePopularityList" :key="i">
          <div class="col-auto">
              <img :src="gameRolePopularity.gameRole.headImgUrl" class="rounded-2" style="width: 3rem;"/>
          </div>
          <div class="col">
            <div class="progress" style="height: 25px;">
              <div class="progress-bar progress-bar-striped  progress-bar-animated" role="progressbar"
                aria-label="with label" :style="'width:'+gameRolePopularity.proportion+'%;'" aria-valuenow="100" aria-valuemin="0"
                aria-valuemax="100">{{gameRolePopularity.total}}票</div>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-danger text-center" role="alert">
        <Strong>不受欢迎英雄排行Top-10</Strong>
      </div>

      <div class="container text-center">
        <div class="row align-items-center mb-1" v-for="(gameRoleUnPopularity,i) in gameRoleUnPopularityList" :key="i">
          <div class="col-auto">
              <img :src="gameRoleUnPopularity.gameRole.headImgUrl" class="rounded-2" style="width: 3rem;"/>
          </div>
          <div class="col">
            <div class="progress" style="height: 25px;">
              <div class="progress-bar progress-bar-striped  progress-bar-animated bg-danger" role="progressbar"
                aria-label="Example with label" :style="'width:'+gameRoleUnPopularity.proportion+'%;'" aria-valuenow="100" aria-valuemin="0"
                aria-valuemax="100">{{gameRoleUnPopularity.total}}票</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <br/>
  </div>
</template>


<script>
import { Popover } from "bootstrap";
import { useRouter } from "vue-router"; //引入useRouter
import Top from "@/components/Top.vue";
import { searchGameRoleByClass } from "../api/gameRole";
import { searchGameRolePopularity } from "../api/gameRolePopularity";
export default {
  name: "gameRole",
  components: {
    Top
  },
  data() {
    return {
      commonResponseData: { // Modal 弹窗数据
        success: true,
        msg: '',
      },
      gameRoleDataMap: {},
      gameRolePopularityList: [],
      gameRoleUnPopularityList: [],
    }
  },
  mounted() {
    this.searchGameRoleByClass();
    this.searchGameRolePopularity();
    this.searchGameRoleUnPopularity();
  },
  updated() { //更新之后.场景:获取更新真实DOM之后
    var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new Popover(popoverTriggerEl)
    });
  },
  methods: {
    commonPageChange(event) { // 通用分页
      this.searchGameRole();
    },
    searchGameRoleByClass() {
      searchGameRoleByClass(Object.assign({
        basic: true
      })).then(
        response => {
          this.gameRoleDataMap = response.data.data;
        }
      )
    },
    searchGameRolePopularity(){
      searchGameRolePopularity(Object.assign({
        pop: true
      })).then(
        response => {
          this.gameRolePopularityList = response.data.data;
        }
      )
    },
    searchGameRoleUnPopularity() {
      searchGameRolePopularity(Object.assign({
        pop: false
      })).then(
        response => {
          this.gameRoleUnPopularityList = response.data.data;
        }
      )
    },

  },
  setup() {
    const router = useRouter();
    let showGameRoleInfo = (id) => {
      let { href } = router.resolve({
        name: "gameRoleInfo",
        params: {
          id: id,
        },
      });
      window.open(href, "_blank");
    };
    return {
      showGameRoleInfo,
    };
  },
};
</script>
