<template>
  <div class="flex w-full flex-col items flex-1">
    <Toast />
    <h1
      class="mx-auto mt-12 text-5xl font-extrabold text-sec-500 font-orbitron"
    >
      PROFILE PICTURE
    </h1>
    <div class="flex flex-col items-center mt-16 space-y-16">
      <label for="upload-photo">Choose your new profile picture</label>
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
      <Button
        label="Upload your profile picture"
        :disabled="!selectedFile"
        @click="upload"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import { useUserStore } from "../../store/userStore";
const userStore = useUserStore();
const toast = useToast();
const selectedFile = ref<File | null>(null);
const emit = defineEmits(["handleStep"]);
const imageUrl = ref<string>(
  `${import.meta.env.VITE_BACKEND_URL}/assets/default.jpg`
);

watchEffect(() => {
  if (userStore.user?.profile?.picture) {
    imageUrl.value = `${import.meta.env.VITE_BACKEND_URL}/${
      userStore.user.profile.picture
    }`;
  }
});

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

const upload = async () => {
  try {
    const formData = new FormData();
    formData.append("file", selectedFile.value!);
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/picture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
    emit("handleStep", 3);
  } catch (error) {
    console.error(error);
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
