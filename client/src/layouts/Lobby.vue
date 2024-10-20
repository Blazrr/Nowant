<template>
  <div class="flex">
    <SidebarLobby
      v-if="router.currentRoute.value.name === 'lobby' && lobby"
      :lobby="lobby"
    />
    <SidebarCreate
      v-if="router.currentRoute.value.name === 'createparticipation'"
      @selected-data="$emit('selected-data', $event)"
    />
    <div class="flex flex-col flex-1">
      <Navbar />
      <div class="ml-[200px] mt-[50px] h-[calc(100vh-50px)] py-4 pr-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/DefaultLayout/Navbar.vue";
import SidebarCreate from "../components/Lobby/Sidebar.vue";
import SidebarLobby from "../components/Lobby/SidebarLobby.vue";
import { useRouter } from "vue-router";
import { Lobby } from "../types/typings";
import { PropType } from "vue";

const router = useRouter();
const props = defineProps({
  lobby: {
    type: Object as PropType<Lobby | null>,
    required: false,
    default: null,
  },
});
</script>

<style scoped></style>
