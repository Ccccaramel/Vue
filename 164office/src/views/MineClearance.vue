<template>
    <div>
        <Top ref="top" :commonResponse="commonResponseData"></Top>
        <!-- <div style="background-color: gold;"> -->
            <div style="background-color: rgb(206, 255, 168);display: flex;justify-content: center;padding: 10px;">
                <button @click="init()" style="background-color: #fc7b7b;border-radius: 10px; margin: 2px ;">重置</button>
                <button @click="changeMode()" style="background-color: #dcabff;border-radius: 10px; margin: 2px ;">模式{{ this.mode }}</button>
                <button @click="subLv()" style="background-color: #abd5ff;border-radius: 10px; margin: 2px ;">等级-</button>
                <span style="background-color: #abd5ff; display: flex;justify-content: center;align-items: center;border-radius: 10px;margin: 2px ;width: 40px;">{{ this.lv }}</span>
                <button @click="addLv()" style="background-color: #abd5ff;border-radius: 10px; margin: 2px ;">等级+</button>
                <button @click="subDifficulty()" style="background-color: #ffabb3;border-radius: 10px; margin: 2px ;">难度-</button>
                <span style="background-color: #ffabb3; display: flex;justify-content: center;align-items: center;border-radius: 10px;margin: 2px ;width: 40px;">{{ this.difficulty }}</span>
                <button @click="addDifficulty()" style="background-color: #ffabb3;border-radius: 10px; margin: 2px ;">难度+</button>
                <span style="background-color: #beabff; display: flex;justify-content: center;align-items: center;border-radius: 10px;margin: 2px ;width: 100px;">地雷数量:{{ this.mine }}</span>
            </div>
            <div style="display: flex;justify-content: center;">
                <canvas id="can" style="background-color: rgb(255, 255, 255);"></canvas>
            </div>
        
        <!-- </div> -->
    </div>
</template>
<script>
import Top from "@/components/Top.vue";
import { saveVisitLog } from "../api/welcome";
export default {
    name: "mineClearance",
    components: {
        Top,
    },
    data() {
        return {
            commonResponseData: { // 通用 Modal 弹窗数据
                success: true,
                msg: '',
            },
            canvas: null,
            ctx: null,
            size: 20,  // 单个区域的边长,通用
            difficulty: 1,  // 难度
            odds: 0.3,  //雷区概率,由难度值确定,(difficulty+1)*10/100
            lv: 2,  // 六边形等级
            data: new Array(),  // -1:雷区;0/1/2/3:附近雷区数量
            dataMark: new Array(),  // -1:不显示;0:显示附近雷区数量;1:标记为雷区
            back: false,
            mode: 1,  // 1:三角形;2:六边形;
            width: 0,
            height: 0,
            mine: 0,
        }
    },
    mounted() {

        saveVisitLog(Object.assign({ key: 23 }));
        
        this.width = (this.lv * 6) * this.size + 20;
        this.height = 6*this.size * Math.sqrt(3)+20;
        this.init();
    },
    methods: {
        init() {
            this.initData();
            this.draw();
            // this.triangle();
        },
        changeMode() {
            if (this.mode==1) {
                this.mode = 2;
                this.width = (this.size*4)+(this.size*3)*2*(this.lv-1)+20;
                this.height = (this.size*2)*(2*this.lv-1) * Math.sqrt(3)+20;
            }
            else {
                this.mode = 1;
                this.width = this.lv * 6 * 20+20;
                this.height = this.lv*6 * 10 * Math.sqrt(3)+20;
            }
            this.init();

        },
        subLv() {
            if (this.lv > 2) {
                this.lv--;
                if (this.mode==1) {
                    this.width = (this.lv * 6) * 20+20;
                    this.height = this.lv*6 * 10 * Math.sqrt(3)+20;
                }
                else if (this.mode == 2) {
                    this.width = (this.size*4)+(this.size*3)*2*(this.lv-1)+20;
                    this.height = (this.size*2)*(2*this.lv-1) * Math.sqrt(3)+20;
                }
                this.init();

            }
        },
        addLv() {
            if (this.lv < 7) {
                this.lv++;
                if (this.mode==1) {
                    this.width = (this.lv * 6) * 20+20;
                    this.height = this.lv*6 * 10 * Math.sqrt(3)+20;
                }
                else if (this.mode == 2) {
                    this.width = (this.size*4)+(this.size*3)*2*(this.lv-1)+20;
                    this.height = (this.size*2)*(2*this.lv-1) * Math.sqrt(3)+20;
                }
                this.init();
            }
        },
        subDifficulty() {
            if (this.difficulty > 1) {
                this.difficulty--;
                this.odds = (this.difficulty + 1) * 0.1;
                console.log("地雷概率:"+this.odds);
                this.init();
            }
        },
        addDifficulty(){
            if (this.difficulty < 7) {
                this.difficulty++;
                this.odds = (this.difficulty + 1) * 0.1;
                console.log("地雷概率:"+this.odds);
                this.init();
            }
        },
        reSize() {
        },
        initData() {  // 生成地雷和数标数据
            this.data.length=0;
            this.mine = 0;
            if (this.mode == 1) {  // 三角形
                
                // 生成地雷
                for (var y = 1; y <= this.lv*6 / 2; y++){
                    this.data[y - 1] = new Array();
                    this.dataMark[y - 1] = new Array();
                    for (var x = 1; x <= (this.lv*6-1 - (y - 1) * 2); x++){
                        if (Math.random()<this.odds) {
                            this.data[y - 1][x - 1] = -1;
                            this.mine++;
                        }
                        else {
                            this.data[y-1][x-1] = 0;
                        }
                        this.dataMark[y-1][x-1] = -1;
                    }
                }
                // 判断非类区的数值
                for (var y = 1; y <= this.lv*6 / 2; y++){
                    for (var x = 1; x <= (this.lv*6-1 - (y - 1) * 2); x++){
                        if (this.data[y - 1][x - 1] == 0) {
                            var count = 0;
                            if (x>1&&this.data[y - 1][x - 2]==-1) {
                                count++;
                            }
                            if (x<(this.lv*6-1 - (y - 1) * 2)&&this.data[y-1][x]==-1) {
                                count++;
                            }
                            if (x%2==0) {
                                if (y<(this.lv*6/2)&&this.data[y][x-2]==-1) {
                                    count++;
                                }
                            }
                            else {
                                if (y>1&&this.data[y-2][x]==-1) {
                                    count++;
                                }
                            }
                            this.data[y-1][x-1] = count;
                        }
                    }
                }
            }
            else if (this.mode == 2) {  // 六边形
                // 生成雷区
                // 上部分
                var y = 1;
                var row = 4 * this.lv - 3;  // 根据 lv 计算获取总行数
                for (; y <= this.lv; y++) {
                    this.data[y - 1] = new Array();
                    this.dataMark[y - 1] = new Array();
                    for (var x = 1; x <= y; x++) {
                        if (Math.random()<this.odds) {
                            this.data[y - 1][x - 1] = -1;
                            this.mine++;
                        }
                        else {
                            this.data[y-1][x-1] = 0;
                        }
                        this.dataMark[y-1][x-1] = -1;
                    }
                }
                // 中间
                for (var n = 1; y <= row - this.lv; y++, n++) {
                    this.data[y - 1] = new Array();
                    this.dataMark[y - 1] = new Array();
                    for (var x = 1; x <= (this.lv - n % 2); x++) {
                        if (Math.random()<this.odds) {
                            this.data[y - 1][x - 1] = -1;
                            this.mine++;
                        }
                        else {
                            this.data[y-1][x-1] = 0;
                        }
                        this.dataMark[y-1][x-1] = -1;
                    }
                }
                // 下部分
                for (var n = 1; y <= row; y++, n++) {
                    this.data[y - 1] = new Array();
                    this.dataMark[y - 1] = new Array();
                    for (var x = 1; x <= row - y + 1; x++) {
                        if (Math.random()<this.odds) {
                            this.data[y - 1][x - 1] = -1;
                            this.mine++;
                        }
                        else {
                            this.data[y-1][x-1] = 0;
                        }
                        this.dataMark[y-1][x-1] = -1;
                    }
                }

                for (var i = 0; this.data[i]; i++){  // 打印数据
                    console.log(">"+this.data[i]);
                }

                for (var y = 0; y < row; y++){
                    for (var x = 0; x < this.dataMark[y].length; x++){
                        // console.log(y+"-"+x);
                        if (this.data[y][x] == 0) {
                            var count = 0;
                            if (y < this.lv) {  // 上部分
                                // console.log(y+"*上*"+x);
                                if (x!=y&&x > 0&&y>1&&this.data[y-2][x-1]==-1) {  // 顶
                                    count++;
                                }
                                if ((this.lv-y)<=2&&this.data[y+2][x]==-1) {  // 底,倒数第一,二行
                                    count++;
                                }
                                if (y<(this.lv-2)&&this.data[y+2][x+1]==-1) {  // 底
                                    count++;
                                }
                                if (x>0&&this.data[y - 1][x - 1]==-1) {  // 左上
                                    count++;
                                }
                                if (y<(this.lv-1)&&this.data[y + 1][x]==-1) {  // 左下
                                    count++;
                                }
                                if (x>0&&y == (this.lv - 1) && this.data[y + 1][x-1] == -1) {  // 左下,倒数第一行的x不用加1
                                    count++;
                                }
                                if (x<(this.dataMark[y].length-1)&&this.data[y - 1][x]==-1) {  // 右上
                                    count++;
                                }
                                if (y<(this.lv-1)&&this.data[y + 1][x + 1]==-1) {  // 右下
                                    count++;
                                }
                                if (x!=this.lv&&y == (this.lv - 1) && this.data[y + 1][x] == -1) {  // 右下,倒数第一行的x不用加1
                                    count++;
                                }
                            }
                            else if (row - y <= this.lv) {  // 下部分
                                // console.log(y+"+下+"+x);
                                if (row-y+1>=this.lv&&this.data[y-2][x]==-1) {  // 顶,第一,二行
                                    count++;
                                }
                                if (row-y+1<this.lv&&this.data[y-2][x+1]==-1) {  // 顶
                                    count++;
                                }
                                if (x!=0&&(this.dataMark[y].length-x)!=1&&this.data[y+2][x-1]==-1) {  // 底
                                    count++;
                                }
                                if (row-y!=this.lv&&this.data[y - 1][x]==-1) {  // 左上
                                    count++;
                                }
                                if (x>0&&row-y==this.lv&&this.data[y - 1][x-1]==-1) {  // 左上,第一行
                                    count++;
                                }
                                // if (y<(this.lv-1)&&this.data[y + 1][x]==-1) {  // 左下
                                //     count++;
                                // }
                                if (x!=0&&this.data[y + 1][x-1]==-1) {  // 左下
                                    count++;
                                }
                                // if (x>0&&y == (this.lv - 1) && this.data[y + 1][x-1] == -1) {  // 左下,倒数第一行的x不用加1
                                //     count++;
                                // }
                                if (row-y<this.lv&&this.data[y - 1][x+1]==-1) {  // 右上
                                    count++;
                                }
                                if (row-y==this.lv&&x!=this.lv-1&&this.data[y - 1][x]==-1) {  // 右上,第一行
                                    count++;
                                }
                                if (x+1!=this.dataMark[y].length&&this.data[y + 1][x]==-1) {  // 右下
                                    count++;
                                }
                            }
                            else {  // 中间
                                // console.log(y+"-中-"+x);
                                if (y>2&&this.data[y-2][x]==-1) {  // 顶
                                    count++;
                                }
                                if (this.data[y+2][x]==-1) {  // 底
                                    count++;
                                }
                                if (x>0&&this.dataMark[y].length==this.lv&&this.data[y - 1][x - 1]==-1) {  // 左上
                                    count++;
                                }
                                if (this.dataMark[y].length!=this.lv&&this.data[y - 1][x]==-1) {  // 左上
                                    count++;
                                }
                                if (x>0&&this.dataMark[y].length==this.lv&&this.data[y + 1][x - 1]==-1) {  // 左下
                                    count++;
                                }
                                if (this.dataMark[y].length!=this.lv&&this.data[y + 1][x]==-1) {  // 左下
                                    count++;
                                }
                                if (this.dataMark[y].length!=this.lv&&this.data[y - 1][x + 1]==-1) {  // 右上
                                    count++;
                                }
                                if (x<(this.lv-1)&&this.dataMark[y].length==this.lv&&this.data[y - 1][x]==-1) {  // 右上
                                    count++;
                                }
                                if (x<(this.lv-1)&&this.dataMark[y].length==this.lv&&this.data[y + 1][x]==-1) {  // 右下
                                    count++;
                                }
                                if (this.dataMark[y].length!=this.lv&&this.data[y + 1][x + 1]==-1) {  // 右下
                                    count++;
                                }
                            }

                            this.data[y][x] = count;
                        }
                    }
                }
            }
        },
        draw(clickX,clickY) {  // 生成画布,并绘画
            this.canvas = document.getElementById("can");

            // 检测是否支持 canvas 2d
            if (this.canvas.getContext) {
                console.log("支持.");
            }
            else {
                console.log("不支持.");
            }

            // 返回一个 canvas 渲染的上下文,如果不支持则返回 null,只有一个
            this.ctx = this.canvas.getContext("2d");


            if (this.mode == 1) {
                this.triangle(clickX,clickY);
            }
            else if (this.mode == 2) {
                this.hexagon(clickX,clickY);
            }

            this.canvas.addEventListener('click', this.trigger, false);  // 为画布添加监听
            // this.canvas.addEventListener('dblclick', this.ex, false);
            // this.canvas.addEventListener('contentmenu', this.ex, false);🎯
            if (this.back) {
                this.back = false;
                alert("游戏结束!");
                // this.init();
                this.canvas.removeEventListener('click', this.trigger, false);
            }
        },
        triangle(clickX,clickY) {  // 画三角形
            // this.canvas.width = window.innerWidth;
            // this.canvas.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            // this.ctx.fillStyle = "#66ccff";  // 设置颜色
            this.ctx.font = "5px";  // 字体粗细

            for (var y = 1; y <= this.lv*6 / 2; y++) {
                for (var x = 1; x <= (this.lv*6-1 - (y - 1) * 2); x++) {
                    this.createCell(
                        x,y,
                        clickX,clickY,
                        this.size * (y - 1 + x - x % 2)+10, (y - 1) * Math.sqrt(3) * this.size+10,
                        this.size * (y + x + x%2 - 2)+10, y * Math.sqrt(3) * this.size+10,
                        this.size * (y + x)+10, (y - x % 2) * Math.sqrt(3) * this.size+10);
                    this.fillData(y, x);  // 填充数字
                }
            }
        },
        hexagon(clickX, clickY) {  // 六边形
            var row = 4 * this.lv - 3;  // 根据 lv 计算获取总行数
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.ctx.font = "5px";  // 字体粗细

            // 将整体拆分成上,中,下三个部分分别绘画

            // 上部分
            var y = 1;
            for (; y <= this.lv; y++) {
                for (var x = 1; x <= y; x++) {
                    var start = 3 * this.lv + 6*x - 3*y - 5;  // x
                    this.createCell(
                        x,y,
                        clickX,clickY,
                        this.size * start+10, Math.sqrt(3) * this.size*(y-1)+10,
                        this.size * (start + 2)+10, Math.sqrt(3) * this.size*(y-1)+10,
                        this.size * (start + 3)+10, Math.sqrt(3) * this.size*y+10,
                        this.size * (start + 2)+10, Math.sqrt(3) * this.size*(y+1)+10,
                        this.size * start+10, Math.sqrt(3) * this.size*(y+1)+10,
                        this.size * (start-1)+10,  Math.sqrt(3) * this.size*y+10);
                    this.fillData(y, x,start);  // 填充数字
                }
            }

            // 中间
            for (var n=1; y <= row-this.lv; y++,n++) {
                for (var x = 1; x <= (this.lv - n % 2); x++) {
                    var start = 6*(x-1)+1+(y-this.lv)%2*3;  // x
                    this.createCell(
                        x,y,
                        clickX,clickY,
                        this.size * start+10, Math.sqrt(3) * this.size*(y-1)+10,
                        this.size * (start + 2)+10, Math.sqrt(3) * this.size*(y-1)+10,
                        this.size * (start + 3)+10, Math.sqrt(3) * this.size*y+10,
                        this.size * (start + 2)+10, Math.sqrt(3) * this.size*(y+1)+10,
                        this.size * start+10, Math.sqrt(3) * this.size*(y+1)+10,
                        this.size * (start-1)+10,  Math.sqrt(3) * this.size*y+10);
                    this.fillData(y, x,start);  // 填充数字
                }
            }

            // 下部分
            for (var n = 1; y <= row; y++, n++) {
                for (var x = 1; x <= row-y+1; x++) {
                    var start = 3 * (n - 1) + 6 * (x - 1) + 1;  // x
                    this.createCell(
                        x,y,
                        clickX,clickY,
                        this.size * start+10, Math.sqrt(3) * this.size*(y-1)+10,
                        this.size * (start + 2)+10, Math.sqrt(3) * this.size*(y-1)+10,
                        this.size * (start + 3)+10, Math.sqrt(3) * this.size*y+10,
                        this.size * (start + 2)+10, Math.sqrt(3) * this.size*(y+1)+10,
                        this.size * start+10, Math.sqrt(3) * this.size*(y+1)+10,
                        this.size * (start-1)+10,  Math.sqrt(3) * this.size*y+10);
                    this.fillData(y, x,start);  // 填充数字
                }
            }
        },
        createCell(x,y,clickX,clickY,point1, point2, point3, point4, point5, point6) {  // 三角形
            this.ctx.beginPath(); // 新建一条 path
            this.ctx.moveTo(point1, point2); // 起点
            this.ctx.lineTo(point3, point4); // 中点
            this.ctx.lineTo(point5, point6); // 终点
            this.ctx.closePath();
            if (this.ctx.isPointInPath(clickX,clickY)) {  // 命中了该单元区
                this.ctx.fillStyle = "#66ccff";  // 设置颜色
                if (this.data[y-1][x-1]==-1) {  // 点中了雷区
                //     alert("游戏结束");
                //     this.init();
                    this.back = true;
                }
                // else {
                    this.dataMark[y-1][x-1] = 0;
                // }
            }
            else {
                this.ctx.fillStyle = "#ffffff";  // 设置颜色
            }
            this.ctx.stroke();
            this.ctx.fill(); // 填充所有点连接后形成的闭合区域
        },
        fillData(y, x, start) {  // 三角形填充数字
            if (this.dataMark[y - 1][x - 1] == 0) {
                var s;
                if (this.data[y-1][x-1]==-1) {
                    s = "💣";
                    // s = "🎯";
                }
                else {
                    s = " " + this.data[y - 1][x - 1];
                }
                if (this.mode==1) {  // 三角形
                    this.ctx.strokeText(s, 20 * (y - 1) + x * 20 +4, y * 20 * Math.sqrt(3) - (x % 2 + 1) * 8+10);
                }
                else if (this.mode == 2) {  // 六边形
                    // if (mark==1) {  // 上部分
                        this.ctx.strokeText(s, this.size * start+25, this.size * y * Math.sqrt(3)+15);
                    // }
                    // else if (mark==2) {  // 中间
                    //     this.ctx.strokeText(s,  x * 20 , y * 20 * Math.sqrt(3));
                    // }
                    // else {  // 下部分
                    //     this.ctx.strokeText(s,  x * 20 , y * 20 * Math.sqrt(3));
                    // }
                }
            }
        },
        createCell(x, y, clickX, clickY, pointA_X, pointA_Y, pointB_X, pointB_Y, pointC_X, pointC_Y, pointD_X, pointD_Y, pointE_X, pointE_Y, pointF_X, pointF_Y) {  // 正六边形
            this.ctx.beginPath(); // 新建一条 path
            this.ctx.moveTo(pointA_X, pointA_Y); // 起点
            this.ctx.lineTo(pointB_X, pointB_Y); // 中点1
            this.ctx.lineTo(pointC_X, pointC_Y); // 中点2
            this.ctx.lineTo(pointD_X, pointD_Y); // 中点3
            this.ctx.lineTo(pointE_X, pointE_Y); // 中点4
            this.ctx.lineTo(pointF_X, pointF_Y); // 终点
            this.ctx.closePath();
            if (this.ctx.isPointInPath(clickX,clickY)) {  // 命中了该单元区
                this.ctx.fillStyle = "#66ccff";  // 设置颜色
                if (this.data[y-1][x-1]==-1) {  // 点中了雷区
                //     alert("游戏结束");
                //     this.init();
                    this.back = true;
                }
                // else {
                    this.dataMark[y-1][x-1] = 0;
                // }
            }
            else {
                this.ctx.fillStyle = "#ffffff";  // 设置颜色
            }
            this.ctx.stroke();
            this.ctx.fill(); // 填充所有点连接后形成的闭合区域
        },
        trigger(e) {  // 监听到鼠标点击画布,获取点击位置并重新绘画
            var bounding = this.canvas.getBoundingClientRect() || getClientRect();
            var x = e.clientX - bounding.left;
            var y = e.clientY - bounding.top;
            console.log(x+"-"+y);
            this.draw(x, y);
        },
        ex(e) {
            alert("双击！");
        }
    },
};
</script>