import { init as SentryInit } from "@sentry/electron/renderer";

SentryInit({
  dsn: "https://1f58a2140259404ca5870d33b0d6ad2f@o1138268.ingest.sentry.io/6192379",
  tracesSampleRate: 1.0,
  environment: window.isDev ? "development" : undefined,
});

import { createApp } from "vue";
import { Quasar, Dark } from "quasar";

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.css";

import App from "/@/components/App.vue";
import { Router } from "/@/router/router";

const vueApp = createApp(App);

vueApp.use(Quasar);
vueApp.use(Router);

Dark.set(true);

vueApp.mount("#app");
