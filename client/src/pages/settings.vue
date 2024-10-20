<template>
  <DefaultLayout>
    <Toast />
    <div class="flex flex-col items-center mx-auto">
      <MapSettings ref="mapSettings" />
      <div class="mt-8"></div>
      <ProfilePicture ref="profilePicture" />
      <Button
        label="Save settings"
        class="w-[200px] flex mx-auto mt-8"
        @click="saveSettings"
      />
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import DefaultLayout from "../layouts/default.vue";
import MapSettings from "../components/settings/MapSettings.vue";
import { useTemplateRef } from "vue";
import { useUserStore } from "../store/userStore";
import { useRouter } from "vue-router";
import ProfilePicture from "../components/settings/ProfilePicture.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();
const userStore = useUserStore();
const mapSettings = useTemplateRef("mapSettings");
const profilePicture = useTemplateRef("profilePicture");

const saveSettings = async () => {
  if (profilePicture?.value?.selectedFile!) {
    try {
      const formData = new FormData();
      formData.append("file", profilePicture.value.selectedFile);
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  }
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
      body: JSON.stringify(mapSettings?.value?.settings!),
    });
    router.push(router.currentRoute.value.fullPath);
  } catch (error) {
    console.error(error);
  }
  toast.add({
    severity: "success",
    summary: "Settings change!",
    detail: "You have successfully changed your settings",
    life: 5000,
  });
  userStore.fetchUser();
};
</script>
