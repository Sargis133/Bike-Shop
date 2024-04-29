import {
  I_Category,
  I_CategoryState,
} from "~/models/store/catalog/categories/interfaces";

export default {
  M_SET_CATEGORIES(state: I_CategoryState, payload: I_Category[]): void {
    state.categories = payload
  },
};
