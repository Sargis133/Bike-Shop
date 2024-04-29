import { T_AlertVariant } from "~/components/alert/models/types";
import { I_AlertMessage } from "~/components/alert/models/interfaces";
import { T_Language, T_ThemeMode} from "~/models/store/main/types";

export interface I_MainState {
  themeMode: T_ThemeMode;
  alertConfig: I_AlertConfigPayload[];
  language: T_Language;
}

export interface I_AlertConfigPayload {
  variant: T_AlertVariant;
  descriptions: I_AlertMessage[];
  id?: number | null;
}
