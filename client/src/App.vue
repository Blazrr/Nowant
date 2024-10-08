<script setup lang="ts">
import { RouterView } from "vue-router";

import { onMounted } from "vue";
import StepOne from "./components/Register/StepOne.vue";

console.log(window.ipcRenderer);
</script>

<template>
  <RouterView />
</template>

<style></style>
