import { type BrowserWindow, ipcMain } from "electron";
import { getToken, removeToken, setToken } from "./electronStore";

export const registerStoreUpdater = (childWindow: BrowserWindow) => {
  ipcMain.on("update-lobby-store", (event, arg) => {
    console.log(arg, "update-lobby-store");
    childWindow?.webContents.send("update-lobby-store", arg);
  });
};
