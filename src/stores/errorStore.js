import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("errorStore", () => {
  const errorMessage = ref("");
  const errorType = ref("");

  const setError = (message, type) => {
    errorMessage.value = message;
    errorType.value = type;
  };

  const clearError = () => {
    errorMessage.value = "";
  };

  return { errorMessage, errorType, setError, clearError };
});
