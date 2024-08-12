<template>
    <ul class="list-group list-group-flush">
        <li class="list-group-item list-group-item-primary" v-for="(item, index) in list " :key="index">
            <div style="font-size:large">
                <h5 class="m-0">
                    <!-- 0:根节点 1:菜单 2:按钮 -->
                    <span :class="item.type.value ==0 ? 'badge bg-danger':(item.type.value ==1 ? 'badge bg-dark':'badge bg-secondary')" @click="showMenu(item)" style="cursor: pointer;">
                        {{ item.name }}
                    </span>
                    <span v-if="item.type.value != 0" class="badge ps-1 pe-0" @click="editMenu(item)">
                        <font-awesome-icon :icon="['fas', 'square-pen']" style="color: #74C0FC;cursor:pointer;" size="lg"/>
                    </span>
                    <span v-if="item.type.value != 2" class="badge ps-1 pe-0" @click="addMenu(item)">
                        <font-awesome-icon :icon="['fas', 'circle-plus']" style="color: #88e665;cursor:pointer;" size="lg"/>
                    </span>
                    <span v-if="item.type.value != 2&&item.id!=activeId" class="badge ps-1 pe-0" @click="showChildren(item)">
                        <font-awesome-icon :icon="['fas', 'circle-chevron-down']" style="color: #6586e6;cursor:pointer;"  size="lg"/>
                    </span>
                    <span v-if="item.type.value != 2&&item.id==activeId" class="badge ps-1 pe-0" @click="showChildren(item)">
                        <font-awesome-icon :icon="['fas', 'circle-chevron-up']" style="color: #6586e6;cursor:pointer;"  size="lg"/>
                    </span>
                    <span v-if="item.type.value != 0 && item.children==null" class="badge ps-1 pe-0" @click="deleteMenu(item)">
                        <font-awesome-icon :icon="['fas', 'circle-xmark']" style="color: #fb6060;cursor:pointer;" size="lg"/>
                    </span>
                </h5>
            </div>
            <TreeMenu v-if="activeId==item.id" :list="item.children" @menuOperation="menuOperation($event)"></TreeMenu>
        </li>
    </ul>
</template>
<script>
export default {
    name: "treeMenu",
    props: ["list"],
    data() {
        return {
            /**
             * 当前活动节点
             */
            activeId: -1,
        }
    },
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
        },
        showChildren(item) {
            if (this.activeId == item.id) {  // 点击的节点已展开子节点,再次点击该节点应隐藏其子节点,故将活动节点置为其父节点即可
                this.activeId = item.parentId;
            }
            else {
                this.activeId = item.id;
            }
        },
    }
};
</script>