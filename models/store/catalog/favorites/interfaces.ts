import {I_Products} from "~/models/server/api/interfaces";

export interface I_FavoriteProductId {
    productId: number
}
export interface I_FavoritesState {
  favoritesId: I_FavoriteProductId[];
  products: I_Products[];
}