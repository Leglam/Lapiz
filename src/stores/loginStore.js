import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore("login", () => {
  const isLogin = ref(false);
  const username = ref("");

  const setIsLogin = (loginStatus) => {
    isLogin.value = loginStatus;
  };

  const setUsername = (loginUser) => {
    username.value = loginUser;
  };
  return { isLogin, username, setIsLogin, setUsername };
});
