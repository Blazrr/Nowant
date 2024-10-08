import { useUserStore } from "../store/userStore";

// auth.ts
export const useAuthMiddleware = (router) => {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (!userStore.isLoggedIn && to.path !== "/register") {
      return next({ name: "register" });
    }
    next();
  });
};
