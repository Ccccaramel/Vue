<template>
    <div>
        <Top ref="top" :commonResponse="commonResponseData"></Top>

        <div class="row" style="margin-right: 0px;">
            <div class="col-2">

                <div class="list-group" id="list-tab" role="tablist">
                    <a class="list-group-item text-center hyld-bg-32 btn" v-if="this.power.indexOf('userCenter')!=-1"><font-awesome-icon icon="fa-solid fa-house-user" />&ensp;<Strong>个人中心</Strong></a>
                    <a class="list-group-item list-group-item-action active" id="list-userInfo-list"
                        data-bs-toggle="list" href="#list-userInfo" role="tab" aria-controls="list-userInfo"
                        @click="getCurrentUserInfo()" v-if="this.power.indexOf('userInfoManage')!=-1">个人信息</a>
                    <a class="list-group-item list-group-item-action" id="list-myGameAccount-list"
                        data-bs-toggle="list" href="#list-myGameAccount" role="tab"
                        aria-controls="list-myGameAccount" @click="searchMyGameAccount()" v-if="this.power.indexOf('myGameAccount')!=-1">我的游戏账号</a>
                    <a class="list-group-item list-group-item-action" id="list-myTeam-list"
                        data-bs-toggle="list" href="#list-myTeam" role="tab" aria-controls="list-myTeam"
                        @click="searchMyTeam()" v-if="this.power.indexOf('myTeam')!=-1">我的战队</a>
                    <a class="list-group-item list-group-item-action" id="list-myTeamMember-list"
                        data-bs-toggle="list" href="#list-myTeamMember" role="tab"
                        aria-controls="list-myTeamMember" @click="searchMyTeamMember()" v-if="this.power.indexOf('myTeamMember')!=-1">战队成员</a>
                    <a class="list-group-item list-group-item-action" id="list-myTopic-list"
                        data-bs-toggle="list" href="#list-myTopic" role="tab" aria-controls="list-myTopic"
                        @click="searchMyTopic()" v-if="this.power.indexOf('myTopic')!=-1">我的话题</a>
                    <a class="list-group-item list-group-item-action" id="list-replyMe-list"
                        data-bs-toggle="list" href="#list-replyMe" role="tab" aria-controls="list-replyMe"
                        @click="searchReplyMe()" v-if="this.power.indexOf('replyMe')!=-1">回复我的</a>
                    <a class="list-group-item list-group-item-action" id="list-teamMemberScoreboard-list"
                        data-bs-toggle="list" href="#list-teamMemberScoreboard" role="tab"
                        aria-controls="list-teamMemberScoreboard"
                        @click="getTeamMemberScoreboard()" v-if="this.power.indexOf('teamMatchStatistics')!=-1">战队竞赛统计</a>
                    <a class="list-group-item list-group-item-action" id="list-credit-list"
                        data-bs-toggle="list" href="#list-credit" role="tab" aria-controls="list-credit"
                        @click="searchCreditBy()" v-if="this.power.indexOf('credit')!=-1">战队赛积分明细</a>
                    
                    <hr v-if="this.power.indexOf('platformManage')!=-1"/>

                    <a class="list-group-item text-center hyld-bg-32 btn" v-if="this.power.indexOf('platformManage')!=-1"><font-awesome-icon icon="fa-solid fa-wrench" />&ensp;<Strong>平台管理</Strong></a>
                    <a class="list-group-item list-group-item-action" id="list-headPortraitManage-list"
                        data-bs-toggle="list" href="#list-headPortraitManage" role="tab"
                        aria-controls="list-headPortraitManage" @click="searchHeadPortrait()" v-if="this.power.indexOf('headPortraitManage')!=-1">头像管理</a>
                    <a class="list-group-item list-group-item-action" id="list-user-list"
                        data-bs-toggle="list" href="#list-user" role="tab" aria-controls="list-user"
                        @click="searchUser()" v-if="this.power.indexOf('userManage')!=-1">用户管理</a>
                    <a class="list-group-item list-group-item-action" id="list-player-list"
                        data-bs-toggle="list" href="#list-player" role="tab" aria-controls="list-player"
                        @click="searchPlayer()" v-if="this.power.indexOf('playerManage')!=-1">游戏账号管理</a>
                    <a class="list-group-item list-group-item-action" id="list-teamManage-list"
                        data-bs-toggle="list" href="#list-teamManage" role="tab"
                        aria-controls="list-teamManage" @click="searchAllTeam()" v-if="this.power.indexOf('teamManage')!=-1">战队管理</a>
                    <a class="list-group-item list-group-item-action" id="list-playerExamine-list"
                        data-bs-toggle="list" href="#list-playerExamine" role="tab"
                        aria-controls="list-playerExamine" @click="searchPlayerExamine()" v-if="this.power.indexOf('playerExamine')!=-1">关联游戏账号申请</a>
                    <a class="list-group-item list-group-item-action" id="list-teamRelationManage-list"
                        data-bs-toggle="list" href="#list-teamRelationManage" role="tab"
                        aria-controls="list-teamRelationManage"
                        @click="searchTeamRelationManage()" v-if="this.power.indexOf('teamRelationManage')!=-1">战队关联管理</a>
                    <a class="list-group-item list-group-item-action" id="list-topicManage-list"
                        data-bs-toggle="list" href="#list-topicManage" role="tab"
                        aria-controls="list-topicManage" @click="searchAllTopic()" v-if="this.power.indexOf('topicManage')!=-1">话题管理</a>

                    <hr v-if="this.power.indexOf('systemManage')!=-1"/>

                    <a class="list-group-item text-center hyld-bg-32 btn" v-if="this.power.indexOf('systemManage')!=-1"><font-awesome-icon icon="fa-solid fa-gears" />&ensp;<Strong>系统管理</Strong></a>
                    <a class="list-group-item list-group-item-action" id="list-dictionary-list"
                        data-bs-toggle="list" href="#list-dictionary" role="tab"
                        aria-controls="list-dictionary" @click="searchDictionary()" v-if="this.power.indexOf('dictionaryManage')!=-1">字典表管理</a>
                    <a class="list-group-item list-group-item-action" id="list-role-list"
                        data-bs-toggle="list" href="#list-role" role="tab" aria-controls="list-role"
                        @click="getAllRole()" v-if="this.power.indexOf('roleManage')!=-1">角色管理</a>
                    <a class="list-group-item list-group-item-action" id="list-menuManage-list"
                        data-bs-toggle="list" href="#list-menuManage" role="tab"
                        aria-controls="list-menuManage" @click="getMenuTree()" v-if="this.power.indexOf('menuManage')!=-1">菜单管理</a>
                    <a class="list-group-item list-group-item-action" id="list-systemConfig-list"
                        data-bs-toggle="list" href="#list-systemConfig" role="tab"
                        aria-controls="list-systemConfig" @click="searchSystemConfig()" v-if="this.power.indexOf('systemConfig')!=-1">系统配置</a>

                    <hr v-if="this.power.indexOf('gameResourcesManage')!=-1"/>

                    <a class="list-group-item text-center hyld-bg-32 btn" v-if="this.power.indexOf('gameResourcesManage')!=-1"><font-awesome-icon icon="fa-solid fa-book-skull" />&ensp;<Strong>游戏资源管理</Strong></a>
                    <a class="list-group-item list-group-item-action" id="list-gameRoleManage-list"
                        data-bs-toggle="list" href="#list-gameRoleManage" role="tab"
                        aria-controls="list-gameRoleManage" @click="searchGameRole()" v-if="this.power.indexOf('gameRoleManage')!=-1">游戏角色管理</a>
                    <a class="list-group-item list-group-item-action" id="list-starPowerManage-list"
                        data-bs-toggle="list" href="#list-starPowerManage" role="tab"
                        aria-controls="list-starPowerManage" @click="searchStarPower()" v-if="this.power.indexOf('starPowerManage')!=-1">星徽之力管理</a>
                    <a class="list-group-item list-group-item-action" id="list-gadgetManage-list"
                        data-bs-toggle="list" href="#list-gadgetManage" role="tab"
                        aria-controls="list-gadgetManage" @click="searchGadget()" v-if="this.power.indexOf('gadgetManage')!=-1">随身妙具管理</a>
                    <a class="list-group-item list-group-item-action" id="list-gearManage-list"
                        data-bs-toggle="list" href="#list-gearManage" role="tab"
                        aria-controls="list-gearManage" @click="searchGear()" v-if="this.power.indexOf('gearManage')!=-1">强化装备管理</a>
                    <a class="list-group-item list-group-item-action"
                        id="list-officialVersionUpdateLogManage-list" data-bs-toggle="list"
                        href="#list-officialVersionUpdateLogManage" role="tab"
                        aria-controls="list-officialVersionUpdateLogManage"
                        @click="searchOfficialVersionUpdateLog()" v-if="this.power.indexOf('officialVersionUpdateLogManage')!=-1">官方版本更新日志管理</a>

                    <hr v-if="this.power.indexOf('interactiveManage')!=-1"/>

                    <a class="list-group-item text-center hyld-bg-32 btn" v-if="this.power.indexOf('interactiveManage')!=-1"><font-awesome-icon icon="fa-solid fa-arrow-right-arrow-left" />&ensp;<Strong>交互管理</Strong></a>
                    <a class="list-group-item list-group-item-action" id="list-updateLog-list"
                        data-bs-toggle="list" href="#list-updateLog" role="tab"
                        aria-controls="list-updateLog" @click="searchUpdateLog()" v-if="this.power.indexOf('updateLog')!=-1">平台更新日志</a>
                    <a class="list-group-item list-group-item-action" id="list-pointer-list"
                        data-bs-toggle="list" href="#list-pointer" role="tab" aria-controls="list-pointer"
                        @click="searchPointer()" v-if="this.power.indexOf('pointerManage')!=-1">用户反馈</a>
                    <a class="list-group-item list-group-item-action" id="list-visitLog-list"
                        data-bs-toggle="list" href="#list-visitLog" role="tab" aria-controls="list-visitLog"
                        @click="searchVisitLog()" v-if="this.power.indexOf('visitLog')!=-1">访问日志</a>

                    <hr/>

                    <div class="d-grid gap-2 p-2">
                        <button type="button" class="btn btn-outline-dark" @click="logout()">退出</button>
                    </div>
                </div>


                <!-- <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <font-awesome-icon icon="fa-solid fa-bars" />&ensp;个人中心
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div class="list-group" id="list-tab" role="tablist">
                                <a class="list-group-item list-group-item-action active" id="list-userInfo-list"
                                    data-bs-toggle="list" href="#list-userInfo" role="tab" aria-controls="list-userInfo"
                                    @click="getCurrentUserInfo()">个人信息</a>
                                <a class="list-group-item list-group-item-action" id="list-myGameAccount-list"
                                    data-bs-toggle="list" href="#list-myGameAccount" role="tab"
                                    aria-controls="list-myGameAccount" @click="searchMyGameAccount()">我的游戏账号</a>
                                <a class="list-group-item list-group-item-action" id="list-myTeam-list"
                                    data-bs-toggle="list" href="#list-myTeam" role="tab" aria-controls="list-myTeam"
                                    @click="searchMyTeam()">我的战队</a>
                                <a class="list-group-item list-group-item-action" id="list-myTeamMember-list"
                                    data-bs-toggle="list" href="#list-myTeamMember" role="tab"
                                    aria-controls="list-myTeamMember" @click="searchMyTeamMember()">战队成员</a>
                                <a class="list-group-item list-group-item-action" id="list-myTopic-list"
                                    data-bs-toggle="list" href="#list-myTopic" role="tab" aria-controls="list-myTopic"
                                    @click="searchMyTopic()">我的话题</a>
                                <a class="list-group-item list-group-item-action" id="list-replyMe-list"
                                    data-bs-toggle="list" href="#list-replyMe" role="tab" aria-controls="list-replyMe"
                                    @click="searchReplyMe()">回复我的</a>
                                <a class="list-group-item list-group-item-action" id="list-teamMemberScoreboard-list"
                                    data-bs-toggle="list" href="#list-teamMemberScoreboard" role="tab"
                                    aria-controls="list-teamMemberScoreboard"
                                    @click="getTeamMemberScoreboard()">战队竞赛统计</a>
                                <a class="list-group-item list-group-item-action" id="list-credit-list"
                                    data-bs-toggle="list" href="#list-credit" role="tab" aria-controls="list-credit"
                                    @click="searchCreditBy()">战队赛积分明细</a>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <font-awesome-icon icon="fa-solid fa-bars" />&ensp;平台管理
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample">
                            <div class="list-group" id="list-tab" role="tablist">
                                <a class="list-group-item list-group-item-action" id="list-headPortraitManage-list"
                                    data-bs-toggle="list" href="#list-headPortraitManage" role="tab"
                                    aria-controls="list-headPortraitManage" @click="searchHeadPortrait()">头像管理</a>
                                <a class="list-group-item list-group-item-action" id="list-user-list"
                                    data-bs-toggle="list" href="#list-user" role="tab" aria-controls="list-user"
                                    @click="searchUser()">用户管理</a>
                                <a class="list-group-item list-group-item-action" id="list-player-list"
                                    data-bs-toggle="list" href="#list-player" role="tab" aria-controls="list-player"
                                    @click="searchPlayer()">游戏账号管理</a>
                                <a class="list-group-item list-group-item-action" id="list-teamManage-list"
                                    data-bs-toggle="list" href="#list-teamManage" role="tab"
                                    aria-controls="list-teamManage" @click="searchAllTeam()">战队管理</a>
                                <a class="list-group-item list-group-item-action" id="list-playerExamine-list"
                                    data-bs-toggle="list" href="#list-playerExamine" role="tab"
                                    aria-controls="list-playerExamine" @click="searchPlayerExamine()">关联游戏账号申请</a>
                                <a class="list-group-item list-group-item-action" id="list-teamRelationManage-list"
                                    data-bs-toggle="list" href="#list-teamRelationManage" role="tab"
                                    aria-controls="list-teamRelationManage"
                                    @click="searchTeamRelationManage()">战队关联管理</a>
                                <a class="list-group-item list-group-item-action" id="list-topicManage-list"
                                    data-bs-toggle="list" href="#list-topicManage" role="tab"
                                    aria-controls="list-topicManage" @click="searchAllTopic()">话题管理</a>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <font-awesome-icon icon="fa-solid fa-bars" />&ensp;系统管理
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample">
                            <div class="list-group" id="list-tab" role="tablist">
                                <a class="list-group-item list-group-item-action" id="list-dictionary-list"
                                    data-bs-toggle="list" href="#list-dictionary" role="tab"
                                    aria-controls="list-dictionary" @click="searchDictionary()">字典表管理</a>
                                <a class="list-group-item list-group-item-action" id="list-role-list"
                                    data-bs-toggle="list" href="#list-role" role="tab" aria-controls="list-role"
                                    @click="getAllRole()">角色管理</a>
                                <a class="list-group-item list-group-item-action" id="list-menuManage-list"
                                    data-bs-toggle="list" href="#list-menuManage" role="tab"
                                    aria-controls="list-menuManage" @click="getMenuTree()">菜单管理</a>
                                <a class="list-group-item list-group-item-action" id="list-systemConfig-list"
                                    data-bs-toggle="list" href="#list-systemConfig" role="tab"
                                    aria-controls="list-systemConfig" @click="searchSystemConfig()">系统配置</a>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingFour">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                                <font-awesome-icon icon="fa-solid fa-bars" />&ensp;游戏资源管理
                            </button>
                        </h2>
                        <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                            data-bs-parent="#accordionExample">
                            <div class="list-group" id="list-tab" role="tablist">
                                <a class="list-group-item list-group-item-action" id="list-gameRoleManage-list"
                                    data-bs-toggle="list" href="#list-gameRoleManage" role="tab"
                                    aria-controls="list-gameRoleManage" @click="searchGameRole()">游戏角色管理</a>
                                <a class="list-group-item list-group-item-action" id="list-starPowerManage-list"
                                    data-bs-toggle="list" href="#list-starPowerManage" role="tab"
                                    aria-controls="list-starPowerManage" @click="searchStarPower()">星徽之力管理</a>
                                <a class="list-group-item list-group-item-action" id="list-gadgetManage-list"
                                    data-bs-toggle="list" href="#list-gadgetManage" role="tab"
                                    aria-controls="list-gadgetManage" @click="searchGadget()">随身妙具管理</a>
                                <a class="list-group-item list-group-item-action" id="list-gearManage-list"
                                    data-bs-toggle="list" href="#list-gearManage" role="tab"
                                    aria-controls="list-gearManage" @click="searchGear()">强化装备管理</a>
                                <a class="list-group-item list-group-item-action"
                                    id="list-officialVersionUpdateLogManage-list" data-bs-toggle="list"
                                    href="#list-officialVersionUpdateLogManage" role="tab"
                                    aria-controls="list-officialVersionUpdateLogManage"
                                    @click="searchOfficialVersionUpdateLog()">官方版本更新日志管理</a>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingFive">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseThree">
                                <font-awesome-icon icon="fa-solid fa-bars" />&ensp;交互管理
                            </button>
                        </h2>
                        <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
                            data-bs-parent="#accordionExample">
                            <div class="list-group" id="list-tab" role="tablist">
                                <a class="list-group-item list-group-item-action" id="list-updateLog-list"
                                    data-bs-toggle="list" href="#list-updateLog" role="tab"
                                    aria-controls="list-updateLog" @click="searchUpdateLog()">平台更新日志</a>
                                <a class="list-group-item list-group-item-action" id="list-pointer-list"
                                    data-bs-toggle="list" href="#list-pointer" role="tab" aria-controls="list-pointer"
                                    @click="searchPointer()">用户反馈</a>
                                <a class="list-group-item list-group-item-action" id="list-visitLog-list"
                                    data-bs-toggle="list" href="#list-visitLog" role="tab" aria-controls="list-visitLog"
                                    @click="searchVisitLog()">访问日志</a>
                            </div>
                        </div>
                    </div>
                </div> -->
                <!-- <hr />
                <div class="d-grid gap-2 p-2">
                    <button type="button" class="btn btn-outline-dark" @click="logout()">退出</button>
                </div> -->
            </div>
            <div class="col-10">
                <div class="tab-content" id="nav-tabContent">
                    <!-- ****** 公共菜单 ****** -->
                    <!-- 用户个人信息 -->
                    <UserInfo ref="userInfo" @commonResponse="commonResponseChange($event)"></UserInfo>
                    <!-- 我的游戏账号 -->
                    <MyGameAccount ref="myGameAccount" @commonResponse="commonResponseChange($event)"></MyGameAccount>
                    <!-- 我的战队 -->
                    <MyTeam ref="myTeam" @commonResponse="commonResponseChange($event)"
                        @showTeamDataModal="showTeamDataModal($event)"></MyTeam>
                    <!-- 战队成员 -->
                    <MyTeamMember ref="myTeamMember" @commonResponse="commonResponseChange($event)"></MyTeamMember>
                    <!-- 战队竞赛统计 -->
                    <TeamMemberScoreboard ref="teamMemberScoreboard"></TeamMemberScoreboard>
                    <!-- 战队成员积分 -->
                    <Credit ref="credit" @commonResponse="commonResponseChange($event)"></Credit>
                    <!-- 我的话题 -->
                    <MyTopic ref="myTopic" @commonResponse="commonResponseChange($event)"></MyTopic>
                    <!-- 回复我的 -->
                    <ReplyMe ref="replyMe" @commonResponse="commonResponseChange($event)"></ReplyMe>

                    <!-- ****** 平台管理 ****** -->
                    <!-- 头像管理 -->
                    <HeadPortraitManage ref="headPortraitManage" @commonResponse="commonResponseChange($event)">
                    </HeadPortraitManage>
                    <!-- 用户管理 -->
                    <User ref="user" @commonResponse="commonResponseChange($event)"></User>
                    <!-- 游戏账号管理 -->
                    <Player ref="player" @commonResponse="commonResponseChange($event)"></Player>
                    <!-- 战队管理 -->
                    <TeamManage ref="teamManage" @commonResponse="commonResponseChange($event)"
                        @showTeamDataModal="showTeamDataModal($event)"></TeamManage>
                    <!-- 关联游戏账号关联申请 -->
                    <PlayerExamine ref="playerExamine" @commonResponse="commonResponseChange($event)"></PlayerExamine>
                    <!-- 战队关联申请 -->
                    <TeamRelationManage ref="teamRelationManage" @commonResponse="commonResponseChange($event)">
                    </TeamRelationManage>
                    <!-- 话题管理 -->
                    <TopicManage ref="topicManage" @commonResponse="commonResponseChange($event)"></TopicManage>

                    <!-- ****** 系统管理 ****** -->
                    <!-- 字典表管理 -->
                    <Dictionary ref="dictionary" @commonResponse="commonResponseChange($event)"></Dictionary>
                    <!-- 角色管理 -->
                    <Role ref="role" @commonResponse="commonResponseChange($event)"></Role>
                    <!-- 菜单管理 -->
                    <MenuManage ref="menuManage" @commonResponse="commonResponseChange($event)"></MenuManage>
                    <!-- 系统配置 -->
                    <SystemConfig ref="systemConfig" @commonResponse="commonResponseChange($event)"></SystemConfig>


                    <!-- ****** 游戏资源管理 ****** -->
                    <!-- 游戏角色管理 -->
                    <GameRoleManage ref="gameRoleManage" @commonResponse="commonResponseChange($event)">
                    </GameRoleManage>
                    <!-- 星徽之力管理 -->
                    <StarPowerManage ref="starPowerManage" @commonResponse="commonResponseChange($event)">
                    </StarPowerManage>
                    <!-- 随身妙具管理 -->
                    <GadgetManage ref="gadgetManage" @commonResponse="commonResponseChange($event)"></GadgetManage>
                    <!-- 强化装备管理 -->
                    <GearManage ref="gearManage" @commonResponse="commonResponseChange($event)"></GearManage>
                    <!-- 官方版本更新日志管理 -->
                    <OfficialVersionUpdateLogManage ref="officialVersionUpdateLogManage"
                        @commonResponse="commonResponseChange($event)"></OfficialVersionUpdateLogManage>



                    <!-- ****** 交互管理 ****** -->
                    <!-- 更新日志 -->
                    <UpdateLog ref="updateLog" @commonResponse="commonResponseChange($event)"></UpdateLog>
                    <!-- 用户反馈 -->
                    <PointerManage ref="pointerManage" @commonResponse="commonResponseChange($event)"></PointerManage>
                    <!-- 访问日志 -->
                    <VisitLog ref="visitLog" @commonResponse="commonResponseChange($event)"></VisitLog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Top from "@/components/Top.vue";
import MyTeam from "@/components/MyTeam.vue";
import MyGameAccount from "@/components/MyGameAccount.vue";
import MyTeamMember from "@/components/MyTeamMember.vue";
import TeamMemberScoreboard from "@/components/TeamMemberScoreboard.vue";
import UserInfo from "@/components/UserInfo.vue";
import User from "@/components/User.vue";
import Player from "@/components/Player.vue";
import Credit from "@/components/Credit.vue";
import { logout } from '@/api/user';
import Dictionary from "@/components/Dictionary.vue";
import Role from "@/components/Role.vue";
import MenuManage from "@/components/MenuManage.vue";
import TeamManage from "@/components/TeamManage.vue";
import TopicManage from "@/components/TopicManage.vue";
import HeadPortraitManage from "@/components/HeadPortraitManage.vue";
import PlayerExamine from "@/components/PlayerExamine.vue";
import TeamRelationManage from "@/components/TeamRelationManage.vue";
import UpdateLog from "@/components/UpdateLog.vue";
import PointerManage from "@/components/PointerManage.vue";
import MyTopic from "@/components/MyTopic.vue";
import GameRoleManage from "@/components/GameRoleManage.vue";
import StarPowerManage from "@/components/StarPowerManage.vue";
import GadgetManage from "@/components/GadgetManage.vue";
import GearManage from "@/components/GearManage.vue";
import OfficialVersionUpdateLogManage from "@/components/OfficialVersionUpdateLogManage.vue";
import ReplyMe from "@/components/ReplyMe.vue";
import VisitLog from "@/components/VisitLog.vue";
import SystemConfig from "@/components/SystemConfig.vue";
import { Toast } from "bootstrap";
import { decryptWeb } from "@/api/common";
export default {
    name: "userCenter",
    components: {
        Top,
        MyGameAccount,
        MyTeam,
        MyTeamMember,
        TeamMemberScoreboard,
        UserInfo,
        User,
        Player,
        Credit,
        Dictionary,
        Role,
        MenuManage,
        TeamManage,
        TopicManage,
        HeadPortraitManage,
        PlayerExamine,
        TeamRelationManage,
        UpdateLog,
        PointerManage,
        MyTopic,
        GameRoleManage,
        StarPowerManage,
        GadgetManage,
        GearManage,
        OfficialVersionUpdateLogManage,
        ReplyMe,
        VisitLog,
        SystemConfig,
        power: [],
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
        var powerS = localStorage.getItem('power');
        if (powerS == null) {
            console.log("无法识别!");
            this.$router.push("/");
            localStorage.clear();
            return;
        }
        this.power = decryptWeb(powerS); //.split(","); // 解密并切割称数组
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
            this.$refs.myGameAccount.init();
        },
        searchMyTeam() { // 触发子组件的方法 > 获取该用户管理的所有战队信息
            this.$refs.myTeam.init();
        },
        searchMyTeamMember() { // 触发子组件的方法 > 获取队员信息
            this.$refs.myTeamMember.init(); // 父组件触发子组件的方法
        },
        getTeamMemberScoreboard() { //  触发子组件的方法 > 获取所有战队积分统计
            this.$refs.teamMemberScoreboard.init();
        },
        searchCreditBy() { // 触发子组件的方法 > 获取所有队员积分
            this.$refs.credit.init(); // 父组件触发子组件的方法
        },
        searchMyTopic() { // 获取我的话题
            this.$refs.myTopic.searchMyTopicBtn();
        },

        searchDictionary() { // 触发子组件的方法 > 获取所有字典
            this.$refs.dictionary.searchDictionary();
        },
        getAllRole() { // 触发子组件的方法 > 获取所有角色
            this.$refs.role.getAllRole();
        },
        getMenuTree() { // 触发子组件的方法 > 获取所有菜单
            this.$refs.menuManage.init();
        },
        searchSystemConfig() { // 触发子组件的方法 > 获取所有系统配置
            this.$refs.systemConfig.init();
        },
        searchHeadPortrait() { // 触发子组件的方法 > 获取所有头像
            this.$refs.headPortraitManage.searchHeadPortraitBtn();
        },
        searchUser() { // 触发子组件的方法 > 获取所有用户
            this.$refs.user.init();
        },
        searchPlayer() { // 触发子组件的方法 > 获取所有游戏账号
            this.$refs.player.init();
        },
        searchAllTeam() { // 触发子组件的方法 > 获取该用户管理的所有战队信息
            this.$refs.teamManage.init();
        },
        searchPlayerExamine() { // 触发子组件的方法 > 获取所有用户关联游戏账号的申请
            // this.$refs.playerExamine.searchPlayerExamine();
            this.$refs.playerExamine.init();
        },
        searchTeamRelationManage() { // 触发子组件的方法 > 获取所有用户关联战队的申请
            this.$refs.teamRelationManage.init();
        },
        searchUpdateLog() { // 触发子组件的方法 > 获取所有用户关联战队的申请
            this.$refs.updateLog.searchUpdateLogBtn();
        },
        searchReplyMe() { // 触发子组件的方法 > 获取所有话题
            this.$refs.replyMe.searchReplyMeBtn();
        },
        searchPointer() { // 触发子组件的方法 > 获取所有反馈
            this.$refs.pointerManage.searchPointerBtn();
        },
        searchAllTopic() { // 触发子组件的方法 > 获取所有反馈
            this.$refs.topicManage.searchAllTopicBtn();
        },
        searchGameRole() { // 获取所有英雄
            this.$refs.gameRoleManage.init();
        },
        searchStarPower() { // 获取所有星徽之力
            this.$refs.starPowerManage.searchStarPowerBtn();
        },
        searchGadget() {// 获取随身妙具
            this.$refs.gadgetManage.init();
        },
        searchGear() {// 获取随身妙具
            this.$refs.gearManage.init();
        },
        searchOfficialVersionUpdateLog() {// 获取官方版本更新日志
            this.$refs.officialVersionUpdateLogManage.searchOfficialVersionUpdateLogBtn();
        },
        searchVisitLog() { // 获取所有登录日志
            this.$refs.visitLog.init();
        },

        // **********

        commonResponseChange(event) { // 通用信息 Toast 提示气泡
            this.commonResponseData = event;
        },
        showTeamDataModal(event) { // 战队数据 Modal 弹窗
            this.$refs.top.showTeamDataModal(event);
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
                    }, 1000);
                }
            )
        },
    },
};
</script>