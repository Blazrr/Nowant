<template>
  <label
    for="upload-photo"
    class="hover:text-sec-400 active:text-sec-500 transition-all"
    >Choose your new profile picture</label
  >
  <input
    type="file"
    name="photo"
    id="upload-photo"
    @change="onFileChange"
    accept="image/*"
  />
  <div class="mt-8">
    <img
      :src="imageUrl"
      alt="Selected Image"
      class="max-w-xs h-[300px] w-[300px] rounded-full"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "../../store/userStore";

const userStore = useUserStore();
const toast = useToast();
const selectedFile = ref<File | null>(null);
const emit = defineEmits(["handleStep"]);
const imageUrl = ref<string>(
  `${import.meta.env.VITE_BACKEND_URL}/assets/default.jpg`
);

defineExpose({ selectedFile });

watchEffect(() => {
  if (userStore.user?.profile?.picture) {
    imageUrl.value = `${import.meta.env.VITE_BACKEND_URL}/${
      userStore.user.profile.picture
    }`;
  }
});

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
    const file = selectedFile.value;
    if (file.size > 2 * 1024 * 1024) {
      toast.add({
        severity: "warn",
        summary: "File Too Large",
        detail: "Please select a file smaller than 2 MB.",
        life: 3000,
      });
      selectedFile.value = null;
      return;
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrl.value = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      toast.add({
        severity: "warn",
        summary: "Invalid File Type",
        detail: "Please select an image file.",
        life: 3000,
      });
      selectedFile.value = null;
    }
  }
};
</script>

<style scoped>
label {
  cursor: pointer;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
</style>
