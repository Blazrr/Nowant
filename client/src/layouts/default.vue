<template>
  <div class="flex">
    <Sidebar />
    <div class="flex flex-col flex-1">
      <Navbar @search-value="$emit('search-value', $event)" />
      <div class="ml-[200px] mt-[50px] h-[calc(100vh-50px)] py-4 pr-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/DefaultLayout/Navbar.vue";
import Sidebar from "../components/DefaultLayout/Sidebar.vue";
</script>

<style lang="scss" scoped></style>
