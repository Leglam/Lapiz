import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
