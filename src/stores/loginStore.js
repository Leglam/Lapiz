import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore("login", () => {
  const isLogin = ref(false);

  const setIsLogin = (loginStatus) => {
    isLogin.value = loginStatus;
  };

  return { isLogin, setIsLogin };
});
