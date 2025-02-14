import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/men",
      name: "men",
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
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/Cart.vue"),
    },
    {
      path: "/policy/cookies",
      name: "cookies",
      component: () => import("../views/Policies/Cookie.vue"),
    },
    {
      path: "/policy/exchange",
      name: "exchange",
      component: () => import("../views/Policies/ExchangeReturn.vue"),
    },
    {
      path: "/policy/data-personal",
      name: "data-personal",
      component: () => import("../views/Policies/DataPersonal.vue"),
    },
    {
      path: "/policy/terms",
      name: "terms",
      component: () => import("../views/Policies/TermCondition.vue"),
    },
    {
      path: "/customer/contact",
      name: "contact",
      component: () => import("../views/Customer-Services/Contact.vue"),
    },
    {
      path: "/customer/faq",
      name: "faq",
      component: () => import("../views/Customer-Services/Faq.vue"),
    },
    {
      path: "/customer/size-chart",
      name: "size-chart",
      component: () => import("../views/Customer-Services/SizeChart.vue"),
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: () => import("../views/Wishlist.vue"),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
