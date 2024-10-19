<template>
  <div class="p-8">
    <div
      class="absolute top-8 left-8 bg-indigo-500 bg-opacity-50 backdrop-blur-md inline-flex items-center space-x-4 p-2 rounded-md"
    >
      <span class="font-orbitron font-extrabold text-sec-500">Nowant</span>
    </div>
    <div
      v-if="lobbyStore?.lobby"
      class="absolute top-8 right-8 bg-indigo-500 bg-opacity-50 backdrop-blur-md inline-flex items-center p-2 rounded-md font-orbitron"
    >
      <span class="font-orbitron font-extrabold text-sec-500"
        >{{ lobbyStore.lobby.name }}
      </span>
      &nbsp;by &nbsp;
      <span class="font-orbitron font-extrabold text-sec-500">
        {{ lobbyStore.lobby.user.username }}
      </span>
      <img :src="profilePictureUrl" alt="" class="h-6 w-6 rounded-full ml-2" />
    </div>
    <Map v-if="gameOnRoll" :gameOnRoll="gameOnRoll" />
    <Circles v-if="gameOnRoll" :gameOnRoll="gameOnRoll" />
  </div>
</template>
<script setup lang="ts">
import Map from "../components/Overlay/Map.vue";
import { useLobbyStore } from "../store/lobbyStore";
import { socket } from "../socket";
import { computed, ref, watch } from "vue";
import Circles from "../components/Overlay/Circles.vue";

const lobbyStore = useLobbyStore();
const profilePictureUrl = computed(
  () =>
    `${import.meta.env.VITE_S3_URL}/${lobbyStore.lobby?.user?.profile?.picture}`
);
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const gameOnRoll = ref<boolean>(false);

watch(
  () => lobbyStore?.lobby?.id,
  (newLobbyId) => {
    if (newLobbyId) {
      socket.on(`start_lobby_${newLobbyId}`, () => {
        console.log("Lobby started");
        startLobby();
      });
    }
  }
);

const startLobby = async () => {
  let highestTimerParticipation = 0;
  for (const participation of lobbyStore.lobby?.participations!) {
    if (participation.timer > highestTimerParticipation) {
      highestTimerParticipation = participation.timer;
    }
  }

  gameOnRoll.value = true;
  await delay((highestTimerParticipation + 3) * 1000);
  gameOnRoll.value = false;
};
</script>

<style scoped></style>
