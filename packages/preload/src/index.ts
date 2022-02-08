import "@sentry/electron/preload";
import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("isDev", import.meta.env.DEV);
