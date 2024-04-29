import {I_UseLocalStorage} from "~/models/composables/useLocalStorage/interfaces";

export const useLocalStorage = ():I_UseLocalStorage => {
  function setItemLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  function getItemLocalStorage(key: string): string {
    let result: string = "";
    if (process.client) {
      result = "" + localStorage.getItem(key)
    }
    return result;
  }
  return {
    setItemLocalStorage,
    getItemLocalStorage,
  };
};

