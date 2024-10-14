<template>
  <div class="p-4 flex h-screen flex-col">
    <RouterLink to="/" class="text-xl font-extrabold text-sec-500 font-orbitron"
      >NOWANT</RouterLink
    >
    <div class="flex flex-col justify-between h-full">
      <div class="pt-16 px-8">
        <h2 class="mt-16 font-extrabold">WHATS NEW ?</h2>
      </div>
      <div class="flex flex-col justify-between space-y-4 px-8 pb-16">
        <RouterLink
          to="/settings"
          :class="[
            'flex items-center space-x-2 hover:text-sec-400 active:text-sec-500 transition-all cursor-pointer',
            router.currentRoute.value.name === 'settings' && 'text-sec-500',
          ]"
        >
          <i
            :class="[
              'h-4 w-[2px] transition-all',
              router.currentRoute.value.name === 'settings' && 'bg-sec-500',
            ]"
          ></i>
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </RouterLink>

        <RouterLink
          to="/help"
          :class="[
            'flex items-center space-x-2 hover:text-sec-400 active:text-sec-500 transition-all cursor-pointer',
            router.currentRoute.value.name === 'help' && 'text-sec-500',
          ]"
        >
          <i
            :class="[
              'h-4 w-[2px] transition-all',
              router.currentRoute.value.name === 'help' && 'bg-sec-500',
            ]"
          ></i>
          <i class="pi pi-question-circle"></i>
          <span>Help</span>
        </RouterLink>
        <div class="flex items-center space-x-2">
          <i :class="['h-4 w-[2px] transition-all']"></i>
          <i class="pi pi-sign-out"></i>
          <span to="/login" @click="logout" class="cursor-pointer">Logout</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { useOverlayStore } from "../store/overlayStore";
const router = useRouter();
const overlayStore = useOverlayStore();

const logout = () => {
  window.ipcRenderer.send("logout");
  router.push({ name: "login" });
  overlayStore.closeOverlay();
};
</script>

<style scoped></style>
