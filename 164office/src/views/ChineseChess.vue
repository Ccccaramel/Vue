<template>
    <div id="main" class="h-100" :style="'zoom:'+ zoomVal">

        <!-- 背景音乐 -->
        <!-- <audio id="bgm" preload="auto" loop controls style="display:none;">
            <source src="../assets/fm-bgm.mp3" type="audio/mpeg">
        </audio> -->
        <!-- 对手加入房间 -->
        <audio id="joinSound" controls style="display:none">
            <source src="../assets/chineseChess/join.mp3" type="audio/mpeg">
        </audio>
        <!-- 离开房间 -->
        <audio id="leaveSound" controls style="display:none">
            <source src="../assets/chineseChess/leave.mp3" type="audio/mpeg">
        </audio>
        <!-- 开始对战 -->
        <audio id="startSound" controls style="display:none">
            <source src="../assets/chineseChess/start.mp3" type="audio/mpeg">
        </audio>
        <!-- 棋子移动至空处 -->
        <audio id="downSound" controls style="display:none">
            <source src="../assets/chineseChess/down.mp3" type="audio/mpeg">
        </audio>
        <!-- 吃掉对方棋子 -->
        <audio id="killSound" controls style="display:none">
            <source src="../assets/chineseChess/kill.mp3" type="audio/mpeg">
        </audio>
        <!-- 胜利音效 -->
        <audio id="winSound" controls style="display:none">
            <source src="../assets/chineseChess/win.mp3" type="audio/mpeg">
        </audio>
        <!-- 战败音效 -->
        <audio id="defeatSound" controls style="display:none">
            <source src="../assets/chineseChess/defeat.mp3" type="audio/mpeg">
        </audio>

        <!-- 贴图资源-->
        <img id="tableImg" src="../assets/chineseChess/table.png" class="rounded-2" hidden/>  <!-- 棋盘 -->
        <img id="chess-base" src="../assets/chineseChess/chess-base.png" class="rounded-2" hidden/>  <!-- 棋子基座 -->
        <img id="p-s" src="../assets/chineseChess/p-s.png" class="rounded-2" hidden/>  <!-- 选中标记 -->
        <img id="disable" src="../assets/chineseChess/disable.png" class="rounded-2" hidden/>  <!-- 禁用标记 -->
        <img id="p-b-0" src="../assets/chineseChess/p-b-0.png" class="rounded-2" hidden/>  <!-- 选中灰阶标记 -->
        <img id="p-b-1" src="../assets/chineseChess/p-b-1.png" class="rounded-2" hidden/>
        <img id="p-b-2" src="../assets/chineseChess/p-b-2.png" class="rounded-2" hidden/>
        <img id="p-b-3" src="../assets/chineseChess/p-b-3.png" class="rounded-2" hidden/>
        <img id="p-b-4" src="../assets/chineseChess/p-b-4.png" class="rounded-2" hidden/>
        <img id="p-b-5" src="../assets/chineseChess/p-b-5.png" class="rounded-2" hidden/>
        <img id="p-b-6" src="../assets/chineseChess/p-b-6.png" class="rounded-2" hidden/>
        <img id="p-b-7" src="../assets/chineseChess/p-b-7.png" class="rounded-2" hidden/>
        <img id="p-r-0" src="../assets/chineseChess/p-r-0.png" class="rounded-2" hidden/>  <!-- 选中高亮标记 -->
        <img id="p-r-1" src="../assets/chineseChess/p-r-1.png" class="rounded-2" hidden/>
        <img id="p-r-2" src="../assets/chineseChess/p-r-2.png" class="rounded-2" hidden/>
        <img id="p-r-3" src="../assets/chineseChess/p-r-3.png" class="rounded-2" hidden/>
        <img id="p-r-4" src="../assets/chineseChess/p-r-4.png" class="rounded-2" hidden/>
        <img id="p-r-5" src="../assets/chineseChess/p-r-5.png" class="rounded-2" hidden/>
        <img id="p-r-6" src="../assets/chineseChess/p-r-6.png" class="rounded-2" hidden/>
        <img id="p-r-7" src="../assets/chineseChess/p-r-7.png" class="rounded-2" hidden/>


        <div class="alert alert-info text-center" v-if="roomName!=null" role="alert">
            <strong>{{ roomName }}</strong>
        </div>
        <br v-if="roomName==null">

        <div class="container text-center">
            <div class="row align-items-center">
                <div class="col">

                    <!-- 左侧双方基础信息列 -->
                    <div class="container text-center">
                        <div class="row justify-content-center">
                            <div class="col">
                                <div class="alert alert-warning" v-if="!wsStatus" role="alert">
                                    请先登录!
                                </div>
                                <div class="alert alert-warning" v-if="wsStatus&&status==0" role="alert">
                                    请创建或加入房间!
                                </div>
                                <div class="alert alert-warning" v-if="status==1" role="alert">
                                    等待对手进入···
                                </div>
                                <div class="vstack text-center" v-if="status==2 || status==3">
                                    <img :src="rivalInfo.headPortrait.fileNameUrl" class="rounded-circle text-center mx-auto d-block" style="max-width: 3rem;"/>
                                    <span class="text-center" data-bs-toggle="popover" data-bs-trigger="hover focus"
                                        :data-bs-content="rivalInfo.name">
                                        {{rivalInfo.name}}
                                    </span>
                                    <span :class="'badge ding-bg-' + rivalInfo.grade + ' rounded-pill mx-auto text-center'" style="max-width: 3rem;">Lv{{ rivalInfo.grade }}</span>
                                    <span class="badge bg-primary mx-auto mt-1">胜率:{{rivalBattle.chanceOfWinning}}%</span>
                                    <span class="badge bg-success mx-auto mt-1">总场次:{{rivalBattle.totalGames}}</span>
                                    <span class="badge bg-danger mx-auto mt-1" 
                                        tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" :data-bs-content="rivalSkillInfo.details">
                                        {{rivalSkillInfo.name}}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- 分割线,回合信息以及倒计时 -->
                        <hr v-if="round!=0&&status==3">
                        <div v-if="round!=0&&status==3">第{{round}}回合</div>
                        <div v-if="round!=0&&status==3"><span v-if="isActor" class="badge rounded-pill text-bg-primary">你的回合</span><span v-if="!isActor" class="badge rounded-pill text-bg-primary">对方回合</span>&nbsp;<span class="badge rounded-pill text-bg-primary">{{countdown}}</span></div>
                        <!-- <div v-if="round!=0"><span class="badge text-bg-dark">46</span></div> -->
                        <hr>

                        <div class="row justify-content-center">
                            <div class="col">
                                <div class="alert alert-warning" v-if="!wsStatus" role="alert">
                                    请先登录!
                                </div>
                                <div class="alert alert-warning" v-if="wsStatus&&status==0" role="alert">
                                    请创建或加入房间!
                                </div>
                                <div class="vstack text-center" v-if="status!=0">
                                    <img :src="selfInfo.headPortrait.fileNameUrl" class="rounded-circle text-center mx-auto d-block" style="max-width: 3rem;"/>
                                    <span class="text-center" data-bs-toggle="popover" data-bs-trigger="hover focus"
                                        :data-bs-content="selfInfo.name">
                                        {{selfInfo.name}}
                                    </span>
                                    <span :class="'badge ding-bg-' + selfInfo.grade + ' rounded-pill mx-auto text-center'" style="max-width: 3rem;">Lv{{ selfInfo.grade }}</span>
                                    <span class="badge bg-primary mx-auto mt-1">胜率:{{selfBattle.chanceOfWinning}}%</span>
                                    <span class="badge bg-success mx-auto mt-1">总场次:{{selfBattle.totalGames}}</span>
                                    <span class="badge bg-danger mx-auto mt-1"
                                        tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" :data-bs-content="selfSkillInfo.details">
                                        {{selfSkillInfo.name}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 棋盘主体 -->
                <div class="col-auto" style="cursor: pointer;">
                    <!-- 4个画布叠加,分层依次绘画 -->
                    <div style="display: flex;justify-content: center;align-items: center;">
                            <canvas id="table" height="700" width="630" style="z-index: 10;"></canvas>  <!-- 棋盘 -->
                            <canvas id="chessBase" height="700" width="630" style="z-index: 50;position: absolute;"></canvas>  <!-- 基座 -->
                            <canvas id="chess" height="700" width="630" style="z-index: 100;position: absolute;"></canvas>  <!-- 棋子(文字) -->
                            <canvas id="tips" height="700" width="630" style="z-index: 150;position: absolute;"></canvas>  <!-- 选中或提示 -->
                    </div>
                </div>

                <!-- 功能按钮 -->
                <div class="col">
                    <div class="row justify-content-center" v-if="wsStatus&&status==0">
                        <div class="col-auto p-1">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createRoomModal">创建房间</button>
                        </div>
                        <div class="col-auto p-1">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#joinRoomModal" @click="getAllRoom()">加入房间</button>
                        </div>
                    </div>
                    <br v-if="status==2">
                    <div class="row justify-content-center" v-if="status==2">
                        <div class="col">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#readyModal" @click="ready()">准备</button>
                        </div>
                    </div>
                    <br v-if="status==3">
                    <div class="row justify-content-center" v-if="status==3">
                        <div class="col">
                            <button type="button" class="btn btn-primary" @click="submission()">投降</button>  <!-- 加入房间后随时都可以退出,若在对战时退出则需要弹出提示窗再次确认,并以投降状态结束本局 -->
                        </div>
                    </div>
                    <br v-if="status==3&&!isStalemate">
                    <div class="row justify-content-center" v-if="status==3&&!isStalemate">
                        <div class="col">
                            <button type="button" class="btn btn-primary" @click="stalemate()">和棋</button>  <!-- 加入房间后随时都可以退出,若在对战时退出则需要弹出提示窗再次确认,并以投降状态结束本局 -->
                        </div>
                    </div>
                    <br v-if="status==2||status==1">
                    <div class="row justify-content-center" v-if="status==2||status==1">
                        <div class="col">
                            <button type="button" class="btn btn-primary" @click="quit()">退出</button>  <!-- 加入房间后随时都可以退出,若在对战时退出则需要弹出提示窗再次确认,并以投降状态结束本局 -->
                        </div>
                    </div>
                    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#fingerGuessModal">选择数字</button> -->
                </div>
            </div>
        </div>

        <!-- 触发特殊技能 -->
        <div class="magic" id="pop">
            <div id="popGif" class="magic-body-1 magic-body">
            </div>
            <div id="popInfo" class="magic-info">
                <span style="display:flex;justify-content:center;align-items:center;">{{this.popInfo}}</span>
            </div>
        </div>

        <!-- 创建房间 -->
        <div class="modal fade" id="createRoomModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">创建房间</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-floating">
                        <input type="text" class="form-control" v-model="room.name">
                        <label for="floatingInput">房间名称</label>
                    </div>
                    <br>
                    <div class="form-floating">
                        <input type="text" class="form-control" v-model="room.password">
                        <label for="floatingPassword">暗号</label>
                    </div>
                    <br>
                    <div class="form-floating">
                        <input type="text" class="form-control" v-model="room.rival">
                        <label for="floatingPassword">指定对手ID</label>
                    </div>
                    <br>
                    <div class="form-floating">
                        <input type="text" class="form-control" v-model="room.note">
                        <label for="floatingPassword">房间备注信息</label>
                    </div>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="closeCreateRoomModal" data-bs-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="createRoom()">创建</button>
                </div>
                </div>
            </div>
        </div>

        <!-- 加入房间 -->
        <div class="modal fade" id="joinRoomModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">加入房间</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="container text-center" v-if="roomList.length==0">
                        <div class="row align-items-center">
                            <div class="col">
                            暂无房间 (￣▽￣)"
                            </div>
                        </div>
                    </div>

                    <div v-for="room,i in roomList" :key="room.id">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ room.name }}</h5>
                                        <p class="card-text">{{ room.note }}</p>
                                    </div>
                                </div>
                                <div class="col-auto" v-if="room.msg!=null&&room.status==1">
                                    <div class="alert alert-warning mb-0" role="alert">
                                        {{room.msg}}
                                    </div>
                                </div>
                                <div class="col-auto" v-if="room.needPassword&&room.status==1">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" v-model="chineseChessVo.password">
                                        <label for="floatingInput">暗号</label>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="btn btn-primary" v-if="room.status==1" @click="join(room.id)">加入</button>
                                    <button type="button" class="btn btn-success" v-if="room.status!=1">对战中</button>
                                </div>
                            </div>
                        </div>
                        <hr v-if="i<(roomList.length-1)">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeJoinRoomModal">关闭</button>
                </div>
                </div>
            </div>
        </div>


        <!-- 技能选择准备界面 -->
        <div class="modal fade" id="readyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">对战准备</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeReadyModal"></button>
                    </div>
                    <div class="modal-body">

                        <div class="container text-center">
                            <div class="row align-items-center">
                                <div class="col">
                                    <img :src="selfInfo.headPortrait.fileNameUrl" class="rounded-circle text-center mx-auto d-block" style="max-width: 3rem;"/>
                                    <br>
                                    <span class="text-center" data-bs-toggle="popover" data-bs-trigger="hover focus"
                                        :data-bs-content="selfInfo.name">
                                        {{selfInfo.name}}
                                    </span>
                                    <hr>
                                    <select class="form-select" aria-label="Default select example" v-model="selfSkill" :disabled="selfIsReady">
                                        <option :value="i" v-for="skill,i in skillList" :key="i">{{skill.name}}</option>
                                    </select>
                                    <br>
                                    <div :value="i" v-for="skill,i in skillList" :key="i">
                                        <div class="alert alert-success" role="alert" v-if="selfSkill==i" >
                                            {{skill.details}}
                                        </div>
                                    </div>
                                    <img v-if="!selfIsReady" src="../assets/chineseChess/loading.gif" class="rounded-circle text-center mx-auto d-block" style="max-width: 10rem;"/>
                                    <img v-if="selfIsReady" src="../assets/chineseChess/loaded.gif" class="rounded-circle text-center mx-auto d-block" style="max-width: 10rem;"/>
                                </div>
                                <div class="col-auto">
                                    <p class="fw-bolder">VS</p>
                                </div>
                                <div class="col">
                                    <img :src="rivalInfo.headPortrait.fileNameUrl" class="rounded-circle text-center mx-auto d-block" style="max-width: 3rem;"/>
                                    <br>
                                    <span class="text-center" data-bs-toggle="popover" data-bs-trigger="hover focus"
                                        :data-bs-content="rivalInfo.name">
                                        {{rivalInfo.name}}
                                    </span>
                                    <hr>
                                    <select class="form-select" aria-label="Default select example" v-model="rivalSkill" disabled>
                                        <option :value="i" v-for="skill,i in skillList" :key="i">{{skill.name}}</option>
                                    </select>
                                    <br>
                                    <div :value="i" v-for="skill,i in skillList" :key="i">
                                        <div class="alert alert-success" role="alert" v-if="rivalSkill==i" >
                                            {{skill.details}}
                                        </div>
                                    </div>
                                    <img v-if="!rivalIsReady" src="../assets/chineseChess/loading.gif" class="rounded-circle text-center mx-auto d-block" style="max-width: 10rem;"/>
                                    <img v-if="rivalIsReady" src="../assets/chineseChess/loaded.gif" class="rounded-circle text-center mx-auto d-block" style="max-width: 10rem;"/>
                                </div>
                            </div>
                        </div>

                        <div class="container text-center">
                            <div class="row justify-content-center">
                                <div class="col-auto">
                                    <div class="form-floating">
                                            <select class="form-select" id="floatingSelect" aria-label="Floating label select example" :disabled="selfIsReady" v-model="fingerGuessValue">
                                                <option value="0" selected>选择"正面"</option>
                                                <option value="1">选择"反面"</option>
                                            </select>
                                            <label for="floatingSelect">先后手判断</label>
                                        </div>
                                </div>
                            </div>
                        </div>

                        <br/>

                        <div class="container text-center">
                            <div class="row justify-content-center">
                                <div class="col">
                                    <div class="alert alert-warning" role="alert">
                                        🐾 双方在“正面”和“反面”中选择一个，若对手与房主选择的一样，则对手先手，反之，房主先手
                                        <br/>
                                        👻 双方各自回合限定60秒内需做出行动，否则自动判输
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-success" @click="preperation(true)" v-if="!selfIsReady">准备完毕</button>
                        <button type="button" class="btn btn-primary" @click="preperation(false)" v-if="selfIsReady">取消准备</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 猜拳 -->
        <!-- <div class="modal fade" id="fingerGuessModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">先后手决定判断</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeFingerGuessModal" hidden></button>
                    </div>
                    <div class="modal-body">
                        <div class="container text-center">
                            <div class="row align-items-center">
                                <div class="col" v-if="!fingerGuessSelected">
                                    <button type="button" class="btn btn-secondary" @click="fingerGuessSelect(0)">0</button>
                                </div>
                                <div class="col" v-if="!fingerGuessSelected">
                                    <button type="button" class="btn btn-dark" @click="fingerGuessSelect(1)">1</button>
                                </div>
                                <div class="col" v-if="fingerGuessSelected">
                                    <button type="button" class="btn btn-outline-success">你选择的数字: {{fingerGuessValue}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="alert alert-warning" role="alert">
                            🎉 由双方在“0”和“1”中选择一个数字，若对手与房主选择的一样，则对手先手，反之，房主先手
                            <br/>
                            🎯 选中后不可修改，超过10秒自动判定为后手，如果双方都未操作则房主先手
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

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
import { Toast,Popover } from 'bootstrap';
import Top from "@/components/Top.vue";
import { saveVisitLog } from "../api/welcome";
export default {
    name: "chineseChess",
    components: {
        Top,
    },
    data() {
        return {
            commonResponse: { // 通用 Modal 弹窗数据
                success: true,
                msg: '',
            },

            /**
             * 创建房间的玩家为红方,受邀玩家为黑方
             * 1-兵/卒, 2-炮/砲, 3-车, 4-马, 5-相/象, 6-士/仕, 7-帅/将
             * 镜像:x不变,y'=9-y
             **/
            bRest: [
                { piece:1, location: [{ x: 0, y: 3 }, { x: 2, y: 3 }, { x: 4, y: 3 }, { x: 6, y: 3 }, { x: 8, y: 3 }] },
                { piece:2, location: [{ x: 1, y: 2 }, { x: 7, y: 2 }] },
                { piece:3, location: [{ x: 0, y: 0 }, { x: 8, y: 0 }] },
                { piece:4, location: [{ x: 1, y: 0 }, { x: 7, y: 0 }] },
                { piece:5, location: [{ x: 2, y: 0 }, { x: 6, y: 0 }] },
                { piece:6, location: [{ x: 3, y: 0 }, { x: 5, y: 0 }] },
                { piece:7, location: [{ x: 4, y: 0 }] }
            ],
            rRest: [
                { piece:1, location: [{ x: 0, y: 6 }, { x: 2, y: 6 }, { x: 4, y: 6 }, { x: 6, y: 6 }, { x: 8, y: 6 }] },
                { piece:2, location: [{ x: 1, y: 7 }, { x: 7, y: 7 }] },
                { piece:3, location: [{ x: 0, y: 9 }, { x: 8, y: 9 }] },
                { piece:4, location: [{ x: 1, y: 9 }, { x: 7, y: 9 }] },
                { piece:5, location: [{ x: 2, y: 9 }, { x: 6, y: 9 }] },
                { piece:6, location: [{ x: 3, y: 9 }, { x: 5, y: 9 }] },
                { piece:7, location: [{ x: 4, y: 9 }] }
            ],
            opponent: [
            ],  // 对手的棋子布局
            oneself: [
            ],  // 自己的棋子布局
            magn: [10,10,25,50,5,2,10,   10,2,5,2,   10,10,2,20,5,2,10,   20,2,5,2],  // 倍率
            roleAudios: new Array(),  // 存储所有角色语音
            startAudios: new Array(),  // 存储所有启动语音
            zoomVal: 0,  // 当前页面缩放比
            tipsCanvas: null,
            tipsCTX:null,
            tips: [],  // { type: 0, x: 1, y: 1 } type 0:被选中的棋子;1:可移动的位置
            // skillList: [
            //     { id: 0, name: "降龙伏虎", details: "无技能" },
            //     { id: 1, name: "以一当十", details: "【兵/卒】解除约束，可自由向四周移动" },
            //     { id: 2, name: "筋斗云", details: "【炮/砲】移动时可越过一枚棋子" },
            //     { id: 3, name: "一车十子寒", details: "【車】周围的8个点上的敌方棋子不得动弹" },
            //     { id: 4, name: "金戈铁骑", details: "【馬】解除约束，不会因蹩马腿而被困住" },
            //     { id: 5, name: "蚕丛鸟道", details: "【相/象】存在时，对手越过河界的棋子不得超过2枚" },
            //     { id: 6, name: "固若金汤", details: "【士/仕】存在时，【帅/将】无法被吃" },
            //     { id: 7, name: "身先士卒", details: "【帅/将】解除约束，亲自出征，并以【車】的规则移动，军营群龙无首，需要【車】镇守，【車】不得越过河界，【帅/将】在被吃前必须选择一个【車】互换位置" },
            // ],
            skillList: [],
            tableX: 9,
            tableY: 10,
            selectType: 0,  // 鼠标状态 0:未选中 1:移动/吃
            previousChess: { self: false, piece: 0, location: { x: 0, y: 0 } },  // 上一个选择的棋子,以及信息,piece为0表示空位置,-1表示无效位置
            currentChess: { self: false, piece: 0, location: { x: 0, y: 0 } },  // 当前选择的棋子,以及信息,piece为0表示空位置,-1表示无效位置
            // destination: [],  // 选择自己的棋子后,将棋子可移动的位置保存至此
            currentSkill: 7,
            room: {
                name: '',
                password: '',
                rival: '',
                note: '',
            },
            chineseChessVo: {
            },
            roomList: [],
            ws: null,  // WS连接
            roomName: null,
            /**
             * 0:游离状态,未进入房间
             * 1:等待状态,等待对手进入
             * 2:准备状态,双方都已进入房间,但未开始对战
             * 3:对战状态
             * 4:暂停状态,仅由对战状态转变
             */
            status: 0,  // 0:不在房间内.1:已进入房间但对手未进入.2:自己和对手都已在房间内,处于准备状态.3:已开始,对战中.4:对战中,但处于暂停状态.
            selfBattle: {name:'',totalGames:''},
            selfInfo: {
                headPortrait: {
                    imageUrl:'',
                },
            },
            rivalBattle: {name:'',totalGames:''},
            rivalInfo: {
                headPortrait: {
                    imageUrl:'',
                },
            },
            skillId: 0,
            skillDetail: '无技能',
            wsStatus: false,
            /**
             * 双方的技能标识
             */
            selfSkill: 0,  // 自己的技能
            rivalSkill: 0,  // 对手的技能
            isPreperation: false,  // 是否已准备好
            selfIsReady: false,
            rivalIsReady: false,
            fingerGuessSelected: false,
            fingerGuessValue: 0,  // 0:正面 1:反面
            /**
             * 当前用户是否是行动方
             */
            isActor: false,
            /**
             * 页面显示的技能信息
             */
            rivalSkillInfo: {name:''},
            selfSkillInfo: { name: '' },
            /**
             * 回合
             */
            round: 0,
            /**
             * 倒计时
             */
            countdown: 60,
            /**
             * 和棋状态
             */
            isStalemate:false,
        }
    },
    created() {
        var zoomLevel = window.devicePixelRatio;
        console.log("系统缩放级别: " + zoomLevel);
        if (zoomLevel==1) {
        this.zoomVal = 1.25;
        }
    },
    watch: {
        // 监听对象,注意设置 deep:true
        selfSkill:{  // 修改了自己的技能需要通知对手,更新自己的选择
            handler() {
                console.log("status:"+this.status);  // 状态
                if (this.status==2) {  // 双方已进入房间,但未开始对战
                    this.changeSkill();
                }
            },
            // deep: true
        },
    },
    mounted() {
        document.title = "中国象棋";
        saveVisitLog(Object.assign({key:27}));
        this.tipsCanvas=document.getElementById('tips');
        this.tipsCanvas.addEventListener('click', this.trigger, false);  // 为画布添加监听
        this.tipsCTX = this.tipsCanvas.getContext('2d');
        this.oneself = this.rRest;  // 初始化双方棋子
        this.opponent = this.bRest;
        this.drawTable();  // 绘制棋盘
        if (this.checkAuth()) {  // 检查用户状态
            this.createWS();
        }
    },
    updated() { //更新之后.场景:获取更新真实DOM之后
      var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new Popover(popoverTriggerEl)
      });
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
        /**
         * 通用通知弹窗
         * @param code 0:红色 1:绿色
         * @param msg 信息
         */
        commonTip(code,msg) {
            var response = {
                data: {
                    code: code,
                    msg: msg,
                },
            }
            this.showToast(response);
        },
        drawTable() {
            var c = document.getElementById('table');
            var ctx = c.getContext('2d');
            var img = document.getElementById("tableImg");
            const self = this; 
            img.onload = function (e) {
                ctx.drawImage(img, 0, 0, 630, 700);
                console.log("棋盘绘制完成!");
            };
        },
        initTable() {
            this.initPieceBase();
            this.initPiece();
        },
        /**
         * 绘制双方棋子的基座
         */
        initPieceBase() {
            var ctx = document.getElementById("chessBase").getContext('2d');
            ctx.clearRect(0, 0, 630, 700);
            let locationList = [];
            // 绘画红方
            for (let i = 0; i < this.oneself.length; i++){  // 遍历每个棋子
                for (let j = 0; j < this.oneself[i].location.length;j++){
                    locationList.push(this.oneself[i].location[j]);
                }
            };

            // 绘画黑方
            for (let i = 0; i < this.opponent.length; i++){  // 遍历每个棋子
                for (let j = 0; j < this.opponent[i].location.length;j++){
                    locationList.push(this.opponent[i].location[j]);
                }
            };
            // this.darwChess(locationList, "chess-base", 'chessBase', 70, 68, 70, 70, 0, 0);
            this.darwChess(locationList,"chess-base",'chessBase',69.3,67.8,70,70,2,0);
        },
        /**
         * 绘制双方棋子
         */
        initPiece() {
            var ctx = document.getElementById("chess").getContext('2d');
            ctx.clearRect(0, 0, 630, 700);
            console.log("绘制双方棋子 当前正在绘制的是否是房主:"+this.isRoomOwner);
            // 绘画自己的棋子
            for (var i = 0; i < this.oneself.length; i++){  // 遍历每个棋子
                if (this.isRoomOwner) {
                    this.darwChess(this.oneself[i].location, "p-r-"+this.oneself[i].piece, 'chess',69.3,67.8,56,56,9.5,7);
                }
                else {
                    this.darwChess(this.oneself[i].location,"p-b-"+this.oneself[i].piece,'chess',69.3,67.8,56,56,9.5,7);
                }
            };

            // 绘画对手的棋子
            for (var i = 0; i < this.opponent.length; i++){  // 遍历每个棋子
                if (!this.isRoomOwner) {
                    this.darwChess(this.opponent[i].location, "p-r-"+this.opponent[i].piece, 'chess',69.3,67.8,56,56,9.5,7);
                }
                else {
                    this.darwChess(this.opponent[i].location,"p-b-"+this.opponent[i].piece,'chess',69.3,67.8,56,56,9.5,7);
                }
            };
        },
        darwChess(location, imgName, canvasName, x, y, widthSize, heightSize, xOffSet, yOffSet) {
            var ctx = document.getElementById(canvasName).getContext('2d');
            let img = document.getElementById(imgName);
            // img.onload = function () {  // 如果在页面加载时不等待 onload() 完成,那么 棋子基座 可能加载不出来
                for (var i = 0; i < location.length; i++){
                    ctx.drawImage(img, location[i].x * x+xOffSet, location[i].y * y+yOffSet , widthSize, heightSize);
                }
            // };
        },
        /**
         * 根据点击的位置,获取点击的位置对应的棋子,如果是自己的棋子则高亮标记,如果之前已选中自己的棋子,且当前点击的位置为允许移动的目标位置,则移动
         * @param {*} pointX 点击位置x轴
         * @param {*} pointY 点击位置y轴
         */
        refreshTipsData(pointX, pointY) {
            console.log("x:" + pointX + ",y:" + pointY);
            let chessX = 0;  // 选中的棋子x
            let chessY = 0;  // 选中的棋子x
            this.currentChess = { self: true, piece: 0, location: { x: 0, y: 0 } };  // 重置当前选中的棋子,空位置,在(0,0)处

            let table = new Array();  // 0:空 1:红 2:黑
            for (let i = 0; i < 9; i++){
                table[i] = new Array();
                for (let j = 0; j < 10; j++){
                    table[i][j] = 0;
                }
            }
            // 获取点击的位置在棋盘中的坐标位置,如果有棋子,则记录该棋子的信息
            for (let i = 0; i < this.oneself.length; i++){  // 遍历自己的棋子并标记
                let location = this.oneself[i].location;
                for (let j = 0; j < location.length; j++){
                    table[location[j].x][location[j].y] = 1;
                    if ((location[j].x * 69.3-2) < pointX && pointX < (location[j].x * 69.3 + 67.3) && (location[j].y * 67.8) < pointY && pointY < (location[j].y * 67.8 + 67.8)) {
                        chessX = location[j].x;
                        chessY = location[j].y;
                        this.currentChess.self = true;  // 选中的是自己的棋子
                        this.currentChess.piece = i + 1;
                        this.currentChess.location.x = chessX;
                        this.currentChess.location.y = chessY;
                    }
                }
            };
            for (let i = 0; i < this.opponent.length; i++){  // 遍历对手的棋子并标记
                let location = this.opponent[i].location;
                for (let j = 0; j < location.length; j++){
                    table[location[j].x][location[j].y] = 2;
                    if ((location[j].x * 69.3-2) < pointX && pointX < (location[j].x * 69.3 + 67.3) && (location[j].y * 67.8) < pointY && pointY < (location[j].y * 67.8 + 67.8)) {
                        chessX = location[j].x;
                        chessY = location[j].y;
                        this.currentChess.self = false;  // 选中的不是自己的棋子
                        this.currentChess.piece = i + 1;
                        this.currentChess.location.x = chessX;
                        this.currentChess.location.y = chessY;
                    }
                }
            };
            if (this.currentChess.piece == 0) {  // 如果点击的位置没有棋子,仍需要计算其在棋盘上的坐标位置
                let x = Math.floor((pointX - 2) / 69.3);
                this.currentChess.location.x = x > 8 ? -1 : x;
                let y = Math.floor((pointY) / 67.8);
                this.currentChess.location.y = y>9?-1:y;
            }
            if (this.pointCheck()) {  // 检查之前是否已选中自己的棋子,且当前点击的位置为可移动位置,若是则移动棋子
                this.moveChess();
                // 刷新棋子
                this.initTable();
                // 刷新标记
                this.tips = [];
                this.tips.push({ type: 0, x: this.currentChess.location.x, y: this.currentChess.location.y });  // 将选中的棋子也添加到 tips 中
            }
            else {  // 反之
                this.tipsCenter(table);
            }
            this.darwTips();
        },
        darwTips() {  // 提示绘画刷新
            var ctx = this.tipsCanvas.getContext('2d');
            ctx.clearRect(0, 0, 630, 700);
            this.previousChess = {};
            for (let i = 0; i < this.tips.length; i++){
                let img;
                if (!this.isActor&&this.tips[i].type!=2) {  // 当前用户不是行动方,那么选中标记和目标标记将显示为灰色tip
                    img = document.getElementById('p-b-0');
                }
                else if (this.tips[i].type == 0) {
                    img = document.getElementById('p-r-0');  // 为选中的棋子添加tip
                }
                else if (this.tips[i].type==1) {
                    img = document.getElementById('p-s');  // 为目标位置添加tip
                    this.previousChess = this.currentChess;
                }
                else if (this.tips[i].type==2) {
                    img = document.getElementById('disable');  // 为【封印】状态的棋子添加tip
                    this.previousChess = this.currentChess;
                }
                ctx.drawImage(img, this.tips[i].x*69.3+2, this.tips[i].y*67.8, 70, 70);
            }
        },
        trigger(e) {  // 监听到鼠标点击画布,获取点击位置,如果有棋子,则添加选中标识并将其可行走的位置标记
            if (this.isActor&&this.status==3) {  // 是你的回合
                var bounding = this.tipsCanvas.getBoundingClientRect() || getClientRect();
                var x = e.clientX - bounding.left;
                var y = e.clientY - bounding.top;
                // this.refreshTipsData(x, y);  // 前端分析
                this.refreshSelectedChess(x, y);  // 后端分析
            }

            
        },
        /**
         * 根据棋子,以及所在位置,以及所有棋子位置,选择状态,决定后续操作
         * @param {*} chess 棋子
         * @param {*} chessX x位置
         * @param {*} chessY y位置
         * 
         * 1.点击的位置是自己的棋子
         *   1)更新提示
         * 2.点击的位置是对手的棋子或空位置
         *   1)之前已选中自己的棋子
         *     1>若符合条件,棋子移动至该位置
         *   2)之前未选中棋子
         *     1>无需操作
         */
        tipsCenter(table) {  // 将选中的棋子能移动的位置标记
            this.tips = [];
            this.tips.push({type:0, x: this.currentChess.location.x, y: this.currentChess.location.y });  // 将选中的棋子也添加到 tips 中
            if (this.currentChess.self) {  // 选中的是自己的棋子,则显示该棋子可移动的位置
                this.refreshTips(table);
            }
            else {  // 点击的是对手的棋子
            }
        },
        refreshTips(table) {
            let chess = this.currentChess.piece;
            let chessX = this.currentChess.location.x;
            let chessY = this.currentChess.location.y;
            switch (chess) {
                case 1:  // 兵/卒
                    if (this.currentSkill==1) {  // 技能开启
                        if (chessX>0) {  // 左
                            if (table[chessX-1][chessY]!=1) {
                                this.tips.push({type:1, x: chessX-1, y: chessY });
                            }
                        }
                        if ((this.tableX - 1 - chessX) > 0) {  // 右
                            if (table[chessX+1][chessY]!=1) {
                                this.tips.push({type:1, x: chessX+1, y: chessY });
                            }
                        }
                        if (chessY>0&&table[chessX][chessY-1]!=1) {  // 上
                            this.tips.push({type:1, x: chessX, y: chessY-1 });
                        }
                        if ((this.tableY-1-chessY) > 0 && table[chessX][chessY + 1] != 1) {  // 下
                            this.tips.push({type:1, x: chessX, y: chessY+1 });
                        }
                    }
                    else {
                        if (chessX>0) {  // 左
                            if (chessY<5&&table[chessX-1][chessY]!=1) {  // 过了河界
                                this.tips.push({type:1, x: chessX-1, y: chessY });
                            }
                        }
                        if ((this.tableX - 1 - chessX) > 0) {  // 右
                            if (chessY<5&&table[chessX+1][chessY]!=1) {  // 过了河界
                                this.tips.push({type:1, x: chessX+1, y: chessY });
                            }
                        }
                        if (chessY>0&&table[chessX][chessY-1]!=1) {  // 上
                            this.tips.push({type:1, x: chessX, y: chessY-1 });
                        }
                    }
                    break;
                case 2:  // 炮/砲
                    let flag = true;  // 越过一枚棋子
                    if (chessX>0) {  // 左
                        for (let i = chessX-1; i>=0;i--){
                            if (table[i][chessY]==0&&flag) {
                                this.tips.push({type:1, x: i, y: chessY });
                            }
                            else {
                                if (flag) {
                                    flag = false;
                                }
                                else {
                                    if (this.currentSkill==2&&table[i][chessY]==0) {  // 技能开启
                                        this.tips.push({ type: 1, x: i, y: chessY });
                                    }
                                    else if (table[i][chessY]==2) {
                                        this.tips.push({ type: 1, x: i, y: chessY });
                                        break;
                                    }
                                    else if (table[i][chessY]==1) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    flag = true;
                    if ((this.tableX - 1 - chessX) > 0) {  // 右
                        for (let i = chessX+1; this.tableX>i;i++){
                            if (table[i][chessY]==0&&flag) {
                                this.tips.push({type:1, x: i, y: chessY });
                            }
                            else {
                                if (flag) {
                                    flag = false;
                                }
                                else {
                                    if (this.currentSkill==2&&table[i][chessY]==0) {  // 技能开启
                                        this.tips.push({ type: 1, x: i, y: chessY });
                                    }
                                    else if (table[i][chessY]==2) {
                                        this.tips.push({ type: 1, x: i, y: chessY });
                                        break;
                                    }
                                    else if (table[i][chessY]==1) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    flag = true;
                    if (chessY>0) {  // 上
                        for (let i = chessY-1; i>=0;i--){
                            if (table[chessX][i]==0&&flag) {
                                this.tips.push({type:1, x: chessX, y: i });
                            }
                            else {
                                if (flag) {
                                    flag = false;
                                }
                                else {
                                    if (this.currentSkill==2&&table[chessX][i]==0) {  // 技能开启
                                        this.tips.push({ type: 1, x: chessX, y: i });
                                    }
                                    else if (table[chessX][i]==2) {
                                        this.tips.push({type:1, x: chessX, y: i });
                                        break;
                                    }
                                    else if (table[chessX][i]==1) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    flag = true;
                    if ((this.tableY-1-chessY)>0) {  // 下
                        for (let i = chessY+1; i < this.tableY;i++){
                            if (table[chessX][i]==0&&flag) {
                                this.tips.push({type:1, x: chessX, y: i });
                            }
                            else {
                                if (flag) {
                                    flag = false;
                                }
                                else {
                                    if (this.currentSkill==2&&table[chessX][i]==0) {  // 技能开启
                                        this.tips.push({type:1, x: chessX, y: i });
                                    }
                                    else if (table[chessX][i]==2) {
                                        this.tips.push({type:1, x: chessX, y: i });
                                        break;
                                    }
                                    else if (table[chessX][i]==1) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    break;
                case 3:  // 车
                    if (chessX>0) {  // 左
                        for (let i = chessX-1; i>=0;i--){
                            if (table[i][chessY]==0) {
                                this.tips.push({type:1, x: i, y: chessY });
                            }
                            else if(table[i][chessY]==2){
                                this.tips.push({type:1, x: i, y: chessY });
                                break;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    if ((this.tableX - 1 - chessX) > 0) {  // 右
                        for (let i = chessX+1; this.tableX>i;i++){
                            if (table[i][chessY]==0) {
                                this.tips.push({type:1, x: i, y: chessY });
                            }
                            else if(table[i][chessY]==2){
                                this.tips.push({type:1, x: i, y: chessY });
                                break;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    if (chessY>0) {  // 上
                        for (let i = chessY-1; i>=0;i--){
                            if (table[chessX][i]==0) {
                                this.tips.push({type:1, x: chessX, y: i });
                            }
                            else if(table[chessX][i]==2){
                                this.tips.push({type:1, x: chessX, y: i });
                                break;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    if ((this.tableY-1-chessY)>0) {  // 下
                        for (let i = chessY+1; i < this.tableY;i++){
                            if (table[chessX][i]==0) {
                                this.tips.push({type:1, x: chessX, y: i });
                            }
                            else if(table[chessX][i]==2){
                                this.tips.push({type:1, x: chessX, y: i });
                                break;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    break;
                case 4:  // 马
                    if (chessX>1&&chessY>0 && table[chessX-2][chessY-1]!=1 && table[chessX-1][chessY]==0&&(table[chessX-1][chessY]==0||this.currentSkill==4)) {  // 存在目标位置&(目标位置为空|敌方棋子)&没有蹩脚&
                        this.tips.push({type:1, x: chessX-2, y: chessY-1 });
                    }
                    if (chessX>0&&chessY>1 && table[chessX-1][chessY-2]!=1 && (table[chessX][chessY-1]==0||this.currentSkill==4)) {
                        this.tips.push({type:1, x: chessX-1, y: chessY-2 });
                    }
                    if ((this.tableX-1-chessX)>0&&this.tableY>1 && table[chessX+1][chessY-2]!=1 && (table[chessX][chessY-1]==0||this.currentSkill==4)) {
                        this.tips.push({type:1, x: chessX+1, y: chessY-2 });
                    }
                    if ((this.tableX-1-chessX)>1&&this.tableY>0 && table[chessX+2][chessY-1]!=1 && (table[chessX+1][chessY]==0||this.currentSkill==4)) {
                        this.tips.push({type:1, x: chessX+2, y: chessY-1 });
                    }
                    if ((this.tableX-1-chessX)>1&&(this.tableY-1-chessY)>0 && table[chessX+2][chessY+1]!=1 && (table[chessX+1][chessY]==0||this.currentSkill==4)) {
                        this.tips.push({type:1, x: chessX+2, y: chessY+1 });
                    }
                    if ((this.tableX-1-chessX)>0&&(this.tableY-1-chessY)>1 && table[chessX+1][chessY+2]!=1 && (table[chessX][chessY+1]==0||this.currentSkill==4)) {
                        this.tips.push({type:1, x: chessX+1, y: chessY+2 });
                    }
                    if (chessX>0&&(this.tableY-1-chessY)>1 && table[chessX-1][chessY+2]!=1 && (table[chessX][chessY+1]==0||this.currentSkill==4)) {
                        this.tips.push({type:1, x: chessX-1, y: chessY+2 });
                    }
                    if (chessX>1&&(this.tableY-1-chessY)>0 && table[chessX-2][chessY+1]!=1 && (table[chessX-1][chessY]==0||this.currentSkill==4)) {
                        this.tips.push({type:1, x: chessX-2, y: chessY+1 });
                    }
                    break;
                case 5:  // 相/象
                    if ((this.tableX - 1 - chessX) > 1) {  // 右
                        if (chessY > 4 && (table[chessX + 2][chessY - 2] != 1)) {  // 右上, 未超界 并且 (目标位置是空的 或 存在敌方棋子)
                            this.tips.push({type:1, x: chessX+2, y: chessY-2 });
                        }
                        if((this.tableY-1-chessY)>1 && (table[chessX + 2][chessY + 2] != 1)) {  // 右下, 未超界 并且 (目标位置是空的 或 存在敌方棋子)
                            this.tips.push({type:1, x: chessX+2, y: chessY+2 });
                        }
                    }
                    if (chessX>1) {  // 左
                        if (chessY > 4 && (table[chessX - 2][chessY - 2] != 1)) {  // 左上, 未超界 并且 (目标位置是空的 或 存在敌方棋子)
                            this.tips.push({type:1, x: chessX-2, y: chessY-2 });
                        }
                        if((this.tableY-1-chessY)>1 && (table[chessX - 2][chessY + 2] != 1)) {  // 左下, 未超界 并且 (目标位置是空的 或 存在敌方棋子)
                            this.tips.push({type:1, x: chessX-2, y: chessY+2 });
                        }
                    }
                    break;
                case 6:  // 士/仕
                    if (chessX>3) {  // 左
                        if (chessY > 7 && table[chessX-1][chessY-1]!=1) {  // 左上
                            this.tips.push({type:1, x: chessX-1, y: chessY-1 });
                        }
                        if (chessY<(this.tableY-1) && table[chessX-1][chessY+1]!=1) {  // 左下
                            this.tips.push({type:1, x: chessX-1, y: chessY+1 });
                        }
                    }
                    if (chessX<5) {  // 右
                        if (chessY>7 && table[chessX+1][chessY-1]!=1) {  // 右上
                            this.tips.push({type:1, x: chessX+1, y: chessY-1 });
                        }
                        if (chessY<(this.tableY-1) && table[chessX+1][chessY+1]!=1) {  // 右下
                            this.tips.push({type:1, x: chessX+1, y: chessY+1 });
                        }
                    }
                    break;
                case 7:  // 帅/将
                    if (this.currentSkill==7) {
                        if (chessX>0) {  // 左
                            for (let i = chessX-1; i>=0;i--){
                                if (table[i][chessY]==0) {
                                    this.tips.push({type:1, x: i, y: chessY });
                                }
                                else if(table[i][chessY]==2){
                                    this.tips.push({type:1, x: i, y: chessY });
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        if ((this.tableX - 1 - chessX) > 0) {  // 右
                            for (let i = chessX+1; this.tableX>i;i++){
                                if (table[i][chessY]==0) {
                                    this.tips.push({type:1, x: i, y: chessY });
                                }
                                else if(table[i][chessY]==2){
                                    this.tips.push({type:1, x: i, y: chessY });
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        if (chessY>0) {  // 上
                            for (let i = chessY-1; i>=0;i--){
                                if (table[chessX][i]==0) {
                                    this.tips.push({type:1, x: chessX, y: i });
                                }
                                else if(table[chessX][i]==2){
                                    this.tips.push({type:1, x: chessX, y: i });
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        if ((this.tableY-1-chessY)>0) {  // 下
                            for (let i = chessY+1; i < this.tableY;i++){
                                if (table[chessX][i]==0) {
                                    this.tips.push({type:1, x: chessX, y: i });
                                }
                                else if(table[chessX][i]==2){
                                    this.tips.push({type:1, x: chessX, y: i });
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        if (chessX>3 && table[chessX-1][chessY]!=1) {  // 左
                            this.tips.push({type:1, x: chessX-1, y: chessY });
                        }
                        if (chessX<5 && table[chessX+1][chessY]!=1) {  // 右
                            this.tips.push({type:1, x: chessX+1, y: chessY });
                        }
                        if (chessY > 7 && table[chessX][chessY-1]!=1) {  // 上
                            this.tips.push({type:1, x: chessX, y: chessY-1 });
                        }
                        if (chessY<(this.tableY-1) && table[chessX][chessY+1]!=1) {  // 下
                            this.tips.push({type:1, x: chessX, y: chessY+1 });
                        }
                    }
                    break;
                default:
                    break;
            }
        },
        pointCheck() {  // 判断当前位置是否存在于 tips 中
            if (this.previousChess.self) {  // 上一次点击的是自己的棋子
                for (let i = 0; i < this.tips.length; i++){  // 遍历 tips  {type:0, x: chessX, y: chessY }
                    if (this.tips[i].x == this.currentChess.location.x && this.tips[i].y == this.currentChess.location.y) {  // 点击的位置可以移动
                        return true;
                    }
                }
            }
            return false;
        },
        moveChess(){  // 移动棋子
            if (this.currentChess.piece != 0) {  // 点击处有棋子
                for (let i = 0; i < this.opponent.length; i++) {
                    let location = this.opponent[i].location;
                    for (let j = 0; j < location.length; j++) {
                        if (location[j].x==this.currentChess.location.x&&location[j].y==this.currentChess.location.y) {
                            this.opponent[i].location.splice(j,1);
                        }
                    }
                }
            }
            for (let i = 0; i < this.oneself.length; i++) {
                let location = this.oneself[i].location;
                for (let j = 0; j < location.length; j++) {
                    if (location[j].x==this.previousChess.location.x&&location[j].y==this.previousChess.location.y) {
                        this.oneself[i].location[j].x = this.currentChess.location.x;
                        this.oneself[i].location[j].y = this.currentChess.location.y;
                    }
                }
            }
        },
        start() {
            this.initTable();
        },
        checkAuth() {
            if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
                return true;
            }
            this.commonTip(0,"你还未登录,登录后即可游玩!");
            return false;
        },
        createRoom() {
            if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
                this.chineseChessVo.instruct = 1;
                this.chineseChessVo.name = this.room.name;
                this.chineseChessVo.password = this.room.password;
                this.chineseChessVo.rival = this.room.rival;
                this.chineseChessVo.note = this.room.note;
                this.chineseChessVo.msg = "提交创建房间信息";
                this.ws.send(JSON.stringify(this.chineseChessVo));
                document.getElementById("closeCreateRoomModal").click();
                this.chineseChessVo = {};
            }
            else {
                this.commonTip(0, "请先登录!");
            }
        },
        getAllRoom() {
            if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
                this.chineseChessVo.instruct = 2;
                this.chineseChessVo.msg = "获取所有房间列表";
                this.ws.send(JSON.stringify(this.chineseChessVo));
            }
            else {
                this.commonTip(0, "请先登录!");
            }
        },
        join(id) {
            if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {
                this.chineseChessVo.id = id;
                this.chineseChessVo.instruct = 3;
                this.chineseChessVo.msg = "对手加入房间";
                this.ws.send(JSON.stringify(this.chineseChessVo));
                document.getElementById("closeJoinRoomModal").click();
                this.chineseChessVo.password = null;
            }
            else {
                this.commonTip(0, "请先登录!");
            }
        },
        /**
         * 投降
         */
        submission() {
            if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null&&localStorage.getItem('roomId') != "undefined" && localStorage.getItem('roomId') != null) {
                console.log("投降");
                this.chineseChessVo.id = localStorage.getItem('roomId');
                this.chineseChessVo.instruct = 18;
                this.chineseChessVo.msg = "当前玩家投降";
                this.ws.send(JSON.stringify(this.chineseChessVo));
            }
            else {
                this.commonTip(0, "请先登录!");
            }
        },
        /**
         * 和棋
         */
        stalemate() {
            if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null&&localStorage.getItem('roomId') != "undefined" && localStorage.getItem('roomId') != null) {
                console.log("和棋");
                this.chineseChessVo.id = localStorage.getItem('roomId');
                this.chineseChessVo.instruct = 20;
                this.chineseChessVo.msg = "当前玩家和棋";
                this.isStalemate = true;
                this.ws.send(JSON.stringify(this.chineseChessVo));
            }
            else {
                this.commonTip(0, "请先登录!");
            }
        },
        /**
         * 退出
         */
        quit() {
            if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null&&localStorage.getItem('roomId') != "undefined" && localStorage.getItem('roomId') != null) {
                this.chineseChessVo.id = localStorage.getItem('roomId');
                this.chineseChessVo.instruct = 4;
                this.chineseChessVo.msg = "当前玩家退出";
                this.ws.send(JSON.stringify(this.chineseChessVo));
            }
            else {
                this.commonTip(0, "请先登录!");
            }
        },
        createWS() {
            if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null) {  // 登录状态才会主动建立连接
                var url;
                if (process.env.VUE_APP_MODE === "development") {
                    console.log("development");
                    url = "ws://ding.office.com/wsLink/linkChineseChess/"+localStorage.getItem('authorization');  // 开发
                }
                else if (process.env.VUE_APP_MODE === "test") {
                    // test
                    console.log("test");
                }
                else if (process.env.VUE_APP_MODE === "production") {
                    console.log("production");
                    url = "wss://164office.cn/wsLink/linkChineseChess/" + localStorage.getItem('authorization');  // 非开发
                }
                this.ws = new WebSocket(url);  // websocket对象创建,与服务器建立连接,第二个参数可选,指定连接协议
                this.ws.onopen = () => {  // 建立连接时触发
                    console.log("ws-连接建立成功!");
                    // this.refreshData();
                    // this.refreshUserInfo();
                    this.wsStatus = true;
                };
                this.ws.onmessage = function (evt) {  // 客户端接收到服务端数据时触发
                    console.log("ws-收到新消息!"+evt.data);
                    var res = JSON.parse(evt.data);
                    if (res.instruct==0) {  // 创建房间返回的信息
                        this.commonTip(res.status, res.msg);
                    }
                    else if (res.instruct==1) {  // 创建房间返回的信息
                        this.commonTip(res.status, res.msg);
                        let data = JSON.parse(res.data);
                        this.saveRoomId(data.roomId);
                        this.roomName = data.roomName;
                        this.status = 1;
                        this.refreshUserInfo();
                    }
                    else if (res.instruct==2) {  // 所有房间列表
                        this.roomList = res.onlineRoomList;
                    }
                    else if (res.instruct == 3) {  // 加入房间返回的信息
                        this.commonTip(res.status, res.msg);
                        if (res.status) {  // 成功加入房间
                            this.soundEffects(5);
                            let data = JSON.parse(res.data);
                            this.saveRoomId(data.roomId);
                            this.roomName = data.roomName;
                            this.status = 2;
                            this.tips = [];  // 对手加入,清空上一局 tips
                            this.refreshUserInfo();
                        }
                    }
                    else if (res.instruct == 4) {  // 退出房间
                        this.soundEffects(6);
                        this.commonTip(res.status, res.msg);
                        localStorage.setItem('roomId', null);  // 将当前房间的 id 置空
                        this.roomName = null;
                        this.selfSkillInfo = {};
                        this.rivalSkillInfo = {};
                        this.status = 0;

                    }
                    else if (res.instruct == 5) {  // 自己是房主,对手退出房间
                        this.commonTip(res.status, res.msg);
                        this.status = 1;
                        this.soundEffects(6);
                    }
                    else if (res.instruct == 6) {  // 对手加入房间,通知房主
                        this.soundEffects(5);
                        this.commonTip(res.status, res.msg);
                        this.status = 2;
                        this.selfSkillInfo = {};
                        this.rivalSkillInfo = {};
                        this.refreshUserInfo();
                        this.tips = [];  // 对手加入,清空上一局 tips
                        this.darwTips();
                    }
                    else if (res.instruct == 7) {  // 刷新页面后返回的数据
                        if (res.status) {
                            let data = JSON.parse(res.data);
                            this.saveRoomId(data.roomId);
                            this.roomName = data.roomName;
                            this.status = data.status;
                            if (this.status>1) {  // 当前用户是房主,并且对手未进场
                                this.selfSkill = data.selfSkill;
                                this.rivalSkill = data.rivalSkill;
                                this.selfIsReady = data.selfIsReady;
                                this.rivalIsReady = data.rivalIsReady;
                                this.isStalemate = data.isStalemate;
                            }
                        }
                        else {
                            this.saveRoomId(null);  // 置空,不管之前有没有值
                            this.status = 0;
                        }
                    }
                    else if (res.instruct == 8) {  // 接收所有信息
                        let data = JSON.parse(res.data);
                        this.isRoomOwner = data.isRoomOwner;
                        this.status = data.status;
                        this.selfBattle = data.selfBattle;
                        this.selfInfo = data.selfInfo;
                        this.selfIsReady = data.selfIsReady;
                        this.rivalIsReady = data.rivalIsReady;
                        this.isStalemate = data.isStalemate;
                        if (data.rivalBattle!=null) {
                            this.rivalBattle = data.rivalBattle;
                        }
                        if (data.rivalInfo!=null) {
                            this.rivalInfo = data.rivalInfo;
                        }
                        if (data.status!=1) {  // 双方均在房间内
                            this.initData(data);

                        }

                        if ([3, 4].indexOf(data.status) != -1) {  // 正在对战中,恢复棋局
                            this.isActor = data.isActor;
                            this.isRoomOwner = data.isRoomOwner;
                            this.selfSkillInfo = this.getSkillInfo(data.selfSkill);
                            this.rivalSkillInfo = this.getSkillInfo(data.rivalSkill);
                            this.initTip(data);  // 重置 tip,重画 tip
                            this.round = data.round;
                        }
                    }
                    else if (res.instruct == 9) {  // token 失效
                        this.commonTip(res.status, res.msg);
                        this.wsStatus = false;
                    }
                    else if (res.instruct == 10) {  // 对手修改了自己选择的技能
                        let data = JSON.parse(res.data);
                        this.changeRivalSkill(data.rivalSkill);
                    }
                    else if (res.instruct == 11) {  // 对手已准备完毕
                        this.changePerparation(true);
                        this.commonTip(res.status, res.msg);
                    }
                    else if (res.instruct == 12) {  // 对手取消准备完毕状态
                        this.changePerparation(false);
                        this.commonTip(res.status, res.msg);
                    }
                    // if (res.instruct == 13) {  // 双方都已准备完毕,关闭技能选择弹窗,打开选择数字弹窗
                    //     var closeReadyModal = document.getElementById('closeReadyModal');
                    //     closeReadyModal.click();
                    //     var fingerGuessModal = document.getElementById('fingerGuessModal');
                    //     var modal = new Modal(fingerGuessModal);
                    //     modal.show();
                    // }
                    else if (res.instruct == 14) {  // 双方都已选择了数字,后台也完成先手判断逻辑,关闭数字选择弹窗,开始对战
                        // var closeFingerGuessModal = document.getElementById('closeFingerGuessModal');
                        var closeReadyModal = document.getElementById('closeReadyModal');
                        closeReadyModal.click();
                        this.soundEffects(7);
                        let data = JSON.parse(res.data);
                        this.isActor = data.isActor;
                        this.isRoomOwner = data.isRoomOwner;
                        this.status = data.status;
                        this.round = data.round;
                        this.selfSkillInfo = this.getSkillInfo(data.selfSkill);
                        this.rivalSkillInfo = this.getSkillInfo(data.rivalSkill);
                        this.initData(data);  // 重置棋盘,并生成棋子
                        this.commonTip(res.status, res.msg);  // 提示信息
                    }
                    else if (res.instruct == 15) {  // 刷新棋盘,包括对战结果通知
                        let data = JSON.parse(res.data);
                        this.isActor = data.isActor;
                        this.isRoomOwner = data.isRoomOwner;
                        this.status = data.status;
                        this.round = data.round;
                        this.soundEffects(data.soundType);
                        this.initData(data);  // 重置棋盘,重画棋子
                        this.initTip(data);  // 重置 tip,重画 tip
                        if (data.code!=0) {  // 0:无,1:红方将军,2:黑方将军,3:红方被绝杀,4:黑方被绝杀
                            this.commonTip(1, res.msg);
                        }
                    }
                    else if (res.instruct == 16) {  // 用户因退出或断开 ws 导致本地的 roomId 丢失,重新登陆后将即返回给前端并再次保存
                        this.commonTip(res.status, res.msg);
                        if (res.status) {  // 成功
                            let data = JSON.parse(res.data);
                            this.saveRoomId(data.roomId);
                            this.refreshData();
                            this.refreshUserInfo();
                            this.wsStatus = true;
                        }
                    }
                    else if (res.instruct == 17) {  // 用户因退出或断开 ws 导致本地的 roomId 丢失,重新登陆后将即返回给前端并再次保存
                        let data = JSON.parse(res.data);
                        this.skillList = data.skillList;
                    }
                    else if (res.instruct == 18) {  // 通知对战结果
                        let data = JSON.parse(res.data);
                        this.isActor = data.isActor;
                        
                        this.selfIsReady = data.selfIsReady;
                        this.rivalIsReady = data.rivalIsReady;
                        this.selfSkillInfo = {};
                        this.rivalSkillInfo = {};
                        this.selfSkill = 0;
                        this.rivalSkill = 0;
                        
                        this.initData(data);  // 重置棋盘,重画棋子
                        this.initTip(data);  // 重置 tip,重画 tip
                        this.commonTip(res.status ? 1 : 0, res.msg);
                        this.refreshUserInfo();
                        this.status = data.status;
                        this.round = 0;
                        this.soundEffects(data.soundType);
                    }
                    else if (res.instruct == 19) {  // 倒计时刷新
                        let data = JSON.parse(res.data);
                        this.countdown = data.countdown;
                    }
                    else if (res.instruct == 20) {  // 和棋通知,并隐藏和棋按钮
                        this.commonTip(res.status, res.msg);  // 和棋消息弹窗
                    }
                }.bind(this);  // 如果要调用methods中的方法,可通过 bind() 绑定
                this.ws.error = function (evt) {  // 通信发生错误时触发
                    console.log("ws-error!");
                    this.wsStatus = false;
                    localStorage.setItem('roomId', null);  // 将当前房间的 id 置空
                };
                this.ws.onclose = function () {  // 连接关闭时触发
                    console.log("ws-关闭连接!");
                    this.wsStatus = false;
                    this.status = 0;
                    localStorage.setItem('roomId', null);  // 将当前房间的 id 置空
                };
            }
            else {
                this.commonTip(0,"未登录状态,请先登录!");
            }
        },
        /**
         * 音效,由用户行为触发
         * 1:棋子落在空处
         * 2:吃掉对方棋子
         * 3:战胜
         * 4:战败
         * 5:对手进入房间
         * 6:离开房间
         * 7:开始对战
         */
        soundEffects(flag) {
            if (flag==1) {
                document.getElementById("downSound").play();
            }
            else if (flag==2) {
                document.getElementById("killSound").play();
            }
            else if (flag==3) {
                document.getElementById("winSound").play();
            }
            else if (flag==4) {
                document.getElementById("defeatSound").play();
            }
            else if (flag==5) {
                document.getElementById("joinSound").play();
            }
            else if (flag==6) {
                document.getElementById("leaveSound").play();
            }
            else if (flag==7) {
                document.getElementById("startSound").play();
            }
            
        },
        closeWindows() { // 关闭页面
            if (localStorage.getItem('authorization') != "undefined" && localStorage.getItem('authorization') != null&&localStorage.getItem('roomId') != "undefined" && localStorage.getItem('roomId') != null) {
                this.chineseChessVo.id = localStorage.getItem('roomId');
                this.chineseChessVo.instruct = 4;
                this.chineseChessVo.msg = "当前玩家直接关闭页面";
                this.ws.send(JSON.stringify(this.chineseChessVo));
                this.saveRoomId(null);
            }

            this.ws.close();
        },
        saveRoomId(id) {  // 将房间 ID 保存至本地
            localStorage.setItem('roomId', id);
        },
        /**
         * 刷新双方信息
         */
        refreshUserInfo() {
            if (localStorage.getItem('roomId') != "undefined" && localStorage.getItem('roomId') != "null") {
                this.chineseChessVo.id = localStorage.getItem('roomId');
                this.chineseChessVo.instruct = 8;
                this.chineseChessVo.msg = "获取双方玩家信息";
                this.ws.send(JSON.stringify(this.chineseChessVo));
            }
        },
        /**
         * 对局信息,当用户已进入房间,刷新页面时,前端的几乎所有数据都被清空,要么选择保存在 localStorage 中,要么根据 roomId 请求后台获取数据
         */
        refreshData() {
            if (localStorage.getItem('roomId') != "undefined" && localStorage.getItem('roomId') != "null") {
                console.log(">>>" + localStorage.getItem('roomId'));
                // 根据 roomId
                this.chineseChessVo.id = localStorage.getItem('roomId');
                this.chineseChessVo.instruct = 7;
                this.chineseChessVo.msg = "当页面被刷新时,根据房间号获取所有数据";
                this.ws.send(JSON.stringify(this.chineseChessVo));
            }
        },
        /**
         * 点击此按钮,弹出"准备界面",显示双方的准备情况
         * 房主准备
         *  1.显示对手和自己的技能选择,对手的只读,自己的可变更
         *  2.
         * 对手准备
         *  1.显示房主和自己的技能选择,房主的只读,自己的可变更
         *  2.
         * 
         */
        ready() {
            
        },
        /**
         * 每次一方回合结束,都会判断双方是否绝杀对面
         * 
         * 对手在下一回合任意移动任何棋子,都无法避免"将/帅"被吃,当以下条件都不满足时,即可判断为绝杀,结束游戏
         *  1.对手通过移动"将/帅"避免被吃,移动"将/帅"至其它位置
         *  2.对手通过吃掉造成"将军"的棋子以解除被"将军"的状态,例如被"馬""将军",则可移动一枚棋子致使"馬""撇脚"
         *  3.对手通过阻挡"将军"的条件以解除被"将军"的状态,例如被"馬""将军",则可移动一枚棋子吃掉"馬"
         */
        changeSkill() {
            this.chineseChessVo.id = localStorage.getItem('roomId');
            this.chineseChessVo.instruct = 10;
            this.chineseChessVo.skill = this.selfSkill;
            this.chineseChessVo.msg = "当前玩家修改了技能";
            this.ws.send(JSON.stringify(this.chineseChessVo));
        },
        changeRivalSkill(rivalSkill){
            this.rivalSkill = rivalSkill;
        },
        /**
         * 准备完毕
         *  1.对手未准备完毕,等待对手
         *  2.对手准备完毕,开始猜数字并对战
         */
        preperation(flag) {
            if (flag) {
                this.chineseChessVo.id = localStorage.getItem('roomId');
                this.chineseChessVo.instruct = 11;
                this.chineseChessVo.msg = "当前玩家已准备";
                this.ws.send(JSON.stringify(this.chineseChessVo));
            }
            else {
                this.chineseChessVo.id = localStorage.getItem('roomId');
                this.chineseChessVo.instruct = 12;
                this.chineseChessVo.msg = "当前玩家取消了准备";
                this.ws.send(JSON.stringify(this.chineseChessVo));
            }
            this.selfIsReady = flag;
        },
        changePerparation(flag) {
            this.rivalIsReady = flag;
        },
        fingerGuessSelect(v) {
            this.fingerGuessSelected = true;
            this.fingerGuessValue = v;
            this.chineseChessVo.id = localStorage.getItem('roomId');
            this.chineseChessVo.instruct = 14;
            this.chineseChessVo.fingerGuessValue = v;
            this.chineseChessVo.msg = "当前玩家选择了数字";
            this.ws.send(JSON.stringify(this.chineseChessVo));
        },
        initData(data) {  // 获取后台返回的数据,重新绘制棋子
            this.opponent = data.opponent;
            this.oneself=data.oneself;
            this.initTable();
        },
        initTip(data) {  // 重新绘制 tip
            this.tips=data.tip;
            this.darwTips();
        },
        refreshSelectedChess(pointX, pointY) {  // 根据点击的位置通过转化后告知后端进一步分析
            var locationX = Math.floor((pointX-2)/69.3);  // 计算获取X轴位置,模糊计算,棋子与棋子之间的空隙并未考虑,下同
            var locationY = Math.floor((pointY)/67.8);  // 计算获取Y轴位置
            this.chineseChessVo.id = localStorage.getItem('roomId');
            this.chineseChessVo.instruct = 15;
            this.chineseChessVo.selectedChessX = locationX > 8 ? -1 : locationX;  // 选中的棋子的x
            this.chineseChessVo.selectedChessY = locationY > 9 ? -1 : locationY;  // 选中的棋子的y
            this.chineseChessVo.msg = "当前玩家点击了一个位置";
            this.ws.send(JSON.stringify(this.chineseChessVo));
        },
        getSkillInfo(id) {
            console.log("skillList:" + JSON.stringify(this.skillList)+" id:"+id);
            for (var i = 0; i < this.skillList.length; i++){
                if (this.skillList[i].id==id) {
                    return this.skillList[i];
                }
            }
        }
    },
};
</script>