import { createStore } from "vuex";

import main from "./main/store";
import auth from "./auth/store";
import categories from "./catalog/categories/store";
import products from "./catalog/products/store";
import filters from "./catalog/filters/store";
import favorites from "./catalog/favorites/store";
import basket from "./basket/store";
import reviews from "./catalog/reviews/store"
export const store = createStore({
  modules: {
    main,
    auth,
    categories,
    products,
    filters,
    favorites,
    basket,
    reviews
  },
});
