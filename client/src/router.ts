import { createWebHashHistory, createRouter } from "vue-router";
import { useAuthMiddleware } from "./middleware/auth.middleware";

import Register from "./pages/register.vue";
import Index from "./pages/index.vue";
import Login from "./pages/login.vue";
import Overlay from "./pages/overlay.vue";
import Settings from "./pages/settings.vue";
import Help from "./pages/help.vue";

const routes = [
  { path: "/", component: Index, name: "index" },
  { path: "/register", component: Register, name: "register" },
  { path: "/login", component: Login, name: "login" },
  { path: "/overlay", component: Overlay, name: "overlay" },
  { path: "/settings", component: Settings, name: "settings" },
  { path: "/help", component: Help, name: "help" },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

useAuthMiddleware(router);
