import { init as SentryInit } from "@sentry/electron/main";

SentryInit({
  dsn: "https://1f58a2140259404ca5870d33b0d6ad2f@o1138268.ingest.sentry.io/6192379",
  environment: import.meta.env.DEV ? "development" : undefined,
});

import { app } from "electron";
import type { AppUpdater } from "electron-updater";
import "./security-restrictions";
import { restoreOrCreateWindow } from "/@/mainWindow";

/**
 * Prevent multiple instances
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on("second-instance", restoreOrCreateWindow);

/**
 * Disable Hardware Acceleration for more power-save
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/v14-x-y/api/app#event-activate-macos Event: 'activate'
 */
app.on("activate", restoreOrCreateWindow);

/**
 * Create app window when background process will be ready
 */
app
  .whenReady()
  .then(restoreOrCreateWindow)
  .catch((e) => console.error("Failed create window:", e));

/**
 * Install Vue.js or some other devtools in development mode only
 */
if (import.meta.env.DEV) {
  app
    .whenReady()
    .then(() => import("electron-devtools-installer"))
    .then(({ default: installExtension, VUEJS3_DEVTOOLS }) =>
      installExtension(VUEJS3_DEVTOOLS, {
        loadExtensionOptions: {
          allowFileAccess: true,
        },
      }),
    )
    .catch((e) => console.error("Failed install extension:", e));
}

/**
 * Check new app version in production mode only
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import("electron-updater"))
    .then(({ autoUpdater }) => setUpdatePolicy(autoUpdater))
    .catch((e) => console.error("Failed check updates:", e));
}
function setUpdatePolicy(autoUpdater: AppUpdater) {
  autoUpdater.allowPrerelease = true;
  autoUpdater.checkForUpdatesAndNotify();
}
