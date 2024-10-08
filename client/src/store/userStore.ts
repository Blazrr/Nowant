import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const count = ref(0);
  const name = ref("Eduardo");
  const isLoggedIn = ref(false);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment, isLoggedIn };
});
