<template>
    <div class="tab-pane fade" id="list-visitLog" role="tabpanel" aria-labelledby="list-visitLog-list">
        <br/>
        <div class="container text-center">
            <div class="row justify-content-center">
                <div class="col-3">
                    <div class="alert hyld-bg-8" role="alert">
                        <strong>本月注册人次：</strong>{{statisticalData.numberOfRegistrantsInThisMonth}}
                    </div>
                </div>
                <div class="col-3">
                    <div class="alert hyld-bg-30" role="alert">
                        <strong>本月登录人次：</strong>{{statisticalData.numberOfLoginInThisMonth}}
                    </div>
                </div>
                <div class="col-3">
                    <div class="alert hyld-bg-20" role="alert">
                        <strong>本月首页访问人次：</strong>{{statisticalData.numberOfVisitInThisMonth}}
                    </div>
                </div>
                <div class="col-3">
                    <div class="alert hyld-bg-26" role="alert">
                        <strong>总访问人次：</strong>{{statisticalData.totalVisits}}
                    </div>
                </div>
            </div>
        </div>

        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-1">
                <input type="text" class="form-control" placeholder="用户ID" v-model="searchVisitLogInfo.userId">
            </div>
            <div class="col-1">
                <input type="text" class="form-control" placeholder="用户名" v-model="searchVisitLogInfo.userName">
            </div>
            <div class="col-1">
                <input type="text" class="form-control" placeholder="所属地" v-model="searchVisitLogInfo.address">
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
                <button type="button" class="btn btn-dark" @click="searchVisitLogBtn()">搜索</button>
            </div>
        </form>

        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert">
                <h4><span class="badge rounded-pill bg-primary ">登录日志</span></h4>
            </caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">用户ID</th>
                    <th scope="col">用户名称</th>
                    <th scope="col">IP</th>
                    <th scope="col">所属地</th>
                    <th scope="col">真实详细所属地</th>
                    <th scope="col">操作时间</th>
                    <th scope="col">备注</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(visitLog, index) in visitLogList" :key="visitLog.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ visitLog.user == null ? "" : visitLog.user.id }}</td>
                    <td>{{ visitLog.user == null ? "游客" : visitLog.user.name }}</td>
                    <td>{{ visitLog.ip }}</td>
                    <td>{{ visitLog.address }}</td>
                    <td>{{ visitLog.trueAddress }}</td>
                    <td>{{ visitLog.createTimeStr }}</td>
                    <td>{{ visitLog.note }}</td>
                </tr>
            </tbody>
        </table>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import { Toast } from 'bootstrap';
import { searchVisitLog,getStatisticalData } from "../api/visitLog";
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