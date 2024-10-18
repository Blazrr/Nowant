<template>
  <div class="flex w-full flex-col items flex-1">
    <Toast />
    <h1
      class="mx-auto mt-12 text-5xl font-extrabold text-sec-500 font-orbitron"
    >
      PROFILE PICTURE
    </h1>
    <div class="flex flex-col items-center mt-16 space-y-16">
      <ProfilePicture ref="profilePicture" />
      <Button
        label="Upload your profile picture"
        :disabled="!selectedFile"
        @click="upload"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watchEffect } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import { useUserStore } from "../../store/userStore";
import ProfilePicture from "../settings/ProfilePicture.vue";
const userStore = useUserStore();
const toast = useToast();
const emit = defineEmits(["handleStep"]);
const profilePicture = useTemplateRef("profilePicture");
const selectedFile = computed(() => profilePicture.value?.selectedFile || null);

onMounted(() => {
  setTimeout(() => {
    toast.add({
      severity: "success",
      summary: "Successfully registered!",
      detail:
        "You have successfully registered. Please upload your profile picture or skip.",
      life: 5000,
    });
  }, 200);
});

const upload = async () => {
  try {
    const formData = new FormData();
    formData.append("file", profilePicture?.value?.selectedFile!);
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/picture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
      body: formData,
    });
    emit("handleStep", 3);
  } catch (error) {
    console.error(error);
  }
};
</script>
