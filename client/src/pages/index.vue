<template>
  <div class="flex">
    <button @click="logout">logout</button>
    <button @click="logName">logName</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useOverlayStore } from "../store/overlayStore";
import { onMounted } from "vue";
import { useUserStore } from "../store/userStore";
import { useLobbyStore } from "../store/lobbyStore";

const router = useRouter();
const overlayStore = useOverlayStore();
const userStore = useUserStore();
const lobbyStore = useLobbyStore();

onMounted(() => {
  if (!overlayStore.isOpen) {
    overlayStore.openOverlay();
  }
});

const logName = () => {
  lobbyStore.setName("secondValue");
};
const logout = () => {
  window.ipcRenderer.send("logout");
  router.push({ name: "login" });
  overlayStore.closeOverlay();
};
</script>

<style lang="scss" scoped></style>
