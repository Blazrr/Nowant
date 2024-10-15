<template>
  <DefaultLayout>
    <div class="flex flex-col flex-1 px-4">
      <div class="flex items-center gap-x-4 h-[300px]">
        <RouterLink
          to="/lobbies"
          :class="[
            'basis-2/3 h-full bg-[length:110%_110%] bg-center rounded-lg flex items-center justify-center group cursor-pointer hover:bg-[length:130%_130%] active:bg-[length:150%_150%] transition-all',
          ]"
          :style="{
            backgroundImage: `url(${randomMapBg1})`,
          }"
        >
          <span
            class="text-4xl font-extrabold font-orbitron text-sec-400 group-hover:text-sec-500 group-active:text-sec-600 transition-all"
            >Lobbies</span
          >
        </RouterLink>
        <div class="flex flex-col bg-cover bg-center basis-1/3 h-full gap-y-4">
          <RouterLink
            to="/create"
            class="h-1/2 bg-center rounded-lg flex items-center justify-center group bg-[length:110%_110%] cursor-pointer hover:bg-[length:130%_130%] active:bg-[length:150%_150%] transition-all"
            :style="{
              backgroundImage: `url(${randomMapBg2})`,
            }"
          >
            <span
              class="text-center text-4xl font-extrabold font-orbitron text-sec-400 group-hover:text-sec-500 group-active:text-sec-600 transition-all"
              >create Lobby</span
            >
          </RouterLink>
          <div class="flex h-1/2 gap-x-4">
            <div
              class="flex-1 rounded-lg bg-cover bg-center"
              :style="{ backgroundImage: `url(${lastMap.splash})` }"
            ></div>
            <div
              class="flex-1 bg-blue-200 rounded-lg bg-cover bg-center"
              :style="{ backgroundImage: `url(${lastAgent.displayIcon})` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- </div>
      <button @click="logout">logout</button>
      <input type="text" v-model="name" />
      <button @click="logName">logName</button>
      <template v-for="agent of apiStore.agents">
        {{ agent.description }}
      </template> -->
  </DefaultLayout>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { useOverlayStore } from "../store/overlayStore";
import { onMounted, ref } from "vue";
import { useLobbyStore } from "../store/lobbyStore";
import DefaultLayout from "../layouts/default.vue";
import { useApiStore } from "../store/apiStore";

const router = useRouter();
const overlayStore = useOverlayStore();
const lobbyStore = useLobbyStore();
const apiStore = useApiStore();
const name = ref("");
const lastAgent = apiStore.agents.find((agent) => agent.displayName === "Vyse");
const lastMap = apiStore.maps.find((map) => map.displayName === "Abyss");
const randomMapBg1 =
  apiStore.maps[Math.floor(Math.random() * apiStore.maps.length)]
    .stylizedBackgroundImage ||
  "https://media.valorant-api.com/maps/92584fbe-486a-b1b2-9faa-39b0f486b498/stylizedbackgroundimage.png";

const randomMapBg2 =
  apiStore.maps[Math.floor(Math.random() * apiStore.maps.length)]
    .stylizedBackgroundImage ||
  "https://media.valorant-api.com/maps/92584fbe-486a-b1b2-9faa-39b0f486b498/stylizedbackgroundimage.png";
onMounted(() => {
  console.log(apiStore.maps);
  if (!overlayStore.isOpen) {
    overlayStore.openOverlay();
  }
});

const logName = () => {
  lobbyStore.setName(name.value);
};
</script>

<style lang="scss" scoped></style>
