import {I_Products} from "~/models/server/api/interfaces";

export interface I_ProductFilters {
    id: string,
    type: string,
    color: string[],
    size: string[],
    min: string,
    max: string,
}
export interface I_ChangedProductFilters {
    id?: string,
    type?: string,
    color?: string[],
    size?: string[],
    min?: string,
    max?: string,
}
export interface I_ProductsState {
    products: I_Products[] | null,
    product: I_Products | {}

}