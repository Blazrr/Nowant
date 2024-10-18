<template>
  <CreateParticipation @selected-data="handleSelectedData">
    <div class="flex flex-col items-center pt-12 relative h-full">
      <div class="top-4 left-4 absolute">
        <Button label="Go back" @click="router.back()" />
      </div>
      <div class="bottom-4 right-4 absolute">
        <Button
          label="Lock your participation"
          @click="lockParticipation"
          :disabled="!placeAbility"
        />
      </div>
      <div
        class="flex-col cursor-none h-[400px] w-[400px] relative ring-2 ring-sec-500"
        @click="addCoordinates"
        ref="map"
      >
        <img
          :src="lobbyMap?.displayIcon"
          alt=""
          class="w-full h-full mx-auto"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
        />
        <div
          v-if="isHovered"
          class="h-6 w-6 absolute top-0 left-0 z-10 bg-cover bg-center pointer-events-none"
          :style="{
            left: `${x - 12}px`,
            top: `${y - 12}px`,
            backgroundImage: `url(${ability?.displayIcon})`,
          }"
        ></div>
        <div
          class="h-6 w-6 absolute top-0 left-0 z-10 bg-cover bg-center pointer-events-none"
          v-if="placeAbility"
          :style="{
            left: `${placeAbility.x - 12}px`,
            top: `${placeAbility.y - 12}px`,
            backgroundImage: `url(${placeAbility.ability?.displayIcon})`,
          }"
        ></div>
      </div>
      <div class="mt-4 flex flex-col items-center">
        <span class="font-orbitron text-3xl text-sec-500 font-extrabold"
          >recap</span
        >
        <div class="flex space-x-4 font-orbitron">
          <div class="flex flex-col">
            <span class="font-orbitron font-extrabold">Agent</span>
            <template v-if="placeAbility">
              <img
                :src="placeAbility.agent.displayIcon"
                alt=""
                class="w-12 h-12 mt-2"
              />
              <span class="font-orbitron">{{
                placeAbility.agent.displayName
              }}</span>
            </template>
          </div>
          <div class="flex flex-col">
            <span class="font-orbitron font-extrabold">Ability</span>
            <template v-if="placeAbility">
              <img
                :src="placeAbility.ability.displayIcon"
                alt=""
                class="w-12 h-12 mt-2"
              />
              <span class="font-orbitron">{{
                placeAbility.ability.displayName
              }}</span>
            </template>
          </div>
          <div class="flex flex-col">
            <span class="font-orbitron font-extrabold">Timer</span>
            <template v-if="placeAbility">
              <p class="mt-2 font-orbitron text-center">
                {{ timer }} <br />
                seconds
              </p>
            </template>
          </div>
          <div class="flex flex-col">
            <span class="font-orbitron font-extrabold">Coordinates</span>
            <template v-if="placeAbility">
              <p class="mt-2 font-orbitron text-center">
                X:{{ placeAbility.x }} <br />
                Y:{{ placeAbility.y }}
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </CreateParticipation>
</template>

<script setup lang="ts">
import CreateParticipation from "../layouts/CreateParticipation.vue";

import { Ability, Agent, Lobby, Map } from "../types/typings";
import { useUserStore } from "../store/userStore";
import { useApiStore } from "../store/apiStore";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import Button from "primevue/button";
import useMousePosition from "../hooks/useMousePosition";
const map = ref(null);
const { x, y } = useMousePosition(map);
const router = useRouter();
const lobbyId = router.currentRoute.value.params.id;
const apiStore = useApiStore();
const lobby = ref<Lobby | null>(null);
const userStore = useUserStore();
const lobbyMap = ref<Map | null>(null);
const timer = ref();
const agent = ref();
const ability = ref();
const isHovered = ref(false);
const placeAbility = ref();
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

const handleSelectedData = (data: {
  timer: number;
  agent: Agent;
  ability: Ability;
}) => {
  timer.value = data.timer;
  agent.value = data.agent;
  ability.value = data.ability;
};

const addCoordinates = () => {
  placeAbility.value = {
    x: x.value,
    y: y.value,
    agent: agent.value,
    ability: ability.value,
  };
};

const lockParticipation = async () => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/participations/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
      body: JSON.stringify({
        lobbyId: lobbyId,
        agent: agent.value.displayName,
        spell: ability.value.displayName,
        x: placeAbility.value.x,
        y: placeAbility.value.y,
        timer: timer.value,
      }),
    });
    router.back();
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  fetchLobby();
});
</script>

<style scoped></style>
