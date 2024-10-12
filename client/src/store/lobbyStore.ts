import { defineStore } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useOverlayStore } from "./overlayStore";

export const useLobbyStore = defineStore("lobby", () => {
  const lobby = ref("init");

  const overlayStore = useOverlayStore();
  const isOverlayWindow = computed(() => !overlayStore.isOpen);

  const setName = (newName: string) => {
    lobby.value = newName;
  };

  // This is a watcher that listens for updates from the main process
  onMounted(() => {
    if (isOverlayWindow.value) {
      window.ipcRenderer.on("update-lobby-store", (_, data) => {
        lobby.value = data;
      });
    }
  });

  // This is a watcher that sends the new value of the lobby store to the child process
  watch(lobby, (newVal) => {
    if (!isOverlayWindow.value) {
      window.ipcRenderer.send("update-lobby-store", JSON.stringify(newVal));
    }
  });
  return { lobby, setName };
});
