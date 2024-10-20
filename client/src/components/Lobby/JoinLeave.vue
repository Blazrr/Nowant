<template>
  <div>
    <Button
      :label="lobbyStore.lobby ? 'LEAVE' : 'PLAY'"
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
