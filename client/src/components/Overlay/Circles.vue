<template>
  <div>
    <template v-if="gameOnRoll">
      <template v-for="participation of lobbyStore.lobby?.participations">
        <Circle :participation="participation" :game-on-roll="gameOnRoll" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { Lobby } from "../../types/typings";
import { useLobbyStore } from "../../store/lobbyStore";
import * as luxon from "luxon";
import Circle from "./Circle.vue";
const lobbyStore = useLobbyStore();

const props = defineProps({
  gameOnRoll: {
    type: Boolean,
    required: true,
  },
});

const startTime = ref<luxon.DateTime>();

watch(
  () => props.gameOnRoll,
  async (isOnRoll) => {
    if (isOnRoll) {
      startTime.value = luxon.DateTime.local();
      // Your logic here
    }
  }
);
</script>

<style scoped></style>
