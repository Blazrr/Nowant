<template>
  <RouterView v-if="apiStore.maps.length && apiStore.agents.length" />
  <div v-else class="h-screen flex justify-center items-center">
    <ProgressSpinner />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { useApiStore } from "./store/apiStore";
import ProgressSpinner from "primevue/progressspinner";
const apiStore = useApiStore();
</script>
<style></style>
