<template>
  <RouterView />
  <button @click="logout">logout</button>
  <StepTwo />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import { onMounted } from "vue";
import StepOne from "./components/Register/StepOne.vue";
import { useRouter } from "vue-router";
import StepTwo from "./components/Register/StepTwo.vue";
const router = useRouter();

const logout = () => {
  window.ipcRenderer.send("logout");
  router.push({ name: "register" });
};
</script>
<style></style>
