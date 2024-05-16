<template>
    <ul class="list-group list-group-flush">
        <li class="list-group-item list-group-item-primary" v-for="(item, index) in list " :key="index">
            <div style="font-size:large">
                <span :class="item.type.value ==0 ? 'badge btn bg-danger':(item.type.value ==1 ? 'badge btn bg-dark':'badge btn bg-secondary')" @click="showMenu(item)">{{ item.name }}</span>
                <span v-if="item.type.value != 0" class="badge btn rounded-pill bg-primary ms-1" @click="editMenu(item)">编辑</span>
                <span v-if="item.type.value != 2" class="badge btn rounded-pill bg-success ms-1" @click="addMenu(item)">新增</span>
                <span v-if="item.type.value != 0 && item.children==null" class="badge btn rounded-pill bg-danger ms-1" @click="deleteMenu(item)">删除</span>
            </div>
            <TreeMenu :list="item.children" @menuOperation="menuOperation($event)"></TreeMenu>
        </li>
    </ul>
</template>
<script>
export default {
    name: "treeMenu",
    props: ["list"],
    methods: {
        showMenu(item) {
            item.option = "show";
            this.menuOperation(item);
        },
        editMenu(item) {
            item.option = "edit";
            this.menuOperation(item);
        },
        addMenu(item) {
            item.option = "add";
            this.menuOperation(item);
        },
        deleteMenu(item) {
            item.option = "delete";
            this.menuOperation(item);
        },
        menuOperation(item) {
            this.$emit('menuOperation', item);
        }
    }
};
</script>