<template>
    <div class="tab-pane fade" id="list-teamData" role="tabpanel" aria-labelledby="list-teamData-list">
        <!-- 搜索条件 -->
        <div class="alert alert-primary" role="alert">
            A simple primary alert—check it out!
        </div>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';

import {Modal,Toast} from 'bootstrap';
import { findLeaveType,findJoinWayType,findCreditType,getTeamCompetitionType } from "../api/dictionary";
import { getTeamMemberScoreboard,searchTeamMemberCredit,saveTeamMemberCreditInfo,batchCreditAddSave,getSettlementTimeList } from "../api/credit";
import { getAllTeamMember, changeTeamMemberStatus, addNewTeamMember, getAllValidTeamMember } from "../api/teamWithPlayer";
import { saveTeamInfo,removeTeam,searchTeam } from "../api/userWithTeam";
import { getToday } from "../api/common";
export default {
    name: "teamData",
    components: {
        Page,
    },
    data() {
        return {
            page: {
                size: 10,
                currentPage:1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
        }
    },
    watch : {
    },
    mounted() {
    },
    methods: {
        commonPageChange(event) {
            this.page = event;
            this.searchTeamMemberCredit();
        },
    },
}
</script>