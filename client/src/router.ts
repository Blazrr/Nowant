import { createMemoryHistory, createRouter } from "vue-router";
import { useAuthMiddleware } from "./middleware/auth";

import Register from "./pages/register.vue";
import Index from "./pages/index.vue";

const routes = [
  { path: "/", component: Index, name: "index" },
  { path: "/register", component: Register, name: "register" },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

useAuthMiddleware(router);
