<template>
    <div class="tab-pane fade" id="list-visitLog" role="tabpanel" aria-labelledby="list-visitLog-list">
        <br/>
        <div class="container text-center">
            <div class="row justify-content-center">
                <div class="col-auto">
                    <h5><span class="badge rounded-pill text-bg-primary">本月注册人次：{{statisticalData.numberOfRegistrantsInThisMonth}}</span></h5>
                </div>
                <div class="col-auto">
                    <h5><span class="badge rounded-pill text-bg-primary">本月登录人次：{{statisticalData.numberOfLoginInThisMonth}}</span></h5>
                </div>
                <div class="col-auto">
                    <h5><span class="badge rounded-pill text-bg-primary">本月访问首页人次：{{statisticalData.numberOfVisitInThisMonth}}</span></h5>
                </div>
                <div class="col-auto">
                    <h5><span class="badge rounded-pill text-bg-primary">访问首页总人次：{{statisticalData.totalVisits}}</span></h5>
                </div>
            </div>
        </div>

        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3 align-items-center">
            <div class="col-1">
                <input type="text" class="form-control" placeholder="用户ID" v-model="searchVisitLogInfo.userId">
            </div>
            <div class="col-1">
                <input type="text" class="form-control" placeholder="用户名" v-model="searchVisitLogInfo.userName">
            </div>
            <div class="col-1">
                <input type="text" class="form-control" placeholder="所属地" v-model="searchVisitLogInfo.address">
            </div>
            <div class="col-2">
                <input type="text" class="form-control" placeholder="详细所属地" v-model="searchVisitLogInfo.trueAddress">
            </div>
            <div class="col-1">
                <input type="text" class="form-control" placeholder="备注" v-model="searchVisitLogInfo.note">
            </div>
            <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">起始时间:</label>
            </div>
            <div class="col-2">
                <input step=1 type="datetime-local" class="form-control" v-model="searchVisitLogInfo.startDate">
            </div>
            <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">结束时间:</label>
            </div>
            <div class="col-2">
                <input step=1 type="datetime-local" class="form-control" v-model="searchVisitLogInfo.endDate">
            </div>
            <div class="col-auto">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" v-model="searchVisitLogInfo.all">
                    <label class="form-check-label">包括非法请求</label>
                </div>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchVisitLogBtn()">搜索</button>
            </div>
        </form>

        <table class="table text-center table-hover caption-top">
            <!-- <caption class="text-center alert-primary" role="alert">
                <h4><span class="badge rounded-pill bg-primary ">平台访问日志</span></h4>
            </caption> -->
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">用户ID</th>
                    <th scope="col">用户名称</th>
                    <th scope="col">IP</th>
                    <th scope="col">所属地</th>
                    <th scope="col">详细所属地</th>
                    <th scope="col">操作时间</th>
                    <th scope="col">备注</th>
                </tr>
            </thead>
             <tbody class="table-group-divider">
                <tr v-for="(visitLog, index) in visitLogList" :key="visitLog.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ visitLog.user == null ? "" : visitLog.user.id }}</td>
                    <td>{{ visitLog.user == null ? "游客" : visitLog.user.name }}</td>
                    <td>{{ visitLog.ip }}</td>
                    <td>{{ visitLog.address }}</td>
                    <td>{{ visitLog.trueAddress }}</td>
                    <td>{{ visitLog.createTimeStr }}</td>
                    <!-- <td>{{ visitLog.note }}</td> -->
                    <td>
                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="visitLog.note==''?'无':visitLog.note" style="max-width: 240px;">
                            {{visitLog.note}}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import { Toast,Popover } from 'bootstrap';
import { searchVisitLog,getStatisticalData } from "../api/welcome";
export default {
    name: "visitLog",
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
            commonResponse: {
                success: true,
                msg: '',
            },
            visitLogList: [],
            searchVisitLogInfo: {},
            statisticalData:{},
        }
    },
    updated() { //更新之后.场景:获取更新真实DOM之后
    /**
     * 尝试一下放在 updated() 和 mounted() 中分别有什么区别
     */
    var popoverTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new Popover(popoverTriggerEl)
    });
    },
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchVisitLog();
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
            getStatisticalData().then(
                respons => {
                    this.statisticalData = respons.data.data;
                }
            );
            this.searchVisitLogBtn();
        },
        searchVisitLogBtn() {
            this.page.currentPage = 1;
            this.searchVisitLog();
        },
        searchVisitLog() {
            searchVisitLog(Object.assign(this.page, this.searchVisitLogInfo)).then(
                response => {
                    this.visitLogList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
    },
}
</script>