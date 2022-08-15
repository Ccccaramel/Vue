<template>
    <div>
        <Head :commonResponse="commonResponseData"></Head>
        <div class="row" style="margin-right: 0px;">
            <div class="col-2">
                <div class="list-group" id="list-tab" role="tablist">
                    <a class="list-group-item list-group-item-action active" id="list-team-list" data-bs-toggle="list"
                        href="#list-team" role="tab" aria-controls="list-team" @click="searchTeam()">战队管理</a>
                    <a class="list-group-item list-group-item-action" id="list-teamMember-list" data-bs-toggle="list"
                        href="#list-teamMember" role="tab" aria-controls="list-teamMember" @click="searchTeamMember()">战队成员</a>
                    <a class="list-group-item list-group-item-action" id="list-teamMemberScoreboard-list" data-bs-toggle="list"
                        href="#list-teamMemberScoreboard" role="tab" aria-controls="list-teamMemberScoreboard" @click="getTeamMemberScoreboard()">战队竞赛统计</a>
                    <a class="list-group-item list-group-item-action" id="list-teamData-list" data-bs-toggle="list"
                        href="#list-teamData" role="tab" aria-controls="list-teamData">战队数据</a>
                    <a class="list-group-item list-group-item-action" id="list-credit-list" data-bs-toggle="list"
                        href="#list-credit" role="tab" aria-controls="list-credit" @click="searchTeamMemberCredit()">战队赛积分录入</a>
                    <hr/>
                    <a class="list-group-item list-group-item-action" id="list-dictionary-list" data-bs-toggle="list"
                        href="#list-dictionary" role="tab" aria-controls="list-dictionary" @click="searchDictionary()">字典表管理</a>
                </div>
            </div>
            <div class="col-10">
                <div class="tab-content" id="nav-tabContent">
                    <!-- 战队成员 -->
                    <Team ref="team" @commonResponse="commonResponseChange($event)"></Team>
                    <!-- 战队成员 -->
                    <TeamMember ref="teamMember" @commonResponse="commonResponseChange($event)"></TeamMember>
                    <!-- 战队竞赛统计 -->
                    <TeamMemberScoreboard ref="teamMemberScoreboard"></TeamMemberScoreboard>
                    <!-- 战队任务周统计 -->
                    <TeamData ref="teamData" @commonResponse="commonResponseChange($event)"></TeamData>
                    <!-- 战队成员积分 -->
                    <Credit ref="credit"></Credit>
                    <!-- 战队成员积分 -->
                    <Dictionary ref="dictionary" @commonResponse="commonResponseChange($event)"></Dictionary>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Team from "@/components/Team.vue";
import TeamMember from "@/components/TeamMember.vue";
import TeamMemberScoreboard from "@/components/TeamMemberScoreboard.vue";
import TeamData from "@/components/TeamData.vue";
import Credit from "@/components/Credit.vue";

import Dictionary from "@/components/Dictionary.vue";
export default {
    name: "userCenter",
    components: {
        Head,
        Team,
        TeamMember,
        TeamMemberScoreboard,
        TeamData,
        Credit,

        Dictionary,
    },
    data() {
        return {
            commonResponseData: { // Modal 弹窗数据
                success: true,
                msg: '',
            },
        }
    },
    created(){
    },
    watch : {
    },
    mounted() {
        this.searchTeam();
    },
    methods: {
        searchTeam(){ // 触发子组件的方法 > 获取该用户管理的所有战队信息
            this.$refs.team.searchTeam();
        },
        searchTeamMember() { // 触发子组件的方法 > 获取队员信息
            this.$refs.teamMember.searchTeamMember(); // 父组件触发子组件的方法
        },
        getTeamMemberScoreboard() { //  触发子组件的方法 > 获取所有战队积分统计
            this.$refs.teamMemberScoreboard.reset();
        },
        searchTeamMemberCredit(){ // 触发子组件的方法 > 获取所有队员积分
            this.$refs.credit.searchTeamMemberCredit();
        },

        searchDictionary(){ // 触发子组件的方法 > 获取所有字典
            this.$refs.dictionary.searchDictionary();
        },
        commonResponseChange(event){ // Modal 弹窗数据
            this.commonResponseData=event;
        }
    },
};
</script>