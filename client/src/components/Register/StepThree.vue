<template>
  <div class="flex w-full flex-col items flex-1">
    <Toast />
    <h1
      class="mx-auto mt-12 text-5xl font-extrabold text-sec-500 font-orbitron"
    >
      GAME SETTINGS
    </h1>
    <MapSettings ref="mapSettings" class="mt-12" />
    <Button
      label="Save settings"
      class="w-[200px] flex mx-auto mt-8"
      @click="saveSettings"
    />
  </div>
</template>

<script setup lang="ts">
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import { onMounted, useTemplateRef } from "vue";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "vue-router";
import MapSettings from "../settings/MapSettings.vue";

const router = useRouter();
const userStore = useUserStore();
const toast = useToast();
const mapSettings = useTemplateRef("mapSettings");

onMounted(() => {
  setTimeout(() => {
    toast.add({
      severity: "success",
      summary: "Profile picture is done!",
      detail:
        "You have successfully uploaded your profile picutre. You can now set your settings.",
      life: 5000,
    });
  }, 200);
});

const saveSettings = async () => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
      body: JSON.stringify(mapSettings.value!.settings),
    });
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
