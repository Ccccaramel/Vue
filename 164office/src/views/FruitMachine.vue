<template>
    <div id="main" class="fm-bg-1 h-100" :style="'zoom:'+ zoomVal">
        <!-- <Top ref="top" :commonResponse="commonResponseData"></Top> -->
        <!-- 背景音乐 -->
        <audio id="bgm" preload="auto" loop controls style="display:none;">
            <source src="../assets/fruitMachine/fm-bgm.mp3" type="audio/mpeg">
        </audio>
        <!-- <audio id="bgm" controls style="display:none" @load="bgmPlay()">
            <source src="../assets/fm-bgm.mp3" type="audio/mpeg">
        </audio> -->
        <!-- 启动时播放的语音 -->
        <audio id="startSound" :src="startSoundSrc" controls type="audio/mpeg" style="display:none"></audio>
        <!-- 旋转停止后播放当前所在角色的语音 -->
        <audio id="roleSound" :src="roleSoundSrc" controls type="audio/mpeg" style="display:none"></audio>
        <!-- 增加押注时触发的音乐 -->
        <audio id="addCoinSound" controls style="display:none">
            <source src="../assets/fruitMachine/coin.mp3" type="audio/mpeg">
        </audio>
        <!-- 收回押注时触发的音乐 -->
        <audio id="subCoinSound" controls style="display:none">
            <source src="../assets/fruitMachine/subCoin.mp3" type="audio/mpeg">
        </audio>
        <!-- 转动时触发的音乐 -->
        <audio id="cellCoinSound" controls style="display:none">
            <source src="../assets/fruitMachine/ding.mp3" type="audio/mpeg">
        </audio>
        <div style="display: flex;justify-content: center;align-items: center;">
            <div class="mt-3">
                <div style="display: flex;justify-content: center;">  <!-- 顶部 -->
                    <img src="../assets/fruitMachine/fm-16.jpg" id="0" style="width: 80px;height: 80px;margin: 2px;border-radius: 12px;border-color: rgba(255, 129, 129, 1);border-width: 2px;border-style: solid;">
                    <img src="../assets/fruitMachine/fm-5.png" id="1" class="fm-node">
                    <img src="../assets/fruitMachine/fm-8-1.jpeg" id="2" class="fm-node">
                    <img src="../assets/fruitMachine/fm-8.jpg" id="3" @click="bgmBtn()" class="fm-node">  <!-- 背景音乐 -->
                    <img src="../assets/fruitMachine/fm-11.jpg" id="4" class="fm-node">
                    <img src="../assets/fruitMachine/fm-11-2.png" id="5" class="fm-node">
                    <img src="../assets/fruitMachine/fm-12.jpg" id="6" class="fm-node">
                </div>
                <div style="display: flex;justify-content: center;height: 336px;">  <!-- 中间 -->
                    <div style="width: 84px;">
                        <img src="../assets/fruitMachine/fm-5-1.png" id="21" class="fm-node">
                        <img src="../assets/fruitMachine/fm-11.jpg" id="20" class="fm-node">
                        <img src="../assets/fruitMachine/fm-2-1.png" id="19" class="fm-node">
                        <img src="../assets/fruitMachine/fm-2.png" id="18" class="fm-node">
                    </div>
                    <div style="width: 420px;display: flex;align-items: center;justify-content: center;">  <!-- 显示总硬币 -->
                        <div>
                            <span class="fm-coin btn" @click="showTip()">{{this.myCoin}}</span>
                        </div>
                        <div class="btn">
                            <img src="../assets/fruitMachine/fm-coin.jpeg" class="fm-node" style="width: 80px;height: 80px;margin: 2px;border-radius: 24px;" @click="startBtn()">
                        </div>
                    </div>
                    <div style="width: 84px;">
                        <img src="../assets/fruitMachine/fm-6.png" id="7" class="fm-node">
                        <img src="../assets/fruitMachine/fm-6-2.png" id="8" class="fm-node">
                        <img src="../assets/fruitMachine/fm-11.jpg" id="9" class="fm-node">
                        <img src="../assets/fruitMachine/fm-16-1.png" id="10" class="fm-node">
                    </div>
                </div>
                <div style="display: flex;justify-content: center;">  <!-- 底部 -->
                    <img src="../assets/fruitMachine/fm-12.jpg" id="17" class="fm-node">
                    <img src="../assets/fruitMachine/fm-12-2.jpg" id="16" class="fm-node">
                    <img src="../assets/fruitMachine/fm-11.jpg" id="15" class="fm-node">
                    <img src="../assets/fruitMachine/fm-9.jpg" id="14" class="fm-node">
                    <img src="../assets/fruitMachine/fm-9-1.gif" id="13" class="fm-node">
                    <img src="../assets/fruitMachine/fm-5.png" id="12" class="fm-node">
                    <img src="../assets/fruitMachine/fm-16.jpg" id="11" class="fm-node">
                </div>
                <hr>
                <div class="btn">  <!-- 投注图标 -->
                    <img src="../assets/fruitMachine/fm-8.jpg" class="fm-node" usemap="#map-1">
                    <map name="map-1">
                        <area shape="rect" coords="0,0,40px,40px" @click="addTenCoining(0)">
                        <area shape="rect" coords="40px,0,80px,40px" @click="addCoining(0)">
                        <area shape="rect" coords="0,40px,40px,80px" @click="subTenCoining(0)">
                        <area shape="rect" coords="40px,40px,80px,80px" @click="subCoining(0)">
                    </map>
                    <img src="../assets/fruitMachine/fm-9.jpg" class="fm-node" usemap="#map-2">
                    <map name="map-2">
                        <area shape="rect" coords="0,0,40px,40px" @click="addTenCoining(1)">
                        <area shape="rect" coords="40px,0,80px,40px" @click="addCoining(1)">
                        <area shape="rect" coords="0,40px,40px,80px" @click="subTenCoining(1)">
                        <area shape="rect" coords="40px,40px,80px,80px" @click="subCoining(1)">
                    </map>
                    <img src="../assets/fruitMachine/fm-2.png" class="fm-node" usemap="#map-3">
                    <map name="map-3">
                        <area shape="rect" coords="0,0,40px,40px" @click="addTenCoining(2)">
                        <area shape="rect" coords="40px,0,80px,40px" @click="addCoining(2)">
                        <area shape="rect" coords="0,40px,40px,80px" @click="subTenCoining(2)">
                        <area shape="rect" coords="40px,40px,80px,80px" @click="subCoining(2)">
                    </map>
                    <img src="../assets/fruitMachine/fm-6.png" class="fm-node" usemap="#map-4">
                    <map name="map-4">
                        <area shape="rect" coords="0,0,40px,40px" @click="addTenCoining(3)">
                        <area shape="rect" coords="40px,0,80px,40px" @click="addCoining(3)">
                        <area shape="rect" coords="0,40px,40px,80px" @click="subTenCoining(3)">
                        <area shape="rect" coords="40px,40px,80px,80px" @click="subCoining(3)">
                    </map>
                    <img src="../assets/fruitMachine/fm-5.png" class="fm-node" usemap="#map-5">
                    <map name="map-5">
                        <area shape="rect" coords="0,0,40px,40px" @click="addTenCoining(4)">
                        <area shape="rect" coords="40px,0,80px,40px" @click="addCoining(4)">
                        <area shape="rect" coords="0,40px,40px,80px" @click="subTenCoining(4)">
                        <area shape="rect" coords="40px,40px,80px,80px" @click="subCoining(4)">
                    </map>
                    <img src="../assets/fruitMachine/fm-12.jpg" class="fm-node" usemap="#map-6">
                    <map name="map-6">
                        <area shape="rect" coords="0,0,40px,40px" @click="addTenCoining(5)">
                        <area shape="rect" coords="40px,0,80px,40px" @click="addCoining(5)">
                        <area shape="rect" coords="0,40px,40px,80px" @click="subTenCoining(5)">
                        <area shape="rect" coords="40px,40px,80px,80px" @click="subCoining(5)">
                    </map>
                    <img src="../assets/fruitMachine/fm-16.jpg" class="fm-node" usemap="#map-7">
                    <map name="map-7">
                        <area shape="rect" coords="0,0,40px,40px" @click="addTenCoining(6)">
                        <area shape="rect" coords="40px,0,80px,40px" @click="addCoining(6)">
                        <area shape="rect" coords="0,40px,40px,80px" @click="subTenCoining(6)">
                        <area shape="rect" coords="40px,40px,80px,80px" @click="subCoining(6)">
                    </map>
                    <img src="../assets/fruitMachine/fm-11.jpg" class="fm-node" usemap="#map-8">
                    <map name="map-8">
                        <area shape="rect" coords="0,0,40px,40px" @click="addTenCoining(7)">
                        <area shape="rect" coords="40px,0,80px,40px" @click="addCoining(7)">
                        <area shape="rect" coords="0,40px,40px,80px" @click="subTenCoining(7)">
                        <area shape="rect" coords="40px,40px,80px,80px" @click="subCoining(7)">
                    </map>
                </div>
                <div style="display: flex;justify-content: center;">  <!-- 投注数值 -->
                    <span class="fm-tbg-1">{{bet[0]}}</span>
                    <span class="fm-tbg fm-tbg-2">{{bet[1]}}</span>
                    <span class="fm-tbg fm-tbg-3">{{bet[2]}}</span>
                    <span class="fm-tbg fm-tbg-4">{{bet[3]}}</span>
                    <span class="fm-tbg fm-tbg-5">{{bet[4]}}</span>
                    <span class="fm-tbg fm-tbg-6">{{bet[5]}}</span>
                    <span class="fm-tbg fm-tbg-7">{{bet[6]}}</span>
                    <span class="fm-tbg fm-tbg-8">{{bet[7]}}</span>
                </div>
                <!-- <div style="display: flex;justify-content: center;"> @click="testDemo()" -->
                    <!-- <div><button style="width: 80px;height: 80px;background-color: greenyellow;" @click="startBtn()">启动!</button></div> -->
                    <!-- <div><button style="width: 80px;height: 80px;background-color: greenyellow;" @click="stop()">停止!</button></div> -->
                <!-- </div> -->
            </div>
        </div>

        <!-- 弹窗样例 -->
        <!-- <div class="fm-alert" id="pop">
            <div class="alert-body">
                <div class="alert-title">弹窗标题<div class="close" @click="closeDemo()">X</div></div>
                <div  class="alert-content">弹窗内容</div>
            </div>
        </div> -->

        <!-- 触发特殊技能 -->
        <div class="magic" id="pop">
            <div id="popGif" class="magic-body-1 magic-body">
            </div>
            <div id="popInfo" class="magic-info">
                <span style="display:flex;justify-content:center;align-items:center;">{{this.popInfo}}</span>
            </div>
        </div>

        <!-- 提示说明 -->
        <div class="tip" id="tip" @click="closeTip()">
            <div id="tipInfo" class="tip-info">
                <span style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
                    <div class="title" style="display:flex;justify-content:center;">
                        <span>规则明细</span>
                    </div>
                    <br>
                    <div class="tipContent">
                        每个窗口的命中概率相同,在启动前有64%的概率触发【特殊机制】,结算奖励时,以向下取整方式进行计算
                    </div>
                    <div class="tipContent">
                        <img src="../assets/fruitMachine/fm-8.jpg" style="width: 52px;height: 52px;border-radius: 12px;">*50
                        <img src="../assets/fruitMachine/fm-9.jpg" style="width: 52px;height: 52px;border-radius: 12px;">*20
                        <img src="../assets/fruitMachine/fm-2.png" style="width: 52px;height: 52px;border-radius: 12px;">*20
                        <img src="../assets/fruitMachine/fm-6.png" style="width: 52px;height: 52px;border-radius: 12px;">*10
                        <img src="../assets/fruitMachine/fm-5.png" style="width: 52px;height: 52px;border-radius: 12px;">*10
                        <img src="../assets/fruitMachine/fm-12.jpg" style="width: 52px;height: 52px;border-radius: 12px;">*10
                        <img src="../assets/fruitMachine/fm-16.jpg" style="width: 52px;height: 52px;border-radius: 12px;">*10
                        <img src="../assets/fruitMachine/fm-11.jpg" style="width: 52px;height: 52px;border-radius: 12px;">*5
                   </div>
                    <div class="tipContent">
                        <img src="../assets/fruitMachine/fm-8-1.jpeg" style="width: 52px;height: 52px;border-radius: 12px;">*25
                        <img src="../assets/fruitMachine/fm-9-1.gif" style="width: 52px;height: 52px;border-radius: 12px;">*2&nbsp;&emsp14;
                        <img src="../assets/fruitMachine/fm-2-1.png" style="width: 52px;height: 52px;border-radius: 12px;">*2&nbsp;&emsp14;
                        <img src="../assets/fruitMachine/fm-6-2.png" style="width: 52px;height: 52px;border-radius: 12px;">*2&nbsp;&emsp14;
                        <img src="../assets/fruitMachine/fm-5-1.png" style="width: 52px;height: 52px;border-radius: 12px;">*2&nbsp;&emsp14;
                        <img src="../assets/fruitMachine/fm-12-2.jpg" style="width: 52px;height: 52px;border-radius: 12px;">*2&nbsp;&emsp14;
                        <img src="../assets/fruitMachine/fm-16-1.png" style="width: 52px;height: 52px;border-radius: 12px;">*2&nbsp;&emsp14;
                        <img src="../assets/fruitMachine/fm-11-2.png" style="width: 52px;height: 52px;border-radius: 12px;">*2
                    </div>
                    <br>
                    <div class="tipContent">
                        【特殊机制】包含10个效果,在触发特殊机制后将随机激活其中一个效果(每个效果被激活的概率相同)
                    </div>
                    <div class="tipContent">
                        <img src="../assets/fruitMachine/fm-magic-1.gif" style="width: 64px;height: 26px;border-radius: 12px;">&nbsp;如果没有押注【珊瑚宫♥海】,此轮获得的奖励减半&nbsp;&nbsp;&nbsp;
                        <img src="../assets/fruitMachine/fm-magic-2.gif" style="width: 64px;height: 26px;border-radius: 12px;">&nbsp;将所有押注重新平均(向下取整)分配至随机3个角色上
                    </div>
                    <div class="tipContent">
                        <img src="../assets/fruitMachine/fm-magic-3.gif" style="width: 64px;height: 26px;border-radius: 12px;">&nbsp;吞掉所有押注,终止此轮&nbsp;&nbsp;&nbsp;
                        <img src="../assets/fruitMachine/fm-magic-4.gif" style="width: 64px;height: 26px;border-radius: 12px;">&nbsp;如果压中,则在计算时注数替换成所有注数中最小注数进行计算&nbsp;&nbsp;&nbsp;
                        <img src="../assets/fruitMachine/fm-magic-5.gif" style="width: 64px;height: 26px;border-radius: 12px;">&nbsp;此轮不消耗押注
                    </div>
                    <div class="tipContent">
                        <img src="../assets/fruitMachine/fm-magic-6.gif" style="width: 64px;height: 26px;border-radius: 12px;">&nbsp;如果有押注【珊瑚宫♥海】并压中,此轮获得的奖励翻倍&nbsp;&nbsp;&nbsp;
                        <img src="../assets/fruitMachine/fm-magic-7.gif" style="width: 64px;height: 26px;border-radius: 12px;">&nbsp;单个押注大于30的在扣除后置0
                    </div>
                    <div class="tipContent">
                        <img src="../assets/fruitMachine/fm-magic-8.gif" style="width: 64px;height: 26px;border-radius: 12px;">&nbsp;本轮额外命中2个窗口&nbsp;&nbsp;&nbsp;
                        <img src="../assets/fruitMachine/fm-magic-9.gif" style="width: 64px;height: 26px;border-radius: 12px;">&nbsp;奖励增加50%&nbsp;&nbsp;&nbsp;
                        <img src="../assets/fruitMachine/fm-magic-10.gif" style="width: 64px;height: 26px;border-radius: 12px;">&nbsp;押注角色总数大于5时,结算后将额外扣除1600原石代币
                    </div>
                    <br>
                    <div class="tipContent">
                        未注登录状态下系统默认提供20原石代币,新注册用户将赠送3200原石代币,每天系统将自动赠送60原石代币,当原石代币总数大于8000时当日系统将不予赠送
                    </div>
                    <br>
                    <div class="tipContent">
                        点击&nbsp;<img src="../assets/fruitMachine/fm-8.jpg" style="width: 52px;height: 52px;border-radius: 12px;">&nbsp;可播放/暂停背景音乐,pc端体验最佳
                    </div>

                </span>
            </div>
        </div>

        <!-- 通用消息弹窗,无 TOP 无法调用 Top 弹窗 -->
        <!-- Modal(1055) 比 Toast(默认) 的 z-index 值更高 -->
        <div class="position-fixed top-0 start-50 translate-middle-x p-3" style="z-index: 1100">
            <div id="commonToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="1000">
                <div class="toast-header">
                    <strong class="me-auto">提示</strong>
                    <small>现在</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    <div :class="commonResponse.success ? 'alert-success alert d-flex align-items-center' : 'alert-danger alert d-flex align-items-center'" role="alert">
                        <font-awesome-icon icon="fa-regular fa-circle-check" v-if="commonResponse.success" size="1x" beat />
                        <font-awesome-icon icon="fa-regular fa-circle-xmark" v-if="!commonResponse.success" size="1x" beat />
                        <div>
                            &ensp;{{ commonResponse.msg }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { Toast } from 'bootstrap';
import { getCoin,generate } from "@/api/user";
import Top from "@/components/Top.vue";
import { saveVisitLog } from "../api/welcome";
export default {
    name: "fruitMachine",
    components: {
        Top,
    },
    data() {
        return {
            commonResponse: { // 通用 Modal 弹窗数据
                success: true,
                msg: '',
            },
            timer:null,
            currentId: 0,
            interval: 1000,
            currentColor: "rgba(255, 60, 60, 1)",
            otherColor: "rgba(0, 0, 0, 0)",
            running: false,
            step: 0,  // 步数
            
            myCoin:20,
            bet: [0,0,0,0,0,0,0,0],  // 押注
            magn: [10,10,25,50,5,2,10,   10,2,5,2,   10,10,2,20,5,2,10,   20,2,5,2],  // 倍率
            role: [6,4,0,0,7,7,5,   3,3,7,6,   6,4,1,1,7,5,5,   2,2,7,4],  // 对应角色
            markClass:"magic-body-1",
            elementalBurst:[
                "如果没有押注【珊瑚宫♥海】,此轮获得的奖励减半",
                "将所有押注重新平均(向下取整)分配至随机3个角色上",
                "吞掉所有押注,终止此轮",
                "如果压中,则在计算时注数替换成所有注数中最小注数进行计算",
                "此轮不消耗押注",
                "如果有押注【珊瑚宫♥海】并压中,此轮获得的奖励翻倍",
                "单个押注大于30的在扣除后置0",
                "本轮额外命中2个窗口",
                "奖励增加50%",
                "押注角色总数大于5时,结算后将额外扣除1600原石"
            ],
            popInfo: "",
            songName: 'fm-2-1.mp3',
            roleAudios: new Array(),  // 存储所有角色语音
            startAudios: new Array(),  // 存储所有启动语音
            roleSoundSrc: null,
            startSoundSrc: null,
            fate: {
                accident:false,  // 是否触发特殊机制
                magic: 0,  // 触发特殊机制的哪一项
                firing: false,  // 是否允许启动
                info: "",  // 提示信息
                randomStep: 0,  // 随机步数,当 step 等于 random 时将触发 stop
                extra:null,  // 额外命中的窗口
                settleAccounts: 0,  // 本轮收益
            },
            disClick: false,
            zoomVal:0,  // 当前页面缩放比
        }
    },
    created() {
        var zoomLevel = window.devicePixelRatio;  
        console.log("系统缩放级别: " + zoomLevel);
        if (zoomLevel==1) {
        this.zoomVal = 1.25;
        }

        this.refreshCoin();
    },

    mounted() {

        saveVisitLog(Object.assign({key:22}));
        // document.getElementById("main").className = "fm-bg h-100 fm-bg-"+Math.floor(Math.random()*10+1);

        var i=Math.floor(Math.random()*10+1);
        if(i!=1){
            var c="fm-bg-"+i;
            document.getElementById("main").classList.remove("fm-bg-1");
            document.getElementById("main").classList.add(c);
        }

        // document.getElementById("bgm").play();
        // console.log(document.getElementById("bgm").paused ? "no" : "yes");
        // var bs = document.getElementById("bgm");  // 资源加载成功后再执行播放事件
        // bs.oncanplay = function () {
        //     bs.play();
        // }

        document.getElementById("cellCoinSound").volume = 0.5;
        
        // console.log("volume:"+document.getElementById("bgm").volume);

        for (var i = 0; i < 24; i++){
            this.startAudios[i] = require("../assets/fruitMachine/fm-s-" + i + ".mp3");
        }

        for (var i = 0; i < 8; i++){
            this.roleAudios[i] = new Array();
            for (var j = 0; j < 3; j++){
                this.roleAudios[i][j] = require("../assets/fruitMachine/fm-" + i + "-" + j + ".mp3");
            }
        }

        // document.getElementById("bgm").addEventListener('loadeddata', this.playBGM());
        document.getElementById("bgm").addEventListener('loadeddata', function () {
            document.getElementById("bgm").volume = 0.3;
        });
        
    },
    computed: {
        // roleSoundSrc() {
        //     // return require('../assets/fm-4-1.mp3');
        //     return require('../assets/'+this.songName);
        // }

        
    },
    methods: {
        showToast(response) { // 通用信息展示
            if (response.data.code == 0) {
                this.commonResponse.success = false;
            } else {
                this.commonResponse.success = true;
            }
            this.commonResponse.msg = response.data.msg;
            var toastLive = document.getElementById('commonToast');
            var toast = new Toast(toastLive);
            toast.show();
        },
        // playBGM() {
        //     document.getElementById("bgm").volume = 0.3;
        //     console.log("加载完成");
        //     if (document.getElementById("bgm").paused) {
        //         console.log("play");
        //         document.getElementById("bgm").currentTime=0;
        //         document.getElementById("bgm").play();
        //     }
        // },
        startBtn() {
            if (this.running || this.disClick) {  // 正在运行中
                return;
            }
            if (!this.check(0)) {  // 押注透支
                return;
            }

            this.generate();
        },
        startBtnFollowUp(){  // startBtn 后续操作
            if (!this.fate.firing) {  // 是否允许启动
                return;
            }


            this.disClick = true;

            // document.getElementById("bgm").pause();


            console.log("启动");

            // 播放启动语音
            this.startSoundSrc = this.startAudios[Math.floor(Math.random() * 24)];
            var sa =document.getElementById("startSound");  // 资源加载成功后再执行播放事件
            sa.oncanplay = function () {
                sa.play();
            }

            // 待扣除押注总额
            var coin=0;
            for(var i=0;i<this.bet.length;i++){
                coin+=this.bet[i];
            }

            /**
             * 与 fm-magic-x.gif 对应
             * 1.如果没有押注13,14,此轮获得的奖励减半
             * 2.将所有押注平摊到随机3个角色上,向下取整
             * 3.吞掉所有押注,终止此轮
             * 4.如果压中,则在计算时注数替换成所有注数中最小注数进行计算
             * 5.此轮不消耗押注
             * 6.如果有押注13,14并压中,此轮获得的奖励翻倍
             * 7.单个押注大于30的在扣除后置0
             * 8.本轮额外命中2个窗口
             * 9.奖励增加50%
             * 10.押注角色总数大于3时,结算后将额外扣除1600原石代币
             */
            if(this.fate.accident){  // 0.64的概率触发特殊机制
                // this.magic=Math.floor(Math.random() * 10)+1;

                console.log("magic:"+this.fate.magic);

                this.popInfo = this.elementalBurst[this.fate.magic - 1];
                console.log("popInfo:"+this.popInfo);

                if(this.fate.magic!=1){
                    this.newClass="magic-body-"+this.fate.magic;
                    document.getElementById("popGif").classList.remove(this.markClass);
                    document.getElementById("popGif").classList.add(this.newClass);
                    this.markClass=this.newClass;
                }

                document.getElementById("pop").style.display="flex";
                setTimeout(()=>{
                    document.getElementById("pop").style.display="none";
                },2000);

                if(this.fate.magic==2){
                    var t=0;
                    for(var i=0;i<this.bet.length;i++){
                        t+=this.bet[i];
                        this.bet[i]=0;
                    }
                    for(var i=0;i<3;){
                        var j=Math.floor(Math.random()*8)+1;
                        if(this.bet[j]==0){
                            this.bet[j]=Math.floor(t/3);
                            i++;
                        }
                    }
                    console.log("---押注重新随机分配3份!---");
                }
                else if(this.fate.magic==7){
                    for(var i=0;i<this.bet.length;i++){
                        if(this.bet[i]>30){
                            this.bet[i]=0;
                        }
                    }
                    console.log("---单个押注大于30置0!---");
                }
                // else if(this.fate.magic==8){
                //     console.log("---吞掉单个最大押注直至小于等于30!---");
                //     var t=0;
                //     for(var i=0;i<this.bet.length;i++){
                //         t+=this.bet[i];
                //     }
                //     while(t>30){
                //         var max=0;
                //         for(var i=1;i<this.bet.length;i++){
                //             if(this.bet[i]>=this.bet[max]){
                //                 max=i;
                //                 console.log("max:"+max);
                //             }
                //         }
                //         t-=this.bet[max];
                //         this.bet[max]=0;
                //     }
                // }
            }

            if(!this.fate.accident||this.fate.magic!=5){  // 没有触发特殊机制 或 没有因特殊机制减免押注
                // 扣除押注
                console.log("coin:"+coin);
                this.myCoin -= coin;
            }
            else{
                console.log("---免押注!---");
            }

            if(this.fate.magic==3){
                console.log("---吞押注并终止!---");
                return;
            }

            this.running = true;
            this.step = 0;
            this.start();
        },
        start() {
            this.timer = setInterval(() => {
                this.run();
            },this.interval);
        },
        stop() {
            this.running = false;
        },
        run() {
            var reward = false;  // 是否进行奖励结算

            if (this.step==this.fate.randomStep) {
                this.running = false;
            }

            if (this.running) {  // 运行中
                if (this.interval > 100) {
                    clearInterval(this.timer);
                    this.interval -= 330;
                    // console.log("interval(R):"+this.interval);
                    this.start();
                }
            }
            else {  // 关闭
                clearInterval(this.timer);
                if (this.interval < 1000) {
                    this.interval += 330;
                    // console.log("interval(S):"+this.interval);
                    this.start();
                }
                else{
                    reward=true;
                }
            }
            // console.log("interval:"+this.interval+",running:"+this.running);

            document.getElementById(this.currentId).style.borderColor = this.otherColor;
            if (this.currentId==21) {
                this.currentId = 0;
            }
            else {
                this.currentId++;
            }
            document.getElementById(this.currentId).style.borderColor = this.currentColor;
            this.step++;

            document.getElementById("cellCoinSound").currentTime=0;
            document.getElementById("cellCoinSound").play();

            // 奖励
            if (reward) {

                this.playRoleSound(this.currentId);

                if (this.fate.magic == 8) {
                    for (let i = 1; i < 3; i++){
                        let s = this.fate.extra[i];
                        setTimeout(() => {
                            this.extra(s);
                        }, i * 4000);
                    }
                }

                console.log("奖励:"+this.fate.settleAccounts);
                if (this.fate.magic==8) {  // 等所有命中显示再更改代币数值
                    setTimeout(() => {
                        this.myCoin = this.myCoin + Math.floor(this.fate.settleAccounts);
                    }, 8000);
                    setTimeout(() => {
                        console.log("open");
                        this.disClick = false;
                    }, 10000);
                }
                else {
                    this.myCoin = this.myCoin + Math.floor(this.fate.settleAccounts);
                    this.disClick = false;
                }
                
            }
        },
        coining(i){
            this.bet[i]++;
            this.myCoin--;
        },
        addCoining(i) {
            if(!this.disClick&&this.bet[i]<100&&this.check(1)){
                this.bet[i]++;
                document.getElementById("addCoinSound").currentTime=0;
                document.getElementById("addCoinSound").play();
            }
        },
        addTenCoining(i){
            if(!this.disClick&&this.bet[i]<91&&this.check(10)){
                this.bet[i] += 10;
                document.getElementById("addCoinSound").currentTime=0;
                document.getElementById("addCoinSound").play();
            }
        },
        check(c) {
            for (var i = 0; i < this.bet.length;i++){
                c += this.bet[i];
            }
            if (c<=0) {
                this.commonTip(0, "押注不可以为空!╰（‵□′）╯");
                return false;
            }
            this.refreshCoin();
            if (this.myCoin - c < 0) {
                this.commonTip(0,"你的代币不够了!~~>_<~~");
                return false;
            }
            else {
                return true;
            }
        },
        subCoining(i){
            if(!this.disClick&&this.bet[i]>0){
                this.bet[i]--;
                document.getElementById("subCoinSound").currentTime=0;
                document.getElementById("subCoinSound").play();
            }
        },
        subTenCoining(i){
            if(!this.disClick&&this.bet[i]>9){
                this.bet[i] -= 10;
                document.getElementById("subCoinSound").currentTime=0;
                document.getElementById("subCoinSound").play();
            }
        },
        // testDemo(){
        //     document.getElementById("pop").style.display="flex";
        // },
        // closeDemo(){
        //     document.getElementById("pop").style.display="none";
        // },
        showTip() {
            document.getElementById("tip").style.display="flex";
        },
        closeTip() {
            document.getElementById("tip").style.display="none";
        },
        refreshCoin(){  // 刷新代币信息
            if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
                getCoin().then( // 头部已携带
                    response => {
                        // if (response.data.code == 0) {
                        //     localStorage.clear();
                        //     this.commonResponse.success = false;
                        //     this.commonResponse.msg = response.data.msg;
                        //     this.showToast(this.commonResponse);
                        // }
                        this.myCoin = response.data.data;
                    }
                )
            }
            else {
                console.log("未登录状态...");
            }
        },
        settlementCoin(v) {  // 结算代币
            this.settlementCoin(v).then(
                response => {
                    
                }
            )
        },
        commonTip(code,msg) {
            var response = {
                data: {
                    code: code,
                    msg: msg,
                },
            }
            this.showToast(response);
        },
        generate() {  // 后台生成结果
            var data = new FormData();
            data.append('currentStep', this.currentId);
            data.append('bet',this.bet);
            generate(
                data
            ).then(
                response => {
                    this.fate = response.data.data;
                    if (response.data.code == 0) {  // 返回失败标记,被吞(禁止运行)或未登录
                        if (this.fate.firing) {  // 未被禁止启动
                            this.localgenerate();  // 调用前端的生成方法
                            this.startBtnFollowUp();
                            // return;
                        }
                        else {  // 禁止启动,代币不够
                            this.commonResponse.code = 0;
                            this.commonResponse.success = false;
                            this.commonResponse.msg = this.fate.info;
                            this.showToast(this.commonResponse);
                        }
                    }
                    else {
                        console.log("由后台决定");
                        this.startBtnFollowUp();
                        // this.start();
                    }
                }
            ).catch(error => {  // 请求失败
                console.log(error);
                this.localgenerate();  // 调用前端的生成方法
                this.startBtnFollowUp();
            });
        },
        localgenerate() {  // 前台生成结果
            this.fate.accident = Math.random() < 0.64;  // 是否触发特殊机制
            // this.fate.accident = true;  // 是否触发特殊机制
            this.fate.magic = Math.floor(Math.random() * 10) + 1;  // 触发特殊机制的哪一项
            // this.fate.magic = 8;  // 触发特殊机制的哪一项
            this.fate.firing = this.fate.magic != 3;  // 不允许启动

            this.fate.randomStep = 22 * 6 + Math.floor(Math.random() * 22);  // 要走多少步
            var lastStep=((this.currentId+this.fate.randomStep)%22+4)%22;  // 计算获取最终位置

            console.log("randomStep:"+this.fate.randomStep+",lastStep:"+lastStep);


            // 提前计算好本轮收益,在完全停止转动时结算
            if(this.fate.magic==4){
                var mix=100;
                for(var i=0;i<this.bet.length;i++){
                    if(this.bet[i]<mix&&this.bet[i]!=0){
                        mix=this.bet[i];
                    }
                }
                this.fate.settleAccounts=mix*this.magn[lastStep];
                console.log("---注数最小!---");
            }
            else{
                this.fate.settleAccounts=this.bet[this.role[lastStep]]*this.magn[lastStep];  // 注数*倍率
            }
            if(this.fate.magic==1&&this.bet[1]==0){
                this.fate.settleAccounts/=2;
                console.log("---奖励减半!---");
            }
            else if(this.fate.magic==6&&this.role[lastStep]==1){
                this.fate.settleAccounts*=2;
                console.log("---奖励翻倍!---");
            }
            else if (this.fate.magic == 8) {
                this.fate.extra = new Array();
                this.fate.extra[0] = lastStep;
                for (var i = 0; i < 2;){
                    var es = (Math.floor(Math.random() * 20 + 1)+lastStep)%22;
                    console.log("es:"+es);
                    // if (i == 0) {
                    //     var es = (lastStep + e) % 22;
                    //     this.fate.extra[i + 1] = es;
                    //     console.log(">>>"+es);
                    //     this.fate.settleAccounts+=this.bet[this.role[es]]*this.magn[es];
                    //     i++;
                    // }
                    // else {
                        if (!this.fate.extra.includes(es)) {
                            // var es = (lastStep + e) % 22;
                            console.log(">>>"+es);
                            this.fate.extra[i + 1] = es;
                            this.fate.settleAccounts+=this.bet[this.role[es]]*this.magn[es];
                            i++;
                        }
                    // }
                }
                console.log("---额外激活2个窗口!---");
                // for (var i = 0; i < 3; i++){
                //     console.log("ex:"+this.fate.extra[i]);
                // }
            }
            else if(this.fate.magic==9){
                this.fate.settleAccounts*=1.5;
                console.log("---奖励变为1.5倍!---");
            }
            else if (this.fate.magic == 10) {
                var n = 0;
                for (var i = 0; i < this.bet.length;i++){
                    if (this.bet[i]>0) {
                        n++;
                    }
                }
                if (n > 5) {
                    this.fate.settleAccounts-=1600;
                    console.log("---扣除1600!---");
                }
            }
        },
        extra(s) {
            console.log("???"+s);
            document.getElementById(s).style.borderColor = this.currentColor;
            this.playRoleSound(s);

        },
        playRoleSound(step) {
            // 触发音效
            var v1 =this.role[step];
            var v2 = Math.floor(Math.random() * 3);
            // console.log(">>>"+v1+","+v2);
            this.roleSoundSrc = this.roleAudios[v1][v2];
            var ae = document.getElementById("roleSound");  // 资源加载成功后再执行播放事件
            // ae.pause();
            ae.onloadeddata = function () {
                ae.play();
            }
            // ae.oncanplay = function () {
            //     ae.play();
            // }
        },
        bgmBtn() {
            if (document.getElementById("bgm").paused) {
                document.getElementById("bgm").play();
                console.log("T");
            }
            else{
                document.getElementById("bgm").pause();
                console.log("F");
            }
        },
    },
};
</script>
<style>
.fm-bg-1 {
  background:url("../assets/fruitMachine/fm-bg-1.png")  ;
  background-size:cover;  /** 与上配置分开会失效 */
}
.fm-bg-2 {
  background:url("../assets/fruitMachine/fm-bg-2.png")  ;
  background-size:cover;
}
.fm-bg-3 {
  background:url("../assets/fruitMachine/fm-bg-3.png")  ;
  background-size:cover;
}
.fm-bg-4 {
  background:url("../assets/fruitMachine/fm-bg-4.png")  ;
  background-size:cover;
}
.fm-bg-5 {
  background:url("../assets/fruitMachine/fm-bg-5.png")  ;
  background-size:cover;
}
.fm-bg-6 {
  background:url("../assets/fruitMachine/fm-bg-6.png")  ;
  background-size:cover;
}
.fm-bg-7 {
  background:url("../assets/fruitMachine/fm-bg-7.png")  ;
  background-size:cover;
}
.fm-bg-8 {
  background:url("../assets/fruitMachine/fm-bg-8.jpg")  ;
}
.fm-bg-9 {
  background:url("../assets/fruitMachine/fm-bg-9.png")  ;
  background-size:cover;
}
.fm-bg-10 {
  background:url("../assets/fruitMachine/fm-bg-10.png")  ;
  background-size:cover;
}
.fm-node{
    width: 80px;
    height: 80px;
    margin: 2px;
    border-radius: 12px;
    border-color: rgba(255, 129, 129,0);
    border-width: 2px;
    border-style: solid;
}
.fm-tbg-1 {
    width: 50px;
    height: 52px;
    margin: 2px 17px 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#333333;
    font-weight:bold;
    font-size:25px;
    background:url("../assets/fruitMachine/fm-tbg-1.png")  ;
    background-size:cover;
}
.fm-tbg-2 {
  background:url("../assets/fruitMachine/fm-tbg-2.png")  ;
}
.fm-tbg-3 {
  background:url("../assets/fruitMachine/fm-tbg-3.png")  ;
}
.fm-tbg-4 {
  background:url("../assets/fruitMachine/fm-tbg-4.png")  ;
}
.fm-tbg-5 {
  background:url("../assets/fruitMachine/fm-tbg-5.png")  ;
}
.fm-tbg-6 {
  background:url("../assets/fruitMachine/fm-tbg-6.png")  ;
}
.fm-tbg-7 {
  background:url("../assets/fruitMachine/fm-tbg-7.png")  ;
}
.fm-tbg-8 {
  background:url("../assets/fruitMachine/fm-tbg-8.png")  ;
}
.fm-tbg{
    width: 80px;
    height: 52px;
    margin: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#333333;
    background-size:cover;
    font-weight:bold;
    font-size:25px;
}
.fm-coin{
    background:url("../assets/fruitMachine/fm-coin.png");
    width: 308px;
    height: 80px;
    margin: 2px;
    display: flex;
    justify-content: right;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 0px;
    padding-right: 20px;
    padding-left: 0px;
    color:#ffd700;
    background-size:cover;
    font-weight:bold;
    font-size:25px;
}
/* 遮罩层 */
.fm-alert{
    display:none;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    position:fixed;
    top:0;
    left:0;
}
.close{
    width:40px;
    height:40px;
    line-height:40px;
    position:absolute;
    top:30px;
    right:30px;
    cursor:pointer;
}
.close:hover{
    color:red;
}
.alert-body{
    width:600px;
    background-color:#fff;
    border-radius:10px;
    font-size:30px;
    color:#000;
    text-align:center;
    animation:moveFromBottom 0.3s linear;
}
.alert-title{
    line-height:100px;
    border-bottom:2px solid #eee;
    font-size:40px;
    position:relative;
}
.alert-content{
    display:flex;
    justify-content:center;
    align-items:center;
    height:200px;
    color:#999;
}
/* 遮罩层 */
.magic{
    display:none;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    position:fixed;
    top:0;
    left:0;
}
.tip{
    display:none;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.86);
    position:fixed;
    top:0;
    left:0;
}
.magic-body{
    width: 512px;
    height: 206px;
    border-radius:10px;
    animation:moveMagicBottomByRight 0.3s linear;
}
.magic-info{
    width: 560px;
    height: 94px;
    color:#fffafa;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
    font-size:18px;
    animation:moveMagicBottomByLeft 0.3s linear;
    background:url("../assets/fruitMachine/fm-frame-2.png");
    background-size:cover;
}
.tip-info{
    width: 1096px;
    height: 676px;
    color:#fffafa;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
    font-size:18px;
    animation:moveTipBottomByTop 0.3s linear;
    background:url("../assets/fruitMachine/fm-frame-5.png");
    background-size:cover;
}
.magic-body-1{
    background:url("../assets/fruitMachine/fm-magic-1.gif");
    background-size:cover;
}
.magic-body-2{
    background:url("../assets/fruitMachine/fm-magic-2.gif");
    background-size:cover;
}
.magic-body-3{
    background:url("../assets/fruitMachine/fm-magic-3.gif");
    background-size:cover;
}
.magic-body-4{
    background:url("../assets/fruitMachine/fm-magic-4.gif");
    background-size:cover;
}
.magic-body-5{
    background:url("../assets/fruitMachine/fm-magic-5.gif");
    background-size:cover;
}
.magic-body-6{
    background:url("../assets/fruitMachine/fm-magic-6.gif");
    background-size:cover;
}
.magic-body-7{
    background:url("../assets/fruitMachine/fm-magic-7.gif");
    background-size:cover;
}
.magic-body-8{
    background:url("../assets/fruitMachine/fm-magic-8.gif");
    background-size:cover;
}
.magic-body-9{
    background:url("../assets/fruitMachine/fm-magic-9.gif");
    background-size:cover;
}
.magic-body-10{
    background:url("../assets/fruitMachine/fm-magic-10.gif");
    background-size:cover;
}
.title{
    width: 230px;
    height: 45px;
    color:#fffafa;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
    font-size:24px;
    background:url("../assets/fruitMachine/fm-frame-1.png");
    background-size:cover;
}
.tipContent{
    width: 1000px;
    font-weight:bold;
    font-size:16px;
    margin: 2px;
}
@keyframes moveFromBottom{
    0%{
        margin-right:-600px;
    }
    40%{
        margin-right:-200px;
    }
    60%{
        margin-right:-50px;
    }
    100%{
        margin-right:0;
    }
}
@keyframes moveMagicBottomByRight{
    0%{
        margin-right:-512px;
    }
    40%{
        margin-right:-200px;
    }
    60%{
        margin-right:-50px;
    }
    100%{
        margin-right:0;
    }
}
@keyframes moveMagicBottomByLeft{
    0%{
        margin-right:512px;
    }
    40%{
        margin-right:200px;
    }
    60%{
        margin-right:50px;
    }
    100%{
        margin-right:0;
    }
}
@keyframes moveTipBottomByTop{
    0%{
        margin-top:-512px;
    }
    40%{
        margin-top:-200px;
    }
    60%{
        margin-top:-50px;
    }
    100%{
        margin-top:0;
    }
}

</style>