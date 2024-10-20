<template>
  <div>
    <div v-if="gameOnRoll" class="flex justify-center space-x-8">
      <template v-for="participation of lobbyStore.lobby?.participations">
        <Circle
          v-if="participation.user.username === userStore.user?.username"
          :participation="participation"
          :game-on-roll="gameOnRoll"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { Lobby } from "../../types/typings";
import { useLobbyStore } from "../../store/lobbyStore";
import * as luxon from "luxon";
import Circle from "./Circle.vue";
import { useUserStore } from "../../store/userStore";

const lobbyStore = useLobbyStore();
const userStore = useUserStore();

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
