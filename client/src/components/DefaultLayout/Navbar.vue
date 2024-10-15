<template>
  <div
    class="flex items-center justify-between p-4 fixed top-0 left-[200px] backdrop-blur-md w-[calc(100%-200px)]"
  >
    <div>idk</div>
    <div
      class="flex space-x-4 items-center cursor-pointer hover:text-sec-400 active:text-sec-500 transition-all"
      @click="toggle"
    >
      <img :src="profilePictureUrl" alt="" class="h-10 w-10 rounded-full" />
      <span>{{ userStore.user.username }}</span>
      <i class="pi pi-angle-down"></i>
    </div>
    <Popover ref="op">
      <div class="flex flex-col space-y-2">
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
        <div class="flex items-center space-x-2">
          <i :class="['h-4 w-[2px] transition-all']"></i>
          <i class="pi pi-sign-out"></i>
          <span to="/login" @click="logout" class="cursor-pointer">Logout</span>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../../store/userStore";
import Popover from "primevue/popover";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { useOverlayStore } from "../../store/overlayStore";

const router = useRouter();
const userStore = useUserStore();
const profilePictureUrl = `${import.meta.env.VITE_BACKEND_URL}/${userStore.user?.profile.picture}`;
const overlayStore = useOverlayStore();

const logout = () => {
  window.ipcRenderer.send("logout");
  router.push({ name: "login" });
  overlayStore.closeOverlay();
};
const op = ref();
const toggle = (event: Event) => {
  op.value.toggle(event);
};
</script>

<style scoped></style>
