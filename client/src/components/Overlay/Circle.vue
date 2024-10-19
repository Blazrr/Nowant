<template>
  <div class="mt-16">
    <div class="h-20 w-20 rounded-full" :style="gradient"></div>

    <div>{{ display }}</div>
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

const props = defineProps({
  participation: {
    type: Object as PropType<{ timer: number }>,
    required: true,
  },
  gameOnRoll: {
    type: Boolean,
    required: true,
  },
});

const start = ref<DateTime | null>(null);
const now = ref<DateTime>(DateTime.local());
const end = ref<DateTime | null>(null);
const tick = ref<number | null>(null);

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
    return (elapsed.value.milliseconds / total.value.milliseconds) * 100;
  }
  return 0;
});

const display = computed(() => {
  if (remaining.value) {
    return Duration.fromObject(remaining.value).toFormat("hh:mm:ss");
  }
  return "00:00:00";
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
