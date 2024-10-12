import { watch } from "original-fs";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLobbyStore = defineStore("lobby", () => {
  const lobby = ref("init");

  const setName = (newName: string) => {
    lobby.value = newName;
  };
  watch(lobby, (newVal) => {
    window.ipcRenderer.send("update-lobby-store", JSON.stringify(newVal));
  });

  return { lobby, setName };
});
