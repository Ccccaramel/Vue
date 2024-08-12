import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/userCenter",
    name: "userCenter",
    meta: {
      requireAuth: true,
      title:'34435'
    },
    component: () =>
      import("../views/UserCenter.vue"),
  },
  {
    path: "/searchTeam",
    name: "searchTeam",
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
    path: "/mineClearance",
    name: "mineClearance",
    component: () =>
      import("../views/MineClearance.vue"),
  },
  {
    path: "/fruitMachine",
    name: "fruitMachine",
    component: () =>
      import("../views/FruitMachine.vue"),
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
    path: "/blog",
    name: "blog",
    component: () =>
      import("../views/Blog.vue"),
  },
  {
    path: "/musicList",
    name: "musicList",
    component: () =>
      import("../views/MusicList.vue"),
  },
  {
    path: "/music&:musicId&:type",
    name: "music",
    component: () =>
      import("../views/Music.vue"),
  },
  {
    path: "/editBlog&:blogId",
    name: "editBlog",
    component: () =>
      import("../views/EditBlog.vue"),
  },
  {
    path: "/showBlog&:blogId",
    name: "showBlog",
    component: () =>
      import("../views/ShowBlog.vue"),
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
  {
    path: "/qqLogin",
    name: "qqLogin",
    component: () =>
      import("../views/qqLogin.vue"),
  },
  {
    path: "/honorRoadInfo",
    name: "honorRoadInfo",
    component: () =>
      import("../views/HonorRoadInfo.vue"),
  },
  {
    path: "/clubLeagueInfo",
    name: "clubLeagueInfo",
    component: () =>
      import("../views/ClubLeagueInfo.vue"),
  },
  {
    path: "/goldCouponRewardInfo",
    name: "goldCouponRewardInfo",
    component: () =>
      import("../views/GoldCouponRewardInfo.vue"),
  },
  {
    path: "/heroLeagueInfo",
    name: "heroLeagueInfo",
    component: () =>
      import("../views/HeroLeagueInfo.vue"),
  },
  {
    path: "/starlightLeagueInfo",
    name: "starlightLeagueInfo",
    component: () =>
      import("../views/StarlightLeagueInfo.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () =>
      import("../views/Chat.vue"),
  },
  {
    path: "/chineseChess",
    name: "chineseChess",
    component: () =>
      import("../views/ChineseChess.vue"),
  },
  {
    path: "/updateLog",
    name: "updateLog",
    component: () =>
      import("../views/UpdateLog.vue"),
  },
  {
    path: "/superBag",
    name: "superBag",
    component: () =>
      import("../views/SuperBag.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
