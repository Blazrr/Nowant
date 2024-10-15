<template>
  <div class="flex">
    <Sidebar />
    <div class="flex flex-col flex-1">
      <Navbar />
      <div class="ml-[200px] mt-[100px]">
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
