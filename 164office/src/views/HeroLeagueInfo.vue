<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>

    <div class="container">
      <div class="card mb-1">
        
        <div class="card-header text-center">
          <h5>荣誉联赛星光奖励一览</h5>
        </div>
        <div class="card-body text-center">
          <table class="table caption-top">
            <caption>2022/12/8 记录</caption>
            <thead class="table-dark">
              <tr>
                <th scope="col">荣誉等级</th>
                <th scope="col">奖杯</th>
                <th scope="col">星光点数奖励</th>
                <th scope="col">联赛结束后奖杯数</th>
              </tr>
            </thead>
             <tbody class="table-group-divider">
              <tr>
                <th scope="row" rowspan="2">20</th>
                <td>501-524</td>
                <td>20</td>
                <td>500</td>
              </tr>
              <tr>
                <td>525-549</td>
                <td>50</td>
                <td>524</td>
              </tr>
              <tr>
                <th scope="row" rowspan="2">21</th>
                <td>550-574</td>
                <td>70</td>
                <td>549</td>
              </tr>
              <tr>
                <td>575-599</td>
                <td>80</td>
                <td>574</td>
              </tr>
              <tr>
                <th scope="row" rowspan="2">22</th>
                <td>600-624</td>
                <td>90</td>
                <td>599</td>
              </tr>
              <tr>
                <td>625-649</td>
                <td>100</td>
                <td>624</td>
              </tr>
              <tr>
                <th scope="row" rowspan="2">23</th>
                <td>650-674</td>
                <td>110</td>
                <td>649</td>
              </tr>
              <tr>
                <td>675-699</td>
                <td>120</td>
                <td>674</td>
              </tr>
              <tr>
                <th scope="row" rowspan="2">24</th>
                <td>700-724</td>
                <td>130</td>
                <td>699</td>
              </tr>
              <tr>
                <td>725-749</td>
                <td>140</td>
                <td>724</td>
              </tr>
              <tr>
                <th scope="row" rowspan="2">25</th>
                <td>750-774</td>
                <td>150</td>
                <td>749</td>
              </tr>
              <tr>
                <td>775-799</td>
                <td>160</td>
                <td>774</td>
              </tr>
              <tr>
                <th scope="row" rowspan="2">26</th>
                <td>800-824</td>
                <td>170</td>
                <td>799</td>
              </tr>
              <tr>
                <td>825-849</td>
                <td>180</td>
                <td>824</td>
              </tr>
              <tr>
                <th scope="row" rowspan="2">27</th>
                <td>850-874</td>
                <td>190</td>
                <td>849</td>
              </tr>
              <tr>
                <td>875-899</td>
                <td>200</td>
                <td>874</td>
              </tr>
              <tr>
                <th scope="row" rowspan="2">28</th>
                <td>900-924</td>
                <td>210</td>
                <td>885</td>
              </tr>
              <tr>
                <td>925-949</td>
                <td>220</td>
                <td>900</td>
              </tr>
              <tr>
                <th scope="row" rowspan="2">29</th>
                <td>950-974</td>
                <td>230</td>
                <td>920</td>
              </tr>
              <tr>
                <td>975-999</td>
                <td>240</td>
                <td>940</td>
              </tr>
              <tr>
                <th scope="row">30</th>
                <td>1000-1049</td>
                <td>250</td>
                <td>960</td>
              </tr>
              <tr>
                <th scope="row">31</th>
                <td>1050-1099</td>
                <td>260</td>
                <td>980</td>
              </tr>
              <tr>
                <th scope="row">32</th>
                <td>1100-1149</td>
                <td>270</td>
                <td>1000</td>
              </tr>
              <tr>
                <th scope="row">33</th>
                <td>1150-1199</td>
                <td>280</td>
                <td>1020</td>
              </tr>
              <tr>
                <th scope="row">34</th>
                <td>1200-1249</td>
                <td>290</td>
                <td>1040</td>
              </tr>
              <tr>
                <th scope="row" rowspan="6">35</th>
                <td>1250-1299</td>
                <td>300</td>
                <td>1060</td>
              </tr>
              <tr>
                <td>1300-1349</td>
                <td>310</td>
                <td>1080</td>
              </tr>
              <tr>
                <td>1350-1399</td>
                <td>320</td>
                <td>1100</td>
              </tr>
              <tr>
                <td>1400-1449</td>
                <td>330</td>
                <td>1120</td>
              </tr>
              <tr>
                <td>1450-1499</td>
                <td>340</td>
                <td>1140</td>
              </tr>
              <tr>
                <td>1500-</td>
                <td>350</td>
                <td>1150</td>
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
  name: "heroLeagueInfo",
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
    document.title = "荒野乱斗-荣誉联赛星光奖励一览";
    saveVisitLog(Object.assign({key:11}));
  },
  methods: {
    commonPageChange(event) { // 通用分页
      this.page = event;
    },
  },
};
</script>