import { createWebHashHistory, createRouter } from "vue-router";
import { useAuthMiddleware } from "./middleware/auth.middleware";

import Register from "./pages/register.vue";
import Index from "./pages/index.vue";
import Login from "./pages/login.vue";
import Overlay from "./pages/overlay.vue";
import Settings from "./pages/settings.vue";
import Help from "./pages/help.vue";
import CreateLobby from "./pages/createlobby.vue";
import Lobbies from "./pages/lobbies.vue";
import Lobby from "./pages/lobby.vue";
import CreateParticipation from "./pages/createparticipation.vue";

const routes = [
  { path: "/", component: Index, name: "index" },
  { path: "/register", component: Register, name: "register" },
  { path: "/login", component: Login, name: "login" },
  { path: "/overlay", component: Overlay, name: "overlay" },
  { path: "/settings", component: Settings, name: "settings" },
  { path: "/help", component: Help, name: "help" },
  { path: "/create", component: CreateLobby, name: "createlobby" },
  { path: "/lobbies", component: Lobbies, name: "lobbies" },
  { path: "/lobby/:id", component: Lobby, name: "lobby" },
  {
    path: "/lobby/:id/create",
    component: CreateParticipation,
    name: "createparticipation",
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

useAuthMiddleware(router);
