<template>
  <div>{{ authStore.name }}</div>
  <UButton
    :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
    color="gray"
    variant="ghost"
    aria-label="Theme"
    @click="isDark = !isDark"
  />
  <h1 class="text-pri-700">hello</h1>
  <h1 class="text-sec-700">hello</h1>
  <UButton>Button</UButton>
</template>

<script lang="ts" setup>
const authStore = useUserStore();
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<style></style>
