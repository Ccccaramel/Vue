<template>
  <div>
    <Top :commonResponse="commonResponseData"></Top>

    <div class="container">
      <div class="card mb-1">
        
        <div class="card-header">
          <h5>战队竞赛奖励一览</h5>
        </div>
        <div class="card-body text-center">
          <table class="table caption-top">
            <caption>2022/12/6 记录</caption>
            <thead class="table-dark">
              <tr>
                <th scope="col">总奖杯数范围</th>
                <th scope="col">荣誉等级</th>
                <th scope="col">总奖杯数</th>
                <th scope="col">奖励</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="14">0-499</td>
                <td rowspan="14"></td>
                <td>5</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>15</td>
                <td><img src="../assets/19.png" class="rounded-2" style="height:86px;" /></td>
              </tr>
              <tr>
                <td>20</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>30</td>
                <td><img src="../assets/gemstone.png" class="rounded-2" style="height:36px;" />&ensp;宝石争霸</td>
              </tr>
              <tr>
                <td>40</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>60</td>
                <td><img src="../assets/44.png" class="rounded-2" style="height:86px;" /></td>
              </tr>
              <tr>
                <td>100</td>
                <td><img src="../assets/token.png" class="rounded-2" style="height:36px;" />*200</td>
              </tr>
              <tr>
                <td>150</td>
                <td><img src="../assets/football.png" class="rounded-2" style="height:36px;" />&ensp;乱斗足球</td>
              </tr>
              <tr>
                <td>200</td>
                <td>喷漆槽*1</td>
              </tr>
              <tr>
                <td>250</td>
                <td><img src="../assets/49.png" class="rounded-2" style="height:86px;" /></td>
              </tr>
              <tr>
                <td>300</td>
                <td><img src="../assets/quest.png" class="rounded-2" style="height:36px;" />&ensp;任务</td>
              </tr>
              <tr>
                <td>350</td>
                <td><img src="../assets/logo_star.png" class="rounded-2" style="height:36px;" />&ensp;特别活动</td>
              </tr>
              <tr>
                <td>400</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
              </tr>
              <tr>
                <td>450</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="3">500-649</td>
                <td rowspan="3"><img src="../assets/league_1.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>500</td>
                <td><img src="../assets/28.png" class="rounded-2" style="height:86px;" /></td>
              </tr>
              <tr>
                <td>550</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>
              <tr>
                <td>600</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
              </tr>


              <tr>
                <td rowspan="3">650-799</td>
                <td rowspan="3"><img src="../assets/league_1.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>650</td>
                <td>喷漆槽*1</td>
              </tr>
              <tr>
                <td>700</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>
              <tr>
                <td>750</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="4">800-999</td>
                <td rowspan="4"><img src="../assets/league_1.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>800</td>
                <td><img src="../assets/logo_star.png" class="rounded-2" style="height:36px;" />&ensp;组队活动</td>
              </tr>
              <tr>
                <td>850</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
              </tr>
              <tr>
                <td>900</td>
                <td><img src="../assets/team_match.png" class="rounded-2" style="height:36px;" />&ensp;战队</td>
              </tr>
              <tr>
                <td>950</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="3">1000-1299</td>
                <td rowspan="3"><img src="../assets/league_2.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>1000</td>
                <td><img src="../assets/50.png" class="rounded-2" style="height:86px;" /></td>
              </tr>
              <tr>
                <td>1100</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>
              <tr>
                <td>1200</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="3">1300-1599</td>
                <td rowspan="3"><img src="../assets/league_2.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>1300</td>
                <td>喷漆槽*1</td>
              </tr>
              <tr>
                <td>1400</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*100</td>
              </tr>
              <tr>
                <td>1500</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>


              <tr>
                <td rowspan="4">1600-1999</td>
                <td rowspan="4"><img src="../assets/league_2.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>1600</td>
                <td>喷漆槽*1</td>
              </tr>
              <tr>
                <td>1700</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>
              <tr>
                <td>1800</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>1900</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>


              <tr>
                <td rowspan="3">2000-2299</td>
                <td rowspan="3"><img src="../assets/league_3.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>2000</td>
                <td><img src="../assets/41.png" class="rounded-2" style="height:86px;" /></td>
              </tr>
              <tr>
                <td>2100</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>
              <tr>
                <td>2200</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="3">2300-2599</td>
                <td rowspan="3"><img src="../assets/league_3.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>2300</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*150</td>
              </tr>
              <tr>
                <td>2400</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>
              <tr>
                <td>2500</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="4">2600-2999</td>
                <td rowspan="4"><img src="../assets/league_3.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>2600</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*150</td>
              </tr>
              <tr>
                <td>2700</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>2800</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
              </tr>
              <tr>
                <td>2900</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>

              <tr>
                <td rowspan="3">3000-3299</td>
                <td rowspan="3"><img src="../assets/league_4.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>3000</td>
                <td><img src="../assets/51.png" class="rounded-2" style="height:86px;" /></td>
              </tr>
              <tr>
                <td>3100</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>
              <tr>
                <td>3200</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
              </tr>


              <tr>
                <td rowspan="3">3300-3599</td>
                <td rowspan="3"><img src="../assets/league_4.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>3300</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*300</td>
              </tr>
              <tr>
                <td>3400</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>3500</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>


              <tr>
                <td rowspan="4">3600-3999</td>
                <td rowspan="4"><img src="../assets/league_4.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>3600</td>
                <td><img src="../assets/token.png" class="rounded-2" style="height:36px;" />*600</td>
              </tr>
              <tr>
                <td>3700</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>3800</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
              </tr>
              <tr>
                <td>3900</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>


              <tr>
                <td rowspan="3">4000-4499</td>
                <td rowspan="3"><img src="../assets/league_5.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>4000</td>
                <td><img src="../assets/2.png" class="rounded-2" style="height:86px;" /></td>
              </tr>
              <tr>
                <td>4100</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*150</td>
              </tr>
              <tr>
                <td>4200</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*200</td>
              </tr>


              <tr>
                <td rowspan="2">4500-4999</td>
                <td rowspan="2"><img src="../assets/league_5.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>4500</td>
                <td><img src="../assets/qualifying.png" class="rounded-2" style="height:36px;" />&ensp;星光联赛</td>
              </tr>
              <tr>
                <td>4750</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
              </tr>


              <tr>
                <td rowspan="3">5000-5499</td>
                <td rowspan="3"><img src="../assets/league_5.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>5000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>5150</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
              </tr>
              <tr>
                <td>5300</td>
                <td><img src="../assets/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="2">5500-5999</td>
                <td rowspan="2"><img src="../assets/league_5.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-v" /></td>
                <td>5500</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*150</td>
              </tr>
              <tr>
                <td>5750</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
              </tr>


              <tr>
                <td rowspan="3">6000-6499</td>
                <td rowspan="3"><img src="../assets/league_6.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>6000</td>
                <td><img src="../assets/58.png" class="rounded-2" style="height:86px;" /></td>
              </tr>
              <tr>
                <td>6150</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*200</td>
              </tr>
              <tr>
                <td>6300</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="2">6500-6999</td>
                <td rowspan="2"><img src="../assets/league_6.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>6500</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*150</td>
              </tr>
              <tr>
                <td>6750</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*200</td>
              </tr>


              <tr>
                <td rowspan="3">7000-7499</td>
                <td rowspan="3"><img src="../assets/league_6.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>7000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>7150</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>
              <tr>
                <td>7300</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
              </tr>


              <tr>
                <td rowspan="2">7500-7999</td>
                <td rowspan="2"><img src="../assets/league_6.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-v" /></td>
                <td>7500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>7750</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>


              <tr>
                <td rowspan="3">8000-8499</td>
                <td rowspan="3"><img src="../assets/league_7.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>8000</td>
                <td><img src="../assets/38.png" class="rounded-2" style="height:86px;" /></td>
              </tr>
              <tr>
                <td>8150</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>8300</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*150</td>
              </tr>

              <tr>
                <td rowspan="2">8500-8999</td>
                <td rowspan="2"><img src="../assets/league_7.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>8500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>8750</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*200</td>
              </tr>


              <tr>
                <td rowspan="3">9000-9499</td>
                <td rowspan="3"><img src="../assets/league_7.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>9000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>9150</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*150</td>
              </tr>
              <tr>
                <td>9300</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*50</td>
              </tr>


              <tr>
                <td rowspan="2">9500-1000</td>
                <td rowspan="2"><img src="../assets/league_7.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-v" /></td>
                <td>9500</td>
                <td><img src="../assets/coin_1.png" class="rounded-2" style="height:36px;" />*150</td>
              </tr>
              <tr>
                <td>9750</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="2">10000-10999</td>
                <td rowspan="2"><img src="../assets/league_8.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>10000</td>
                <td><img src="../assets/4.png" class="rounded-2" style="height:86px;" /></td>
              </tr>
              <tr>
                <td>10500</td>
                <td><img src="../assets/coin_2.png" class="rounded-2" style="height:36px;" />*500</td>
              </tr>


              <tr>
                <td rowspan="2">11000-11999</td>
                <td rowspan="2"><img src="../assets/league_8.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>11000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>11500</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*200</td>
              </tr>


              <tr>
                <td rowspan="2">12000-12999</td>
                <td rowspan="2"><img src="../assets/league_8.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>12000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>12500</td>
                <td><img src="../assets/coin_2.png" class="rounded-2" style="height:36px;" />*500</td>
              </tr>


              <tr>
                <td rowspan="2">13000-13999</td>
                <td rowspan="2"><img src="../assets/league_8.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-v" /></td>
                <td>13000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>13500</td>
                <td><img src="../assets/hero_power.png" class="rounded-2" style="height:36px;" />*100</td>
              </tr>


              <tr>
                <td rowspan="4">14000-15999</td>
                <td rowspan="4"><img src="../assets/league_8.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-v" /></td>
                <td>14000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>14500</td>
                <td><img src="../assets/coin_3.png" class="rounded-2" style="height:36px;" />*1000</td>
              </tr>
              <tr>
                <td>15000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>15500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="4">16000-17999</td>
                <td rowspan="4"><img src="../assets/league_9.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>16000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>16500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>17000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>17500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="4">18000-19999</td>
                <td rowspan="4"><img src="../assets/league_9.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>18000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>18500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>19000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>19500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="4">20000-21999</td>
                <td rowspan="4"><img src="../assets/league_9.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>20000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>20500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>21000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>21500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="6">22000-24999</td>
                <td rowspan="6"><img src="../assets/league_9.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-v" /></td>
                <td>22000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>22500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>23000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>23500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>24000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>24500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>

              <tr>
                <td rowspan="10">25000-29999</td>
                <td rowspan="10"><img src="../assets/league_9.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-v" /></td>
                <td>25000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>25500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>26000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>26500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>27000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>27500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>28000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>28500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>29000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>29500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>

              <tr>
                <td rowspan="10">30000-34999</td>
                <td rowspan="10"><img src="../assets/league_10.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>30000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>30500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>31000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>31500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>32000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>32500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>33000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>33500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>34000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>34500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="10">35000-39999</td>
                <td rowspan="10"><img src="../assets/league_10.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>35000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>35500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>36000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>36500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>37000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>37500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>38000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>38500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>39000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>39500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="10">40000-44999</td>
                <td rowspan="10"><img src="../assets/league_10.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>40000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>40500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>41000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>41500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>42000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>42500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>43000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>43500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>44000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>45500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>


              <tr>
                <td rowspan="10">45000-49999</td>
                <td rowspan="10"><img src="../assets/league_10.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /><font-awesome-icon icon="fa-solid fa-v" /></td>
                <td>45000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>45500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>46000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>46500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>47000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>47500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>48000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>48500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>49000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>
              <tr>
                <td>49500</td>
                <td><img src="../assets/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
              </tr>

              <tr>
                <td>50000-</td>
                <td><img src="../assets/league_11.png" class="rounded-2" style="height:36px;" />&ensp;<font-awesome-icon icon="fa-solid fa-i" /></td>
                <td>50000</td>
                <td><img src="../assets/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
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
  name: "heroLeagueinfo",
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
    },
  },
};
</script>