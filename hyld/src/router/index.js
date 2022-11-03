import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () =>
  //     import("../views/Login.vue"),
  // },
  {
    path: "/userCenter",
    name: "userCenter",
    meta: {
      requireAuth: true
    },
    component: () =>
      import("../views/UserCenter.vue"),
  },
  {
    path: "/searchTeam",
    name: "/searchTeam",
    component: () =>
      import("../views/SearchTeam.vue"),
  },
  {
    path: "/searchPlayer",
    name: "searchPlayer",
    component: () =>
      import("../views/SearchPlayer.vue"),
  },
  {
    path: "/community",
    name: "community",
    component: () =>
      import("../views/Community.vue"),
  },
  {
    path: "/gluttonousSnake",
    name: "gluttonousSnake",
    component: () =>
      import("../views/GluttonousSnake.vue"),
  },
  {
    path: "/tetris",
    name: "tetris",
    component: () =>
      import("../views/Tetris.vue"),
  },
  {
    path: "/topicInfo&:id",
    name: "topicInfo",
    component: () =>
      import("../views/TopicInfo.vue"),
  },
  {
    path: "/findYou",
    name: "findYou",
    component: () =>
      import("../views/FindYou.vue"),
  }, 
  {
    path: "/pointer",
    name: "pointer",
    component: () =>
      import("../views/Pointer.vue"),
  },
  {
    path: "/gameRole",
    name: "gameRole",
    component: () =>
      import("../views/GameRole.vue"),
  },
  {
    path: "/gear",
    name: "gear",
    component: () =>
      import("../views/Gear.vue"),
  },
  {
    path: "/officialVersionUpdateLog",
    name: "officialVersionUpdateLog",
    component: () =>
      import("../views/OfficialVersionUpdateLog.vue"),
  },
  {
    path: "/gameRoleInfo&:id",
    name: "gameRoleInfo",
    component: () =>
      import("../views/GameRoleInfo.vue"),
  },
  {
    path: "/explain",
    name: "explain",
    component: () =>
      import("../views/Explain.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
