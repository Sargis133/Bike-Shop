import { I_UseLocalStorage } from "~/models/composables/useLocalStorage/interfaces";
import { I_MainState } from "~/models/store/main/interfaces";
import {T_Language, T_ThemeMode} from "~/models/store/main/types";

const useLocal: I_UseLocalStorage = useLocalStorage();

const state: I_MainState = {
  themeMode: (useLocal.getItemLocalStorage("themeMode") as T_ThemeMode) || "light",
  alertConfig: [],
  language: (useLocal.getItemLocalStorage("language") as T_Language) || 'en-US',
};

export default state;
