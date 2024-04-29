import {I_ProductsState} from "~/models/store/catalog/products/interfaces";
import {I_Products} from "~/models/server/api/interfaces";

export default {
    getProducts:(state: I_ProductsState): I_Products[] | null => {
        return state.products
    },
    getProduct: (state: I_ProductsState): I_Products | {} => {
        return state.product
    }
};
