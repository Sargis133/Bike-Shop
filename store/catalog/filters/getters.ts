import { E_FilterColor } from "~/models/store/catalog/filters/enums";
import {
  I_ChangedColors,
  I_ChangedSizes,
  I_ChangedTypes,
  I_Colors,
  I_FiltersState,
  I_Sizes,
  I_Types,
} from "~/models/store/catalog/filters/interfaces";
import { I_StringObject } from "~/models/composables/useLocalization/interfaces";

export default {
  getTypeFilters: (state: I_FiltersState): I_ChangedTypes[] => {
    const localization = useLocalization();

    let types: I_ChangedTypes[] = state.types?.map((item: I_Types): I_ChangedTypes => {
      return {
        name: localization[item.name],
        value: "" + item.id,
      };
    })
    types.unshift({ name: localization.allBikes, value: ''});
    return types
  },
  getColorFilters: (state: I_FiltersState): I_ChangedColors[] => {
    const localization: I_StringObject = useLocalization();
    return state.colors?.map((item: I_Colors): I_ChangedColors => {

      return {
        name: localization[item.name],
        value: item.name,
        icon: "circle",
        iconClass: `w-4 h-4 ml-2 rounded-full ${E_FilterColor[item.name as keyof typeof E_FilterColor]}`,
        isChecked: false,
      };
    });
  },
  getSizeFilters: (state: I_FiltersState): I_ChangedSizes[] => {
    return state.sizes?.map((item: I_Sizes): I_ChangedSizes => {
      return {
        name: item.name,
        value: item.id,
      };
    });
  },
};
