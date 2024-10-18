<template>
  <DefaultLayout>
    <div class="flex items-center pt-12 flex-col relative h-full" v-if="lobby">
      <div class="h-[400px] w-[400px] ring-2 ring-sec-500 relative">
        <img :src="lobbyMap?.displayIcon" alt="" />
        <img
          v-for="participation of lobby?.participations"
          :style="{
            top: `${participation.y - 12}px`,
            left: `${participation.x - 12}px`,
          }"
          :src="apiStore.agents
              .find((agent) => agent.displayName === participation.agent)
              ?.abilities.find(
                (ability) => participation.spell === ability.displayName
              )!.displayIcon"
          class="h-6 w-6 absolute top-0 left-0"
        />
      </div>
      <div class="absolute bottom-4 left-4">
        <Button
          label="Create a participation"
          @click="router.push(`/lobby/${lobbyId}/create`)"
        />
      </div>
      <JoinLeave :lobby="lobby" />
      <div class="absolute top-4 left-4">
        <Button label="Go back" @click="router.back()" />
      </div>
      <span class="font-orbitron text-sec-500 font-extrabold text-3xl"
        >Timeline</span
      >
      <div v-if="!lobby?.participations.length" class="font-orbitron mt-4">
        NO PARTICIPATIONS YET
      </div>
      <div class="flex space-x-3 items-center mt-2">
        <div
          v-for="participation of lobby?.participations"
          class="flex flex-col items-center relative p-2"
        >
          <i
            v-if="participation.user.id === userStore?.user?.id"
            @click="deleteParticipation(participation)"
            class="absolute top-0 left-0 pi pi-times-circle cursor-pointer"
          ></i>
          <img
            :src="
                apiStore.agents
                  .find((agent) => agent.displayName === participation.agent)
                  ?.abilities.find(
                    (ability) => participation.spell === ability.displayName
                  )!.displayIcon
              "
            alt=""
            class="h-12 w-12 rounded-full ring-2 ring-sec-500"
          />
          <span class="font-orbitron">{{
            apiStore.agents.find(
              (agent) => agent.displayName === participation.agent
            )?.displayName
          }}</span>
          <span class="font-orbitron">{{ participation.timer }} sec.</span>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import DefaultLayout from "../layouts/default.vue";
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

const deleteParticipation = async (participation: Participation) => {
  try {
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/participations/delete/${
        participation?.id
      }`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.token}`,
        },
      }
    );
    await fetchLobby();
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  fetchLobby();
});
</script>

<style scoped></style>
