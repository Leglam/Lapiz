import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Menu/Men.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    // {
    //   path: "/cookies",
    //   name: "cookies",
    //   component: () => import("../views/Policies/Cookie.vue"),
    // },
    // {
    //   path: "/exchange",
    //   name: "exchange",
    //   component: () => import("../views/Policies/ExchangeReturn.vue"),
    // },
  ],
});

export default router;
