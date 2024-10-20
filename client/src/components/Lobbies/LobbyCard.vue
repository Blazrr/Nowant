<template>
  <Toast />
  <div
    :style="{
      backgroundImage: `url(${
        apiStore.maps.find((map) => map?.displayName === lobby?.map)?.splash
      })`,
    }"
    class="h-[180px] rounded-lg bg-center bg-[length:110%_110%] hover:bg-[length:130%_130%] active:bg-[length:150%_150%] transition-all cursor-pointer p-4 relative group hover:grayscale-[75%]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="joinLobby(lobby)"
  >
    <div
      class="absolute top-4 right-4 flex items-center justify-center flex-col"
    ></div>
    <div class="font-orbitron font-extrabold text-md absolute bottom-4 cf">
      <span class="text-sec-500 font-orbitron font-extrabold text-md">
        {{ lobby?.name }}
      </span>
      <br />
      <div class="flex font-extrabold font-orbitron">
        by
        {{ lobby?.user?.username }}
        <img
          :src="profilePictureUrl"
          alt=""
          class="h-6 w-6 rounded-full ml-2"
        />
      </div>
    </div>
    <span
      class="transition-all font-orbitron font-extrabold text-2xl absolute top-4 left-4"
    >
      {{ lobby?.map }}</span
    >
    <span
      v-if="isHovered"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform font-orbitron text-3xl font-extrabold transition-all"
    >
      JOIN
    </span>
    <i
      :style="{ fontSize: '1.5rem' }"
      :class="[
        'pi absolute right-4 top-5',
        lobby?.password ? 'pi-lock' : 'pi-lock-open',
      ]"
    ></i>
  </div>

  <Dialog
    v-model:visible="isVisible"
    modal
    header="Verify password"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-4"
      >Enter the lobby password.</span
    >
    <div class="flex items-center justify-between space-x-16">
      <InputText
        id="username"
        class="flex-auto"
        autocomplete="off"
        placeholder="password"
        v-model="password"
      />

      <Button type="button" label="Join" @click="checkPassword(lobby)"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { Lobby } from "../../types/typings";
import { useApiStore } from "../../store/apiStore";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import Button from "primevue/button";
import bcrypt from "bcryptjs";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const profilePictureUrl = computed(
  () => `${import.meta.env.VITE_S3_URL}/${props.lobby?.user?.profile?.picture}`
);
const toast = useToast();
const router = useRouter();
const apiStore = useApiStore();
const props = defineProps({
  lobby: {
    type: Object as PropType<Lobby>,
    required: true,
  },
});
const isHovered = ref(false);
const isVisible = ref(false);
const password = ref("");

const checkPassword = (lobby: Lobby) => {
  if (bcrypt.compareSync(password.value, lobby.password)) {
    router.push(`/lobby/${lobby.id}`);
    return;
  }
  toast.add({
    severity: "error",
    summary: "Error on your form entry",
    detail: "Password is incorrect",
    life: 3000,
  });
};

const joinLobby = (lobby: Lobby) => {
  if (lobby?.password) {
    isVisible.value = true;
    return;
  }
  router.push(`/lobby/${lobby.id}`);
};
</script>

<style scoped></style>
