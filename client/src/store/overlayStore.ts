import { defineStore } from "pinia";
import { ref } from "vue";

export const useOverlayStore = defineStore("overlay", () => {
  const isOpen = ref(false);

  const openOverlay = () => {
    window.ipcRenderer.send("open-overlay");
    isOpen.value = true;
  };
  const closeOverlay = () => {
    window.ipcRenderer.send("close-overlay");
    isOpen.value = false;
  };

  return { isOpen, openOverlay, closeOverlay };
});
