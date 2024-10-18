<template>
  <div>start_lobby_{{ lobbyStore?.lobby?.id }}</div>
</template>

<script setup lang="ts">
import { useLobbyStore } from "../store/lobbyStore";
import { useApiStore } from "../store/apiStore";
import { useUserStore } from "../store/userStore";
import { socket } from "../socket";
import { watch } from "vue";

const lobbyStore = useLobbyStore();
const apiStore = useApiStore();
const userStore = useUserStore();

watch(
  () => lobbyStore?.lobby?.id,
  (newLobbyId) => {
    if (newLobbyId) {
      socket.on(`start_lobby_${newLobbyId}`, () => {
        console.log("Lobby started");
      });
    }
  }
);
</script>

<style scoped></style>
