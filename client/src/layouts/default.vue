<template>
  <div class="flex">
    <Sidebar />
    <div class="flex flex-col flex-1">
      <Navbar
        @search-value="$emit('search-value', $event)"
        @show-closed="$emit('show-closed', $event)"
        @maps-filtered="$emit('maps-filtered', $event)"
        @refresh="$emit('refresh')"
      />
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
