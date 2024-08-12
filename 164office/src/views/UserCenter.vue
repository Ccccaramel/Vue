<template>
    <div>
        <Top ref="top" :commonResponse="commonResponseData"></Top>

        <div class="row" style="margin-right: 0px;">

            <div class="col-2">
                <main>
                    <div class="flex-shrink-0 p-3" role="tablist" style="width: 280px;">

                        <a class="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
                            <span :class="'fs-5 fw-semibold ding-text-'+ greetingsColor" >{{greetings}}&ensp;<font-awesome-icon :icon="['fas', 'clover']" spin /></span>
                        </a>

                        <ul class="list-unstyled ps-0">
                            
                            <li class="mb-1">
                                <button id="menu-1" @click="changeMenu(1)" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#base-collapse" aria-expanded="true">
                                    <font-awesome-icon icon="fa-solid fa-house-user"/>&ensp;<Strong>个人中心</Strong>
                                </button>
                                <div class="collapse show" id="base-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded active" id="list-userInfo-list"
                                                data-bs-toggle="list" href="#list-userInfo" role="tab" aria-controls="list-userInfo"
                                                @click="getCurrentUserInfo()" v-if="this.power.indexOf('userInfoManage')!=-1">个人信息</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="mb-1" v-if="this.power.indexOf('blogCenter')!=-1">
                                <button id="menu-2" @click="changeMenu(2)" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#blogCenter-collapse" aria-expanded="false">
                                    <font-awesome-icon icon="pen-to-square" />&ensp;<Strong>博客中心</Strong>
                                </button>
                                <div class="collapse" id="blogCenter-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-myBlog-list"
                                                data-bs-toggle="list" href="#list-myBlog" role="tab" aria-controls="list-myBlog"
                                                @click="searchMyBlog()" v-if="this.power.indexOf('myBlog')!=-1">我的博客</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-blogCollection-list"
                                                data-bs-toggle="list" href="#list-blogCollection" role="tab" aria-controls="list-blogCollection"
                                                @click="searchBlogCollection()" v-if="this.power.indexOf('blogCollection')!=-1">博客收藏夹</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="mb-1" v-if="this.power.indexOf('financeCenter')!=-1">
                                <button id="menu-3" @click="changeMenu(3)" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#financeCenter-collapse" aria-expanded="false">
                                    <font-awesome-icon :icon="['fas', 'file-invoice-dollar']" />&ensp;<Strong>财务中心</Strong>
                                </button>
                                <div class="collapse" id="financeCenter-collapse">
                                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li>
                                        <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-myBill-list"
                                            data-bs-toggle="list" href="#list-myBill" role="tab" aria-controls="list-myBill"
                                            @click="searchMyBill()" v-if="this.power.indexOf('myBill')!=-1">我的账单</a>
                                    </li>
                                </ul>
                                </div>
                            </li>
                            
                            <li class="mb-1" v-if="this.power.indexOf('musicCenter')!=-1">
                                <button id="menu-4" @click="changeMenu(4)" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#musicCenter-collapse" aria-expanded="false">
                                    <font-awesome-icon :icon="['fas', 'headphones-simple']" />&ensp;<Strong>Music中心</Strong>
                                </button>
                                <div class="collapse" id="musicCenter-collapse">
                                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li>
                                        <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-musicManage-list"
                                            data-bs-toggle="list" href="#list-musicManage" role="tab" aria-controls="list-musicManage"
                                            @click="searchMusic()" v-if="this.power.indexOf('musicManage')!=-1">Music管理</a>
                                    </li>
                                </ul>
                                </div>
                            </li>

                            <li class="mb-1" v-if="this.power.indexOf('communityManage')!=-1">
                                <button id="menu-9" @click="changeMenu(9)" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#communityManage-collapse" aria-expanded="false">
                                    <font-awesome-icon :icon="['fas', 'comments']" />&ensp;<Strong>社区管理</Strong>
                                </button>
                                <div class="collapse" id="communityManage-collapse">
                                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li>
                                        <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-myTopic-list"
                                            data-bs-toggle="list" href="#list-myTopic" role="tab" aria-controls="list-myTopic"
                                            @click="searchMyTopic()" v-if="this.power.indexOf('myTopic')!=-1">我的话题</a>
                                    </li>
                                    <li>
                                        <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-replyMe-list"
                                            data-bs-toggle="list" href="#list-replyMe" role="tab" aria-controls="list-replyMe"
                                            @click="searchReplyMe()" v-if="this.power.indexOf('replyMe')!=-1">回复我的</a>
                                    </li>
                                    <li>
                                        <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-topicManage-list"
                                            data-bs-toggle="list" href="#list-topicManage" role="tab" aria-controls="list-topicManage"
                                            @click="searchAllTopic()" v-if="this.power.indexOf('topicManage')!=-1">话题管理</a>
                                    </li>
                                </ul>
                                </div>
                            </li>

                            <li class="mb-1" v-if="this.power.indexOf('bsCenter')!=-1">
                                <button id="menu-5" @click="changeMenu(5)" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#bsCenter-collapse" aria-expanded="false">
                                    <font-awesome-icon icon="fa-solid fa-wrench" />&ensp;<Strong>BS中心</Strong>
                                </button>
                                <div class="collapse" id="bsCenter-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-myGameAccount-list"
                                                data-bs-toggle="list" href="#list-myGameAccount" role="tab"
                                                aria-controls="list-myGameAccount" @click="searchMyGameAccount()" v-if="this.power.indexOf('myGameAccount')!=-1">我的游戏账号</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-myTeam-list"
                                                data-bs-toggle="list" href="#list-myTeam" role="tab" aria-controls="list-myTeam"
                                                @click="searchMyTeam()" v-if="this.power.indexOf('myTeam')!=-1">我的战队</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-myTeamMember-list"
                                                data-bs-toggle="list" href="#list-myTeamMember" role="tab"
                                                aria-controls="list-myTeamMember" @click="searchMyTeamMember()" v-if="this.power.indexOf('myTeamMember')!=-1">战队成员</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-teamMemberScoreboard-list"
                                                data-bs-toggle="list" href="#list-teamMemberScoreboard" role="tab"
                                                aria-controls="list-teamMemberScoreboard"
                                                @click="getTeamMemberScoreboard()" v-if="this.power.indexOf('teamMatchStatistics')!=-1">战队竞赛统计</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-credit-list"
                                                data-bs-toggle="list" href="#list-credit" role="tab" aria-controls="list-credit"
                                                @click="searchCreditBy()" v-if="this.power.indexOf('credit')!=-1">战队赛积分明细</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="mb-1" v-if="this.power.indexOf('systemManage')!=-1">
                                <button id="menu-6" @click="changeMenu(6)" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#systemManage-collapse" aria-expanded="false">
                                    <font-awesome-icon icon="fa-solid fa-gears" />&ensp;<Strong>系统管理</Strong>
                                </button>
                                <div class="collapse" id="systemManage-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-resourceManage-list"
                                                data-bs-toggle="list" href="#list-resourceManage" role="tab"
                                                aria-controls="list-resourceManage" @click="searchResource()" v-if="this.power.indexOf('resourceManage')!=-1">资源管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-user-list"
                                                data-bs-toggle="list" href="#list-user" role="tab" aria-controls="list-user"
                                                @click="searchUser()" v-if="this.power.indexOf('userManage')!=-1">用户管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-dictionary-list"
                                                data-bs-toggle="list" href="#list-dictionary" role="tab" aria-controls="list-dictionary"
                                                @click="searchDictionary()" v-if="this.power.indexOf('dictionaryManage')!=-1">字典表管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-role-list"
                                                data-bs-toggle="list" href="#list-role" role="tab" aria-controls="list-role"
                                                @click="getAllRole()" v-if="this.power.indexOf('roleManage')!=-1">角色管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-menuManage-list"
                                                data-bs-toggle="list" href="#list-menuManage" role="tab" aria-controls="list-menuManage"
                                                @click="getMenuTree()" v-if="this.power.indexOf('menuManage')!=-1">菜单管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-systemConfig-list"
                                                data-bs-toggle="list" href="#list-systemConfig" role="tab" aria-controls="list-systemConfig"
                                                @click="searchSystemConfig()" v-if="this.power.indexOf('systemConfig')!=-1">系统配置</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-superBagManage-list"
                                                data-bs-toggle="list" href="#list-superBagManage" role="tab" aria-controls="list-superBagManage"
                                                @click="searchSuperBag()" v-if="this.power.indexOf('superBagManage')!=-1">百宝袋管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-updateLogManage-list"
                                                data-bs-toggle="list" href="#list-updateLogManage" role="tab" aria-controls="list-updateLogManage"
                                                @click="searchUpdateLog()" v-if="this.power.indexOf('updateLogManage')!=-1">平台更新日志</a>
                                        </li>

                                    </ul>
                                </div>
                            </li>

                            <li class="mb-1" v-if="this.power.indexOf('bsManage')!=-1">
                                <button id="menu-7" @click="changeMenu(7)" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#bsManage-collapse" aria-expanded="false">
                                    <font-awesome-icon icon="fa-solid fa-book-skull" />&ensp;<Strong>BS管理</Strong>
                                </button>
                                <div class="collapse" id="bsManage-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-player-list"
                                                data-bs-toggle="list" href="#list-player" role="tab" aria-controls="list-player"
                                                @click="searchPlayer()" v-if="this.power.indexOf('playerManage')!=-1">游戏账号管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-teamManage-list"
                                                data-bs-toggle="list" href="#list-teamManage" role="tab"
                                                aria-controls="list-teamManage" @click="searchAllTeam()" v-if="this.power.indexOf('teamManage')!=-1">战队管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-playerExamine-list"
                                                data-bs-toggle="list" href="#list-playerExamine" role="tab"
                                                aria-controls="list-playerExamine" @click="searchPlayerExamine()" v-if="this.power.indexOf('playerExamine')!=-1">关联游戏账号申请</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-teamRelationManage-list"
                                                data-bs-toggle="list" href="#list-teamRelationManage" role="tab"
                                                aria-controls="list-teamRelationManage"
                                                @click="searchTeamRelationManage()" v-if="this.power.indexOf('teamRelationManage')!=-1">战队关联管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-gameRoleManage-list"
                                                data-bs-toggle="list" href="#list-gameRoleManage" role="tab" aria-controls="list-gameRoleManage"
                                                @click="searchGameRole()" v-if="this.power.indexOf('gameRoleManage')!=-1">游戏角色管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-starPowerManage-list"
                                                data-bs-toggle="list" href="#list-starPowerManage" role="tab" aria-controls="list-starPowerManage"
                                                @click="searchStarPower()" v-if="this.power.indexOf('starPowerManage')!=-1">星徽之力管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-gadgetManage-list"
                                                data-bs-toggle="list" href="#list-gadgetManage" role="tab" aria-controls="list-gadgetManage"
                                                @click="searchGadget()" v-if="this.power.indexOf('gadgetManage')!=-1">随身妙具管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-gearManage-list"
                                                data-bs-toggle="list" href="#list-gearManage" role="tab" aria-controls="list-gearManage"
                                                @click="searchGear()" v-if="this.power.indexOf('gearManage')!=-1">强化装备管理</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-officialVersionUpdateLogManage-list"
                                                data-bs-toggle="list" href="#list-officialVersionUpdateLogManage" role="tab" aria-controls="list-officialVersionUpdateLogManage"
                                                @click="searchOfficialVersionUpdateLog()" v-if="this.power.indexOf('officialVersionUpdateLogManage')!=-1">官方版本更新日志管理</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="mb-1" v-if="this.power.indexOf('interactiveManage')!=-1">
                                <button id="menu-8" @click="changeMenu(8)" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#interactiveManage-collapse" aria-expanded="false">
                                    <font-awesome-icon icon="fa-solid fa-arrow-right-arrow-left" />&ensp;<Strong>交互管理</Strong>
                                </button>
                                <div class="collapse" id="interactiveManage-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-pointer-list"
                                                data-bs-toggle="list" href="#list-pointer" role="tab" aria-controls="list-pointer"
                                                @click="searchPointer()" v-if="this.power.indexOf('pointerManage')!=-1">用户反馈</a>
                                        </li>
                                        <li>
                                            <a class="link-body-emphasis d-inline-flex text-decoration-none rounded" id="list-visitLog-list"
                                                data-bs-toggle="list" href="#list-visitLog" role="tab" aria-controls="list-visitLog"
                                                @click="searchVisitLog()" v-if="this.power.indexOf('visitLog')!=-1">访问日志</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="border-top my-3"></li>
                            <button type="button" class="btn btn-outline-dark" @click="logout()">退出</button>
                        </ul>
                            
                    </div>
                </main>
            </div>

            <div class="col-10">
                <div class="tab-content shadow p-3 mb-5 bg-body-tertiary rounded" id="nav-tabContent">
                    <!-- ****** 公共菜单 ****** -->
                    <!-- 用户个人信息 -->
                    <UserInfo ref="userInfo" @commonResponse="commonResponseChange($event)"></UserInfo>
                    <!-- 我的游戏账号 -->
                    <MyGameAccount ref="myGameAccount" @commonResponse="commonResponseChange($event)"></MyGameAccount>
                    <!-- 我的战队 -->
                    <MyTeam ref="myTeam" @commonResponse="commonResponseChange($event)" @showTrendModal="showTrendModal($event)"></MyTeam>
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

                    <!-- ****** 博客中心 ****** -->
                    <!-- 我的博客 -->
                    <MyBlog ref="myBlog" @commonResponse="commonResponseChange($event)"></MyBlog>
                    <!-- blogCollection -->
                    <BlogCollection ref="blogCollection" @commonResponse="commonResponseChange($event)"></BlogCollection>

                    <!-- ****** 财务中心 ****** -->
                    <!-- 我的账单 -->
                    <MyBill ref="myBill" @commonResponse="commonResponseChange($event)"  @showTrendModal="showTrendModal($event)"></MyBill>

                    <!-- ****** Music中心 ****** -->
                    <!-- Music管理 -->
                    <MusicManage ref="musicManage" @commonResponse="commonResponseChange($event)"></MusicManage>

                    <!-- ****** 平台管理 ****** -->
                    <!-- 头像管理 -->
                    <ResourceManage ref="resourceManage" @commonResponse="commonResponseChange($event)"></ResourceManage>
                    <!-- 用户管理 -->
                    <User ref="user" @commonResponse="commonResponseChange($event)"></User>
                    <!-- 游戏账号管理 -->
                    <Player ref="player" @commonResponse="commonResponseChange($event)"></Player>
                    <!-- 战队管理 -->
                    <TeamManage ref="teamManage" @commonResponse="commonResponseChange($event)"></TeamManage>
                    <!-- 关联游戏账号关联申请 -->
                    <PlayerExamine ref="playerExamine" @commonResponse="commonResponseChange($event)"></PlayerExamine>
                    <!-- 战队关联申请 -->
                    <TeamRelationManage ref="teamRelationManage" @commonResponse="commonResponseChange($event)"></TeamRelationManage>
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
                    <!-- 百宝箱管理 -->
                    <SuperBagManage ref="superBagManage" @commonResponse="commonResponseChange($event)"></SuperBagManage>

                    <!-- ****** 游戏资源管理 ****** -->
                    <!-- 游戏角色管理 -->
                    <GameRoleManage ref="gameRoleManage" @commonResponse="commonResponseChange($event)"></GameRoleManage>
                    <!-- 星徽之力管理 -->
                    <StarPowerManage ref="starPowerManage" @commonResponse="commonResponseChange($event)"></StarPowerManage>
                    <!-- 随身妙具管理 -->
                    <GadgetManage ref="gadgetManage" @commonResponse="commonResponseChange($event)"></GadgetManage>
                    <!-- 强化装备管理 -->
                    <GearManage ref="gearManage" @commonResponse="commonResponseChange($event)"></GearManage>
                    <!-- 官方版本更新日志管理 -->
                    <OfficialVersionUpdateLogManage ref="officialVersionUpdateLogManage" @commonResponse="commonResponseChange($event)"></OfficialVersionUpdateLogManage>



                    <!-- ****** 交互管理 ****** -->
                    <!-- 更新日志 -->
                    <UpdateLogManage ref="updateLogManage" @commonResponse="commonResponseChange($event)"></UpdateLogManage>
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
import ResourceManage from "@/components/ResourceManage.vue";
import PlayerExamine from "@/components/PlayerExamine.vue";
import TeamRelationManage from "@/components/TeamRelationManage.vue";
import UpdateLogManage from "@/components/UpdateLogManage.vue";
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
import SuperBagManage from "@/components/SuperBagManage.vue";
import MyBill from "@/components/MyBill.vue";
import MusicManage from "@/components/MusicManage.vue";
import MyBlog from "@/components/MyBlog.vue";
import BlogCollection from "@/components/BlogCollection.vue";
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
        ResourceManage,
        PlayerExamine,
        TeamRelationManage,
        UpdateLogManage,
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
        SuperBagManage,
        MyBlog,
        BlogCollection,
        MyBill,
        MusicManage,
        power: [],
    },
    data() {
        return {
            commonResponseData: { // Modal 弹窗数据
                success: true,
                msg: '',
            },
            greetings:"你好！",  // 问候语
            greetingsColor: 1,  // 问候语颜色序号
            lock: false,  // 点击菜单触发标记
            menuBox: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  // 菜单状态记录,多添加几个0元素
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

        this.initGreetings();
    },
    watch: {
    },
    mounted() {
        document.title = "用户中心";
        this.getCurrentUserInfo();
    },
    methods: {
        initGreetings() {  // 生成问候语以及随机颜色选择
            var time = new Date();
            var h = time.getHours();
            if (h<6) {
                this.greetings = "Zzzzzzz!";
            }
            else if (h<9) {
                this.greetings = "早上好!";
            }
            else if (h<12) {
                this.greetings = "上午好!";
            }
            else if (h<14) {
                this.greetings = "中午好!";
            }
            else if (h<18) {
                this.greetings = "下午好!";
            }
            else if (h<22) {
                this.greetings = "晚上好!";
            }
            else {
                this.greetings = "晚安!";
            }
            this.greetingsColor = Math.floor(Math.random()*6)+1;

        },
        changeMenu(index) {  // 关掉上一个菜单,点击太快会失效
            if (!this.lock) {  // 人为触发
                console.log("人为触发 index:"+index);
                this.lock = true;
                for (let i = 0; i < this.menuBox.length; i++) {
                    if (this.menuBox[i] == 1&&index!=(i+1)) {
                        document.getElementById("menu-" + (i + 1)).click();
                        this.menuBox[i] = 0;
                    }
                }
            this.menuBox[index - 1] = this.menuBox[index - 1] == 0 ? 1 : 0;
            console.log("人为触发end index:"+index);
                this.lock = false;
            }
        },
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

        searchMyBlog() { // 获取用户所有博客
            this.$refs.myBlog.init(); // 父组件触发子组件的方法
        },

        searchBlogCollection() {  // 获取用户收藏的所有博客
            this.$refs.blogCollection.init(); // 父组件触发子组件的方法
        },

        searchMyBill() { // 获取用户所有账单
            this.$refs.myBill.init();
        },

        searchMusic() { // 获取music信息
            this.$refs.musicManage.init();
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
        searchSuperBag() { // 触发子组件的方法 > 获取所有系统配置
            this.$refs.superBagManage.init();
        },
        searchResource() { // 触发子组件的方法 > 获取所有头像
            this.$refs.resourceManage.init();
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
            this.$refs.updateLogManage.init();
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
        searchGadget() { // 获取随身妙具
            this.$refs.gadgetManage.init();
        },
        searchGear() { // 获取随身妙具
            this.$refs.gearManage.init();
        },
        searchOfficialVersionUpdateLog() { // 获取官方版本更新日志
            this.$refs.officialVersionUpdateLogManage.searchOfficialVersionUpdateLogBtn();
        },
        searchVisitLog() { // 获取所有平台访问日志
            this.$refs.visitLog.init();
        },

        // **********

        commonResponseChange(event) { // 通用信息 Toast 提示气泡
            this.commonResponseData = event;
        },
        showTrendModal(event) { // 战队数据 Modal 弹窗
            console.log(">"+JSON.stringify(event));
            this.$refs.top.showTrendModal(event);
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