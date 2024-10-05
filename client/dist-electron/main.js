import { app as e, BrowserWindow as r } from "electron";
e.whenReady().then(() => {
  new r(
    { transparent: !0, frame: !1 }
  ).loadURL(process.env.VITE_DEV_SERVER_URL);
});
