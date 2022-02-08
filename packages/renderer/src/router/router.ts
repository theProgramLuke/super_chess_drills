import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

import Welcome from "/@/components/Welcome.vue";
import EditRepertoire from "/@/components/EditRepertoire.vue";
import TrainRepertoire from "/@/components/TrainRepertoire.vue";
import UserSettings from "/@/components/UserSettings.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/edit",
    name: "Edit",
    component: EditRepertoire,
  },
  {
    path: "/train",
    name: "Train",
    component: TrainRepertoire,
  },
  {
    path: "/settings",
    name: "Settings",
    component: UserSettings,
  },
];

export const Router = createRouter({
  history: createWebHistory(),
  routes,
});
