<template>
    <div class="tab-pane fade" id="list-myBill" role="tabpanel" aria-labelledby="list-myBill-list">

        <!-- 在累计计算时没有对不同货币金额进行拆分计算 -->
        <div class="container text-center mt-2">
            <div class="row justify-content-center">
                <div class="col-auto">
                    <h5><span class="badge rounded-pill text-bg-primary">本月已消费：{{billStatistics.thisMonth}}</span></h5>
                </div>
                <div class="col-auto">
                    <h5><span class="badge rounded-pill text-bg-primary">上月消费：{{billStatistics.lastMonth}}</span></h5>
                </div>
                <div class="col-auto">
                    <h5><span class="badge rounded-pill text-bg-primary">历史最高月消费：{{billStatistics.maxMonth}}</span></h5>
                </div>
                <div class="col-auto">
                    <h5><span class="badge rounded-pill text-bg-primary">历史最低月消费：{{billStatistics.minMonth}}</span></h5>
                </div>
                <div class="col-auto">
                    <h5><span class="badge rounded-pill text-bg-primary">总消费：{{billStatistics.total}}</span></h5>
                </div>
            </div>
        </div>


        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-2">
                <input type="text" class="form-control" placeholder="名称" v-model="bill.name">
            </div>
            <div class="col-auto">
                <select class="form-select" v-model="bill.type">
                    <option v-for="billType in billTypeListOfSearch"
                        v-bind:key="billType.id" :value="billType.id">
                        {{ billType.name }}</option>
                </select>
            </div>
            <div class="col-auto">
                <select class="form-select" v-model="bill.weight">
                    <option v-for="billWeight in billWeightListOfSearch"
                        :key="billWeight.id" :value="billWeight.id">
                        {{billWeight.name}}</option>
                </select>
            </div>
            <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">起始时间:</label>
            </div>
            <div class="col-2">
                <input step=1 type="datetime-local" class="form-control" v-model="bill.startDate">
            </div>
            <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">结束时间:</label>
            </div>
            <div class="col-2">
                <input step=1 type="datetime-local" class="form-control" v-model="bill.endDate">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="cleanBillBtn()">清空</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchBillBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#billModal" @click="addBillBtn()">添加</button>
            </div>
        </form>
        <table class="table-group-divider table table-hover caption-top">
            <caption>
                <h6><span class="btn badge text-bg-primary" data-bs-toggle="modal" data-bs-target="#trendModal" @click="billTrend()">消费趋势</span></h6>
                <!-- <div class="container text-center">
                    <div class="row">
                        <div class="col-md-2 offset-md-5">
                            <h4><span class="badge rounded-pill bg-primary">我的账单</span></h4>
                        </div>
                        <div class="col-md-1 offset-md-4">
                            <h6><span class="btn badge bg-light text-dark" data-bs-toggle="modal" data-bs-target="#trendModal" @click="billTrend()">消费趋势</span></h6>
                        </div>
                    </div>
                </div> -->
            </caption>
            <thead class="text-center">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">名称</th>
                    <th scope="col">金额</th>
                    <th scope="col">货币类型</th>
                    <th scope="col">类型</th>
                    <th scope="col">权值</th>
                    <th scope="col">详情</th>
                    <th scope="col">消费时间</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody class="text-center table-group-divider">
                <tr v-for="(billInfo, index) in billInfoList" :key="billInfo.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content='billInfo.name == "" ? "无" : billInfo.name' style="max-width: 240px;">
                            {{billInfo.name}}
                        </span>
                    </td>
                    <td>{{ billInfo.value }}</td>
                    <td>{{ billInfo.currencyType.name}}</td>
                    <td>{{ billInfo.type.name }}</td>
                    <td>{{ billInfo.weight.name }}</td>
                    <td>
                        <span class="d-inline-block text-truncate" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="top" :data-bs-content="billInfo.detail==''?'无':''+billInfo.detail" style="max-width: 240px;">
                            {{billInfo.detail}}
                        </span>
                    </td>
                    <td>{{ billInfo.expenseTimeStr }}</td>
                    <td>{{ billInfo.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-danger ms-1 me-1" @click="deleteBill(billInfo.id)">删除</span>
                        <span class="btn badge rounded-pill bg-primary ms-1 me-1" data-bs-toggle="modal" data-bs-target="#billModal" @click="editBill(billInfo)">编辑</span>
                    </td>
                </tr>
            </tbody>
        </table>

         <!-- 新增 & 编辑 -->
        <div class="modal fade" id="billModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{billVo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- 如果仅判断输入框中是否有填入数据,可以使用下述 class 并将又要判断的加上 required 即可 -->
                        <!-- <form class="was-validated" novalidate> -->
                        <form> <!-- 如果需要自定义判断,添加 is-invalid 或 is-valid 即可 -->
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" :class="billVoNameValid?'form-control is-valid':'form-control is-invalid'" v-model="billVo.name">
                                    <label>名称</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" :class="billVoValueValid?'form-control is-valid':'form-control is-invalid'" v-model="billVo.value">
                                    <label>金额</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <select class="form-select" v-model="billVo.currencyType">
                                        <option v-for="currencyType in currencyTypeList"
                                            :key="currencyType.id" :value="currencyType.id">
                                            {{currencyType.name}}</option>
                                    </select>
                                    <label>货币类型</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <select class="form-select" v-model="billVo.type">
                                        <option v-for="billType in billTypeList"
                                            :key="billType.id" :value="billType.id">
                                            {{billType.name}}</option>
                                    </select>
                                    <label>类型</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <select class="form-select" v-model="billVo.weight">
                                        <option v-for="billWeight in billWeightList"
                                            :key="billWeight.id" :value="billWeight.id">
                                            {{billWeight.name}}</option>
                                    </select>
                                    <label>权值</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <!-- <input type="text" class="form-control"> -->
                                    <textarea class="form-control" placeholder="Leave a comment here" style="height: 100px" v-model="billVo.detail"></textarea>
                                    <label>明细</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input step=1 type="datetime-local" class="form-control" v-model="billVo.expenseTime">
                                    <label>消费时间</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="billVo.note">
                                    <label>备注</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="cleanBillVo()" v-if="billVo.add">清空</button>
                        <button type="button" class="btn btn-secondary" id="closeBillModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveBillVo()" :disabled="saveBillVoBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import {Modal,Toast,Popover } from 'bootstrap';
import { getBillType, getBillWeight, getCurrencyType } from "../api/dictionary";
import { saveBill,searchBill,deleteBill,getBillStatistics,getBillTrendData } from "../api/bill";

import { getToday,amountFormatCheck } from "../api/common";
export default {
    name: "myBill",
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
            commonResponse: {
                success: true,
                msg: '',
            },
            trendModalData: { // 通用折线图 Modal 弹窗数据
                title: '',
                data: []
            },
            saveBillVoBtn:false,
            dictionaryList: [],
            bill: {
                name: '',
                value: 0,
                detail: '',
                type: 0,
                weight: 0,
                expenseTime: '', // 重置日期
                startTime: '',
                endTime: ''
            },
            billVo: {
                add: true,
                title: '',
                id: '',
                name: '',
                value: 0,
                weight: 0,
                type: 0,
                expenseTime: '' // 重置日期
            },
            billTypeList: [],
            billWeightList: [],
            billWeightListOfSearch:[],
            billTypeListOfSearch:[],
            currencyTypeList: [],
            billVoNameValid: false,
            billVoValueValid: false,
            billInfoList: [],
            billStatistics: {
                thisMonth: 0,
                lastMonth: 0,
                maxMonth: 0,
                minMonth: 0,
                total: 0,
            }
        }
    },
    watch: {
        billVo: {
            handler() {
                this.checkBillVo();
            },
            deep: true,
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
    mounted() {
    },
    methods: {
        commonPageChange(event) {
            this.page = event;
            this.searchBill();
        },
        showToast(response) { // 通用信息展示
            if(response.data.code==0){
                this.commonResponse.success= false;
            }else{
                this.commonResponse.success = true;
            }
            this.commonResponse.msg= response.data.msg;
            this.$emit('commonResponse', this.commonResponse);
            var toastLiveExample = document.getElementById('commonToast');
            var toast = new Toast(toastLiveExample);
            toast.show();
        },
        init() {
            getBillType().then(
                response=>{
                    this.billTypeList = response.data.data;
                    this.billVo.type = this.billTypeList[0].id;
                    this.billTypeListOfSearch = JSON.parse(JSON.stringify(response.data.data)); // 深拷贝
                    this.billTypeListOfSearch.unshift({
                        id: '',
                        name:'无限制'
                    });
                    this.bill.type = this.billTypeListOfSearch[0].id;
                }
            );
            getBillWeight().then(
                response => {
                    this.billWeightList = response.data.data;
                    this.billVo.weight = this.billWeightList[0].id;
                    this.billWeightListOfSearch = JSON.parse(JSON.stringify(response.data.data)); // 深拷贝
                    this.billWeightListOfSearch.unshift({
                        id: '',
                        name:'无限制'
                    });
                    this.bill.weight = this.billWeightListOfSearch[0].id;
                }
            );
            getCurrencyType().then(
                response => {
                    this.currencyTypeList = response.data.data;
                    this.billVo.currencyType = this.currencyTypeList[0].id;
                }
            );
            this.searchBill();
            this.getBillStatistics();
        },
        getBillStatistics() {
            getBillStatistics().then(
                repsonse => {
                    this.billStatistics.thisMonth = repsonse.data.data.thisMonth;
                    this.billStatistics.lastMonth = repsonse.data.data.lastMonth;
                    this.billStatistics.maxMonth = repsonse.data.data.maxMonth;
                    this.billStatistics.minMonth = repsonse.data.data.minMonth;
                    this.billStatistics.total = repsonse.data.data.total;
                }
            )
        },
        addBillBtn() {
            this.cleanBillVo();
        },
        cleanBillBtn() {
            this.bill.name = '';
            this.bill.type = '';
            this.bill.weight = '';
            this.bill.startDate = '';
            this.bill.endDate = '';
        },
        cleanBillVo() {
            this.billVo = {
                add: true,
                title : '新增账单',
                name: '',
                value: 0,
                currencyType : this.currencyTypeList[0].id,
                detail: '',
                type: this.billTypeList[0].id,
                weight: this.billWeightList[0].id,
                expenseTime: getToday()+'T18:00:00', // 重置日期
            }
        },
        saveBillVo() {
            saveBill(this.billVo).then(
                response => {
                    this.showToast(response);
                    document.getElementById("closeBillModal").click();
                    this.searchBillBtn();
                }
            )
        },
        searchBillBtn() {
            this.page.currentPage = 1;
            this.searchBill();
        },
        editBill(billInfo) {
            this.billVo.add = false;
            this.billVo.title = '编辑账单';
            this.billVo.id = billInfo.id;
            this.billVo.name = billInfo.name;
            this.billVo.value = billInfo.value;
            this.billVo.type = billInfo.type.id;
            this.billVo.weight = billInfo.weight.id;
            this.billVo.currencyType = billInfo.currencyType.id;
            this.billVo.detail = billInfo.detail;
            this.billVo.expenseTime = billInfo.expenseTime;
            this.billVo.note = billInfo.note;
        },
        searchBill() {
            searchBill(Object.assign(this.page,this.bill)).then(
                response => {
                    this.billInfoList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        billTrend() {
            this.trendModalData.title = "账单记录";
            this.trendModalData.data = [];
            getBillTrendData().then(
                response => {
                    this.trendModalData.data.push({
                        name: '月消费趋势图',
                        id: 1, // 待优化
                        data: response.data.data
                    });
                    console.log(">>>"+JSON.stringify(this.trendModalData));
                    this.$emit('showTrendModal', this.trendModalData);
                    // var toastLiveExample = document.getElementById('trendModal');
                    // let toast = new Toast(toastLiveExample);
                    // toast.show();
                }
            );
        },
        deleteBill(billId) {
            deleteBill(Object.assign({
                id: billId
            })).then(
                response => {
                    if(response.data.code==1){
                        document.getElementById("closeBillModal").click();
                        this.searchBillBtn();
                    }
                    this.showToast(response);
                }
            )
        },
        checkBillVo() {
            if (amountFormatCheck(this.billVo.value)) {
                this.billVoValueValid = true;
            }
            else {
                this.billVoValueValid=false;
            }
            if (this.billVo.name == '') {
                this.billVoNameValid=false;
            }
            else {
                this.billVoNameValid=true;
            }
            if (this.billVoNameValid&&this.billVoValueValid) {
                this.saveBillVoBtn = false;
            } else {
                this.saveBillVoBtn = true;
            }
        }
    },
}
</script>