import { type Router } from "vue-router";
import { useUserStore } from "../store/userStore";

export const useAuthMiddleware = (router: Router) => {
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
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const token = await window.ipcRenderer.invoke("getToken");
    console.log("token", token);
    if (token) {
      userStore.setToken(token);
      const user = await fetchDatabyToken(token);
      if (user) {
        userStore.isLoggedIn = true;
        userStore.setUser(user);
      }
    }
    if (
      !userStore.isLoggedIn &&
      to.path !== "/register" &&
      to.path !== "/login" &&
      to.path !== "/overlay"
    ) {
      return next({ name: "login" });
    }
    next();
  });
};
