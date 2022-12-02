<template>
  <div>
    <Top :commonResponse="commonResponseData"></Top>

    <div class="container">
      <div class="row align-items-center">
        <div class="col">
          <div class="card text-center">
            <div class="card-header">
              <h4>参考前必读!</h4>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>在浏览或参考【游戏角色】、【强化装备】、【官方版本更新日志】时，请先阅读以下相关的问题</p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="card mb-1">
        <div class="card-header">
          <h5><font-awesome-icon icon="fa-solid fa-circle-question" />&nbsp;数据真实可靠吗?</h5>
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>除了<strong>上线日期</strong>和<strong>更新日期</strong>外，其它所有信息基本与游戏一致，今后会慢慢搜集信息进行更改。</p>
            <p>难免有的数值在录入时遗漏或录错，如果发现了请告诉我，我会及时修改。</p>
          </blockquote>
        </div>
      </div>
      <div class="card mb-1">
        <div class="card-header">
          <h5><font-awesome-icon icon="fa-solid fa-circle-question" />&nbsp;为什么数据和我游戏内的数据不一样?</h5>
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>所有英雄数据都是<strong>国际服的一级数据</strong>（每级加成5%，自行计算），如果你是国服玩家，这些不一致的地方未来将会实装。</p>
          </blockquote>
        </div>
      </div>
      <div class="card mb-1">
        <div class="card-header">
          <h5><font-awesome-icon icon="fa-solid fa-circle-question" />&nbsp;射程、位移等等对应的数值来源是?</h5>
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>测量数据<strong class="text-danger">仅供对比参考，具体数值以官方为准</strong>；</p>
            <p>非位移攻击方式和丢出召唤物是测量<strong>弹道两端点的距离</strong>；</p>
            <p>位移技能是测量<strong>位移前后中心点的距离</strong>；</p>
            <p>此外，巴兹的被动范围，8比特的伤害放大器范围，是测量以英雄或召唤物所在位置中心点为原点的<strong>半径长度</strong>；</p>
            <p>特殊情况下，例如瑞科的普通攻击，芽芽的普通攻击，艾德加的超级技能，在碰撞/跨越障碍物时，<strong>会超过正常情况下最大距离</strong>，这些情况将忽略，不会记录；</p>
            <p>值得一提的是，很多技能所显示的范围与实际可造成伤害的范围并不一致，没有明确可造成伤害的边界。</p>
          </blockquote>
          <img src="../assets/explain1.png" class="rounded-2 mt-1" style="height:520px;" />
          <img src="../assets/explain2.png" class="rounded-2 mt-1" style="height:520px;" />
          <img src="../assets/explain3.png" class="rounded-2 mt-1" style="height:520px;" />
          <img src="../assets/explain4.png" class="rounded-2 mt-1" style="height:520px;" />
          <img src="../assets/explain5.png" class="rounded-2 mt-1" style="height:520px;" />
          <img src="../assets/explain6.png" class="rounded-2 mt-1" style="height:520px;" />
        </div>
      </div>
      <div class="card mb-1">
        <div class="card-header">
          <h5><font-awesome-icon icon="fa-solid fa-circle-question" />&nbsp;为什么有的英雄的新辉/妙具没有图标?</h5>
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>所有图片资源均来自<strong>网络</strong>，难免数据资料不全，如果有相关资源希望大家能提供支持一下。</p>
          </blockquote>
        </div>
      </div>
      <div class="card mb-1">
        <div class="card-header">
          <h5><font-awesome-icon icon="fa-solid fa-circle-question" />&nbsp;●标识什么意思?</h5>
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>部分英雄数据在游戏里展示并不是完整的，例如贝亚只显示强化前的普通攻击数值，伊芙只显示三段伤害中的最高伤害，还有拉夫的超级技能的提升数值也没显示...</p>
            <p>所以●后是对当前属性的<strong>数据补充</strong>，使对应属性数据更完整以方便参考。</p>
          </blockquote>
        </div>
      </div>
      <!-- <div class="card mb-1">
        <div class="card-header">
          <h5><font-awesome-icon icon="fa-solid fa-circle-question" />&nbsp;为什么有的射程有一个最远射程?</h5>
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>部分英雄的子弹在最远距离或击中敌方/障碍物时会有一个范围伤害，即使弹道显示的距离看似不够其实也可以造成伤害，那么爆炸范围变相增加射程。</p>
          </blockquote>
        </div>
      </div> -->
      <hr/>
    </div>
  </div>
</template>
 
<script>
import Top from "@/components/Top.vue";
export default {
  name: "explain",
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
  },
};
</script>