import {API_I_Products, I_Products} from "~/models/server/api/interfaces";
import {I_FavoriteProductId} from "~/models/store/catalog/favorites/interfaces";
import {dataProducts} from "~/server/api/products";

export const findFavoritesProductsFunc = (): I_Products[] => {
    const { $store } = useNuxtApp()
    const products: API_I_Products[] = dataProducts;
    const favoritesProductsId: I_FavoriteProductId[] = $store.getters.getFavoritesId;
    const favId: number[] = favoritesProductsId.map((item: I_FavoriteProductId) => item.productId)
    return products.filter((item: I_Products) => favId.includes(item.id))
}