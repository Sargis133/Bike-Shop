import {API_I_Colors, API_I_Sizes, API_I_Types} from "~/models/server/api/interfaces";


export interface I_Types extends API_I_Types {}
export interface I_Colors extends API_I_Colors {}
export interface I_Sizes extends API_I_Sizes {}
export interface I_DataFilters extends I_FiltersState{}

export interface I_FiltersState {
    types: I_Types[],
    colors: I_Colors[],
    sizes: I_Sizes[],
}
export interface I_ChangedTypes {
    name: string,
    value: string
}
export interface I_ChangedColors {
    name: string,
    value: string,
    icon: string,
    iconClass: string,
    isChecked: boolean
}
export interface I_ChangedSizes {
    name: string,
    value: number
}