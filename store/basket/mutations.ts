import {I_BasketProduct, I_BasketState} from "~/models/store/basket/interfaces";

export default {
    M_ADD_PRODUCT_IN_BASKET(state: I_BasketState, payload: I_BasketProduct[]): void {
        state.basket = payload
    },
    M_DELETE_PRODUCT_FROM_BASKET(state: I_BasketState, payload: number): void {
        state.basket = state.basket.filter((item: I_BasketProduct): boolean => item.id != payload)
    },
    M_DELETE_ALL_PRODUCTS_FROM_BASKET(state: I_BasketState): void {
        state.basket = []
    }
}