<template>
  <div class="p-4 flex h-screen flex-col">
    <RouterLink to="/" class="text-xl font-extrabold text-sec-500 font-orbitron"
      >NOWANT</RouterLink
    >
    <div class="flex flex-col justify-between h-full">
      <div class="pt-16 px-8">
        <h2 class="mt-16 font-extrabold">WHATS NEW ?</h2>
      </div>
      <div class="flex flex-col justify-between space-y-4 px-8 pb-24">
        <div class="flex items-center space-x-2">
          <i class="pi pi-cog"></i>
          <RouterLink to="/settings">Settings</RouterLink>
        </div>
        <div class="flex items-center space-x-2">
          <i class="pi pi-sign-out"></i>
          <span to="/login" @click="logout" class="cursor-pointer">Logout</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

const logout = () => {
  window.ipcRenderer.send("logout");
  router.push({ name: "login" });
  overlayStore.closeOverlay();
};
</script>

<style scoped></style>
