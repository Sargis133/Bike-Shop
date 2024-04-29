import {I_ChangedProductFilters, I_ProductFilters} from "~/models/store/catalog/products/interfaces";

export const productFilters = (route: any): I_ProductFilters => {
  return {
    id: route.params.id as string,
    type: route.query.type ? (route.query.type as string) : "",
    color: !route.query.color
      ? []
      : Array.isArray(route.query.color)
      ? (route.query.color as string[])
      : ([route.query.color] as string[]),
    size: !route.query.size
      ? []
      : Array.isArray(route.query.size)
      ? (route.query.size as string[])
      : [route.query.size],
    min: route.query.min || "",
    max: route.query.max || "",
  };
};

export const checkEmptyFiltersFunc = (filters: I_ProductFilters): I_ChangedProductFilters => {
    const changedFilters: I_ChangedProductFilters = {}
    if(filters.type) changedFilters.type = filters.type
    if(filters.color) changedFilters.color = filters.color
    if(filters.size) changedFilters.size = filters.size
    if(filters.min) changedFilters.min = filters.min
    if(filters.max) changedFilters.max = filters.max
    return changedFilters
}
