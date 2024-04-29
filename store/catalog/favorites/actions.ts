import { I_Products } from "~/models/server/api/interfaces";
import { findFavoritesProductsFunc } from "~/store/catalog/favorites/mappers/findFavoritesProducts";

export default {
  A_SET_FAVORITES_PRODUCTS(context: {
    commit: (arg0: string, arg1: I_Products[]) => void;
    getters: any;
  }): void {
    const favoritesProducts: I_Products[] = findFavoritesProductsFunc();
    context.commit("M_SET_FAVORITES_PRODUCTS", favoritesProducts);
  },
  A_ADD_PRODUCT_IN_FAVORITES(
    context: { commit: (arg0: string, arg1: number) => void; getters: any, dispatch: any },
    payload: number,
  ): void {
    context.commit("M_ADD_PRODUCT_IN_FAVORITES", payload);
    context.dispatch("A_SET_FAVORITES_PRODUCTS")
  },
  A_DELETE_PRODUCT_FROM_FAVORITES(
    context: { commit: (arg0: string, arg1: number) => void; dispatch: any },
    payload: number,
  ): void {
    context.commit("M_DELETE_PRODUCT_FROM_FAVORITES", payload);
    context.dispatch("A_SET_FAVORITES_PRODUCTS")
  },
};
