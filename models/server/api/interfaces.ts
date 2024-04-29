export interface API_I_Categories {
  id: number;
  name: string;
  img: string;
}
export interface API_I_Colors {
  id: number;
  name: string;
}
export interface API_I_Products {
  id: number;
  categoryId: number;
  type: number;
  name: string;
  size: string;
  color: string;
  img: string;
  price: number;
}
export interface API_I_Sizes {
  id: number;
  name: string;
}
export interface API_I_Types {
  id: number;
  name: string;
}
export interface I_Products extends API_I_Products {}
