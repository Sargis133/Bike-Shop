import {I_FavoriteProductId, I_FavoritesState} from "~/models/store/catalog/favorites/interfaces";
import {I_Products} from "~/models/server/api/interfaces";

export default {
    getFavoritesProducts(state: I_FavoritesState): I_Products[] {
        return state.products
    },
    getFavoritesId(state: I_FavoritesState): I_FavoriteProductId[] {
        return state.favoritesId
    }
}