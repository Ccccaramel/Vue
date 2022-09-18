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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
