<template>
  <DefaultLayout
    @search-value="searchValue = $event"
    @show-closed="showClosed = $event"
    @maps-filtered="mapsFilter = $event"
    @refresh="fetchLobbies"
  >
    <div class="h-full">
      <div class="grid grid-cols-3 grid-flow-rows gap-4">
        <LobbyCard v-for="lobby in filteredLobbies" :lobby="lobby" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import DefaultLayout from "../layouts/default.vue";
import { useUserStore } from "../store/userStore";
import { Lobby, Map } from "../types/typings";
import LobbyCard from "../components/Lobbies/LobbyCard.vue";
const userStore = useUserStore();
const lobbies = ref<Lobby[]>([]);
const filteredLobbies = ref<Lobby[]>([]);
const searchValue = ref("");
const showClosed = ref(true);
const mapsFilter = ref<Map[]>([]);
const fetchLobbies = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/lobbies/getAll`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.token}`,
        },
      }
    );
    const data = await response.json();
    lobbies.value = data;
    filteredLobbies.value = data;
  } catch (err: unknown) {
    console.error(err);
  }
};

const computedFilters = computed(() => [
  searchValue.value,
  showClosed.value,
  mapsFilter.value,
]);

watch(computedFilters, () => {
  const filtered = lobbies.value.filter((lobby) => {
    return (
      lobby.name.toLowerCase().includes(searchValue.value.toLowerCase()) &&
      (showClosed.value ? true : !lobby.password) &&
      (!mapsFilter.value.length
        ? true
        : mapsFilter.value.some((map) => map.displayName === lobby.map))
    );
  });
  filteredLobbies.value = filtered;
});

onMounted(() => {
  fetchLobbies();
});
</script>
