import {
  I_BasketProduct,
  I_ProductInfoFromBasket,
} from "~/models/store/basket/interfaces";
import { dataProducts } from "~/server/api/products";
import { API_I_Products } from "~/models/server/api/interfaces";
import { findNewProductForBasketFunc } from "~/store/basket/mappers/findNewProductForBasket";

export default {
  A_ADD_PRODUCT_IN_BASKET(
    context: {
      commit: (arg0: string, arg1: I_BasketProduct[]) => void;
    },
    payload: I_ProductInfoFromBasket,
  ): void {
    const products: API_I_Products[] = dataProducts;
    const findNewProducts: I_BasketProduct[] = findNewProductForBasketFunc(
      payload,
      products,
    );
    context.commit("M_ADD_PRODUCT_IN_BASKET", findNewProducts);

  },
  A_DELETE_PRODUCT_FROM_BASKET(
    context: { commit: (arg0: string, arg1: number) => void },
    payload: number,
  ): void {
    context.commit("M_DELETE_PRODUCT_FROM_BASKET", payload)
  },
  A_DELETE_ALL_PRODUCTS_FROM_BASKEt(
      context: { commit: (arg0: string) => void }
  ): void {
    context.commit("M_DELETE_ALL_PRODUCTS_FROM_BASKET")
  }
};
