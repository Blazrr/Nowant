<template>
  <div class="flex">
    <button @click="logout">logout</button>
    <!-- <button @click="logName">logName</button> -->
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useOverlayStore } from "../store/overlayStore";
import { onMounted } from "vue";

const router = useRouter();
const overlayStore = useOverlayStore();

onMounted(() => {
  if (!overlayStore.isOpen) {
    overlayStore.openOverlay();
  }
});

const logout = () => {
  window.ipcRenderer.send("logout");
  router.push({ name: "login" });
  overlayStore.closeOverlay();
};
</script>

<style lang="scss" scoped></style>
