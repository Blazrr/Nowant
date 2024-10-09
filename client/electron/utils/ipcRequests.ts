import { ipcMain } from "electron";
import { getToken, removeToken, setToken } from "./electronStore";

export const registerIpcHandlers = () => {
  ipcMain.on("setToken", (event, arg) => {
    // event.reply("register-reply", "Acknowledged");
    setToken(arg);
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
