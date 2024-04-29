import {API_I_Categories} from "~/models/server/api/interfaces";
import { I_Category } from "~/models/store/catalog/categories/interfaces";
import { dataCategories } from "~/server/api/categories";

export default {
  async A_SET_CATEGORIES(context: {
    commit: (arg0: string, arg1: I_Category[]) => void;
  }): Promise<void> {
    const categories: API_I_Categories[] = dataCategories
    context.commit("M_SET_CATEGORIES", categories);
  },
};
