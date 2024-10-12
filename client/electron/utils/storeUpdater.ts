import { ipcMain } from "electron";
import { getToken, removeToken, setToken } from "./electronStore";

export const registerStoreUpdater = () => {
  ipcMain.on("update-store", (event, arg) => {
    event.reply("update-store", "Acknowledged");
  });
  ipcMain.handle("getToken", async (event) => {
    // Replace getToken() with your actual token retrieval function
    return getToken();
  });

  ipcMain.on("logout", (event) => {
    // event.reply("removeToken-reply", "Acknowledged");
    removeToken();
  });
};
