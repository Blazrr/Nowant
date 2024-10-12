import { BrowserWindow, ipcMain } from "electron";
import { getToken, removeToken, setToken } from "./electronStore";

export const registerStoreUpdater = () => {
  const mainWindow = BrowserWindow.getAllWindows()[0];
  const childWindow = BrowserWindow.getAllWindows()[1];
  ipcMain.on("open-overlay", (_, arg) => {});

  ipcMain.on("update-lobby-store", (event, arg) => {
    BrowserWindow.getAllWindows()[1]?.webContents.send(
      "update-lobby-store",
      arg
    );
    // console.log(BrowserWindow.getAllWindows()[1]);
  });
};
