import { createApp } from "vue";
import { Quasar, Dark } from "quasar";

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.css";

import App from "/@/components/App.vue";
import { Router } from "/@/router/router";

const app = createApp(App);

app.use(Quasar);
app.use(Router);

Dark.set(true);

app.mount("#app");
