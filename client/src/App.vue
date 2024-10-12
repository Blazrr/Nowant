<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
onMounted(() => {
  console.log(window.ipcRenderer);
  window.ipcRenderer.on("update-store", (event, data) => {
    console.log(data);
  });
});
</script>
<style></style>
