<template>
  <div>
    <!-- 分页 -->
    <div class="dropdown-divider"></div>
    <nav>
        <ul class="pagination justify-content-center">
            <li class="page-item me-1">
                <button type="button" class="btn btn-outline-dark" @click="pageChange(1)">{{1}}</button>
            </li>
            <li :class="(i==1&&commonPage.currentPage-3>1)||(i==commonPage.totalPage&&(commonPage.currentPage+3)<commonPage.totalPage)?'page-item disabled':'page-item'"  v-for="i in commonPage.totalPage" :key="i">
                <button class="btn btn-outline-secondary" disabled v-if="(i==1&&commonPage.currentPage-3>1)||(i==commonPage.totalPage&&(commonPage.currentPage+3)<commonPage.totalPage)">...</button>
                <button type="button" class="btn btn-outline-dark" @click="pageChange(i)" v-if="i>1&&(i+3)>commonPage.currentPage && (i-3)<commonPage.currentPage&&i<commonPage.totalPage">{{i}}</button>
            </li>
            <li class="page-item ms-1">
                <button type="button" class="btn btn-outline-dark" v-if="commonPage.totalPage>1" @click="pageChange(commonPage.totalPage)">{{commonPage.totalPage}}</button>
            </li>
        </ul>
    </nav>
  </div>
</template>

<script>
export default {
    name: "page",
    data(){
        return{
        }
    },
    props:["commonPage"],
    methods: {
        pageChange(currentPage) {
            this.commonPage.currentPage = currentPage;
            this.$emit('commonPageChange', this.commonPage);
        },
    },
}
</script>

<style scoped lang="less">
</style>