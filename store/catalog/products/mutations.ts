import {I_ProductsState} from "~/models/store/catalog/products/interfaces";
import {I_Products} from "~/models/server/api/interfaces";

export default {
    M_SET_PRODUCTS(state: I_ProductsState,payload: I_Products[] | null): void {
        state.products = payload
    },
    M_SET_PRODUCT(state: I_ProductsState, payload: I_Products | {}): void {
        state.product = payload
    }
}