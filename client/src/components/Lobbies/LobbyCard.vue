<template>
  <div
    :style="{
      backgroundImage: `url(${
        apiStore.maps.find((map) => map?.displayName === lobby?.map)?.splash
      })`,
    }"
    class="h-[200px] rounded-lg bg-center bg-[length:110%_110%] hover:bg-[length:130%_130%] active:bg-[length:150%_150%] transition-all cursor-pointer p-4 relative group"
  >
    <span
      class="text-sec-500 group-hover:text-sec-600 group-active:text-sec-700 transition-all font-orbitron font-extrabold text-2xl"
    >
      {{ lobby?.name }}
    </span>
    <span
      class="transition-all font-orbitron font-extrabold text-2xl absolute top-4 right-4"
    >
      {{ lobby?.map }}</span
    >
    <i
      :class="[
        'pi absolute right-4 bottom-4',
        lobby?.password ? 'pi-lock' : 'pi-lock-open',
      ]"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Lobby } from "../../types/typings";
import { useApiStore } from "../../store/apiStore";
const apiStore = useApiStore();

defineProps({
  lobby: Object as PropType<Lobby>,
});
</script>

<style scoped></style>
