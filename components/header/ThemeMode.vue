<template>
  <ui-ui-button custom=" " size="sm" @click="onChangeModeFunc">
    <ui-ui-icons :icon-name="themeModeIcon" icon-classes="w-6 h-6 2xl:w-10 2xl:h-10 " />
  </ui-ui-button>
</template>

<script setup lang="ts">
import { T_ThemeModeIcon } from "~/components/header/models/types";
import { T_ThemeMode } from "~/models/store/main/types";

const { $store } = useNuxtApp();

const getThemeMode = computed<T_ThemeMode>(() => $store.getters.getThemeMode);

const isDark = computed<boolean>(() => getThemeMode.value === "dark");

const themeModeIcon = computed<T_ThemeModeIcon>(() =>
  getThemeMode.value === "dark" ? "moon" : "sun",
);

if (process.client) {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("bg-slate-900");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("bg-slate-900");
  }
}

const onChangeModeFunc = () => $store.dispatch("A_SET_MODE");
</script>

<style scoped></style>
