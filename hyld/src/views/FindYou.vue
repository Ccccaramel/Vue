<template>
  <div :style="backgroundDiv" style="height:100%;">
    <Top ref="top" :commonResponse="commonResponseData"></Top>
    <br/>
    <div class="container">
      <div class="row align-items-center">
        <div class="col">
          <p class="fw-bold">
            这是一个荒野乱斗群,里面全是大佬!
          </p>
          <p class="fw-bold">
            我们在群里等你!欢迎你的加入!
          </p>
          <p class="fw-bold">
            偶尔也会在B站直播,欢迎来一起掉分(●'◡'●)
          </p>
        </div>
        <div class="col">
          <img src="../assets/qqGroup.jpg" class="rounded-2" style="max-width: 20rem;">
        </div>
        <div class="col">
          <img src="../assets/bilibili.jpg" class="rounded-2" style="max-width: 30rem;">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Top from "@/components/Top.vue";
export default {
  name: "findYou",
  components: {
    Top
  },
  data() {
    return {
      commonResponseData: { // Modal 弹窗数据
          success: true,
          msg: '',
      },
      backgroundDiv: {
        backgroundImage:'url(' + require('../assets/bg.jpg') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'
      }
    }
  },
  mounted() {
    this.$refs.top.saveVisitLog("访问【找到你】");
  },
};
</script>