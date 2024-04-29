import {I_Products} from "~/models/server/api/interfaces";
import {I_ProductFilters} from "~/models/store/catalog/products/interfaces";

export const getFilteredProducts = (products: I_Products[], filters: I_ProductFilters): I_Products[] | null => {

  const type: string | null = filters.type == '' ? null : ''+filters.type;
  const colors: string[] | null = filters.color.length > 0 ? filters.color : null;
  const min: string | null = filters.min ? filters.min : null
  const max: string | null = filters.max ? filters.max : null
  const sizes: string[] | null = filters.size.length > 0 ? filters.size : null

  products = products.filter((item: I_Products) => {
    return (
      (+filters.id === item.categoryId) &&
      (type ? +type == item.type : item) &&
      (colors ? colors.includes(item.color) : item) &&
      (min ? item.price > +min : item) &&
      (max ? item.price < +max : item) &&
      (sizes ? sizes.includes(item.size) : item)
    );
  });
  return products.length == 0 ? null : products
};
