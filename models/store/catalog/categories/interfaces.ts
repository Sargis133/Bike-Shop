import { API_I_Categories } from "~/models/server/api/interfaces";

export interface I_Category extends API_I_Categories{}
export interface I_CategoryState {
  categories: I_Category[];
}
