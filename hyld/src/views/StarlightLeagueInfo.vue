<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>

    <div class="container">
      <div class="card mb-1">
        
        <div class="card-header text-center">
          <h5>星光联赛奖励一览</h5>
        </div>
        <div class="card-body text-center">
          <table class="table caption-top">
            <!-- <caption>2022/12/14 记录</caption> -->
            <thead class="table-dark">
              <tr>
                <th scope="col">等级</th>
                <th scope="col">星光点数奖励(2022/12/14 记录)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th><img src="../assets/rank_icon_01.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_01.png" class="rounded-2" style="height:36px;" />*500</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_01.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_02.png" class="rounded-2" style="height:36px;" />*1000</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_01.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_03.png" class="rounded-2" style="height:36px;" />*2000</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_02.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_03.png" class="rounded-2" style="height:36px;" />*2500</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_02.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_03.png" class="rounded-2" style="height:36px;" />*3000</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_02.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_03.png" class="rounded-2" style="height:36px;" />*3750</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_03.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_03.png" class="rounded-2" style="height:36px;" />*450</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_03.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_03.png" class="rounded-2" style="height:36px;" />*5500</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_03.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_03.png" class="rounded-2" style="height:36px;" />*7000</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_04.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_03.png" class="rounded-2" style="height:36px;" />*8750</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_04.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_03.png" class="rounded-2" style="height:36px;" />*10000</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_04.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_04.png" class="rounded-2" style="height:36px;" />*12500</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_05.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_04.png" class="rounded-2" style="height:36px;" />*15000</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_05.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_04.png" class="rounded-2" style="height:36px;" />*17500</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_05.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_04.png" class="rounded-2" style="height:36px;" />*20000</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_06.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_05.png" class="rounded-2" style="height:36px;" />*25000</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_06.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_05.png" class="rounded-2" style="height:36px;" />*30000</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_06.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></th>
                <td><img src="../assets/pack_star_points_05.png" class="rounded-2" style="height:36px;" />*40000</td>
              </tr>
              <tr>
                <th><img src="../assets/rank_icon_07.png" class="rounded-2" style="height:36px;" /></th>
                <td><img src="../assets/pack_star_points_05.png" class="rounded-2" style="height:36px;" />*50000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr/>
    </div>
  </div>
</template>
 
<script>
import Top from "@/components/Top.vue";
export default {
  name: "starlightLeagueInfo",
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
    this.$refs.top.saveVisitLog("访问【星光联赛奖励一览】");
  },
  methods: {
    commonPageChange(event) { // 通用分页
      this.page = event;
    },
  },
};
</script>