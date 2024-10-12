<template>
  <div class="flex w-full flex-col items flex-1">
    <Toast />
    <h1
      class="mx-auto mt-12 text-5xl font-extrabold text-sec-500 font-orbitron"
    >
      GAME SETTINGS
    </h1>
    <div class="flex items-center justify-center mt-12 flex-col">
      <span class="text-center font-orbitron font-bold">MAP SETTINGS</span>
      <div class="flex items-center">
        <Checkbox
          v-model="settings.showMap"
          inputId="showMap"
          name="showMap"
          :binary="true"
          :value="settings.showMap"
        />
        <label for="showMap" class="ml-2">
          Show map (will show the spell on your map)
        </label>
      </div>
      <div class="flex space-x-4 items-center mt-4">
        <div class="flex-auto">
          <label for="mapSize" class="font-bold block mb-2 text-center">
            Map size
          </label>
          <InputNumber
            inputId="mapSize"
            mode="decimal"
            :maxFractionDigits="2"
            showButtons
            :min="0.6"
            :max="1.2"
            :step="0.1"
            fluid
            v-model="settings.mapSize"
            :disabled="!settings.showMap"
          />
        </div>
        <div class="flex-auto">
          <label for="mapZoom" class="font-bold block mb-2 text-center">
            Map zoom
          </label>
          <InputNumber
            inputId="mapZoom"
            mode="decimal"
            :maxFractionDigits="2"
            showButtons
            :min="0.6"
            :max="1.2"
            :step="0.1"
            fluid
            v-model="settings.mapZoom"
            :disabled="!settings.showMap"
          />
        </div>
      </div>
    </div>
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
import { onMounted, reactive, ref } from "vue";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const toast = useToast();
const settings = reactive({
  mapSize: userStore.user?.profile?.settings?.mapSize || 1,
  mapZoom: userStore.user?.profile?.settings?.mapZoom || 1,
  showMap: userStore.user?.profile?.settings?.showMap || false,
});
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
      body: JSON.stringify(settings),
    });
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
