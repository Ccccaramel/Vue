<template>
    <div class="tab-pane fade" id="list-gameRoleManage" role="tabpanel" aria-labelledby="list-gameRoleManage-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="角色名称" v-model="searchGameRoleInfo.name">
            </div>
            <div class="col-auto">
                <select class="form-select" v-model="searchGameRoleInfo.rarity">
                    <option
                        v-for="gameRoleRarity in gameRoleRarityListOfSearch"
                        v-bind:key="gameRoleRarity.id"
                        :value="gameRoleRarity.id">
                        {{ gameRoleRarity.name }}</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchGameRoleBtn()">搜索</button>
            </div>

            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editGameRoleModal"
                    @click="addGameRoleBtn()">新增</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert">
                <h4><span class="badge rounded-pill bg-primary "></span></h4>
            </caption>
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">名称</th>
                    <th scope="col">头像</th>
                    <th scope="col">肖像</th>
                    <th scope="col">稀有度</th>
                    <th scope="col">定位</th><!-- 5 -->
                    <th scope="col">天赋</th>
                    <th scope="col">上线时间</th>
                    <th scope="col">生命值</th>
                    <th scope="col">移速</th>
                    <th scope="col">基础形态</th><!-- 10 -->
                    <th scope="col">描述</th>
                    <th scope="col">创建时间</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="gameRole in gameRoleList" :key="gameRole.id">
                    <!-- <th scope="row">{{ index + 1 }}</th> -->
                    <th scope="row">{{ gameRole.id }}</th>
                    <td>
                        <span class="d-inline-block text-truncate" data-bs-placement="top" data-bs-toggle="popover"
                            data-bs-trigger="hover focus" :data-bs-content="gameRole.name" style="max-width: 60px;">
                            {{ gameRole.name }}
                        </span>
                    </td>
                    <td>
                        <img class="col-auto rounded" :src="gameRole.headImgUrl" style="height:64px" />
                    </td>
                    <td>
                        <img class="col-auto rounded" :src="gameRole.portraitUrl" style="height:64px" />
                    </td>
                    <td>{{ gameRole.rarity.name }}</td>
                    <td>{{ gameRole.position.name }}</td><!-- 5 -->
                    <td>
                        <span class="d-inline-block text-truncate" data-bs-placement="top" data-bs-toggle="popover"
                            data-bs-trigger="hover focus" :data-bs-content="gameRole.inborn==''?'无':gameRole.inborn"
                            style="max-width: 60px;">
                            {{ gameRole.inborn }}
                        </span>
                    </td>
                    <td style="width:10%">{{ gameRole.launchTimeStr }}</td>
                    <td>{{ gameRole.hp }}</td>
                    <td>{{ gameRole.speed }}</td>
                    <td>{{ gameRole.basicForm==null ? '' : gameRole.basicForm.name }}</td><!-- 10 -->
                    <td>
                        <span class="d-inline-block text-truncate" data-bs-placement="top" data-bs-toggle="popover"
                            data-bs-trigger="hover focus" :data-bs-content="gameRole.profile" style="max-width: 60px;">
                            {{ gameRole.profile }}
                        </span>
                    </td>
                    <td style="width:10%">{{ gameRole.createTimeStr }}</td><!-- 10 -->
                    <td>{{ gameRole.note }}</td>
                    <td style="width:5%">
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal"
                            data-bs-target="#editGameRoleModal" @click="editGameRoleBtn(gameRole)">编辑</span>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal"
                            data-bs-target="#showNormalAttackModal" @click="showNormalAttack(gameRole)">普通攻击</span>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal"
                            data-bs-target="#showSuperSkillModal" @click="showSuperSkill(gameRole)">超级技能</span>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal"
                            data-bs-target="#showGameRoleCommentModal" @click="showGameRoleComment(gameRole)">评价管理</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 新增&编辑游戏角色 -->
        <div class="modal fade" id="editGameRoleModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{gameRoleInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="gameRoleInfo.name"
                                                required>
                                            <label for="floatingInput">角色名称</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <select class="form-select" v-model="gameRoleInfo.rarity">
                                                <option v-for="gameRoleRarity in gameRoleRarityList"
                                                    :key="gameRoleRarity.id" :value="gameRoleRarity.id">
                                                    {{gameRoleRarity.name}}</option>
                                            </select>
                                            <label>稀有度</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <select class="form-select" v-model="gameRoleInfo.position">
                                                <option v-for="gameRolePosition in gameRolePositionList"
                                                    :key="gameRolePosition.id" :value="gameRolePosition.id">
                                                    {{gameRolePosition.name}}</option>
                                            </select>
                                            <label>定位</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input step=1 type="datetime-local" class="form-control"
                                                v-model="gameRoleInfo.launchTime">
                                            <label>上线时间</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col-2">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="gameRoleInfo.hp" required>
                                            <label for="floatingInput">生命值</label>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="gameRoleInfo.speed"
                                                required>
                                            <label for="floatingInput">移速</label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-floating mb-3">
                                            <!-- <input type="text" class="form-control" v-model="gameRoleInfo.inborn"> -->
                                            <textarea class="form-control" v-model="gameRoleInfo.inborn"
                                                style="height:64px"></textarea>
                                            <label for="floatingInput">天赋</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <textarea class="form-control" v-model="gameRoleInfo.profile" required
                                                style="height:128px"></textarea>
                                            <label>角色描述</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <!-- 头像 -->
                                        <div class="mb-3">
                                            <div class="input-group mb-3">
                                                <label class="input-group-text">选择头像</label>
                                                <input type="file" id="headImg" class="form-control"
                                                    @change="tirggerFile($event,'headImg','headImgUrl')" required>
                                            </div>
                                        </div>
                                        <!-- 回显 -->
                                        <div class="input-group mb-3">
                                            <div class="form-floating text-center"
                                                :style="gameRoleInfo.headImgUrl==''?'height: 0px;':'height: 48px;'">
                                                <img v-if="gameRoleInfo.headImgUrl!=''" :src="gameRoleInfo.headImgUrl"
                                                    class="rounded"
                                                    :style="gameRoleInfo.headImgUrl==''?'height: 0px;':'height: 48px;'" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <!-- 肖像 -->
                                        <div class="mb-3">
                                            <div class="input-group mb-3">
                                                <label class="input-group-text">选择肖像</label>
                                                <input type="file" id="portrait" class="form-control"
                                                    @change="tirggerFile($event,'portrait','portraitUrl')" required>
                                            </div>
                                        </div>
                                        <!-- 回显 -->
                                        <div class="input-group mb-3">
                                            <div class="form-floating text-center"
                                                :style="gameRoleInfo.portraitUrl==''?'height: 0px;':'height: 164px;'">
                                                <img v-if="gameRoleInfo.portraitUrl!=''" :src="gameRoleInfo.portraitUrl"
                                                    class="rounded"
                                                    :style="gameRoleInfo.portraitUrl==''?'height: 0px;':'height: 164px;'" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <select class="form-select" v-model="gameRoleInfo.basicForm">
                                                <option v-for="basicForm in basicFormList" :key="basicForm.id"
                                                    :value="basicForm.id">
                                                    {{basicForm.name}}</option>
                                            </select>
                                            <label>基础形态</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="gameRoleInfo.sequence">
                                            <label for="floatingInput">序号</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="gameRoleInfo.note">
                                            <label for="floatingInput">备注</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeEditGameRoleModal"
                            data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveGameRole()">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 普通攻击 -->

        <!-- 展示游戏角色的普通攻击 -->
        <div class="modal fade" id="showNormalAttackModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{showNormalAttackTitle}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="container text-center">
                            <div class="row align-items-start">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editNormalAttackModal"
                                            @click="addNormalAttackBtn()">新增</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br/>

                        <div class="container text-center">
                            <div class="row align-items-start">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <table class="table text-center table-hover caption-top">
                                            <!-- <caption class="text-center alert-primary" role="alert">
                                                <h4><span class="badge rounded-pill bg-primary ">{{gameRoleName}}</span></h4>
                                            </caption> -->
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">名称</th>
                                                    <th scope="col">效果描述</th>
                                                    <th scope="col">创建时间</th>
                                                    <th scope="col">备注</th>
                                                    <th scope="col">操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(normalAttack, index) in normalAttackList" :key="normalAttack.id">
                                                    <th scope="row">{{ index + 1 }}</th>
                                                    <td>{{ normalAttack.name }}</td>
                                                    <td style="width:40%">{{ normalAttack.details }}</td>
                                                    <td>{{ normalAttack.createTimeStr }}</td>
                                                    <td>{{ normalAttack.note }}</td>
                                                    <td>
                                                        <span class="btn badge rounded-pill bg-primary"
                                                            data-bs-toggle="modal" data-bs-target="#editNormalAttackModal"
                                                            @click="editNormalAttackBtn(normalAttack)">编辑</span>
                                                        <span class="btn badge rounded-pill bg-success ms-1"
                                                            data-bs-toggle="modal" data-bs-target="#showNormalAttackAttributeModal"
                                                            @click="showNormalAttackAttributeBtn(normalAttack)">属性</span>
                                                        <span class="btn badge rounded-pill bg-danger ms-1"
                                                            @click="deleteNormalAttackBtn(normalAttack)">删除</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Page :commonPage="normalAttackPage" @commonPageChange="normalAttackPageChange($event)"></Page>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 新增&编辑游戏角色的普通攻击 -->
        <div class="modal fade" id="editNormalAttackModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{normalAttackInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control"
                                                v-model="normalAttackInfo.name" required>
                                            <label for="floatingInput">普通攻击名称</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <textarea class="form-control" v-model="normalAttackInfo.details" required style="height:128px"></textarea>
                                            <label>描述</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="normalAttackInfo.note">
                                            <label for="floatingInput">备注</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeEditNormalAttackModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#showNormalAttackModal"
                            id="toShowNormalAttackModal" @click="toShowNormalAttackModal()">返回</button>
                        <button type="button" class="btn btn-primary" @click="saveNormalAttack()">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 展示游戏角色的普通攻击的属性 -->
        <div class="modal fade" id="showNormalAttackAttributeModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{showNormalAttackAttributeTitle}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="container text-center">
                            <div class="row align-items-start">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editNormalAttackAttributeModal"
                                            @click="addNormalAttackAttributeBtn()">新增</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br/>

                        <div class="container text-center">
                            <div class="row align-items-start">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <table class="table text-center table-hover caption-top">
                                            <!-- <caption class="text-center alert-primary" role="alert">
                                                <h4><span class="badge rounded-pill bg-primary ">{{gameRoleName}}</span></h4>
                                            </caption> -->
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">名称</th>
                                                    <th scope="col">效果描述</th>
                                                    <th scope="col">创建时间</th>
                                                    <th scope="col">备注</th>
                                                    <th scope="col">操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(normalAttackAttribute, index) in normalAttackAttributeList" :key="normalAttackAttribute.id">
                                                    <th scope="row">{{ index + 1 }}</th>
                                                    <td>{{ normalAttackAttribute.name }}</td>
                                                    <td>{{ normalAttackAttribute.details }}</td>
                                                    <td>{{ normalAttackAttribute.createTimeStr }}</td>
                                                    <td>{{ normalAttackAttribute.note }}</td>
                                                    <td>
                                                        <span class="btn badge rounded-pill bg-primary"
                                                            data-bs-toggle="modal" data-bs-target="#editNormalAttackAttributeModal"
                                                            @click="editNormalAttackAttributeBtn(normalAttackAttribute)">编辑</span>
                                                        <span class="btn badge rounded-pill bg-danger ms-1"
                                                            @click="deleteNormalAttackAttributeBtn(normalAttackAttribute)">删除</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Page :commonPage="normalAttackAttributePage" @commonPageChange="normalAttackAttributePageChange($event)"></Page>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#showNormalAttackModal">返回</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 新增&编辑游戏角色的普通攻击的属性 -->
        <div class="modal fade" id="editNormalAttackAttributeModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{normalAttackAttributeInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control"
                                                v-model="normalAttackAttributeInfo.name" required>
                                            <label for="floatingInput">属性名称</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <textarea class="form-control" v-model="normalAttackAttributeInfo.details" required style="height:128px"></textarea>
                                            <label>描述</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="normalAttackAttributeInfo.note">
                                            <label for="floatingInput">备注</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeEditNormalAttackAttributeModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#showNormalAttackAttributeModal"
                            id="toShowNormalAttackAttributeModal" @click="toShowNormalAttackAttributeModal()">返回</button>
                        <button type="button" class="btn btn-primary" @click="saveNormalAttackAttribute()">保存</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 超级技能 -->

        <!-- 展示游戏角色的超级技能 -->
        <div class="modal fade" id="showSuperSkillModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{showSuperSkillTitle}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="container text-center">
                            <div class="row align-items-start">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editSuperSkillModal"
                                            @click="addSuperSkillBtn()">新增</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br/>

                        <div class="container text-center">
                            <div class="row align-items-start">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <table class="table text-center table-hover caption-top">
                                            <!-- <caption class="text-center alert-primary" role="alert">
                                                <h4><span class="badge rounded-pill bg-primary ">{{gameRoleName}}</span></h4>
                                            </caption> -->
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">名称</th>
                                                    <th scope="col">效果描述</th>
                                                    <th scope="col">创建时间</th>
                                                    <th scope="col">备注</th>
                                                    <th scope="col">操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(superSkill, index) in superSkillList" :key="superSkill.id">
                                                    <th scope="row">{{ index + 1 }}</th>
                                                    <td>{{ superSkill.name }}</td>
                                                    <td style="width:40%">{{ superSkill.details }}</td>
                                                    <td>{{ superSkill.createTimeStr }}</td>
                                                    <td>{{ superSkill.note }}</td>
                                                    <td>
                                                        <span class="btn badge rounded-pill bg-primary"
                                                            data-bs-toggle="modal" data-bs-target="#editSuperSkillModal"
                                                            @click="editSuperSkillBtn(superSkill)">编辑</span>
                                                        <span class="btn badge rounded-pill bg-success ms-1"
                                                            data-bs-toggle="modal" data-bs-target="#showSuperSkillAttributeModal"
                                                            @click="showSuperSkillAttributeBtn(superSkill)">属性</span>
                                                        <span class="btn badge rounded-pill bg-danger ms-1"
                                                            @click="deleteSuperSkillBtn(superSkill)">删除</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Page :commonPage="superSkillPage" @commonPageChange="superSkillPageChange($event)"></Page>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 新增&编辑游戏角色的超级技能 -->
        <div class="modal fade" id="editSuperSkillModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{superSkillInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control"
                                                v-model="superSkillInfo.name" required>
                                            <label for="floatingInput">超级技能名称</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <textarea class="form-control" v-model="superSkillInfo.details" required style="height:128px"></textarea>
                                            <label>描述</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="superSkillInfo.note">
                                            <label for="floatingInput">备注</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeEditSuperSkillModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#showSuperSkillModal"
                            id="toShowSuperSkillModal" @click="toShowSuperSkillModal()">返回</button>
                        <button type="button" class="btn btn-primary" @click="saveSuperSkill()">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 展示游戏角色的超级技能的属性 -->
        <div class="modal fade" id="showSuperSkillAttributeModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{showSuperSkillAttributeTitle}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="container text-center">
                            <div class="row align-items-start">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editSuperSkillAttributeModal"
                                            @click="addSuperSkillAttributeBtn()">新增</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br/>

                        <div class="container text-center">
                            <div class="row align-items-start">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <table class="table text-center table-hover caption-top">
                                            <!-- <caption class="text-center alert-primary" role="alert">
                                                <h4><span class="badge rounded-pill bg-primary ">{{gameRoleName}}</span></h4>
                                            </caption> -->
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">名称</th>
                                                    <th scope="col">效果描述</th>
                                                    <th scope="col">创建时间</th>
                                                    <th scope="col">备注</th>
                                                    <th scope="col">操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(superSkillAttribute, index) in superSkillAttributeList" :key="superSkillAttribute.id">
                                                    <th scope="row">{{ index + 1 }}</th>
                                                    <td>{{ superSkillAttribute.name }}</td>
                                                    <td>{{ superSkillAttribute.details }}</td>
                                                    <td>{{ superSkillAttribute.createTimeStr }}</td>
                                                    <td>{{ superSkillAttribute.note }}</td>
                                                    <td>
                                                        <span class="btn badge rounded-pill bg-primary"
                                                            data-bs-toggle="modal" data-bs-target="#editSuperSkillAttributeModal"
                                                            @click="editSuperSkillAttributeBtn(superSkillAttribute)">编辑</span>
                                                        <span class="btn badge rounded-pill bg-danger ms-1"
                                                            @click="deleteSuperSkillAttributeBtn(superSkillAttribute)">删除</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Page :commonPage="superSkillAttributePage" @commonPageChange="superSkillAttributePageChange($event)"></Page>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#showSuperSkillModal">返回</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 新增&编辑游戏角色的超级技能的属性 -->
        <div class="modal fade" id="editSuperSkillAttributeModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{superSkillAttributeInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control"
                                                v-model="superSkillAttributeInfo.name" required>
                                            <label for="floatingInput">属性名称</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <textarea class="form-control" v-model="superSkillAttributeInfo.details" required style="height:128px"></textarea>
                                            <label>描述</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container text-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" v-model="superSkillAttributeInfo.note">
                                            <label for="floatingInput">备注</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeEditSuperSkillAttributeModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#showSuperSkillAttributeModal"
                            id="toShowSuperSkillAttributeModal" @click="toShowSuperSkillAttributeModal()">返回</button>
                        <button type="button" class="btn btn-primary" @click="saveSuperSkillAttribute()">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 展示游戏角色评论 -->
        <div class="modal fade" id="showGameRoleCommentModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{showSuperSkillTitle}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3 mt-1 mb-3">
                            <div class="container text-center">
                                <div class="row justify-content-center">
                                    <div class="col-auto">
                                        <input type="text" class="form-control" placeholder="用户名称" v-model="searchGameRoleCommentInfo.userName">
                                    </div>
                                    <div class="col-auto">
                                        <input type="text" class="form-control" placeholder="内容" v-model="searchGameRoleCommentInfo.text">
                                    </div>
                                    <div class="col-auto">
                                        <button type="button" class="btn btn-dark" @click="searchGameRoleComment()">搜索</button>
                                    </div>                                    
                                </div>

                            </div>
                        </form>
                        <br/>
                        <div class="container text-center">
                            <div class="row align-items-start">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <table class="table text-center table-hover caption-top">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">用户</th>
                                                    <th scope="col">回复内容</th>
                                                    <th scope="col">所属楼层</th>
                                                    <th scope="col">创建时间</th>
                                                    <th scope="col">状态</th>
                                                    <th scope="col">备注</th>
                                                    <th scope="col">操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(gameRoleComment, index) in gameRoleCommentList" :key="gameRoleComment.id">
                                                    <th scope="row">{{ index + 1 }}</th>
                                                    <td>{{ gameRoleComment.userInfo.name }}</td>
                                                    <td style="width:30%">{{ gameRoleComment.text }}</td>
                                                    <td>{{ gameRoleComment.belongToFloor }}</td>
                                                    <td style="width:20%">{{ gameRoleComment.createTimeStr }}</td>
                                                    <td>{{ gameRoleComment.status.name }}</td>
                                                    <td>{{ gameRoleComment.note }}</td>
                                                    <td>
                                                        <span class="btn badge rounded-pill bg-success ms-1"
                                                            @click="recoveryGameRoleComment(gameRoleComment)">恢复</span>
                                                        <span class="btn badge rounded-pill bg-danger ms-1"
                                                            @click="deleteGameRoleComment(gameRoleComment)">删除</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Page :commonPage="gameRoleCommentPage" @commonPageChange="gameRoleCommentPageChange($event)"></Page>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>

        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';

import { Modal, Toast, Popover } from 'bootstrap';
import { getGameRoleRarity, getGameRolePosition } from "../api/dictionary";
import { searchGameRole, saveGameRole, getBasicForm } from "../api/gameRole";
import { searchNormalAttack, saveNormalAttack, deleteNormalAttack } from "../api/normalAttack";
import { searchNormalAttackAttribute, saveNormalAttackAttribute, deleteNormalAttackAttribute } from "../api/normalAttackAttribute";
import { searchSuperSkill, saveSuperSkill, deleteSuperSkill } from "../api/superSkill";
import { searchSuperSkillAttribute, saveSuperSkillAttribute, deleteSuperSkillAttribute } from "../api/superSkillAttribute";
import { getAllGameRoleComment,deleteGameRoleComment,recoveryGameRoleComment } from "../api/gameRoleComment";
 
import { getToday } from "../api/common";
export default {
    name: "gameRoleManage",
    components: {
        Page,
    },
    data() {
        return {
            page: {
                size: 10,
                currentPage: 1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            normalAttackPage: {
                size: 10,
                currentPage: 1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            normalAttackAttributePage: {
                size: 10,
                currentPage: 1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            superSkillPage: {
                size: 10,
                currentPage: 1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            superSkillAttributePage: {
                size: 10,
                currentPage: 1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            gameRoleCommentPage: {
                size: 10,
                currentPage: 1, // 偏移量,数据库从0开始
                totalPage: 0,
            },
            commonResponse: {
                success: true,
                msg: '',
            },
            gameRoleList: [],
            searchGameRoleInfo: {
                text: '',
            },
            gameRoleInfo: {
                add: true,
                title: '',
                id: 0,
                name: '',
                rarity: 0,
                position: 0,
                launchTime: '',
                hp: 0,
                speed: '',
                inborn: '',
                profile: '',
                basicForm: '',
                sequence: 1,
                note: '',
                headImg: '',
                portrait: '',
                headImgUrl: '',
                portraitUrl: '',
            },
            headImg: {},
            portrait: {},
            gameRoleRarityList: [], // 稀有度
            gameRolePositionList: [], // 定位
            basicFormList: [], // 基础形态
            normalAttackInfo: {
                add: true,
                title: '',
                id:0,
                name: '',
                details: '',
                note: ''
            }, // 普通攻击描述
            normalAttackList: [], // 普通攻击信息
            gameRoleId: 0, // 编辑/新增 普通攻击/超级技能 时保存游戏角色的 id
            gameRoleName: '', // 编辑/新增 普通攻击/超级技能 时保存游戏角色的 name
            normalAttackId: 0, // 编辑/新增 普通攻击/超级技能 属性保存游戏角色的 id
            normalAttackName: '', // 编辑/新增 普通攻击/超级技能 属性时保存游戏角色的 name
            showNormalAttackTitle: '', // 展示普通攻击标题
            showNormalAttackAttributeTitle: '', // 展示普通攻击属性标题
            normalAttackAttributeList: [],
            normalAttackAttributeInfo: {
                add: true,
                title: '',
                id:0,
                name: '',
                details: '',
                note: ''
            },
            superSkillId: 0,
            superSkillName: '',
            showSuperSkillTitle: '',
            showSuperSkillAttributeTitle: '',
            superSkillList: [],
            superSkillAttributeInfo: {
                add: true,
                title: '',
                id:0,
                name: '',
                details: '',
                note: ''
            },
            superSkillAttributeList:[],
            superSkillInfo: {
                add: true,
                title: '',
                id:0,
                name: '',
                details: '',
                note: ''
            },
            gameRoleCommentList:[],
            searchGameRoleCommentInfo: {
                show:false,
            },
            gameRoleRarityListOfSearch:[],
        }
    },
    updated() { //更新之后.场景:获取更新真实DOM之后
        var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new Popover(popoverTriggerEl)
        });
    },
    watch: {
        // 监听对象,注意设置 deep:true
        teamInfo: {
            handler() {
                this.checkTeamInfo();
            },
            deep: true
        },
        gameRoleInfo: {
            handler() {
                this.checkCheckData();
            },
            deep: true
        },
    },
    mounted() {
    },
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchGameRole();
        },
        normalAttackPageChange(event) { // 普通攻击分页
            this.normalAttackPage = event;
            this.searchNormalAttack();
        },
        normalAttackAttributePageChange(event) { // 普通攻击属性分页
            this.normalAttackAttributePage = event;
            this.searchNormalAttackAttribute();
        },
        superSkillPageChange(event) { // 超级技能分页
            this.superSkillPage = event;
            this.searchSuperSkill();
        },
        superSkillAttributePageChange(event) { // 超级技能属性分页
            this.superSkillAttributePage = event;
            this.searchSuperSkillAttribute();
        },
        gameRoleCommentPageChange(event) { // 评价分页
            this.gameRoleCommentPage = event;
            // this.searchSuperSkillAttribute();
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
        init() {
            getGameRoleRarity().then(
                response => {
                    this.gameRoleRarityList = response.data.data;
                    this.gameRoleRarityListOfSearch = JSON.parse(JSON.stringify(response.data.data)); // 深拷贝
                    this.gameRoleRarityListOfSearch.unshift({
                        id: '',
                        name:'无限制'
                    });
                    this.gameRoleInfo.rarity = this.gameRoleRarityList[0].id;
                    this.searchGameRoleInfo.rarity = this.gameRoleRarityListOfSearch[0].id;
                }
            ).then(
                getGameRolePosition().then(
                    response => {
                        this.gameRolePositionList = response.data.data;
                        this.gameRoleInfo.position = this.gameRolePositionList[0].id;
                        this.refreshBasicFormList();
                        this.searchGameRoleBtn();
                    }
                ),
            );
        },
        refreshBasicFormList() {
            getBasicForm().then(
                response => {
                    this.basicFormList = response.data.data;
                    this.basicFormList.unshift({
                        id: -1,
                        name: '<无>',
                    });
                }
            )
        },
        searchGameRoleBtn() {
            this.page.currentPage = 1;
            this.searchGameRole();
        },
        addGameRoleBtn() {
            this.cleanGameRoleInfo();
            this.gameRoleInfo.add = true;
            this.gameRoleInfo.title = "新增游戏角色";
            this.refreshBasicFormList();
        },
        editGameRoleBtn(gameRole) {
            this.gameRoleInfo.add = false;
            this.gameRoleInfo.title = "编辑游戏角色信息";
            this.gameRoleInfo.id = gameRole.id;
            this.gameRoleInfo.name = gameRole.name;
            this.gameRoleInfo.headImg = gameRole.headImg == null ? '' : gameRole.headImg;
            this.gameRoleInfo.portrait = gameRole.portrait == null ? '' : gameRole.portrait;
            this.gameRoleInfo.headImgUrl = gameRole.headImgUrl;
            this.gameRoleInfo.portraitUrl = gameRole.portraitUrl;
            this.gameRoleInfo.rarity = gameRole.rarity.id;
            this.gameRoleInfo.position = gameRole.position.id;
            this.gameRoleInfo.launchTime = gameRole.launchTime;
            this.gameRoleInfo.hp = gameRole.hp;
            this.gameRoleInfo.speed = gameRole.speed;
            this.gameRoleInfo.inborn = gameRole.inborn;
            this.gameRoleInfo.profile = gameRole.profile;
            this.gameRoleInfo.basicForm = gameRole.basicForm == null ? -1 : gameRole.basicForm.id;
            this.gameRoleInfo.sequence = gameRole.sequence;
            this.gameRoleInfo.note = gameRole.note;
            document.getElementById("headImg").value = '';
            document.getElementById("portrait").value = '';
            this.refreshBasicFormList();
        },
        searchNormalAttack() {
            searchNormalAttack(Object.assign({
                gameRoleId : this.gameRoleId
            },this.normalAttackPage)).then(
                response => {
                    this.normalAttackList = response.data.data.data;
                    this.normalAttackPage.totalPage = response.data.data.totalPage;
                }
            );
        },
        searchGameRole() {
            searchGameRole(Object.assign(this.page, this.searchGameRoleInfo)).then(
                response => {
                    this.gameRoleList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        // 预览上传图片
        tirggerFile(event, elementId, fileVal) {
            var filetypes = [".jpg", ".png"];
            var file = event.target.files[0];
            if (event.target.files.length == 0) {
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '未选择图片'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                this.gameRoleInfo[fileVal] = '';
                this.showToast(checkInfo);
                return;
            };
            var fileName = file.name;
            this.copyFile(file, elementId);
            if (filetypes.indexOf(fileName.substring(fileName.lastIndexOf("."))) == -1) { // 检查文件类型
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '图片的格式不支持,支持的格式: jpg png'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                this.gameRoleInfo[fileVal] = '';
                this.showToast(checkInfo);
                return;
            }
            if (file == null) {
                this.gameRoleInfo[fileVal] = '';
            }
            if (file.size > (1 * 1024 * 1024)) { // 检查文件大小
                var checkInfo = {
                    data: {
                        code: '0',
                        msg: '图片大小不能超过 1M(你的图片:' + (file.size / 1024 / 1024).toFixed(2) + 'M)'
                    }
                }
                var obj = document.getElementById(elementId);
                obj.value = '';
                this.gameRoleInfo[fileVal] = '';
                this.showToast(checkInfo);
                return;
            }
            this.file = file;
            let url = '';
            var reader = new FileReader();
            reader.readAsDataURL(file);
            const that = this;
            reader.onload = function (e) {
                url = this.result.substring(this.result.indexOf(',') + 1); // 图像预显base64路径
                that.gameRoleInfo[fileVal] = 'data:image/png;base64,' + url;
            };
        },
        copyFile(file, elementId) {
            if (elementId == 'portrait') {
                this.portrait = file;
            }
            else if (elementId == 'headImg') {
                this.headImg = file;
            }
        },
        checkCheckData() {
            if (this.gameRoleInfo.portraitUrl == '' || this.gameRoleInfo.headImgUrl == '') {
                this.saveTeamCheckDataBtn = true;
            }
            else {
                this.saveTeamCheckDataBtn = false;
            }
        },
        cleanGameRoleInfo() {
            this.gameRoleInfo.add = true;
            this.gameRoleInfo.title = '';
            this.gameRoleInfo.id = 0;
            this.gameRoleInfo.name = '';
            this.gameRoleInfo.rarity = this.gameRoleRarityList[0].id;;
            this.gameRoleInfo.position = this.gameRolePositionList[0].id;
            this.gameRoleInfo.launchTime = getToday() + 'T17:00:00';
            this.gameRoleInfo.hp = 0;
            this.gameRoleInfo.speed = '';
            this.gameRoleInfo.inborn = '';
            this.gameRoleInfo.profile = '';
            this.gameRoleInfo.basicForm = -1;
            this.gameRoleInfo.sequence = '';
            this.gameRoleInfo.note = '';
            this.gameRoleInfo.headImg = '';
            this.gameRoleInfo.portrait = '';
            this.gameRoleInfo.headImgUrl = '';
            this.gameRoleInfo.portraitUrl = '';
            document.getElementById("headImg").value = '';
            document.getElementById("portrait").value = '';
            this.headImg = {};
            this.portrait = {};
        },
        saveGameRole() {
            var forms = new FormData();
            forms.append('headImg', this.headImg);
            forms.append('portrait', this.portrait);
            forms.append('gameRoleVoStr', JSON.stringify(this.gameRoleInfo));
            saveGameRole(forms).then(
                response => {
                    document.getElementById("closeEditGameRoleModal").click();
                    this.showToast(response);
                    this.searchGameRoleBtn();
                }
            )
        },
        showNormalAttack(gameRole) {
            this.normalAttackInfo.gameRoleId = gameRole.id;
            this.gameRoleId = gameRole.id;
            this.gameRoleName = gameRole.name;
            this.showNormalAttackTitle = gameRole.name+'-普通攻击';
            this.searchNormalAttack();
        },
        addNormalAttackBtn() {
            this.normalAttackInfo.add = true;
            this.normalAttackInfo.title = "新增普通攻击";
            this.normalAttackInfo.id = 0;
            this.normalAttackInfo.name = '';
            this.normalAttackInfo.details = '';
            this.normalAttackInfo.note = '';
        },
        editNormalAttackBtn(normalAttack) {
            this.normalAttackInfo.add = false;
            this.normalAttackInfo.title = "编辑普通攻击";
            this.normalAttackInfo.id = normalAttack.id;
            this.normalAttackInfo.name = normalAttack.name;
            this.normalAttackInfo.details = normalAttack.details;
            this.normalAttackInfo.note = normalAttack.note;
        },
        deleteNormalAttackBtn(normalAttack) {
            deleteNormalAttack(Object.assign({
                id:normalAttack.id
            })).then(
                response => {
                    this.showToast(response);
                    this.searchNormalAttack();
                }
            )
        },
        saveNormalAttack() {
            saveNormalAttack(this.normalAttackInfo).then(
                response => {
                    if (response.data.code==1) {
                        document.getElementById("toShowNormalAttackModal").click();
                    }
                    this.showToast(response);
                }
            )
        },
        toShowNormalAttackModal() {
            this.searchNormalAttack();
        },
        showNormalAttackAttributeBtn(normalAttack) {
            this.normalAttackAttributeInfo.normalAttackId = normalAttack.id;
            this.normalAttackId = normalAttack.id;
            this.showNormalAttackAttributeTitle = this.gameRoleName+'-'+normalAttack.name+'-普通攻击属性';
            this.searchNormalAttackAttribute();
        },
        searchNormalAttackAttribute(){
            searchNormalAttackAttribute(Object.assign({
                normalAttackId : this.normalAttackId
            },this.normalAttackAttributePage)).then(
                response => {
                    this.normalAttackAttributeList = response.data.data.data;
                    this.normalAttackAttributePage.totalPage = response.data.data.totalPage;
                }
            )
        },
        addNormalAttackAttributeBtn() {
            this.normalAttackAttributeInfo.add = true;
            this.normalAttackAttributeInfo.title = "新增普通攻击属性";
            this.normalAttackAttributeInfo.id = 0;
            this.normalAttackAttributeInfo.name = '';
            this.normalAttackAttributeInfo.details = '';
            this.normalAttackAttributeInfo.note = '';
        },
        editNormalAttackAttributeBtn(normalAttackAttribute) {
            this.normalAttackAttributeInfo.add = false;
            this.normalAttackAttributeInfo.title = "编辑普通攻击属性";
            this.normalAttackAttributeInfo.id = normalAttackAttribute.id;
            this.normalAttackAttributeInfo.name = normalAttackAttribute.name;
            this.normalAttackAttributeInfo.details = normalAttackAttribute.details;
            this.normalAttackAttributeInfo.note = normalAttackAttribute.note;
        },
        saveNormalAttackAttribute() {
            saveNormalAttackAttribute(this.normalAttackAttributeInfo).then(
                response => {
                    if (response.data.code==1) {
                        document.getElementById("toShowNormalAttackAttributeModal").click();
                    }
                    this.showToast(response);
                }
            )
        },
        toShowNormalAttackAttributeModal() {
            this.searchNormalAttackAttribute();
        },
        deleteNormalAttackAttributeBtn(normalAttackAttribute) {
            deleteNormalAttackAttribute(Object.assign({
                id:normalAttackAttribute.id
            })).then(
                response => {
                    this.showToast(response);
                    this.searchNormalAttackAttribute();
                }
            )
        },
        showSuperSkill(gameRole) {
            this.superSkillInfo.gameRoleId = gameRole.id;
            this.gameRoleId = gameRole.id;
            this.gameRoleName = gameRole.name;
            this.showSuperSkillTitle = gameRole.name+'-超级技能';
            this.searchSuperSkill();
        },
        addSuperSkillBtn() {
            this.superSkillInfo.add = true;
            this.superSkillInfo.title = "新增超级技能";
            this.superSkillInfo.id = 0;
            this.superSkillInfo.name = '';
            this.superSkillInfo.details = '';
            this.superSkillInfo.note = '';
        },
        editSuperSkillBtn(superSkill) {
            this.superSkillInfo.add = false;
            this.superSkillInfo.title = "编辑超级技能";
            this.superSkillInfo.id = superSkill.id;
            this.superSkillInfo.name = superSkill.name;
            this.superSkillInfo.details = superSkill.details;
            this.superSkillInfo.note = superSkill.note;
        },
        deleteSuperSkillBtn(superSkill) {
            deleteSuperSkill(Object.assign({
                id:superSkill.id
            })).then(
                response => {
                    this.showToast(response);
                    this.searchSuperSkill();
                }
            )
        },
        searchSuperSkill() {
            searchSuperSkill(Object.assign({
                gameRoleId : this.gameRoleId
            },this.superSkillPage)).then(
                response => {
                    this.superSkillList = response.data.data.data;
                    this.superSkillPage.totalPage = response.data.data.totalPage;
                }
            );
        },
        showSuperSkillAttributeBtn(superSkill) {
            this.superSkillAttributeInfo.superSkillId = superSkill.id;
            this.superSkillId = superSkill.id;
            this.showSuperSkillAttributeTitle = this.gameRoleName+'-'+superSkill.name+'-超级技能属性';
            this.searchSuperSkillAttribute();
        },
        addSuperSkillAttributeBtn() {
            this.superSkillAttributeInfo.add = true;
            this.superSkillAttributeInfo.title = "新增超级技能属性";
            this.superSkillAttributeInfo.id = 0;
            this.superSkillAttributeInfo.name = '';
            this.superSkillAttributeInfo.details = '';
            this.superSkillAttributeInfo.note = '';
        },
        editSuperSkillAttributeBtn(superSkillAttribute) {
            this.superSkillAttributeInfo.add = false;
            this.superSkillAttributeInfo.title = "编辑超级技能属性";
            this.superSkillAttributeInfo.id = superSkillAttribute.id;
            this.superSkillAttributeInfo.name = superSkillAttribute.name;
            this.superSkillAttributeInfo.details = superSkillAttribute.details;
            this.superSkillAttributeInfo.note = superSkillAttribute.note;
        },
        deleteSuperSkillAttributeBtn(superSkillAttribute) {
            deleteSuperSkillAttribute(Object.assign({
                id:superSkillAttribute.id
            })).then(
                response => {
                    this.showToast(response);
                    this.searchSuperSkillAttribute();
                }
            )
        },
        toShowSuperSkillAttributeModal() {
            this.searchSuperSkillAttribute();
        },
        searchSuperSkillAttribute(){
            searchSuperSkillAttribute(Object.assign({
                superSkillId : this.superSkillId
            },this.superSkillAttributePage)).then(
                response => {
                    this.superSkillAttributeList = response.data.data.data;
                    this.superSkillAttributePage.totalPage = response.data.data.totalPage;
                }
            )
        },
        saveSuperSkill() {
            saveSuperSkill(this.superSkillInfo).then(
                response => {
                    if (response.data.code==1) {
                        document.getElementById("toShowSuperSkillModal").click();
                    }
                    this.showToast(response);
                }
            )
        },
        toShowSuperSkillModal() {
            this.searchSuperSkill();
        },
        saveSuperSkillAttribute() {
            saveSuperSkillAttribute(this.superSkillAttributeInfo).then(
                response => {
                    if (response.data.code==1) {
                        document.getElementById("toShowSuperSkillAttributeModal").click();
                    }
                    this.showToast(response);
                }
            )
        },
        showGameRoleComment(gameRole) {
            this.searchGameRoleCommentInfo.gameRoleId = gameRole.id;
            this.searchGameRoleComment();
        },
        searchGameRoleComment() {
            this.gameRoleCommentPage.currentPage = 1;
            this.getAllGameRoleComment();
        },
        getAllGameRoleComment(){
            getAllGameRoleComment(this.searchGameRoleCommentInfo,this.gameRoleCommentPage).then(
                response => {
                    this.gameRoleCommentList = response.data.data.data;
                    this.gameRoleCommentPage.totalPage = response.data.data.totalPage;
                }
            )
        },
        recoveryGameRoleComment(gameRoleComment) {
            recoveryGameRoleComment(Object.assign({
                id:  gameRoleComment.id
            })).then(
                response => {
                    this.showToast(response);
                    this.getAllGameRoleComment();
                }
            )
        },
        deleteGameRoleComment(gameRoleComment) {
            deleteGameRoleComment(Object.assign({
                id:  gameRoleComment.id
            })).then(
                response => {
                    this.showToast(response);
                    this.getAllGameRoleComment();
                }
            )
        },

    },
}
</script>