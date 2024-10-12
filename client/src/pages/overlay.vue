<template>
  <div>{{ lobbyStore.lobby }}</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useLobbyStore } from "../store/lobbyStore";

const lobbyStore = useLobbyStore();

// onMounted(() => {
//   window.ipcRenderer.on("update-lobby-store", (event, data) => {
//     lobbyStore.setLobby(data);
//     console.log(data, "dada");
//   });
// });
</script>

<style scoped></style>
