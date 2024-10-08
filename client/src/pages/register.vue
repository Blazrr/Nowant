<template>
  <div class="flex">
    <RegisterSidebar :step="step" />
    <RegisterStepOne v-if="step === 1" class="flex-1" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RegisterSidebar from "../components/Register/Sidebar.vue";
import RegisterStepOne from "../components/Register/StepOne.vue";
const step = ref(1);
</script>
