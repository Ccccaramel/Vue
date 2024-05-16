<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>

    <div class="container">
      <div class="card mb-1">
        
        <div class="card-header text-center">
          <h5>战队竞赛奖励一览</h5>
        </div>
        <div class="card-body text-center">
          <table class="table caption-top">
            <caption>2022/12/6 记录</caption>
            <thead class="table-dark">
              <tr>
                <th scope="col">段位</th>
                <th scope="col">No.1</th>
                <th scope="col">No.2</th>
                <th scope="col">No.3</th>
                <th scope="col">No.4</th>
                <th scope="col">No.5</th>
                <th scope="col">No.6</th>
                <th scope="col">No.7</th>
                <th scope="col">No.8</th>
                <th scope="col">任务周最高奖励</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="../assets/hyld/club_g_1.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td>990</td>
                <td>968</td>
                <td>944</td>
                <td class="table-danger">801</td>
                <td class="table-danger">782</td>
                <td class="table-danger">761</td>
                <td class="table-danger">741</td>
                <td class="table-danger">720</td>
                <td>801</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_f_3.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">953</td>
                <td class="table-success">931</td>
                <td>908</td>
                <td>771</td>
                <td class="table-danger">753</td>
                <td class="table-danger">732</td>
                <td class="table-danger">714</td>
                <td class="table-danger">693</td>
                <td>771</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_f_2.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">916</td>
                <td class="table-success">895</td>
                <td>873</td>
                <td>742</td>
                <td class="table-danger">724</td>
                <td class="table-danger">704</td>
                <td class="table-danger">686</td>
                <td class="table-danger">667</td>
                <td>742</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_f_1.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">879</td>
                <td class="table-success">860</td>
                <td>838</td>
                <td>712</td>
                <td class="table-danger">695</td>
                <td class="table-danger">676</td>
                <td class="table-danger">659</td>
                <td class="table-danger">640</td>
                <td>712</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_e_3.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">842</td>
                <td class="table-success">824</td>
                <td>803</td>
                <td>682</td>
                <td class="table-danger">666</td>
                <td class="table-danger">648</td>
                <td class="table-danger">631</td>
                <td class="table-danger">613</td>
                <td>682</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_e_2.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">807</td>
                <td class="table-success">788</td>
                <td>769</td>
                <td>653</td>
                <td class="table-danger">637</td>
                <td class="table-danger">620</td>
                <td class="table-danger">604</td>
                <td class="table-danger">587</td>
                <td>653</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_e_1.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">770</td>
                <td class="table-success">752</td>
                <td>733</td>
                <td>623</td>
                <td class="table-danger">608</td>
                <td class="table-danger">591</td>
                <td class="table-danger">576</td>
                <td class="table-danger">560</td>
                <td>623</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_d_3.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">733</td>
                <td class="table-success">716</td>
                <td class="table-success">699</td>
                <td>593</td>
                <td>579</td>
                <td class="table-danger">563</td>
                <td class="table-danger">549</td>
                <td class="table-danger">533</td>
                <td>593</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_d_2.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">696</td>
                <td class="table-success">680</td>
                <td class="table-success">663</td>
                <td>564</td>
                <td>550</td>
                <td class="table-danger">535</td>
                <td class="table-danger">521</td>
                <td class="table-danger">507</td>
                <td>564</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_d_1.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">660</td>
                <td class="table-success">645</td>
                <td class="table-success">629</td>
                <td>534</td>
                <td>521</td>
                <td class="table-danger">507</td>
                <td class="table-danger">494</td>
                <td class="table-danger">480</td>
                <td>534</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_c_3.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">568</td>
                <td class="table-success">555</td>
                <td class="table-success">542</td>
                <td>462</td>
                <td>451</td>
                <td>440</td>
                <td class="table-danger">429</td>
                <td class="table-danger">419</td>
                <td>492</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_c_2.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">493</td>
                <td class="table-success">481</td>
                <td class="table-success">469</td>
                <td>397</td>
                <td>386</td>
                <td>376</td>
                <td class="table-danger">365</td>
                <td class="table-danger">354</td>
                <td>397</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_c_1.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">419</td>
                <td class="table-success">407</td>
                <td class="table-success">394</td>
                <td>333</td>
                <td>322</td>
                <td>311</td>
                <td class="table-danger">301</td>
                <td class="table-danger">290</td>
                <td>333</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_b_3.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">346</td>
                <td class="table-success">335</td>
                <td class="table-success">326</td>
                <td>376</td>
                <td>268</td>
                <td>260</td>
                <td class="table-danger">252</td>
                <td class="table-danger">244</td>
                <td>276</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_b_2.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">289</td>
                <td class="table-success">280</td>
                <td class="table-success">271</td>
                <td>228</td>
                <td>220</td>
                <td>212</td>
                <td class="table-danger">204</td>
                <td class="table-danger">196</td>
                <td>228</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_b_1.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">234</td>
                <td class="table-success">225</td>
                <td class="table-success">216</td>
                <td class="table-success">180</td>
                <td>172</td>
                <td>164</td>
                <td class="table-danger">156</td>
                <td class="table-danger">148</td>
                <td>180</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_a_3.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">179</td>
                <td class="table-success">172</td>
                <td class="table-success">166</td>
                <td class="table-success">140</td>
                <td>134</td>
                <td>129</td>
                <td>123</td>
                <td>118</td>
                <td>140</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_a_2.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">141</td>
                <td class="table-success">135</td>
                <td class="table-success">129</td>
                <td class="table-success">107</td>
                <td>102</td>
                <td>97</td>
                <td>91</td>
                <td>86</td>
                <td>107</td>
              </tr>
              <tr>
                <td>
                  <img src="../assets/hyld/club_a_1.png" class="rounded-2" style="weight:36px;height:36px;" />
                </td>
                <td class="table-success">104</td>
                <td class="table-success">98</td>
                <td class="table-success">93</td>
                <td class="table-success">75</td>
                <td>70</td>
                <td>64</td>
                <td>59</td>
                <td>54</td>
                <td>75</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr/>

        <div class="card-body text-center">
          <table class="table caption-top">
            <caption>战队奖杯奖励</caption>
            <thead>
              <tr>
                <th scope="col" rowspan="2"></th>
                <th scope="col" colspan="3" class=" table-primary">标准模式</th>
                <th scope="col" colspan="2" class=" table-info">竞技模式</th>
              </tr>
              <tr>
                <th scope="col" class="table-danger">战败</th>
                <th scope="col" class="table-warning">平局</th>
                <th scope="col" class="table-success">获胜</th>
                <th scope="col" class="table-danger">战败</th>
                <th scope="col" class="table-success">获胜</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>与随机玩家组队</td>
                <td class="table-danger">1</td>
                <td class="table-warning">2</td>
                <td class="table-success">3</td>
                <td class="table-danger">3</td>
                <td class="table-success">7</td>
              </tr>
              <tr>
                <td>与战队队员组队</td>
                <td class="table-danger">2</td>
                <td class="table-warning">3</td>
                <td class="table-success">4</td>
                <td class="table-danger">5</td>
                <td class="table-success">9</td>
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
import { saveVisitLog } from "../api/welcome";
export default {
  name: "clubLeagueInfo",
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
    saveVisitLog(Object.assign({key:1}));
  },
  methods: {
    commonPageChange(event) { // 通用分页
      this.page = event;
    },
  },
};
</script>