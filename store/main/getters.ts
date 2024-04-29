import { I_MainState} from "~/models/store/main/interfaces";
import { T_Language, T_ThemeMode} from "~/models/store/main/types";

export default {
  getThemeMode: (state: I_MainState): T_ThemeMode => {
    return state.themeMode;
  },
  getLanguage: (state: I_MainState): T_Language => {
    return state.language;
  },
  getAlert: (state: I_MainState): any => {
    return state.alertConfig
  }
};
