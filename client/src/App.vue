<template>
  <RouterView v-if="apiStore.maps.length && apiStore.agents.length" />
  <div v-else>boop</div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { useApiStore } from "./store/apiStore";
import { socket } from "./socket";
const apiStore = useApiStore();
</script>
<style></style>
