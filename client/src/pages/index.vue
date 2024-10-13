<template>
  <DefaultLayout>
    <div class="flex flex-col flex-1">
      <button @click="logout">logout</button>
      <input type="text" v-model="name" />
      <button @click="logName">logName</button>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useOverlayStore } from "../store/overlayStore";
import { onMounted, ref } from "vue";
import { useLobbyStore } from "../store/lobbyStore";
import DefaultLayout from "../layouts/default.vue";

const router = useRouter();
const overlayStore = useOverlayStore();
const lobbyStore = useLobbyStore();
const name = ref("");

onMounted(() => {
  if (!overlayStore.isOpen) {
    overlayStore.openOverlay();
  }
});

const logName = () => {
  lobbyStore.setName(name.value);
};

const logout = () => {
  window.ipcRenderer.send("logout");
  router.push({ name: "login" });
  overlayStore.closeOverlay();
};
</script>

<style lang="scss" scoped></style>
