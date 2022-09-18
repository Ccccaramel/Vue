<template>
    <div>
        <Head ref="head" :commonResponse="commonResponseData"></Head>
        <div class="row" style="margin-right: 0px;">
            <div class="col-2">
                <div class="list-group" id="list-tab" role="tablist">
                    <a class="list-group-item list-group-item-action active" id="list-userInfo-list" data-bs-toggle="list"
                        href="#list-userInfo" role="tab" aria-controls="list-userInfo" @click="getCurrentUserInfo()">个人信息</a>
                    <a class="list-group-item list-group-item-action" id="list-myGameAccount-list" data-bs-toggle="list"
                        href="#list-myGameAccount" role="tab" aria-controls="list-myGameAccount" @click="searchMyGameAccount()">我的游戏账号</a>
                    <a class="list-group-item list-group-item-action" id="list-myTeam-list" data-bs-toggle="list"
                        href="#list-myTeam" role="tab" aria-controls="list-myTeam" @click="searchMyTeam()">我的战队</a>
                    <a class="list-group-item list-group-item-action" id="list-teamMember-list" data-bs-toggle="list"
                        href="#list-teamMember" role="tab" aria-controls="list-teamMember" @click="searchTeamMember()">战队成员</a>

                    <hr />

                    <a class="list-group-item list-group-item-action" id="list-teamMemberScoreboard-list" data-bs-toggle="list" 
                        href="#list-teamMemberScoreboard" role="tab" aria-controls="list-teamMemberScoreboard" @click="getTeamMemberScoreboard()">战队竞赛统计</a>
                    <a class="list-group-item list-group-item-action" id="list-credit-list" data-bs-toggle="list"
                        href="#list-credit" role="tab" aria-controls="list-credit" @click="searchCreditBy()">战队赛积分录入</a>

                    <hr />

                    <a class="list-group-item list-group-item-action" id="list-user-list" data-bs-toggle="list"
                        href="#list-user" role="tab" aria-controls="list-user"
                        @click="searchUser()">用户管理</a>
                    <a class="list-group-item list-group-item-action" id="list-teamManage-list" data-bs-toggle="list"
                        href="#list-teamManage" role="tab" aria-controls="list-teamManage" @click="searchAllTeam()">战队管理</a>
                    <a class="list-group-item list-group-item-action" id="list-PlayerExamine-list" data-bs-toggle="list"
                        href="#list-PlayerExamine" role="tab" aria-controls="list-PlayerExamine" @click="searchPlayerExamine()">关联游戏账号申请</a>
                    <a class="list-group-item list-group-item-action" id="list-TeamExamine-list" data-bs-toggle="list"
                        href="#list-TeamExamine" role="tab" aria-controls="list-TeamExamine" @click="searchTeamExamine()">关联战队申请</a>

                    <hr />

                    <a class="list-group-item list-group-item-action" id="list-dictionary-list" data-bs-toggle="list"
                        href="#list-dictionary" role="tab" aria-controls="list-dictionary"
                        @click="searchDictionary()">字典表管理</a>
                    <a class="list-group-item list-group-item-action" id="list-role-list" data-bs-toggle="list"
                        href="#list-role" role="tab" aria-controls="list-role"
                        @click="getAllRole()">角色管理</a>
                    <a class="list-group-item list-group-item-action" id="list-menu-list" data-bs-toggle="list"
                        href="#list-menu" role="tab" aria-controls="list-menu"
                        @click="getMenuTree()">菜单管理</a>

                    <a class="list-group-item list-group-item-action" data-bs-toggle="list" href="#" role="tab" 
                        @click="logout()">退出</a>
                </div>
            </div>
            <div class="col-10">
                <div class="tab-content" id="nav-tabContent">
                    <!-- ****** 公共菜单 ****** -->
                    <!-- 用户个人信息 -->
                    <UserInfo ref="userInfo" @commonResponse="commonResponseChange($event)"></UserInfo>
                    <!-- 我的游戏账号 -->
                    <MyGameAccount ref="myGameAccount" @commonResponse="commonResponseChange($event)"></MyGameAccount>
                    <!-- 我的战队 -->
                    <MyTeam ref="myTeam" @commonResponse="commonResponseChange($event)" @showTeamDataModal="showTeamDataModal($event)"></MyTeam>
                    <!-- 战队成员 -->
                    <TeamMember ref="teamMember" @commonResponse="commonResponseChange($event)"></TeamMember>
                    <!-- 战队竞赛统计 -->
                    <TeamMemberScoreboard ref="teamMemberScoreboard"></TeamMemberScoreboard>
                    <!-- 战队任务周统计 -->
                    <TeamData ref="teamData" @commonResponse="commonResponseChange($event)"></TeamData>
                    <!-- 战队成员积分 -->
                    <Credit ref="credit"></Credit>

                    <!-- ****** 系统管理 ****** -->
                    <!-- 字典表管理 -->
                    <Dictionary ref="dictionary" @commonResponse="commonResponseChange($event)"></Dictionary>
                    <!-- 角色管理 -->
                    <Role ref="role" @commonResponse="commonResponseChange($event)"></Role>
                    <!-- 菜单管理 -->
                    <Menu ref="menu" @commonResponse="commonResponseChange($event)"></Menu>

                    <!-- ****** 平台管理 ****** -->
                    <!-- 用户管理 -->
                    <User ref="user" @commonResponse="commonResponseChange($event)"></User>
                    <!-- 战队管理 -->
                    <TeamManage ref="teamManage" @commonResponse="commonResponseChange($event)" @showTeamDataModal="showTeamDataModal($event)"></TeamManage>
                    <!-- 游戏账号关联申请 -->
                    <PlayerExamine ref="gameAccountExamine" @commonResponse="commonResponseChange($event)"></PlayerExamine>
                    <!-- 战队关联申请 -->
                    <TeamExamine ref="teamExamine" @commonResponse="commonResponseChange($event)"></TeamExamine>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Head from "@/components/Head.vue";
import MyTeam from "@/components/MyTeam.vue";
import MyGameAccount from "@/components/MyGameAccount.vue";
import TeamMember from "@/components/TeamMember.vue";
import TeamMemberScoreboard from "@/components/TeamMemberScoreboard.vue";
import UserInfo from "@/components/UserInfo.vue";
import User from "@/components/User.vue";
import Credit from "@/components/Credit.vue";
import { Toast } from 'bootstrap';
import { logout } from '@/api/user';
import Dictionary from "@/components/Dictionary.vue";
import Role from "@/components/Role.vue";
import Menu from "@/components/Menu.vue";
import TeamManage from "@/components/TeamManage.vue";
import PlayerExamine from "@/components/PlayerExamine.vue";
import TeamExamine from "@/components/TeamExamine.vue";
export default {
    name: "userCenter",
    components: {
        Head,
        MyGameAccount,
        MyTeam,
        TeamMember,
        TeamMemberScoreboard,
        UserInfo,
        User,
        Credit,
        Dictionary,
        Role,
        Menu,
        TeamManage,
        PlayerExamine,
        TeamExamine,
    },
    data() {
        return {
            commonResponseData: { // Modal 弹窗数据
                success: true,
                msg: '',
            },
        }
    },
    created() {
    },
    watch: {
    },
    mounted() {
        this.getCurrentUserInfo();
    },
    methods: {
        getCurrentUserInfo() { // 触发子组件的方法 > 获取该用户管理的所有战队信息
            this.$refs.userInfo.getCurrentUserInfo();
        },
        searchMyGameAccount() { // 触发子组件的方法 > 获取用户的关联游戏账号
            this.$refs.myGameAccount.searchMyGameAccount();
        },
        searchMyTeam() { // 触发子组件的方法 > 获取该用户管理的所有战队信息
            this.$refs.myTeam.searchMyRelationTeam();
        },
        searchTeamMember() { // 触发子组件的方法 > 获取队员信息
            this.$refs.teamMember.searchMyTeam(); // 父组件触发子组件的方法
            this.$refs.teamMember.searchTeamMember();
        },
        getTeamMemberScoreboard() { //  触发子组件的方法 > 获取所有战队积分统计
            this.$refs.teamMemberScoreboard.reset();
        },
        searchCreditBy() { // 触发子组件的方法 > 获取所有队员积分
            this.$refs.credit.searchMyTeam(); // 父组件触发子组件的方法
            this.$refs.credit.searchCreditBy();
        },

        searchDictionary() { // 触发子组件的方法 > 获取所有字典
            this.$refs.dictionary.searchDictionary();
        },
        getAllRole() { // 触发子组件的方法 > 获取所有角色
            this.$refs.role.getAllRole();
        },
        getMenuTree() { // 触发子组件的方法 > 获取所有角色
            this.$refs.menu.getMenuTree();
        },
        searchUser() { // 触发子组件的方法 > 获取所有用户
            this.$refs.user.searchUserBtn();
        },
        searchAllTeam() { // 触发子组件的方法 > 获取该用户管理的所有战队信息
            this.$refs.teamManage.searchAllTeam();
        },
        searchPlayerExamine() { // 触发子组件的方法 > 获取所有用户关联游戏账号的申请
            this.$refs.gameAccountExamine.searchPlayerExamine();
        },
        searchTeamExamine() { // 触发子组件的方法 > 获取所有用户关联战队的申请
            this.$refs.teamExamine.searchTeamExamine();
        },

        commonResponseChange(event) { // 通用信息 Toast 提示气泡
            this.commonResponseData = event;
        },
        showTeamDataModal(event) { // 战队数据 Modal 弹窗
            this.$refs.head.showTeamDataModal(event);
        },
        logout() {
            logout().then(
                response => {
                    this.commonResponseData.success = true;
                    this.commonResponseData.msg = response.data.msg;
                    this.$emit('commonResponse', this.commonResponse);
                    var toastLive = document.getElementById('commonToast');
                    var toast = new Toast(toastLive);
                    toast.show();
                    localStorage.clear();
                    setTimeout(() => {
                        this.$router.push("/")
                    }, 2000);
                }
            )
        },
    },
};
</script>