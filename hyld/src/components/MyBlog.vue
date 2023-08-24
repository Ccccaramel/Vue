<template>
    <div class="tab-pane fade" id="list-myBlog" role="tabpanel" aria-labelledby="list-myBlog-list">
        <!-- 搜索条件 -->
        <form class="row g-3 mt-1 mb-3">
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="标题" v-model="blogInfo.title">
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" placeholder="标签" v-model="blogInfo.label">
            </div>
            <div class="col-auto">
                <!-- <input type="text" class="form-control" placeholder="类型" v-model="blogInfo.type"> -->
                <select class="form-select" v-model="blogInfo.type">
                    <option
                        v-for="blogType in blogTypeList"
                        v-bind:key="blogType.id"
                        :value="blogType.id">
                        {{ blogType.name }}</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="cleanSearchBlogBtn()">清空</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-dark" @click="searchBlogBtn()">搜索</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success"  @click="writeBlog(-1)"><font-awesome-icon icon="pen-to-square" />写博客</button>
            </div>
        </form>

        <div class="list-group">
            <a :class="blog.power.id==2301?'list-group-item list-group-item-action hyld-bg-33':'list-group-item list-group-item-action hyld-bg-34'" 
            aria-current="true" v-for="blog in blogList" :key="blog.id">
                <div class="d-flex w-100 justify-content-between btn" @click="showBlog(blog.id)">
                    <h5 class="mb-1">{{blog.title}}</h5>
                    <small>浏览量:{{blog.views}}</small>
                </div>
                <!-- 富文本字符串转义 -->
                <!-- <div class="blog-content" v-html="blog.content"></div> -->
                <div class="row justify-content">
                    <div class="col-auto">
                        <p class="mb-1">{{blog.type.name}}</p>
                    </div>
                    <div class="col-auto">
                        <p class="mb-1">{{blog.power.name}}</p>
                    </div>
                    <div class="col-auto" v-for="blogLabel,i in strToArr(blog.label)" v-bind:key="i">
                        <span class="badge bg-primary">{{blogLabel}}</span>
                    </div>
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <small>创建时间:{{blog.createTimeStr}}</small>
                    <div>
                        <span class="badge bg-warning text-dark btn me-2" @click="writeBlog(blog.id)">编辑</span>
                        <span class="badge bg-danger btn" @click="deleteBlog(blog.id)">删除</span>
                    </div>
                </div>
            </a>
        </div>

        <Page :commonPage="page" @commonPageChange="commonPageChange($event)"></Page>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import { useRouter } from "vue-router"; //引入useRouter
import {Modal,Toast} from 'bootstrap';
import { getBlogType } from "../api/dictionary";
import { initBlog,searchMyBlog,deleteBlog } from "../api/blog";
export default {
    name: "myBlog",
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
            blogList: [],
            blogInfo: {
                title: '',
                label: '',
                type: '',
            },
            blogTypeList : []
        }
    },
    mounted() {
    },
    methods: {
        init() {
            getBlogType().then(
                response => {
                    this.blogTypeList = response.data.data;
                    this.blogTypeList.unshift({
                        id: '',
                        name:'无限制',
                    });
                    this.blogInfo.type = '';
                    this.searchMyBlog();
                }
            );
        },
        commonPageChange(event) {
            this.page = event;
            this.searchMyBlog();
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
        cleanSearchBlogBtn() {
            this.blogInfo = {
                name: '',
                type: '',
                label: '',
                typeName: '',
            }
        },
        searchBlogBtn() {
            this.page.currentPage = 1;
            this.searchMyBlog();
        },
        searchMyBlog() {
            searchMyBlog(Object.assign(this.page,this.blogInfo)).then(
                response => {
                    this.blogList = response.data.data.data;
                    this.page.totalPage = response.data.data.totalPage;
                }
            )
        },
        strToArr(str) {
            if (str == null) {
                return ''
            } else {
                return str.split(",");
            }
        },
        deleteBlog(blogId) {
            deleteBlog(Object.assign({
                id:blogId
            })).then(
                response =>{
                    this.showToast(response);
                    this.searchMyBlog();
                }
            )
        }
    },
    setup() {
        const router = useRouter();
        let writeBlog = (id) => {
            if (id == -1) {
                initBlog(id).then(
                    response => {
                        let { href } = router.resolve({
                            name: "editBlog",
                            params: {
                                blogId: response.data.data.blogId
                            },
                        });
                        window.open(href, "_blank");
                    }
                )
            } else {
                let { href } = router.resolve({
                    name: "editBlog",
                    params: {
                        blogId: id
                    },
                });
                window.open(href, "_blank");
            }
        };
        let showBlog = (id) => {
            let { href } = router.resolve({
                name: "showBlog",
                params: {
                    blogId: id
                },
            });
            window.open(href, "_blank");
        };
        return {
            writeBlog,showBlog
        };
    },
}
</script>