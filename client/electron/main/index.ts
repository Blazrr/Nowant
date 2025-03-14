import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  globalShortcut,
  screen,
} from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
import { registerStoreUpdater } from "../utils/storeUpdater";
import { registerIpcHandlers } from "../utils/ipcRequests";
import { getToken } from "../utils/electronStore";
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../../.env") });

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, "../..");

export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let mainWindow: BrowserWindow | null = null;
const preload = path.join(__dirname, "../preload/index.mjs");
const indexHtml = path.join(RENDERER_DIST, "index.html");

async function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Main window",
    icon: path.join(process.env.VITE_PUBLIC, "favicon.ico"),
    width: 1024,
    height: 768,
    resizable: false,
    webPreferences: {
      preload,
      devTools: false,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  });
  mainWindow.setMenuBarVisibility(false);

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow?.webContents.send(
      "main-process-message",
      new Date().toLocaleString()
    );
  });

  // Make all links open with the browser, not with the application
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
  // mainWindow.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  mainWindow = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (mainWindow) {
    // Focus on the main window if the user tried to open another
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
let childWindow: BrowserWindow | null = null;
let lobby = null;

// New window example arg: new windows url
ipcMain.on("open-overlay", (_, arg) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  if (childWindow) return;
  childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
    resizable: false,
    frame: false,
    transparent: true,
    type: "panel",
    skipTaskbar: true,
    focusable: false,
    width,
    height,
  });
  childWindow.setIgnoreMouseEvents(true);
  childWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  childWindow.setAlwaysOnTop(true, "floating");
  childWindow.moveTop();
  childWindow.focus();
  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL("http://localhost:5173#/overlay");
  } else {
    childWindow.loadFile(indexHtml, { hash: "overlay" });
  }

  mainWindow.on("closed", () => {
    childWindow?.close();
    app.quit();
  });

  globalShortcut.register("F7", async () => {
    if (!lobby) return;
    try {
      await fetch(
        `https://nowant.onrender.com/lobbies/startGame?lobby_id=${lobby.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  });
});

ipcMain.on("close-overlay", (_, arg) => {
  console.log("close overlay");
  childWindow.close();
});

ipcMain.on("update-lobby-store", (event, arg) => {
  childWindow?.webContents.send("update-lobby-store", arg);
  lobby = JSON.parse(arg);
});

ipcMain.on("update-user-store", (event, arg) => {
  childWindow?.webContents.send("update-user-store", arg);
});

registerIpcHandlers();
