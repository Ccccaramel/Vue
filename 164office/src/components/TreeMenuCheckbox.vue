<template>
    <ul class="list-group list-group-flush">
        <li class="list-group-item list-group-item-primary" v-for="(item, index) in list " :key="index">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="item.have" v-model="item.have" @click="checkMenuTreeInfo(item)">
                <div style="font-size:large">
                    <span :class="item.type.value ==0 ? 'badge btn bg-danger':(item.type.value ==1 ? 'badge btn bg-dark':'badge btn bg-secondary')">{{ item.name }}</span>
                </div>
            </div>
            <TreeMenuCheckbox :list="item.children"></TreeMenuCheckbox>
        </li>
    </ul>
</template>
<script>
export default {
    name: "treeMenuCheckbox",
    data() {
        return {
        }
    },
    props: ["list"],
    watch: {
        list: {
            handler(newVal) {
                this.checkMenuTreeInfo(newVal);
            },
            deep: true,
        }
    },
    methods: {
        /**
         * 节点被选中/取消时,其所有子节点自动选中/取消
         * 
         * 需要说明的是,如果某一节点(假设为菜单)取消选中,但其子节点(假设为按钮)被选中中,可以类比为没有大门的钥匙却有房间的钥匙,那么菜单和按钮都是无法访问的
         * @param {被点击的节点} obj 
         */
        checkMenuTreeInfo(obj) {
            this.checkMenuTreeChildren(obj, !obj.have); // 点击复选框时,先触发 click 事件,再改变 value
        },
        checkMenuTreeChildren(obj, checked) {
            if (obj.children != null && obj.children.length > 0) {
                obj.children.forEach(element => {
                    this.checkMenuTreeChildren(element, checked);
                });
            }
            obj.have = checked;
        },
    }
};
</script>