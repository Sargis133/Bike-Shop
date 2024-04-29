import {
  I_BasketProduct,
  I_ProductInfoFromBasket,
} from "~/models/store/basket/interfaces";
import { I_Products } from "~/models/server/api/interfaces";
import { I_AlertConfigPayload } from "~/models/store/main/interfaces";

export const findNewProductForBasketFunc = (
  productInfo: I_ProductInfoFromBasket,
  products: I_Products[],
): I_BasketProduct[] => {
  const { $store } = useNuxtApp();
  const localization = computed(() => useLocalization())
  const route = useRoute()
  const findNewProduct: I_Products = products.find(
    (item: I_Products): boolean => item.id === productInfo.productId,
  ) as I_Products;
  const basketProducts: I_BasketProduct[] = $store.getters.getBasketProducts;
  const availableNewProductInBasket: I_BasketProduct | undefined = basketProducts.find(
    (item: I_BasketProduct): boolean => item.id === findNewProduct.id,
  );
  const alertConfig: I_AlertConfigPayload = {
    variant: "success",
    descriptions: [],
  };
  if (availableNewProductInBasket) {
    alertConfig.descriptions.push({
      title: localization.value.success,
      descriptions: [localization.value.productCountChanged],
    });
    if(route.path != '/basket') $store.dispatch("A_SET_ALERT_CONFIG", alertConfig);

    return basketProducts.map((item: I_BasketProduct) => {
      if (item.id === availableNewProductInBasket.id && item.count)
        item.count += productInfo.count;
      return item;
    });
  } else {
    const newProduct: I_BasketProduct = {
      ...findNewProduct,
      count: productInfo.count,
    };
    basketProducts.push(newProduct);
    alertConfig.descriptions.push({
      title: localization.value.success,
      descriptions: [localization.value.productAddedToTheBasket],
    });
    if(route.path != '/basket') $store.dispatch("A_SET_ALERT_CONFIG", alertConfig);

    return basketProducts;
  }
};
