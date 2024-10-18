<template>
  <div class="flex">
    <Sidebar @selected-data="$emit('selected-data', $event)" />
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
import Sidebar from "../components/Lobby/Sidebar.vue";
</script>

<style scoped></style>
