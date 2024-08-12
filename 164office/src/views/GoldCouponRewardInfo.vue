<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>

    <div class="container">
      <div class="card mb-1">
        
        <div class="card-header text-center">
          <h5>乱斗金券奖励一览</h5>
        </div>
        <div class="card-body text-center">
          <table class="table caption-top">
            <!-- <caption>2022/12/8 记录</caption> -->
            <thead>
              <!-- <tr>
                <th scope="col">等级</th>
                <th scope="col"><img src="../assets/hyld/brawl_pass_free.png" class="rounded-2" style="height:36px;" /></th>
                <th scope="col"><img src="../assets/hyld/brawl_pass.png" class="rounded-2" style="height:36px;" /></th>
              </tr> -->

              <tr>
                <th scope="col" rowspan="2">等级</th>
                <th scope="col" colspan="2" class="table-primary">2022/12/8 记录</th>
                <th scope="col" colspan="2" class="table-info">2022/12/14 记录</th>
              </tr>
              <tr>
                <th scope="col" class="table-dark"><img src="../assets/hyld/brawl_pass_free.png" class="rounded-2" style="height:36px;" /></th>
                <th scope="col" class="table-dark"><img src="../assets/hyld/brawl_pass.png" class="rounded-2" style="height:36px;" /></th>
                <th scope="col" class="table-dark"><img src="../assets/hyld/brawl_pass_free.png" class="rounded-2" style="height:36px;" /></th>
                <th scope="col" class="table-dark"><img src="../assets/hyld/brawl_pass.png" class="rounded-2" style="height:36px;" /></th>
              </tr>
            </thead>
             <tbody class="table-group-divider">
              <tr>
                <th scope="row">0</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="height:36px;" /></td>
                <td class="table-warning">星光皮肤(非流彩英雄)</td>
                <td>英雄券*85</td>
                <td class="table-warning">星光皮肤(非流彩英雄)</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="height:36px;" />*160</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="height:36px;" />*10</td>
                <td class="table-warning"><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="height:36px;" /></td>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="height:36px;" />*10</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="height:36px;" />*25</td>
                <td>英雄券*85</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="height:36px;" />*190</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td>流彩英雄券*60</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="height:36px;" />*50</td>
                <td>英雄券*85</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">10</th>
                <td><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/pin_1.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning"><img src="../assets/hyld/pin_1.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
              </tr>
              <tr>
                <th scope="row">11</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td>流彩英雄券*40</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">12</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td>英雄券*85</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">13</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">14</th>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*10</td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*10</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">15</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">16</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td>英雄券*85</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">17</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td>流彩英雄券*40</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">18</th>
                <td><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td class="table-warning"><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">19</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">20</th>
                <td><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">喷漆</td>
                <td>英雄券*85</td>
                <td class="table-warning">喷漆</td>
              </tr>
              <tr>
                <th scope="row">21</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td>流彩英雄券*40</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">22</th>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*20</td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*20</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">23</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*75</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">24</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">25</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*75</td>
                <td>英雄券*85</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">26</th>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*100</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">27</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td>流彩英雄券*40</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">28</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*75</td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">29</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">30</th>
                <td><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄</td>
                <td>英雄券*85</td>
                <td class="table-warning">流彩英雄</td>
              </tr>
              <tr>
                <th scope="row">31</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td>流彩英雄券*40</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">32</th>
                <td><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*100</td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">33</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td>英雄券*85</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">34</th>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*50</td>
                <td class="table-warning"><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">35</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td>流彩英雄券*40</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">36</th>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*10</td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*10</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">37</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">38</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*125</td>
                <td>英雄券*85</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">39</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*125</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">40</th>
                <td><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*125</td>
                <td>流彩英雄券*40</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">41</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">42</th>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*75</td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">43</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">喷漆</td>
                <td>英雄券*85</td>
                <td class="table-warning">喷漆</td>
              </tr>
              <tr>
                <th scope="row">44</th>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*10</td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*10</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">45</th>
                <td><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">46</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*125</td>
                <td>流彩英雄券*40</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">47</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">48</th>
                <td><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*200</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*125</td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">49</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td>英雄券*85</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">50</th>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*100</td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">51</th>
                <td><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">52</th>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*10</td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*10</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">53</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">54</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*225</td>
                <td>英雄券*85</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">55</th>
                <td><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td>流彩英雄券*40</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">56</th>
                <td><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*200</td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">57</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">58</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*125</td>
                <td>英雄券*85</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">59</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td>流彩英雄券*40</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">60</th>
                <td><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">61</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">62</th>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*20</td>
                <td class="table-warning"><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/gem_1.png" class="rounded-2" style="weight:36px;height:36px;" />*20</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">63</th>
                <td><img src="../assets/hyld/box_1_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td>英雄券*85</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">64</th>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*100</td>
                <td class="table-warning"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning">英雄券*45</td>
              </tr>
              <tr>
                <th scope="row">65</th>
                <td><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄表情</td>
                <td>英雄券*40</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">66</th>
                <td><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/coin_1.png" class="rounded-2" style="weight:36px;height:36px;" />*225</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
              </tr>
              <tr>
                <th scope="row">67</th>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*500</td>
                <td class="table-warning">流彩英雄表情</td>
                <td><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*585</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">68</th>
                <td><img src="../assets/hyld/box_10_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning"><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*150</td>
                <td>英雄券*85</td>
                <td class="table-warning"><img src="../assets/hyld/coin_2.png" class="rounded-2" style="weight:36px;height:36px;" />*335</td>
              </tr>
              <tr>
                <th scope="row">69</th>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*500</td>
                <td class="table-warning">流彩英雄表情</td>
                <td><img src="../assets/hyld/hero_power.png" class="rounded-2" style="weight:36px;height:36px;" />*160</td>
                <td class="table-warning">流彩英雄表情</td>
              </tr>
              <tr>
                <th scope="row">70</th>
                <td><img src="../assets/hyld/pin_1.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄皮肤</td>
                <td><img src="../assets/hyld/pin_1.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td class="table-warning">流彩英雄皮肤</td>
              </tr>
              <tr>
                <th scope="row">合计</th>
                <td>
                  <img src="../assets/hyld/box_1_3d.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*16<br/>
                  <img src="../assets/hyld/box_3_3d.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*25<br/>
                  <img src="../assets/hyld/box_10_3d.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*9<br/>
                  (乱斗宝箱*180)<br/>
                  <img src="../assets/hyld/gem_1.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*90<br/>
                  <img src="../assets/hyld/coin_2.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*1100<br/>
                  <img src="../assets/hyld/hero_power.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*875<br/>
                  <img src="../assets/hyld/pin_1.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*1
                </td>
                <td class="table-warning">
                  <img src="../assets/hyld/box_1_3d.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*16<br/>
                  <img src="../assets/hyld/box_3_3d.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*38<br/>
                  <img src="../assets/hyld/box_10_3d.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*14<br/>
                  (乱斗宝箱*270)<br/>
                  <img src="../assets/hyld/gem_1.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*90<br/>
                  <img src="../assets/hyld/coin_2.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*2525<br/>
                  <img src="../assets/hyld/hero_power.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*2025<br/>
                  <img src="../assets/hyld/pin_1.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*2<br/>
                  喷漆*2<br/>
                  星光皮肤(非流彩英雄)*1<br/>
                  流彩英雄表情*17<br/>
                  流彩英雄皮肤*1<br/>
                  流彩英雄*1
                </td>
                <td>
                  <img src="../assets/hyld/gem_1.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*90<br/>
                  <img src="../assets/hyld/coin_2.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*9360<br/>
                  <img src="../assets/hyld/hero_power.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*3070<br/>
                  <img src="../assets/hyld/pin_1.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*1<br/>
                  英雄券*1400<br/>
                  流彩英雄券*460
                </td>
                <td class="table-warning">
                  <img src="../assets/hyld/gem_1.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*90<br/>
                  <img src="../assets/hyld/coin_2.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*15055<br/>
                  <img src="../assets/hyld/hero_power.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*5620<br/>
                  <img src="../assets/hyld/pin_1.png" class="rounded-2 mb-1" style="weight:36px;height:36px;" />*2<br/>
                  喷漆*2<br/>
                  英雄券*2120<br/>
                  流彩英雄券*460<br/>
                  星光皮肤(非流彩英雄)*1<br/>
                  流彩英雄表情*17<br/>
                  流彩英雄皮肤*1<br/>
                  流彩英雄*1
                </td>
              </tr>
              <tr>
                <th scope="row">每500奖章可获得</th>
                <td colspan="2" class="table-primary"><img src="../assets/hyld/box_3_3d.png" class="rounded-2" style="weight:36px;height:36px;" /></td>
                <td colspan="2" class="table-info"><img src="../assets/hyld/coin_s.png" class="rounded-2" style="weight:36px;height:36px;" />*145，<img src="../assets/hyld/hero_power_s.png" class="rounded-2" style="weight:36px;height:36px;" />*40，英雄券*25</td>
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
  name: "goldCouponRewardInfo",
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
    document.title = "荒野乱斗-乱斗金券奖励一览";
    saveVisitLog(Object.assign({key:10}));
  },
  methods: {
    commonPageChange(event) { // 通用分页
      this.page = event;
    },
  },
};
</script>