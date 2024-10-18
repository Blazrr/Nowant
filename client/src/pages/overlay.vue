<template>
  <div class="p-8">
    <div>start_lobby_{{ lobbyStore?.lobby?.id }}</div>

    <template v-if="lobbyStore?.lobby">
      <Map />
    </template>
  </div>
</template>
''
<script setup lang="ts">
import Map from "../components/Overlay/Map.vue";
import { useLobbyStore } from "../store/lobbyStore";
import { socket } from "../socket";
import { watch } from "vue";

const lobbyStore = useLobbyStore();

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
