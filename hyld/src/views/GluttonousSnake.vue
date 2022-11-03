<template>
  <div>
    <Top :commonResponse="commonResponseData"></Top>
    <div style="height: 140px;">
      <div style="width: 20%;margin: 0 40%;">
        <div @click="start()"
          style="width: 100%;height: 30px;background-color: rgb(146, 160, 240);font-size: 20px;text-align: center;color: aliceblue;border-radius: 10px;vertical-align: middle;display: inline-block;cursor:pointer">
          start</div>
        <div style="width: 100%;height: 30px;align-items: center;margin-top: 5px;margin-bottom: 5px;font-size: 20px;">
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
        <div style="width: 100%;height: 30px;align-items: center;margin-top: 5px;margin-bottom: 5px;font-size: 20px;">
          <div @click="levelUp()"
            style="width: 38%;height: 30px;background-color: rgb(146, 160, 240);text-align: center;color: aliceblue;border-radius: 10px;float:left;cursor:pointer">
            扩增</div>
          <div id="level"
            style="width: 20%;height: 30px;background-color: rgb(146, 160, 240);text-align: center;color: aliceblue;border-radius: 10px;margin:0 2% 0;float:left;cursor:pointer">
            1</div>
          <div @click="levelDown()"
            style="width: 38%;height: 30px;background-color: rgb(146, 160, 240);text-align: center;color: aliceblue;border-radius: 10px; float:left;cursor:pointer">
            缩小</div>
        </div>
        <div @click="stop()"
          style="width: 100%;height: 30px;background-color: rgb(146, 160, 240);font-size: 20px;text-align: center;color: aliceblue;border-radius: 10px;vertical-align: middle;display: inline-block;cursor:pointer">
          stop</div>
      </div>
    </div>
    <div id="main">
    </div>
  </div>
</template>
<script>
import Top from "@/components/Top.vue";
export default {
  name: "gluttonousSnake",
  components: {
    Top,
  },
  data() {
    return {
      commonResponseData: { // 通用 Modal 弹窗数据
        success: true,
        msg: '',
      },
      cellColor: "#FFD700", // 普通元素颜色
      headCellColor: "#FF6347", // 头部元素颜色
      endCollor: "#FA8072", // 尾部元素颜色
      overallSpaceBorderColor: "#8fbd7c", // 默认边框颜色
      pointColor: "#ADFF2F", // 食物颜色

      X: 5,
      Y: 5,
      SIZE: 5, // 尺寸单位
      doing: false,
      RUNNING: false,
      gear: 10, // 速度
      level: 1,
      overAllCellSize: "20px", // 元胞尺寸
      spaceColor: "#ffffff", // 空间背景色/无生命
      actionMap: {
        "up": { x: 0, y: 1 },
        "left": { x: -1, y: 0 },
        "right": { x: 1, y: 0 },
        "down": { x: 0, y: -1 }
      },
      palyer: [],
      /**
       * 37:左,38:上,39:右,40:下
       **/
      directionMap: {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
      },
      direction: '',
      beforeDirection: '',
      directionArr: ["up", "left", "right", "down"],
      foot: {},
      guessDirection: '', // 猜测方向,演算时的方向
      fineLine: {}, // 最优路径方案
      finding: false, // ai 查找中
    }
  },
  mounted() {
    this.init();


    /**
     * 监听键盘
     * 37:左,38:上,39:右,40:下
     **/
    document.onkeydown = (e) => {
      //事件对象兼容
      let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
      var newDirection = this.directionMap[e1.keyCode];
      //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
      if (e1 && this.checkDirection(newDirection)) {
        e1.preventDefault();
        this.direction = newDirection;
      }
    };
  },
  methods: {
    init() {
      this.X = this.SIZE * this.level;
      this.Y = this.SIZE * this.level;
      this.initSpace();
      this.initPlayer();
      this.createFoot();
    },
    // 初始化空间
    initSpace() {
      document.getElementById("gear").innerHTML = this.gear;
      var root = document.getElementById("main");
      root.innerHTML = "";
      for (var y = this.Y; y >= 1; y--) {
        var label = document.createElement("div");
        label.setAttribute('id', "rand:" + y);
        label.setAttribute('style', 'font-size: 0;text-align:center;');
        root.appendChild(label);
        for (var x = 1; x <= this.X; x++) {
          var element = document.createElement("div");
          element.setAttribute('id', + x + "," + y);
          element.setAttribute('value', 0);
          element.setAttribute('data-new', 0); // 下一个单位时间产生元胞的标志(1:产生,0:不产生)
          element.setAttribute('style', 'background-color: ' + this.spaceColor + ';width: ' + this.overAllCellSize + ';height: ' + this.overAllCellSize + ';display: inline-block;border: 0.5px;border-color: ' + this.overallSpaceBorderColor + ';border-style: dashed;');
          label.appendChild(element);
        }
      }
    },
    // 初始化玩家
    initPlayer() {
      this.palyer = [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }]; // 左头右尾
      this.direction = "right";
      this.beforeDirection = "right";
      for (var x = 0; x < this.palyer.length; x++) {
        var head = this.palyer[x];
        var ele = document.getElementById(head.x + "," + head.y);
        if (x == 0) { // 指定第一个颜色
          ele.style.backgroundColor = this.headCellColor;
        }
        else if (x == (this.palyer.length - 1)) {
          ele.style.backgroundColor = this.endCollor;
        }
        else {
          ele.style.backgroundColor = this.cellColor;
        }
        ele.setAttribute("value", 1);
      }
    },
    // 生成食物
    createFoot() {
      var ele, x, y;
      do {
        x = Math.floor(Math.random() * this.X + 1);
        y = Math.floor(Math.random() * this.Y + 1);
        ele = document.getElementById(x + "," + y);
      } while (parseInt(document.getElementById(x + "," + y).getAttribute("value")) != 0);
      ele.setAttribute("value", 2);
      ele.style.backgroundColor = this.pointColor;
      ele.className = "test-2";
      this.foot = {
        x: x,
        y: y
      }
      // var d = this.directionMap[direction];
    },

    // 检查新方向与当前方向相反
    checkDirection(newDirection) {
      if (this.actionMap[this.direction].x + this.actionMap[newDirection].x == 0 && this.actionMap[this.direction].y + this.actionMap[newDirection].y == 0) {
        return false;
      } else {
        return true;
      }
    },
    async running() { // 自动
      while (this.RUNNING) {
        if (!this.checkDirection(this.beforeDirection)) {
          this.direction = this.beforeDirection;
        }
        var x = this.palyer[0].x;
        var y = this.palyer[0].y;
        x = x + this.actionMap[this.direction].x;
        y = y + this.actionMap[this.direction].y;
        if (x > this.X || x < 1 || y > this.Y || y < 1) { // 碰墙
          this.RUNNING = false;
          alert("碰墙,游戏结束!");
          this.init();
          return;
        }
        var ele = document.getElementById(x + "," + y);

        var isTail = false; // 再往前走一步,发现该单位空间已被自己占据,但有可能该空间正好是尾部,此时不能判定为撞到自己
        var cell = this.palyer[this.palyer.length - 1]; // 获取尾部
        if (cell.x == x && cell.y == y) {
          isTail = true;
        }

        if (parseInt(ele.getAttribute("value")) == 0 || isTail) {  // 空白格
          var lastPoint = this.palyer.pop(); // 删除最后一个元素
          var lastEle = document.getElementById(lastPoint.x + "," + lastPoint.y);
          lastEle.style.backgroundColor = this.spaceColor;
          lastEle.setAttribute("value", 0);
          var cell = this.palyer[this.palyer.length - 1]; // 原尾部已删除,将新尾部颜色修改
          cell = document.getElementById(cell.x + "," + cell.y);
          cell.style.backgroundColor = this.endCollor;
          var point = {
            x: x,
            y: y
          };
          this.palyer.unshift(point);// 将新头部坐标插入到数组的第一个位置,成长
          this.beforeDirection = this.direction;
        } else if (parseInt(ele.getAttribute("value")) == 1 && !isTail) { // 撞到自己
          this.RUNNING = false;
          alert("撞到自己,游戏结束!" + parseInt(ele.getAttribute("value")) + ";" + x + "," + y);
          this.init();
          break;
        } else if (parseInt(ele.getAttribute("value")) == 2) { // 食物
          var point = {
            x: x,
            y: y
          };
          this.palyer.unshift(point);// 成长
          this.createFoot();
          this.beforeDirection = this.direction;
        }
        // 将新空元素转换为头部
        ele.style.backgroundColor = this.headCellColor;
        ele.setAttribute("value", 1);
        var cell = this.palyer[1]; // 将原本的头部颜色修改
        ele = document.getElementById(cell.x + "," + cell.y);
        ele.style.backgroundColor = this.cellColor;
        // runningAI();
        console.log("next.");
        await this.sleep(500 + (10 - this.gear) * 40);
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    start() {
      this.doing = true;
      if (this.RUNNING) { // 多次连续执行 running 会有加速效果
        return;
      }
      this.RUNNING = true;
      this.running();
    },
    stop() {
      this.RUNNING = false;
    },
    speedUp() {
      if (this.gear == 20) {
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
    levelUp() {
      if (this.level == 20 && !this.doing) {
        return;
      }
      this.level++;
      this.updateLevel();
    },
    levelDown() {
      if (this.level == 1 && !this.doing) {
        return;
      }
      this.level--;
      this.updateLevel();
    },
    updateGear() {
      document.getElementById("gear").innerHTML =this.gear;
    },
    updateLevel() {
      document.getElementById("level").innerHTML =this.level;

      this.init();
    },

    /**
     * 理想执行流程:
     *   1.吃掉食物后
     *     选择路径最短的那条路线
     *   2.假设不再产生食物的情况下,能继续追着尾巴前进且不会碰到自己和边界
     *     选择最短的路线
     **/
    // runningAI() {
    //   guessDirection = direction; // 初始化猜测方向
    //   var cell = palyer[0];
    //   var res = recursion(cell);
    //   // console.log("ai:"+res.length);
    // },

    // recursion(cell, guessDirection) { // 递归
    //   console.log(">" + cell.x + "," + cell.y);
    //   if (finding) {
    //     var way = [{ x: cell.x, y: cell.y }];
    //     if (cell.x == foot.x && cell.y == foot.y) {
    //       finding = false;
    //       return way.unshift({ x: cell.x, y: cell.y });
    //     }
    //     for (var i = 0; i < directionArr.length; i++) {
    //       if (directionArr[i] == guessDirection) {
    //         continue;
    //       }
    //       if (directionArr[i] == "up") {
    //         if ((cell.y + 1) <= Y) {
    //           var ele = document.getElementById(cell.x + "," + (cell.y + 1));
    //           if (parseInt(ele.getAttribute("value")) == 0) {
    //             way.unshift(recursion(cell, "up"));
    //           }
    //         }
    //       } else if (directionArr[i] == "left") {
    //         if (cell.x > 1) {
    //           var ele = document.getElementById((cell.x - 1) + "," + cell.y);
    //           if (parseInt(ele.getAttribute("value")) == 0) {
    //             way.unshift(recursion(cell, "left"));
    //           }
    //         }
    //       } else if (directionArr[i] == "right") {
    //         if ((cell.x + 1) <= X) {
    //           var ele = document.getElementById((cell.x + 1) + "," + cell.y);
    //           if (parseInt(ele.getAttribute("value")) == 0) {
    //             way.unshift(recursion(cell, "right"));
    //           }
    //         }
    //       } else if (directionArr[i] == "down") {
    //         if (cell.y > 1) {
    //           var ele = document.getElementById(cell.x + "," + (cell.y - 1));
    //           if (parseInt(ele.getAttribute("value")) == 0) {
    //             way.unshift(recursion(cell, "down"));
    //           }
    //         }
    //       }
    //     }
    //     return way;
    //   }
    // },
  },
};
</script>