import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { User } from "../types/typings";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const token = ref("");
  const user = ref<User | {}>({});

  const setUser = (newUser: User) => {
    user.value = newUser;
  };

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  return { user, isLoggedIn, setUser, setToken, token };
});
