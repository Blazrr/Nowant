<template>
  <DefaultLayout @search-value="searchValue = $event">
    <div class="h-full">
      <div class="grid grid-cols-3 grid-flow-rows gap-4">
        <template v-for="lobby in lobbies">
          <LobbyCard :lobby="lobby" />
        </template>
      </div>

      {{ searchValue }}
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import DefaultLayout from "../layouts/default.vue";
import { useUserStore } from "../store/userStore";
import { Lobby } from "../types/typings";
import LobbyCard from "../components/Lobbies/LobbyCard.vue";
const searchValue = ref("");
const userStore = useUserStore();
const lobbies = ref<Lobby[]>([]);

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
    console.log(data);
    lobbies.value = data;
  } catch (err: unknown) {
    console.error(err);
  }
};

onMounted(() => {
  fetchLobbies();
});
</script>

<style lang="scss" scoped></style>
