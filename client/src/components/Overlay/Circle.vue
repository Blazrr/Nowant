<template>
  <div
    class="h-20 w-20 rounded-full relative flex items-center justify-center"
    :style="gradient"
  >
    <img
      :src="ability?.displayIcon"
      alt=""
      class="h-full w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform p-4"
    />
    <span
      class="text-center absolute left-1/2 -translate-x-1/2 transform -bottom-6 font-orbitron font-extrabold text-sec-500"
      >{{ display }}
    </span>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  defineProps,
  PropType,
} from "vue";
import { DateTime, Duration } from "luxon";
import { useApiStore } from "../../store/apiStore";
import { Participation } from "../../types/typings";

const props = defineProps({
  participation: {
    type: Object as PropType<Participation>,
    required: true,
  },
  gameOnRoll: {
    type: Boolean,
    required: true,
  },
});
const apiStore = useApiStore();
const start = ref<DateTime | null>(null);
const now = ref<DateTime>(DateTime.local());
const end = ref<DateTime | null>(null);
const tick = ref<number | null>(null);

const ability = apiStore.agents
  .find((agent) => agent.displayName === props.participation.agent)
  ?.abilities.find(
    (ability) => props.participation.spell === ability.displayName
  );

const total = computed(() => {
  return end.value && start.value
    ? end.value.diff(start.value).toObject()
    : null;
});
const remaining = computed(() => {
  return end.value && now.value ? end.value.diff(now.value).toObject() : null;
});
const elapsed = computed(() => {
  return now.value && start.value
    ? now.value.diff(start.value).toObject()
    : null;
});
const percent = computed(() => {
  if (elapsed.value && total.value && total.value.milliseconds) {
    return (elapsed.value.milliseconds! / total.value.milliseconds) * 100;
  }
  return 0;
});

const display = computed(() => {
  if (remaining.value) {
    const duration = Duration.fromObject(remaining.value);
    const totalSeconds = duration.as("seconds");
    if (totalSeconds <= 0) {
      return "GO!";
    }
    const formatted = totalSeconds.toFixed(1);
    return `${formatted}s`;
  }
  return "0.000s";
});

const finished = computed(() => {
  return now.value && end.value ? now.value >= end.value : false;
});

const gradient = computed(() => {
  return {
    background: `radial-gradient(black 60%, transparent 61%), conic-gradient(#D53738 0% ${percent.value}%, transparent ${percent.value}% 100%)`,
  };
});

onMounted(() => {
  start.value = DateTime.local();
  end.value = start.value.plus({ seconds: props.participation.timer });

  tick.value = window.setInterval(() => {
    now.value = DateTime.local();
    if (finished.value && tick.value !== null) {
      window.clearInterval(tick.value);
    }
  }, 20);
});

onUnmounted(() => {
  if (tick.value !== null) {
    clearInterval(tick.value);
  }
});
</script>
