import {I_Products} from "~/models/server/api/interfaces";

export interface I_ProductInfoFromBasket {
    productId: number,
    count: number,
}
export interface I_BasketProduct extends I_Products {
    count?: number
}
export interface I_BasketState {
    basket: I_BasketProduct[]
}