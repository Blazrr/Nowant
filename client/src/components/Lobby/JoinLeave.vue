<template>
  <div class="absolute bottom-4 right-4">
    <Button
      :label="lobbyStore.lobby ? 'Leave lobby' : 'Join lobby'"
      @click="joinOrLeaveLobby"
    />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { useLobbyStore } from "../../store/lobbyStore";
import { PropType } from "vue";
import { Lobby } from "../../types/typings";

const props = defineProps({
  lobby: {
    type: Object as PropType<Lobby>,
    required: true,
  },
});

const lobbyStore = useLobbyStore();
const joinOrLeaveLobby = () => {
  if (lobbyStore.lobby) {
    lobbyStore.lobby = null;
  } else {
    lobbyStore.lobby = props.lobby;
  }
};
</script>

<style scoped></style>
