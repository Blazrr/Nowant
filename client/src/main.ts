import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Nora from "@primevue/themes/nora";
import Material from "@primevue/themes/material";
import ToastService from "primevue/toastservice";

import "./style.scss";

import "./demos/ipc";
import { definePreset } from "@primevue/themes";

const pinia = createPinia();
const MyPreset = definePreset(Nora, {
  semantic: {
    primary: {
      50: "{rose.50}",
      100: "{rose.100}",
      200: "{rose.200}",
      300: "{rose.300}",
      400: "{rose.400}",
      500: "{rose.500}",
      600: "{rose.600}",
      700: "{rose.700}",
      800: "{rose.800}",
      900: "{rose.900}",
    },
  },
});

createApp(App)
  .use(router)
  .use(pinia)
  .use(ToastService)
  .use(PrimeVue, {
    theme: {
      preset: MyPreset,
    },
  })
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
