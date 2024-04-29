import {API_I_Colors, API_I_Sizes, API_I_Types} from "~/models/server/api/interfaces";
import {I_DataFilters} from "~/models/store/catalog/filters/interfaces";
import { dataColors } from "~/server/api/colors";
import { dataSizes } from "~/server/api/sizes";
import { dataTypes } from "~/server/api/types";


export default {
  async A_SET_FILTERS(context: {
    commit: (arg0: string, arg1: I_DataFilters) => void;
  }): Promise<void> {
    const types: API_I_Types[] = dataTypes;
    const sizes: API_I_Sizes[] = dataSizes;
    const colors: API_I_Colors[] = dataColors;
    const filters: I_DataFilters = {
      types,
      sizes,
      colors,
    };
    context.commit("M_SET_FILTERS", filters);
  },
};
