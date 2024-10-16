<template>
  <div>{{ lobbyStore.lobby }}</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useLobbyStore } from "../store/lobbyStore";

const lobbyStore = useLobbyStore();
</script>

<style scoped></style>
