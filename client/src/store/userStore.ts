import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { User } from "../types/typings";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const token = ref("");
  const user = ref<User | null>(null);

  const fetchDatabyToken = async (token: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/dataByToken`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  };

  const setUser = (newUser: User) => {
    user.value = newUser;
  };

  const setToken = async (newToken: string) => {
    token.value = newToken;
    try {
      const user = await fetchDatabyToken(token.value);
      setUser(user);
    } catch (error) {
      console.error("Error fetching user data by token:", error);
    }
  };

  return { user, isLoggedIn, setUser, setToken, token };
});
