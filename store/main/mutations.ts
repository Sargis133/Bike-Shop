import {I_AlertConfigPayload, I_MainState} from "~/models/store/main/interfaces";
import { T_Language, T_ThemeMode} from "~/models/store/main/types";

export default {
  M_SET_MODE(state: I_MainState, payload: T_ThemeMode): void {
    state.themeMode = payload;
  },
  M_SET_ALERT_CONFIG(state: I_MainState, payload: I_AlertConfigPayload): void {
    payload.id = ((state.alertConfig.at(-1)?.id) || 0) + 1
    state.alertConfig.push(payload);
  },
  M_HIDE_ALERT(state: I_MainState, payload: number): void {
    state.alertConfig = state.alertConfig.filter((item: I_AlertConfigPayload): boolean => item.id !== payload)
  },
  M_SET_LANGUAGE(state: I_MainState, payload: T_Language): void {
    state.language = payload;
  },

};
