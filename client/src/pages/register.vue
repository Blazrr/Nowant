<template>
  <div class="flex">
    <RegisterSidebar :step="step" />
    <RegisterStepOne
      v-if="step === 1"
      class="flex-1"
      @handleStep="handleStep"
    />
    <RegisterStepTwo v-if="step === 2" @handleStep="handleStep" />
    <RegisterStepThree v-if="step === 3" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RegisterSidebar from "../components/Register/Sidebar.vue";
import RegisterStepOne from "../components/Register/StepOne.vue";
import RegisterStepTwo from "../components/Register/StepTwo.vue";
import RegisterStepThree from "../components/Register/StepThree.vue";
const step = ref(1);

const handleStep = (stepVal: number) => {
  console.log(stepVal);
  step.value = stepVal;
};
</script>
