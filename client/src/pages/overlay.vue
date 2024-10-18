<template>
  <div>start_lobby_{{ lobbyStore?.lobby }} {{ lobbyStore }}</div>
</template>

<script setup lang="ts">
import { useLobbyStore } from "../store/lobbyStore";
import { useApiStore } from "../store/apiStore";
import { useUserStore } from "../store/userStore";
import { socket } from "../socket";

const lobbyStore = useLobbyStore();
const apiStore = useApiStore();
const userStore = useUserStore();

socket.on(`start_lobby_${lobbyStore?.lobby?.id}`, () => {
  console.log("test");
});
</script>

<style scoped></style>
