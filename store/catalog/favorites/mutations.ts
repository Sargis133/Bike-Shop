import {I_FavoriteProductId, I_FavoritesState} from "~/models/store/catalog/favorites/interfaces";
import {I_Products} from "~/models/server/api/interfaces";

export default {
  M_SET_FAVORITES_PRODUCTS(state: I_FavoritesState, payload: I_Products[]): void {
    state.products = payload;
  },
  M_ADD_PRODUCT_IN_FAVORITES(state: I_FavoritesState, payload: number): void {
    const newFavProductId: I_FavoriteProductId = {
      productId: payload
    }
    state.favoritesId.push(newFavProductId)
  },
  M_DELETE_PRODUCT_FROM_FAVORITES(state: I_FavoritesState, payload: number): void {
    state.favoritesId = state.favoritesId.filter(
      (item: I_FavoriteProductId): boolean => item.productId != payload,
    );
  },
};
