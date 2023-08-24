<template>
    <div class="tab-pane fade show active" id="list-userInfo" role="tabpanel" aria-labelledby="list-userInfo-list" tabindex="0">
        <!-- 用户个人基本信息 -->
        <div class="alert" role="alert">
            <div class="mb-3 row">
                <img class="col-auto rounded-circle" :src="currentUserInfo.headPortraitUrl"
                 data-bs-toggle="modal" data-bs-target="#changeHeadPortraitModal" @click="changeHeadPortrait()"
                 style="weight:164px;height:164px">
            </div>
            <div class="mb-3 row">
                <label class="col-1 col-form-label">ID</label>
                <label class="col-6 col-form-label">{{currentUserInfo.id}}</label>
            </div>
            <div class="mb-3 row">
                <label class="col-1 col-form-label">昵称</label>
                <label class="col-6 col-form-label">{{currentUserInfo.name}}</label>
            </div>
            <div class="mb-3 row">
                <label class="col-1 col-form-label">邮箱</label>
                <label class="col-6 col-form-label text-muted" v-if="currentUserInfo.email == null || currentUserInfo.email ==''">未绑定邮箱</label>
                <label class="col-6 col-form-label" v-if="currentUserInfo.email != null && currentUserInfo.email !=''">{{currentUserInfo.email}}</label>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-1 col-form-label">QQ</label>
                <div class="col-6">
                    <input type="text" v-model="currentUserInfo.qq" class="form-control" maxlength="11">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-1 col-form-label">个性签名</label>
                <div class="col-6">
                    <input type="text" v-model="currentUserInfo.note" class="form-control" maxlength="20">
                </div>
            </div>
            <div class="mb-3 row align-items-center">
                <div class="col-1">
                    <span :class="'badge hyld-bg-'+currentUserInfo.grade+' rounded-pill'">Lv{{currentUserInfo.grade}}</span>
                </div>
                <div class="col-6">
                    <div class="progress">
                        <div :class="'progress-bar hyld-bg-'+currentUserInfo.grade" role="progressbar" aria-label="Info example" :style="'width:'+ currentUserInfo.proportion +'%'" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{{currentUserInfo.exEx}}/{{currentUserInfo.currentLvMaxEx}}</div>
                    </div>
                </div>
            </div>
            <hr/>
            <div class="col-auto">
                <button type="button" class="btn btn-primary me-3 mb-3" @click="updateUserInfo()">保存修改</button>
                <button type="button" class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#bindEmailModal" v-if="currentUserInfo.email==null || currentUserInfo.email ==''">绑定邮箱</button>
                <button type="button" class="btn btn-primary mb-3" v-if="currentUserInfo.email!=null && currentUserInfo.email !=''"  @click="unbindEmail()">解绑邮箱</button>
                <button type="button" class="btn btn-primary ms-3 mb-3" data-bs-toggle="modal" data-bs-target="#editCurrentUserPasswordModal" @click="updateUserPassword()">修改密码</button>
            </div>
        </div>
        <!-- 修改密码 -->
        <div class="modal fade" id="editCurrentUserPasswordModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{userPasswordInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="userPasswordInfo.password" maxlength="20" required>
                                    <label>新密码</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="editCurrentUserPasswordModalCloseBtn" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveUserPassword()" :disabled="saveUserPasswordBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 绑定邮箱 -->
        <div class="modal fade" id="bindEmailModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{bindEmailInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="bindEmailInfo.email" maxlength="20" required  :readonly="bindEmailReadonly">
                                    <label>邮箱</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="bindEmailInfo.emailCode" maxlength="20" required>
                                    <label>验证码</label>
                                </div>
                            </div>
                            <div class="col-md mb-2 text-center">
                                <button type="button" class="btn btn-outline-success" :disabled="sendEmailCodeBtn" @click="sendEmailCode()">{{countDownBtnInfo}}{{countDown}}</button>
                            </div>
                        </form>
                        <div class="alert alert-warning d-flex align-items-center justify-content-center" role="alert">
                            <font-awesome-icon icon="fa-solid fa-circle-info" size="1x" bounce/>
                            <div>
                                ⭐请在发送验证码后1分钟之内完成绑定,建议提前打开自己的邮箱
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="bindEmailModalCloseBtn" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveUserEmail()" :disabled="saveUserEmailBtn">绑定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改头像 -->
        <div class="modal fade" id="changeHeadPortraitModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{userHeadPortraitInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" id="changeHeadPortraitModalCloseBtn" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container text-center">
                            <div class="row row-cols-12">
                                <div class="col col-lg-1" v-for="headPortraitInfo in allHeadPortraitList" :key="headPortraitInfo.id">
                                    <div class="vstack">
                                        <img class="rounded-circle" :src="headPortraitInfo.imageUrl" @dblclick="saveHeadPortrait(headPortraitInfo.id)">
                                        <p>{{headPortraitInfo.name}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 分页 -->
                        <Page :commonPage="modalPage" @commonPageChange="commonModalPageChange($event)"></Page>
                        <div class="alert alert-warning d-flex align-items-center justify-content-center" role="alert">
                            <!-- 显隐+缩放 交替 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" beat-fade /> -->
                            <!-- 向上跳动 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" bounce /> -->
                            <!-- 显隐交替 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" fade /> -->
                            <!-- y轴旋转 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" flip /> -->
                            <!-- 原点左右摆动 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" shake /> -->
                            <!-- 原点顺时针旋转 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" spin /> -->
                            <!-- 原点逆时针旋转 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" spin spin-reverse /> -->
                            <!-- 原点顺时针每帧60°旋转 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" spin-pulse /> -->
                            <!-- 缩放交替 -->
                            <!-- <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="1x" beat/> -->
                            <font-awesome-icon icon="fa-solid fa-circle-question" size="1x" bounce/>
                            <div>
                                ⭐双击即可修改哦!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import { Toast } from 'bootstrap';
import { getCurrentUserInfo,updateUserInfo,saveUserPassword,saveHeadPortrait,bindEmail,unbindEmail } from "@/api/user";
import { searchHeadPortrait } from '@/api/headPortrait';
import { sendEmailCode } from '@/api/emailCode';
import { jsonp } from 'vue-jsonp';
import Fingerprint2 from 'fingerprintjs2';
import { getPublicKey, encrypt, exToLv } from "@/api/common";
export default {
    name: "userInfo",
    components: {
        Page,
    },
    data() {
        return {
            modalPage: {
                size: 48,
                currentPage:1, // 偏移量,数据库从0开始
                totalPage: 0,
                asc: true,
                currentPageSize:0, // 本页搜索结果数
            },
            commonResponse: {
                success: true,
                msg: '',
            },
            currentUserInfo: {
                id: '',
                name: '',
                qq: '',
                note: '',
                headPortraitUrl:''

            },
            userPasswordInfo: {
                title: '',
                id: '',
                password: ''
            },
            saveUserPasswordBtn: true,
            userHeadPortraitInfo: {
                title: '',
                newHeadPortraitId:'',
            },
            allHeadPortraitList: [],
            publicKey: '',
            bindEmailInfo: {
                title: '绑定邮箱',
                email: '',
                emailCode:'',
            },
            saveUserEmailBtn: true,
            sendEmailCodeBtn: true,
            countDown: '', // 倒计时
            start: {},
            countDownBtnInfo: '发送验证码',
            bindEmailReadonly: false,
            countDownObj: {},
            publicKey: '',
            visitLogInfo: {},
            emailCode: {
                email:''
            },
        }
    },
    watch: {
        userPasswordInfo: {
            handler() {
                this.checkUserPasswordInfo();
            },
            deep: true,
        },
        bindEmailInfo: {
            handler() {
                this.checkBindEmailInfo();
            },
            deep: true,
        },
    },
    mounted() {
    },
    methods: {
        commonModalPageChange(event) { // 修改头像 modal 的分页
            this.modalPage = event;
            this.searchHeadPortrait();
        },
        showToast(response) { // 通用信息展示
            if (response.data.code == 0) {
                this.commonResponse.success = false;
            } else {
                this.commonResponse.success = true;
            }
            this.commonResponse.msg = response.data.msg;
            this.$emit('commonResponse', this.commonResponse);
            var toastLiveExample = document.getElementById('commonToast');
            var toast = new Toast(toastLiveExample);
            toast.show();
        },
        getCurrentUserInfo() {
            getCurrentUserInfo().then(
                response => {
                    if (response.data.code == 0) { // 进入 个人中心 需要检查 token 有效性
                        this.showToast(response);
                        localStorage.clear();
                        setTimeout(() => {
                            this.$router.push("/")
                        }, 2000);
                    }
                    this.currentUserInfo.id = response.data.data.id;
                    this.currentUserInfo.name = response.data.data.name;
                    this.currentUserInfo.qq = response.data.data.qq;
                    this.currentUserInfo.note = response.data.data.note;
                    this.currentUserInfo.headPortraitUrl = response.data.data.headPortrait.imageUrl;
                    this.currentUserInfo.ex = response.data.data.ex;
                    this.currentUserInfo.email = response.data.data.email;
                    // 转移到后台处理
                    // var res = exToLv(response.data.data.ex);
                    // this.currentUserInfo.grade = res.grade;
                    // this.currentUserInfo.exEx = res.exEx;
                    // this.currentUserInfo.currentLvMaxEx = res.currentLvMaxEx;
                    // this.currentUserInfo.proportion =this.currentUserInfo.exEx*100/this.currentUserInfo.currentLvMaxEx < 50 ? 10 : this.currentUserInfo.exEx*100/this.currentUserInfo.currentLvMaxEx;
                    this.currentUserInfo.grade = response.data.data.grade;
                    this.currentUserInfo.exEx = response.data.data.exEx;
                    this.currentUserInfo.currentLvMaxEx = response.data.data.currentLvMaxEx;
                    this.currentUserInfo.proportion = response.data.data.proportion;
                }
            );
        },
        updateUserInfo() {
            if (this.checkUserInfo()) {
                updateUserInfo(this.currentUserInfo).then(
                    response => {
                        if(response.data.code==1){
                            this.getCurrentUserInfo();
                        }
                        this.showToast(response);
                    }
                )
            }
        },
        checkUserInfo() {
            var patt1 = /^[1-9]{1}[0-9]{4,10}$/;
            if (!patt1.test(this.currentUserInfo.qq)) {
                var response = {
                    data: {
                        code: 0,
                        msg: '必须是5至11位非0开头的数字!',
                    }
                };
                this.showToast(response);
                return false;
            }
            return true;
        },
        updateUserPassword() {
            this.userPasswordInfo.id = this.currentUserInfo.id;
            this.userPasswordInfo.title = '修改密码';
        },
        saveUserPassword() {
            getPublicKey().then( // 获取加密密钥
                response => {
                    this.publicKey = response.data.data.publicKey;
                    this.userPasswordInfo.password = encrypt(this.userPasswordInfo.password, this.publicKey); // 加密
                    saveUserPassword(this.userPasswordInfo).then(
                        response => {
                            this.showToast(response);
                            document.getElementById("editCurrentUserPasswordModalCloseBtn").click();
                            this.userPasswordInfo.password = '';
                        }
                    );
                }
            );
        },
        checkUserPasswordInfo() {
            if (this.userPasswordInfo.password == '') {
                this.saveUserPasswordBtn = true;
            }
            else {
                this.saveUserPasswordBtn = false;
            }
        },
        checkBindEmailInfo() {
            this.sendEmailCodeBtn = true;
            this.saveUserEmailBtn = true;
            var patt = /^[0-9a-zA-Z]{2,20}@[0-9a-zA-Z]{2,10}.[0-9a-zA-Z]{2,5}$/;
            if (patt.test(this.bindEmailInfo.email)) {
                this.sendEmailCodeBtn = false;
                this.countDownBtnInfo = '发送验证码';
                if (this.bindEmailInfo.emailCode !=null && this.bindEmailInfo.emailCode != '') {
                    this.saveUserEmailBtn = false;
                }
            }
        },
        changeHeadPortrait() {
            this.userHeadPortraitInfo.title = "修改头像";
            this.searchHeadPortrait();
        },
        searchHeadPortrait() {
            searchHeadPortrait(this.modalPage).then(
                response => {
                    this.allHeadPortraitList = response.data.data.data;
                    this.modalPage.totalPage = response.data.data.totalPage;
                }
            )
        },
        saveHeadPortrait(headPortraitId) {
            saveHeadPortrait(Object.assign({
                headPortraitId:headPortraitId
            })).then(
                response => {
                    document.getElementById("changeHeadPortraitModalCloseBtn").click();
                    this.showToast(response);
                    this.getCurrentUserInfo();
                }
            )
        },
        sendEmailCode() {
            this.createFingerprint();
            getPublicKey().then( // 获取加密密钥
                response => {
                    this.publicKey = response.data.data.publicKey;
                    jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
                        key: 'VQPBZ-GZIKU-QNPV7-B7MD5-PPA2F-TMBES',
                        output: 'jsonp'
                    }).then(res => {
                        var ad_info = res.result.ad_info;
                        this.visitLogInfo.trueAddress = ad_info.nation + ad_info.province + ad_info.city + ad_info.district;
                        this.visitLogInfo.ip = res.result.ip;
                        this.emailCode.title = "绑定邮箱";
                        this.emailCode.email = this.bindEmailInfo.email;
                        this.emailCode.fingerprint = encrypt(localStorage.getItem('browserId'), this.publicKey); // 指纹
                        this.emailCode.data = encrypt(JSON.stringify(this.visitLogInfo), this.publicKey);
                        sendEmailCode(this.emailCode).then(
                            response => {
                                if (response.data.code == 1) {
                                    this.bindEmailReadonly = true;
                                    this.start = new Date();
                                    this.countDown = 60;
                                    this.countDownBtnInfo = '验证码已发送-';
                                    this.sendEmailCodeBtn = true;
                                    var that = this;
                                    this.countDownObj = setInterval(function () {
                                        that.timer()
                                    }, 1000);
                                }
                                this.showToast(response);
                            }
                        )
                    });
                }
            )
        },
        timer() {
            var now = new Date();
            var det = now - this.start;
            now.setTime(det);
            now.setHours(0);
            this.countDown = 60 - now.getSeconds();
            if (this.countDown == 60) {
                this.countDown = 0;
                clearInterval(this.countDownObj);
                this.countDownBtnInfo = '发送验证码';
                this.countDown = '';
                this.bindEmailReadonly = false;
                this.sendEmailCodeBtn = false;
            }
        },
        saveUserEmail() {
            bindEmail(this.bindEmailInfo).then(
                response => {
                    if (response.data.code==1) {
                        document.getElementById("bindEmailModalCloseBtn").click();
                        this.getCurrentUserInfo();
                    }
                    this.showToast(response);
                }
            )
        },
        unbindEmail() {
            unbindEmail().then(
                response => {
                    this.getCurrentUserInfo();
                    this.showToast(response);
                }
            )
        },
        // 创建浏览器指纹
        createFingerprint() {
        var options = {
            fonts: {
            extendedJsFonts: true,
            },
            excludes: {
            audio: true,
            userAgent: true,
            enumerateDevices: true,
            touchSupport: true,
            }
        };
        var fingerprint = Fingerprint2.get(options,(components) => { // 参数只有回调函数时,默认浏览器指纹依据所有配置信息进行生成
            var values = components.map(compoent => compoent.value); // 配置的值的数组
            var murmur = Fingerprint2.x64hash128(values.join(''), 31); // 生成浏览器指纹
            // console.log("components:" + components);
            // console.log("values:" + values);
            // console.log("murmur:" + murmur);
            // alert(murmur);
            localStorage.setItem('browserId', murmur); // 存储浏览器指纹,在项目中用于校验用户身份和埋点
        });
        },
    },
}
</script>