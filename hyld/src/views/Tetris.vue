<template>
  <div>
    <Top ref="top" :commonResponse="commonResponseData"></Top>
    <div style="height: 550px;margin: 0 30%;">
      <div id="main" style="width: 70%;height: 100%;background-color: #b3b3b3;float:left;border-radius: 10px;padding: 6px 0px 6px;">
      </div>
      <div style="width: 30%;height: 100%;background-color: rgb(242, 242, 242);float:left;border-radius: 10px;padding: 6px 0px 6px;">
        <div style="width: 100%;height: auto;text-align:center;">
          <h3>下一个</h3>
        </div>
        <div id="message"></div>
        <div style="width: 100%;height: auto;text-align:center;margin: 4px 0px;">
          <div>
            <div style="display: inline-block;">
              <h3>难度:Lv</h3>
            </div>
            <div style="display: inline-block;">
              <h3 id="level">1</h3>
            </div>
          </div>
        </div>
        <div style="width: 100%;height: auto;text-align:center;margin: 4px 0px;">
          <div style="display: inline-block;">
            <h3>分数:</h3>
          </div>
          <div style="display: inline-block;">
            <h3 id="score">0</h3>
          </div>
        </div>

        <div @click="start()"
          style="width: 90%;height: 30px;background-color: rgb(146, 160, 240);margin: 5px 5% 5px;font-size: 20px;text-align: center;color: aliceblue;border-radius: 10px;vertical-align: middle;display: inline-block;cursor:pointer">
          start</div>
        <div style="width: 90%;height: 30px;align-items: center;font-size: 20px;margin: 5px 5% 5px;">
          <div @click="speedUp()"
            style="width: 38%;height: 30px;background-color: rgb(146, 160, 240);text-align: center;color: aliceblue;border-radius: 10px;float:left;cursor:pointer">
            加速</div>
          <div id="gear"
            style="width: 20%;height: 30px;background-color: rgb(146, 160, 240);text-align: center;color: aliceblue;border-radius: 10px;margin:0 2% 0;float:left;cursor:pointer">
            0</div>
          <div @click="speedDown()"
            style="width: 38%;height: 30px;background-color: rgb(146, 160, 240);text-align: center;color: aliceblue;border-radius: 10px; float:left;cursor:pointer">
            减速</div>
        </div>
        <div style="width: 90%;height: 30px;align-items: center;font-size: 20px;margin: 5px 5% 5px;">
          <div @click="lvUp()"
            style="width: 49%;height: 30px;background-color: rgb(146, 160, 240);text-align: center;color: aliceblue;border-radius: 10px;float:left;cursor:pointer;margin-right: 1%;">
            难度+</div>
          <div @click="lvDown()"
            style="width: 49%;height: 30px;background-color: rgb(146, 160, 240);text-align: center;color: aliceblue;border-radius: 10px; float:left;cursor:pointer;margin-left: 1%;">
            难度-</div>
        </div>
        <div @click="stop()"
          style="width: 90%;height: 30px;background-color: rgb(146, 160, 240);margin: 5px 5% 5px;font-size: 20px;text-align: center;color: aliceblue;border-radius: 10px;vertical-align: middle;display: inline-block;cursor:pointer">
          stop</div>
        <div @click="init()"
          style="width: 90%;height: 30px;background-color: rgb(146, 160, 240);margin: 5px 5% 5px;font-size: 20px;text-align: center;color: aliceblue;border-radius: 10px;vertical-align: middle;display: inline-block;cursor:pointer">
          replay</div>
      </div>
    </div>
  </div>
</template>
<script>
import Top from "@/components/Top.vue";
export default {
  name: "tetris",
  components: {
    Top,
  },
  data() {
    return {
      commonResponseData: { // 通用 Modal 弹窗数据
        success: true,
        msg: '',
      },
      overallCellColor: "hsl(0, 100%, 70%)",
      overallSpaceBorderColor: "#8fbd7c", // 默认边框颜色
      defaultColor: "#ffffff", // 空间背景色/无生命
      pointColor: "#FF6347", // 方块颜色

      /**
       * 游戏窗口为 X*Y,其中25层以上不见
       **/
      X: 15,
      Y: 30,
      /**
       * 将待下落的方块放入此区域内
       * (6,30) ··· (10,30)
       * ·          ·
       * ·          ·
       * ·          ·
       * (6,25) ··· (10,25)
       **/
      X_S: 6,
      Y_S: 26,
      X_E: 10,
      Y_E: 30,
      LENGTH: 5,
      gearMax: 20,
      run: false, // 开始运行;其中 value 为2的随时间不断下落
      check: false, // 是否需要检查方块是否超界
      gear: 10,
      overAllCellSize: "20px", // 元胞尺寸
      actionMap: {
        "up": { x: 0, y: 1 },
        "left": { x: -1, y: 0 },
        "right": { x: 1, y: 0 },
        "down": { x: 0, y: -1 }
      },
      getNext: true,
      nextShap: [][5], // 下一个下落的方块
      eleMap: [], // 存放下落的方块位置
      /**
       * 下落的方块最下一行在窗口中是第几行
       **/
      rand: this.Y_S,
      lock: true, // 锁,当下落的方块正在下落过程中时,不可对下落的方块进行转换
      level: 1, // 当前游戏等级
      levelMin: 1,
      levelMax: 4,
      SHAP_SIZE: 5, // 每一等级包含4种形状的方块
      score: 0, // 分数+=行数*难度
      /**
       * [等级]-[序号]
       **/
      shapMap: [
        // 1-1
        [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        // 1-2
        [
          [0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        // 1-3
        [
          [0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 1, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        // 1-4
        [
          [0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 1, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        // 1-5
        [
          [0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0],
          [1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        // 2-1
        [
          [0, 0, 0, 0, 0],
          [1, 0, 1, 0, 0],
          [1, 1, 1, 0, 0],
          [1, 0, 1, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        // 2-2
        [
          [0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0],
          [0, 1, 1, 0, 0],
          [1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        // 2-3
        [
          [0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [1, 1, 1, 1, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        // 2-4
        [
          [0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0],
          [0, 1, 1, 0, 0],
          [0, 0, 1, 1, 0],
          [0, 0, 0, 0, 0]
        ],
        // 2-5
        [
          [1, 0, 0, 0, 0],
          [1, 1, 0, 0, 0],
          [1, 1, 1, 0, 0],
          [1, 1, 0, 0, 0],
          [1, 0, 0, 0, 0]
        ],
        // 3-1
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 0, 0],
          [1, 0, 1, 0, 0],
          [1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        // 3-2
        [
          [0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0],
          [0, 0, 0, 0, 0]
        ],
        // 3-3
        [
          [0, 0, 0, 0, 0],
          [1, 0, 0, 1, 0],
          [1, 1, 1, 1, 0],
          [1, 0, 0, 1, 0],
          [0, 0, 0, 0, 0]
        ],
        // 3-4
        [
          [0, 0, 0, 0, 0],
          [1, 1, 0, 1, 0],
          [0, 1, 1, 0, 0],
          [1, 1, 0, 1, 0],
          [0, 0, 0, 0, 0]
        ],
        // 3-5
        [
          [1, 0, 0, 0, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 1, 1, 0],
          [0, 1, 0, 1, 0],
          [1, 0, 0, 0, 0]
        ],
        // 4-1
        [
          [1, 0, 0, 0, 1],
          [0, 1, 0, 1, 0],
          [0, 0, 1, 0, 0],
          [0, 1, 0, 1, 0],
          [1, 0, 0, 0, 1]
        ],
        // 4-2
        [
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [1, 1, 1, 1, 1],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0]
        ],
        // 4-3
        [
          [1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 1, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 1]
        ],
        // 4-4
        [
          [1, 0, 1, 0, 1],
          [0, 1, 0, 1, 0],
          [1, 0, 1, 0, 1],
          [0, 1, 0, 1, 0],
          [1, 0, 1, 0, 1]
        ],
        // 4-5
        [
          [0, 1, 1, 1, 0],
          [1, 0, 1, 0, 1],
          [1, 1, 0, 1, 1],
          [1, 0, 1, 0, 1],
          [0, 1, 1, 1, 0]
        ]
      ],

      direction: "",
      beforeDirection: "",
      exchange: true, //true:<1>,false:<2>
      gearTemp: 0, // 保存原本速度
      sppend: false,
    }
  },
  mounted() {
    this.init();
    this.$refs.top.saveVisitLog("访问【小游戏-俄罗斯方块】");

    /**
     * 监听键盘
     * 37:左,38:上,39:右,40:下
     **/
    document.onkeydown = (e) => { // 按住不动
      // 原有获取键盘 key 的方式提示已过期但新的方式又没有推广开来
      let e1 = e || event || window.event || arguments.callee.caller.arguments[0];
      // var key = e.KeyboardEvent.code;
      var key=e1.keyCode;
      if (key == 37 && this.lock == false) { // 左移
        this.leftMove();
      }
      if (key == 39 && this.lock == false) { // 右移
        this.rightMove();
      }
      if (key == 40 && this.lock == false) { // 加速
        e1.preventDefault(); // 取消默认事件,否则会使浏览器上下滚动
        if (!this.sppend) {
          this.sppend = true;
          this.gearTemp = this.gear;
        }
        this.gear = this.gearMax;
      }
      if (key == 38 && this.lock == false) { // 上,旋转90° / y 轴镜像
          e1.preventDefault();
          this.turn();
      }
    }
    document.onkeyup = (e) => { // 速度恢复
      let e1 = e || event || window.event || arguments.callee.caller.arguments[0];
      // var key = e.KeyboardEvent.code;
      var key=e1.keyCode;
      if (key == 40) {
        this.gear = this.gearTemp;
        this.sppend = false;
      }
    }
  },
  methods: {
    init() {
      // 重置等级
      this.level = 1;
      document.getElementById("level").innerHTML = this.level;
      // 重置速度
      this.gear = 10;
      document.getElementById("gear").innerHTML = this.gear;
      // 重置分数
      this.score = 0;
      document.getElementById("score").innerHTML = this.score;
      this.run = false;
      this.initMain();
      this.initMessage();
    },
    // 初始化空间
    initMain() {
      document.getElementById("gear").innerHTML = this.gear;
      var root = document.getElementById("main");
      document.getElementById("main").innerHTML = "";
      for (var y = this.Y; y >= 1; y--) {
        var label = document.createElement("div");
        label.setAttribute('id', "rand:" + y);
        label.setAttribute('style', 'font-size: 0;text-align:center;');
        root.appendChild(label);
        for (var x = 1; x <= this.X; x++) {
          var element = document.createElement("div");
          element.setAttribute('id', x + "," + y);
          element.setAttribute('value', 0);
          if (y > 25) {
            element.setAttribute('style', 'background-color: ' + this.defaultColor + ';width: ' + this.overAllCellSize + ';height: ' + this.overAllCellSize + ';display: none;border: 1px;border-color: ' + this.overallSpaceBorderColor + ';border-style: dashed;');
          }
          else {
            element.setAttribute('style', 'background-color: ' + this.defaultColor + ';width: ' + this.overAllCellSize + ';height: ' + this.overAllCellSize + ';display: inline-block;border: 1px;border-color: ' + this.overallSpaceBorderColor + ';border-style: dashed;');
          }
          label.appendChild(element);
        }
      }
    },
    // 初始化信息栏
    initMessage() {
      var root = document.getElementById("message");
      root.innerHTML = "";
      for (var y = this.LENGTH; y >= 1; y--) {
        var label = document.createElement("div");
        label.setAttribute('id', "rand:" + y);
        label.setAttribute('style', 'font-size: 0;text-align:center;');
        root.appendChild(label);
        for (var x = 1; x <= this.LENGTH; x++) {
          var element = document.createElement("div");
          element.setAttribute('id', "shape-" + x + "," + y);
          element.setAttribute('value', 0);
          element.setAttribute('data-new', 0); // 下一个单位时间产生元胞的标志(1:产生,0:不产生)
          element.setAttribute('style', 'background-color: ' + this.defaultColor + ';width: ' + this.overAllCellSize + ';height: ' + this.overAllCellSize + ';display: inline-block;border: 1px;border-color: ' + this.overallSpaceBorderColor + ';border-style: dashed;');
          label.appendChild(element);
        }
      }
      this.setNext();
      this.putNext();
      this.setNext();
    },
    /**
     * 随机获取一个形状
     * 根据难度等级确定不同难度级别的形状出现概率
     *   1:100%
     *   2:80%,20%
     *   3:80%,10%,10%
     *   4:80%,10%,5%,5%
     **/
    setNext() {
      var a = Math.floor(Math.random() * 100); // 获取一个随机数
      var i = 0;
      if (this.level == 1) {
        i = Math.floor(Math.random() * this.SHAP_SIZE);
      }
      else if (this.level == 2) {
        if (a < 80) {
          i = Math.floor(Math.random() * this.SHAP_SIZE);
        }
        else {
          i = Math.floor(Math.random() * this.SHAP_SIZE) + this.SHAP_SIZE;
        }
      }
      else if (this.level == 3) {
        if (a < 80) {
          i = Math.floor(Math.random() * this.SHAP_SIZE);
        }
        else if (a < 90) {
          i = Math.floor(Math.random() * this.SHAP_SIZE) + this.SHAP_SIZE;
        }
        else {
          i = Math.floor(Math.random() * this.SHAP_SIZE) + this.SHAP_SIZE * 2;
        }
      }
      else if (this.level == 4) {
        if (a < 80) {
          i = Math.floor(Math.random() * this.SHAP_SIZE);
        }
        else if (a < 90) {
          i = Math.floor(Math.random() * this.SHAP_SIZE) + this.SHAP_SIZE;
        }
        else if (a < 95) {
          i = Math.floor(Math.random() * this.SHAP_SIZE) + this.SHAP_SIZE * 2;
        }
        else {
          i = Math.floor(Math.random() * this.SHAP_SIZE) + this.SHAP_SIZE * 3;
        }
      }
      this.nextShap = this.shapMap[i];
      for (var x = 1; x <= this.LENGTH; x++) {
        for (var y = 1; y <= this.LENGTH; y++) {
          var val = this.nextShap[x - 1][y - 1];
          var ele = document.getElementById("shape-" + x + "," + y);
          ele.setAttribute("value", val);
          if (val == 1) {
            ele.style.backgroundColor = this.pointColor;
          } else {
            ele.style.backgroundColor = this.defaultColor;
          }
        }
      }
    },
    // 将该形状在信息栏中和游戏窗口中
    putNext() {
      this.eleMap = [];
      for (var x = this.X_S; x <= this.X_E; x++) {
        for (var y = this.Y_S; y <= this.Y_E; y++) {
          var val = this.nextShap[x - 6][y - 26];
          var ele = document.getElementById(x + "," + y);
          ele.setAttribute("value", 2);
          var xy = {
            "x": x,
            "y": y,
          }
          if (val == 1) {
            ele.style.backgroundColor = this.pointColor;
            this.eleMap.push(xy);
          } else {
            ele.style.backgroundColor = this.defaultColor;
          }
        }
      }
    },
    /**
     * 按键响应
     * 37:左,左移
     * 38:上,旋转90°
     * 39:右,右移
     * 40:下,按住不动加速下落
     * 方法一:
     * 以普通 LENGTH*LENGTH 的正方形为例,当 LENGTH 为 4 时
     *   1.原点从 (0,0) 开始
     *       (0,0) (0,1) (0,2) (0,3)
     *       (1,0) (1,1) (1,2) (1,3)
     *       (2,0) (2,1) (2,2) (2,3)
     *       (3,0) (3,1) (3,2) (3,3)
     *     逆时针旋转90°,x`=LENGTH-1-y,y`=x
     *     顺时针旋转90°,x`=y,y`=LENGTH-1-x
     *   2.原点从(X,Y) 开始
     *       (0,0) ··· (0,Y) ···
     *         ·
     *         ·
     *         · 
     *       (X,0) ··· (X,Y)   ··· (X,Y+3)
     *         ·         ·      ·    ·
     *         ·       (X+3,Y)  ·  (X+3,Y+3)
     *   逆时针旋转90°,x`=y-Y+X,y`=LENGTH-1-x+X+Y
     *   顺时针旋转90°,x`=LENGTH-1-y+X+Y,y`=x-X+Y
     * 方法二:
     *   首先获取下落的方块的所有点中的最小 x y 值并以(x,y)为原点进行旋转
     *   将<1><2>交替执行,每转动8次为一个循环
     *     <1>x,y 交换
     *     <2>y 轴镜像
     * 由于已经将下落的方块融入到窗口中,想要转动它,则需要对其进行特殊的转换,
     **/
    whichButton(event) {
      var key = event.keyCode;
      if (key == 38 && this.lock == false) { // 上,旋转90° / y 轴镜像
        this.turn();
      }
    },
    leftMove() {
      var eleTemp = []; // 旋转后新的位置
      for (var i = 0; i < this.eleMap.length; i++) { // 先检查是否可以旋转
        var x = this.eleMap[i].x - 1;
        var y = this.eleMap[i].y;
        if (x < 1) {
          return;
        }
        var ele = document.getElementById(x + "," + y);
        if (parseInt(ele.getAttribute("value")) == 1) { // 旋转后碰到了固定了的方块
          return;
        }
      }
      for (var i = 0; i < this.eleMap.length; i++) { // 将窗口中正在下落的方块清空
        var x = this.eleMap[i].x;
        var y = this.eleMap[i].y;
        var xy = {
          "x": x - 1,
          "y": y,
        }
        eleTemp.push(xy);
        var ele = document.getElementById(x + "," + y);
        ele.setAttribute("value", 0);
        ele.style.backgroundColor = this.defaultColor;
      }
      this.eleMap = eleTemp;
      for (var i = 0; i < eleTemp.length; i++) { // 将旋转后的下落方块放入窗口中
        var x = eleTemp[i].x;
        var y = eleTemp[i].y;
        var ele = document.getElementById(x + "," + y);
        ele.setAttribute("value", 2);
        ele.style.backgroundColor = this.pointColor;
      }
    },
    rightMove() {
      var eleTemp = []; // 旋转后新的位置
      for (var i = 0; i < this.eleMap.length; i++) { // 先检查是否可以旋转
        var x = this.eleMap[i].x + 1;
        var y = this.eleMap[i].y;
        if (x > this.X) {
          return;
        }
        var ele = document.getElementById(x + "," + y);
        if (parseInt(ele.getAttribute("value")) == 1) { // 旋转后碰到了固定了的方块
          return;
        }
      }
      for (var i = 0; i < this.eleMap.length; i++) { // 将窗口中正在下落的方块清空
        var x = this.eleMap[i].x;
        var y = this.eleMap[i].y;
        var xy = {
          "x": x + 1,
          "y": y,
        }
        eleTemp.push(xy);
        var ele = document.getElementById(x + "," + y);
        ele.setAttribute("value", 0);
        ele.style.backgroundColor = this.defaultColor;
      }
      this.eleMap = eleTemp;
      for (var i = 0; i < eleTemp.length; i++) { // 将旋转后的下落方块放入窗口中
        var x = eleTemp[i].x;
        var y = eleTemp[i].y;
        var ele = document.getElementById(x + "," + y);
        ele.setAttribute("value", 2);
        ele.style.backgroundColor = this.pointColor;
      }
    },
    turn() {
      var eleTemp = []; // 旋转后新的位置
      /**
       * 记录下落的方块中元素最小y值,通过 shapX 和 shapY 确定方块的转动的参考点
       **/
      var shapX = 100;
      var shapY = 100;
      for (var i = 0; i < this.eleMap.length; i++) { // 找到"原点"
        var x = this.eleMap[i].x;
        var y = this.eleMap[i].y;
        if (x < shapX) {
          shapX = x;
        }
        if (y < shapY) {
          shapY = y;
        }
      }
      if (this.exchange) {
        for (var i = 0; i < this.eleMap.length; i++) { // 将下落的方块移动到以该"原点"为坐标系的第一象限上,且必须有点落在正 x 轴和正 y 轴上
          var x = this.eleMap[i].y - shapY + shapX;
          var y = this.eleMap[i].x - shapX + shapY;
          var xy = {
            "x": x,
            "y": y,
          }
          eleTemp.push(xy);
          var ele = document.getElementById(x + "," + y);
          if (parseInt(ele.getAttribute("value")) == 1) { // 旋转后碰到了固定了的方块
            return;
          }
        }
        this.exchange = false;
      }
      else {
        for (var i = 0; i < this.eleMap.length; i++) { // 检查计算旋转之后的坐标是否
          var x = this.eleMap[i].x;
          var y = -this.eleMap[i].y + 2 * shapY + 1;
          var xy = {
            "x": x,
            "y": y,
          }
          eleTemp.push(xy);
          var ele = document.getElementById(x + "," + y);
          if (parseInt(ele.getAttribute("value")) == 1) { // 旋转后碰到了固定了的方块
            return;
          }
        }
        this.exchange = true;
      }
      for (var i = 0; i < this.eleMap.length; i++) { // 将窗口中正在下落的方块清空
        var x = this.eleMap[i].x;
        var y = this.eleMap[i].y;
        var ele = document.getElementById(x + "," + y);
        ele.setAttribute("value", 0);
        ele.style.backgroundColor = this.defaultColor;
      }
      this.eleMap = eleTemp;
      for (var i = 0; i < eleTemp.length; i++) { // 将旋转后的下落方块放入窗口中
        var x = eleTemp[i].x;
        var y = eleTemp[i].y;
        var ele = document.getElementById(x + "," + y);
        ele.setAttribute("value", 2);
        ele.style.backgroundColor = this.pointColor;
      }
    },
    async running() { // 自动
      while (this.run) { // 每单位时间整体下落一格 
        var land = true;
        this.lock = true;
        // 检查
        for (var i = 0; i < this.eleMap.length; i++) {
          var x = this.eleMap[i].x;
          var y = this.eleMap[i].y;
          var getNext = false;
          if (parseInt(y) == 1) { // 下落到最底层,终止下落的方块
            land = false;
          }
          else {
            var ele = document.getElementById(x + "," + (y - 1));
            if (parseInt(ele.getAttribute("value")) == 1) { // 下方已存在固定了的方块,终止下落的方块
              land = false;
            }
          }

          if (!land) {
            if (y > 25) { // 检查当前下落的方块是否在可是界限内,超出可视界限则游戏结束
              this.run = false;
              alert("游戏结束!");
              break;
            }
            else {
              for (var t = 0; t < this.eleMap.length; t++) { // 当前方块已触底,将整体value置为1
                var x = this.eleMap[t].x;
                var y = this.eleMap[t].y;
                ele = document.getElementById(x + "," + y);
                ele.style.backgroundColor = this.pointColor;
                ele.setAttribute("value", 1);
              }
              this.eliminate();
              getNext = true;
              break; // 已证实下落的方块中存在一个元素已触底,剩下的元素不用检测直接跳出
            }
          }
        }
        if (land) { // 允许下降,将下落的方块整体下移
          for (var i = 0; i < this.eleMap.length; i++) { // 将原有的置0
            var ele = document.getElementById(this.eleMap[i].x + "," + this.eleMap[i].y);
            ele.style.backgroundColor = this.defaultColor;
            ele.setAttribute("value", 0);
          }
          for (var i = 0; i < this.eleMap.length; i++) { // 将下落后的位置置2
            this.eleMap[i].y -= 1;
            ele = document.getElementById(this.eleMap[i].x + "," + this.eleMap[i].y);
            ele.style.backgroundColor = this.pointColor;
            ele.setAttribute("value", 2);
          }
        }
        this.lock = false;
        if (getNext) {
          this.putNext();
          this.setNext();
          this.rand = 26;
        }
        this.rand--;
        await this.sleep(500 + (10 - this.gear) * 40);
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    eliminate() { // 消除
      for (var y = 1, scoreY = 1; y < this.Y_S; y++, scoreY++) {
        var eliminate = true;
        for (var x = 1; x <= this.X; x++) {
          var ele = document.getElementById(x + "," + y);
          if (parseInt(ele.getAttribute("value")) == 0) {
            eliminate = false;
          }
        }
        if (eliminate) { // 当前行每个小格都有方块,将上一行向下一行平移,最后重新扫描
          this.setScore(scoreY);
          for (var m = y + 1; m < this.Y_S; m++) {
            for (var n = 1; n <= this.X; n++) {
              var ele1 = document.getElementById(n + "," + m);
              var ele2 = document.getElementById(n + "," + (m - 1));
              if (parseInt(ele1.getAttribute("value")) == 1) {
                ele2.style.backgroundColor = this.pointColor;
                ele2.setAttribute("value", 1);
              }
              else {
                ele2.style.backgroundColor = this.defaultColor;
                ele2.setAttribute("value", 0);
              }
            }
          }
          y--; // 第 y+1 行 移到 第 y 行,需要重新检查第 y 行
        }
      }
    },
    setScore(y) { // 分数
      this.score += y * this.level;
      document.getElementById("score").innerHTML = this.score;
    },
    start() {
      if (this.run) { // 多次连续执行 running 会有加速效果
        return;
      }
      this.run = true;
      this.running();
    },
    stop() {
      this.run = false;
    },
    speedUp() {
      if (this.gear == this.gearMax) {
        return;
      }
      this.gear++;
      this.updateGear();
    },
    speedDown() {
      if (this.gear == 1) {
        return;
      }
      this.gear--;
      this.updateGear();
    },
    updateGear() {
      document.getElementById("gear").innerHTML = this.gear;
    },
    lvUp() {
      if (this.level == this.levelMax) {
        return;
      }
      this.level++;
      this.updateLv();
    },
    lvDown() {
      if (this.level == this.levelMin) {
        return;
      }
      this.level--;
      updateLv();
    },
    updateLv() {
      document.getElementById("level").innerHTML = this.level;
    },
  },
};
</script>