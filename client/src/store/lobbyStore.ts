import { defineStore } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useOverlayStore } from "./overlayStore";
import { Lobby } from "../types/typings";

export const useLobbyStore = defineStore("lobby", () => {
  const lobby = ref<Lobby | null>();

  const overlayStore = useOverlayStore();
  const isOverlayWindow = computed(() => !overlayStore.isOpen);

  // This is a watcher that listens for updates from the main process
  if (isOverlayWindow.value) {
    window.ipcRenderer.on("update-lobby-store", (_, data) => {
      lobby.value = JSON.parse(data);
    });
  }

  // This is a watcher that sends the new value of the lobby store to the child process
  watch(lobby, (newVal) => {
    if (!isOverlayWindow.value) {
      window.ipcRenderer.send("update-lobby-store", JSON.stringify(newVal));
    }
  });
  return { lobby };
});
