<template>
  <LobbyLayout :lobby="lobby">
    <div class="flex items-center pt-12 flex-col relative h-full" v-if="lobby">
      <div class="h-[400px] w-[400px] ring-1 ring-sec-500 relative">
        <img :src="lobbyMap?.displayIcon" alt="" class="" />
        <img
          v-for="participation of lobby?.participations"
          :style="{
            top: `${participation.y - 12}px`,
            left: `${participation.x - 12}px`,
          }"
          :src="
            apiStore.agents
              .find((agent) => agent.displayName === participation.agent)
              ?.abilities.find(
                (ability) => participation.spell === ability.displayName
              )!.displayIcon
          "
          class="h-6 w-6 absolute top-0 left-0"
        />
      </div>
      <div class="mt-8">
        <Button
          label="Create a new participation"
          @click="router.push(`/lobby/${lobbyId}/create`)"
        />
      </div>
      <div class="mt-2">
        <JoinLeave :lobby="lobby" />
      </div>
      <div class="absolute top-4 left-4">
        <Button label="Go back" @click="router.back()" />
      </div>
      <div v-if="!lobby?.participations.length" class="font-orbitron mt-4">
        NO PARTICIPATIONS YET
      </div>
    </div>
  </LobbyLayout>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import LobbyLayout from "../layouts/Lobby.vue";
import Button from "primevue/button";
import { onMounted, ref } from "vue";
import { Lobby, Map, Participation } from "../types/typings";
import { useUserStore } from "../store/userStore";
import { useApiStore } from "../store/apiStore";
import { socket } from "../socket";
import JoinLeave from "../components/Lobby/JoinLeave.vue";

const router = useRouter();
const lobbyId = router.currentRoute.value.params.id;
const apiStore = useApiStore();
const lobby = ref<Lobby | null>(null);
const userStore = useUserStore();
const lobbyMap = ref<Map | null>(null);
socket.on(`new_participation_${lobbyId}`, () => {
  fetchLobby();
});

const fetchLobby = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/lobbies/getOne/${lobbyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.token}`,
        },
      }
    );
    const data = await response.json();
    lobby.value = data;
    lobbyMap.value =
      apiStore.maps.find((map) => data.map === map.displayName) ?? null;
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  fetchLobby();
});
</script>

<style scoped></style>
