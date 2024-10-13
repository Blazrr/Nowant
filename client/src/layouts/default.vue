<template>
  <div class="flex">
    <Sidebar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";
</script>

<style lang="scss" scoped></style>
