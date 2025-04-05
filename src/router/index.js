import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: () => import("../views/Homepage.vue"),
    },
    {
      path: "/filter",
      name: "filter",
      component: () => import("../views/Menu/FilteredProduct.vue"),
    },
    {
      path: "/men",
      name: "men",
      component: () => import("../views/Menu/Men.vue"),
    },
    {
      path: "/women",
      name: "women",
      component: () => import("../views/Menu/Women.vue"),
    },
    {
      path: "/kid",
      name: "kid",
      component: () => import("../views/Menu/Kid.vue"),
    },
    {
      path: "/new-product",
      name: "new-product",
      component: () => import("../views/Menu/NewProduct.vue"),
    },
    {
      path: "/sneakers",
      name: "sneakers",
      component: () => import("../views/Menu/Sneaker.vue"),
    },
    {
      path: "/flip-flops",
      name: "flip-flops",
      component: () => import("../views/Menu/FlipFlop.vue"),
    },
    {
      path: "/sports",
      name: "sports",
      component: () => import("../views/Menu/Sport.vue"),
    },
    {
      path: "/high-heels",
      name: "high-heels",
      component: () => import("../views/Menu/HighHeel.vue"),
    },
    {
      path: "/flats",
      name: "flats",
      component: () => import("../views/Menu/Flat.vue"),
    },
    {
      path: "/boots",
      name: "boots",
      component: () => import("../views/Menu/Boot.vue"),
    },
    {
      path: "/leather",
      name: "leather",
      component: () => import("../views/Menu/Leather.vue"),
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
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("../views/ForgotPassword.vue"),
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
    {
      path: "/product-detail/:id",
      name: "product-detail",
      component: () => import("../views/ProductDetail.vue"),
    },
    {
      path: "/cash",
      name: "cash",
      component: () => import("../views/Transaction/PurchaseOrder.vue"),
    },
    {
      path: "/transaction",
      name: "transaction",
      component: () => import("../views/Transaction/Transaction.vue"),
    },
    {
      path: "/my-account",
      name: "my-account",
      component: () => import("../views/Account/MyAccount.vue"),
    },
    {
      path: "/edit-info",
      name: "edit-info",
      component: () => import("../views/Account/EditInfo.vue"),
    },
    {
      path: "/edit-address",
      name: "edit-address",
      component: () => import("../views/Account/EditAddress.vue"),
    },
    {
      path: "/credit-receipt",
      name: "credit",
      component: () => import("../views/Receipt/Credit.vue"),
    },
    {
      path: "/cash-receipt",
      name: "cash",
      component: () => import("../views/Receipt/CashOn.vue"),
    },
    {
      path: "/promptpay-receipt",
      name: "promptpay",
      component: () => import("../views/Receipt/PromtPay.vue"),
    },
    {
      path: "/compare",
      name: "compare",
      component: () => import("../views/CompareProduct.vue"),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
