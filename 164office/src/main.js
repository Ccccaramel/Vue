import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap";
import "../src/assets/ding.css"; // 导入自定义 css
// import "../public/cover/cover.css"; // 首页封面样式,暂不使用
import "../src/assets/sidebars/sidebars.css"; // 个人中心的左侧菜单栏样式

// import "../public/cheatsheet";
// import "../public/cheatsheet.css";
// import "bootstrap/dist/js/bootstrap.bundle"; // 不要打开!否则打开 modal 对多一个黑色透明帘,使用 Toggle between modals 时帘关不掉!所以我为什么要导入
// import "bootstrap/js/src/dropdown";
// import "bootstrap/dist/js/bootstrap.bundle";


// 路由门卫,在声明路由时须配置 requireAuth: true 才会到此处
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (localStorage.getItem("authorization") == "undefined" || localStorage.getItem("authorization") == null) {
            next({
                path: '/',
                replace: true
            });
        }
        else {
            next()
        }
    }
    else {
        next();
    } 
});


/* Set up using Vue 3 */

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
// library.add(faUserSecret)

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas,far,fab)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
