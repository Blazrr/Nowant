import { defineStore } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { User } from "../types/typings";
import { useOverlayStore } from "./overlayStore";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const token = ref("");
  const user = ref<User | null>(null);

  const fetchDatabyToken = async (token: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/dataByToken`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  };

  const setUser = (newUser: User) => {
    user.value = newUser;
  };

  const setToken = async (newToken: string) => {
    token.value = newToken;
    try {
      const user = await fetchDatabyToken(token.value);
      setUser(user);
    } catch (error) {
      console.error("Error fetching user data by token:", error);
    }
  };

  const fetchUser = async () => {
    const user = await fetchDatabyToken(token.value);
    setUser(user);
  };

  const overlayStore = useOverlayStore();
  const isOverlayWindow = computed(() => !overlayStore.isOpen);

  // This is a watcher that listens for updates from the main process

  if (isOverlayWindow.value) {
    window.ipcRenderer.on("update-user-store", (_, data) => {
      user.value = JSON.parse(data);
    });
  }

  // This is a watcher that sends the new value of the lobby store to the child process
  watch(
    user,
    (newVal) => {
      if (!isOverlayWindow.value) {
        window.ipcRenderer.send("update-user-store", JSON.stringify(newVal));
      }
    },
    { deep: true }
  );

  return { user, isLoggedIn, setUser, setToken, token, fetchUser };
});
