import {I_Category, I_CategoryState} from "~/models/store/catalog/categories/interfaces";

export default {
  getCategories: (state: I_CategoryState): I_Category[] => {
    return state.categories;
  },
};
