<template>
    <div class="tab-pane fade" id="list-visitLog" role="tabpanel" aria-labelledby="list-visitLog-list">
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert">
                <h4><span class="badge rounded-pill bg-primary ">登录日志</span></h4>
            </caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">用户名</th>
                    <th scope="col">更新日志内容</th>
                    <th scope="col">登录时间</th>
                    <th scope="col">备注</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(visitLog, index) in visitLogList" :key="visitLog.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ visitLog.name }}</td>
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
import { searchVisitLog } from "../api/visitLog";
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
        }
    },
    methods: {
        commonPageChange(event) { // 通用分页
            this.page = event;
            this.searchOfficialVersionUpdateLog();
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
        searchVisitLog() {
            searchVisitLog(this.page).then(
                response => {
                    this.visitLogList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
    },
}
</script>