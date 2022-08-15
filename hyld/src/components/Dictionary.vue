<template>
    <div class="tab-pane fade" id="list-dictionary" role="tabpanel" aria-labelledby="list-dictionary-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="名称" v-model="searchDictionaryInfo.name">
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="类型" v-model="searchDictionaryInfo.type">
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="类型名称" v-model="searchDictionaryInfo.typeName">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="cleanSearchDictionaryBtn()">清空</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchDictionaryBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#dictionaryInfoModal" @click="addDictionaryBtn()">添加</button>
            </div>
        </form>
        <table class="table text-center table-hover caption-top">
            <caption class="text-center alert-primary" role="alert"><h4><span class="badge rounded-pill bg-primary "></span></h4></caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">名称</th>
                    <th scope="col">对应值</th>
                    <th scope="col">类型名称</th>
                    <th scope="col">类型</th>
                    <th scope="col">备注</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dictionary, index) in dictionaryList" :key="dictionary.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ dictionary.id }}</td>
                    <td>{{ dictionary.name }}</td>
                    <td>{{ dictionary.value }}</td>
                    <td>{{ dictionary.typeName }}</td>
                    <td>{{ dictionary.type }}</td>
                    <td>{{ dictionary.note }}</td>
                    <td>
                        <span class="btn badge rounded-pill bg-primary" data-bs-toggle="modal" data-bs-target="#dictionaryInfoModal" @click="editDictionary(dictionary)">编辑</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <!-- 新增 & 编辑 -->
        <div class="modal fade" id="dictionaryInfoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title align-items-center">{{dictionaryInfo.title}}</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="was-validated" novalidate>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="dictionaryInfo.id" required>
                                    <label>ID</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="dictionaryInfo.name" required>
                                    <label>名称</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="dictionaryInfo.value" required>
                                    <label>对应值</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="dictionaryInfo.typeName" required>
                                    <label>类型名称</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="dictionaryInfo.type" required>
                                    <label>类型</label>
                                </div>
                            </div>
                            <div class="col-md mb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="dictionaryInfo.note">
                                    <label>备注</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="cleanDictionaryInfo()" v-if="dictionaryInfo.add">清空</button>
                        <button type="button" class="btn btn-secondary" id="closeDictionaryInfoModal" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveDictionaryInfo()" :disabled="saveDictionaryInfoBtn">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :commonPage="page"  @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';

import {Modal,Toast} from 'bootstrap';
import { searchDictionary,saveDictionaryInfo } from "../api/dictionary";
export default {
    name: "dictionary",
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
            saveDictionaryInfoBtn:false,
            dictionaryList: [],
            searchDictionaryInfo: {
                name: '',
                type: '',
                typeName: '',
            },
            dictionaryInfo: {
                add: true,
                title: '',
                id: '',
                value: '',
                name: '',
                type: '',
                typeName: '',
            }
        }
    },
    watch: {
        dictionaryInfo: {
            handler(newVal) {
                console.log(">>"+JSON.stringify(newVal));
                this.checkDictionaryInfo();
            },
            deep: true,
        }
    },
    mounted() {
    },
    methods: {
        commonPageChange(event) {
            this.page = event;
            this.searchDictionary();
        },
        cleanSearchDictionaryBtn() {
            this.searchDictionaryInfo = {
                name: '',
                type: '',
                typeName: '',
            }
        },
        searchDictionaryBtn() {
            this.page.currentPage = 1;
            this.searchDictionary();
        },
        addDictionaryBtn() {
            this.dictionaryInfo.add = true;
            this.dictionaryInfo.title = '新增字典';
        },
        editDictionary(dictionary) {
            this.dictionaryInfo.add = false;
            this.dictionaryInfo.title = '编辑字典';
            this.dictionaryInfo.id = dictionary.id;
            this.dictionaryInfo.name = dictionary.name;
            this.dictionaryInfo.value = dictionary.value;
            this.dictionaryInfo.type = dictionary.type;
            this.dictionaryInfo.typeName = dictionary.typeName;
            this.dictionaryInfo.note = dictionary.note;
        },
        searchDictionary() {
            searchDictionary(Object.assign(this.page,this.searchDictionaryInfo)).then(
                response => {
                    this.dictionaryList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        cleanDictionaryInfo() {
            this.dictionaryInfo = {
                id: '',
                value: '',
                name: '',
                type: '',
                typeName: '',
            }
        },
        saveDictionaryInfo() {
            saveDictionaryInfo(this.dictionaryInfo).then(
                response => {
                    if(response.data.code==0){
                        this.commonResponse.success= false;
                    }else{
                        this.commonResponse.success = true;
                        document.getElementById("closeDictionaryInfoModal").click();
                        this.cleanDictionaryInfo();
                        this.searchDictionary();
                    }
                    this.commonResponse.msg= response.data.msg;
                    this.$emit('commonResponse', this.commonResponse);
                    var toastLiveExample = document.getElementById('commonToast');
                    var toast = new Toast(toastLiveExample);
                    toast.show();
                }
            )
        },
        checkDictionaryInfo() {
            if (this.dictionaryInfo.id == ''
                || this.dictionaryInfo.name == ''
                || this.dictionaryInfo.value == ''
                || this.dictionaryInfo.type == ''
                || this.dictionaryInfo.typeName == '') {
                this.saveDictionaryInfoBtn = true;
            }
            else {
                this.saveDictionaryInfoBtn = false;
            }
        }
    },
}
</script>