<template>
  <div class="flex items-center justify-center flex-col">
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
          {{ userStore.user?.profile?.settings?.mapZoom }}
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
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import { reactive, ref } from "vue";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import { useUserStore } from "../../store/userStore";
const userStore = useUserStore();
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const settings = reactive({
  mapSize: userStore.user?.profile?.settings?.mapSize || 1,
  mapZoom: userStore.user?.profile?.settings?.mapZoom || 1,
  showMap: userStore.user?.profile?.settings?.showMap || false,
});

defineExpose({
  settings,
});
</script>
