<template>
  <div
    class="h-screen flex w-[30%] bg-[url('/images/jett-large.webp')] bg-[length:500px_620px] bg-no-repeat bg-center blur-sm absolute top-0 left-0 bg-gray-500 bg-opacity-15 -z-10"
  ></div>
  <div class="flex-col w-[30%] p-4 h-screen justify-between flex z-10">
    <div>
      <h1 class="text-xl font-extrabold text-sec-500 font-orbitron">NOWANT</h1>
      <div class="mt-24 flex flex-col space-y-8">
        <div
          :class="[
            'flex space-x-3 items-center p-2',
            step === 1 && 'rounded-lg bg-sec-500',
          ]"
        >
          <i :class="['pi pi-check-circle', step >= 2 && 'text-sec-500']"></i>

          <div class="flex-col">
            <h2 class="font-bold">Your details</h2>
            <p class="text-sm">Provide your user details</p>
          </div>
        </div>
        <div
          :class="[
            'flex space-x-3 items-center p-2',
            step === 2 && 'rounded-lg bg-sec-500',
          ]"
        >
          <i :class="['pi pi-check-circle', step === 3 && 'text-sec-500']"></i>

          <div class="flex-col">
            <h2 class="font-bold">Your profile picture</h2>
            <p class="text-sm">Upload your profile picture</p>
          </div>
        </div>
        <div
          :class="[
            'flex space-x-3 items-center p-2',
            step === 3 && 'rounded-lg bg-sec-500',
          ]"
        >
          <i :class="['pi pi-check-circle']"></i>
          <div class="flex-col">
            <h2 class="font-bold">Your game settings</h2>
            <p class="text-sm">Configure your game settings</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <RouterLink
        class="cursor-pointer text-sec-500 underline"
        v-if="step >= 2"
        to="/"
        >Skip</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
defineProps({
  step: {
    type: Number,
    default: 1,
  },
});
</script>
