<template>
  <div>dadaw</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  window.ipcRenderer.on("update-lobby-store", (event, data) => {
    console.log(data, "dada");
  });
});
</script>

<style scoped></style>
