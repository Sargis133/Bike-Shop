import { getFilteredProducts } from "~/store/catalog/products/mappers/getFilteredProducts";
import { API_I_Products, I_Products } from "~/models/server/api/interfaces";
import { I_ProductFilters } from "~/models/store/catalog/products/interfaces";
import { dataProducts } from "~/server/api/products";

export default {
  A_SET_PRODUCTS(
    context: { commit: (arg0: string, arg1: I_Products[] | null) => void },
    payload: I_ProductFilters,
  ): void {
    const products: API_I_Products[] = dataProducts;

    const filteredProducts: I_Products[] | null = getFilteredProducts(
      products,
      payload,
    );
    context.commit("M_SET_PRODUCTS", filteredProducts);
  },
  A_SET_PRODUCT(
    context: { commit: (arg0: string, arg1: I_Products | {}) => void },
    payload: string,
  ): void {
    const products: API_I_Products[] = dataProducts;
    const findProduct: I_Products | {} =
      products.find((item: I_Products): boolean => item.id === +payload) || {};

    context.commit("M_SET_PRODUCT", findProduct);
  },
};
