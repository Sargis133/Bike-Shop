export interface I_UseLocalStorage {
  setItemLocalStorage(key: string, value: string): void;
  getItemLocalStorage(key: string): string;
}
