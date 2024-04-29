import { T_Language, T_ThemeMode } from "~/models/store/main/types";
import { I_AlertConfigPayload } from "~/models/store/main/interfaces";

const useLocal = useLocalStorage();

export default {
  A_SET_MODE(context: {
    commit: (arg0: string, arg1: T_ThemeMode) => void;
  }): void {
    const documentClassList: DOMTokenList = document.documentElement.classList;
    documentClassList.toggle("dark");
    document.body.classList.toggle("bg-slate-900");
    const themeMode: T_ThemeMode = documentClassList.contains("dark")
      ? "dark"
      : "light";
    useLocal.setItemLocalStorage("themeMode", themeMode);
    context.commit("M_SET_MODE", themeMode);
  },
  A_SET_ALERT_CONFIG(
    context: {
      commit: (arg0: string, arg1: I_AlertConfigPayload) => void;
      getters: any;
    },
    payload: I_AlertConfigPayload,
  ): void {
    context.commit("M_SET_ALERT_CONFIG", payload);
  },
  A_HIDE_ALERT(
    context: { commit: (arg0: string, arg1: number) => void },
    payload: number,
  ): void {
    context.commit("M_HIDE_ALERT", payload);
  },
  A_SET_LANGUAGE(
    context: { commit: (arg0: string, arg1: T_Language) => void },
    payload: T_Language,
  ): void {
    useLocal.setItemLocalStorage("language", payload);
    context.commit("M_SET_LANGUAGE", payload);
  },
};
