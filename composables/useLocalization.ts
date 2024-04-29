import english from "~/locales/en.json";
import russian from "~/locales/ru.json";
import { T_Language } from "~/models/store/main/types";
import {
  I_StringObject,
  I_Locales,
} from "~/models/composables/useLocalization/interfaces";

const locales: I_Locales = {
  'en-US': english,
  'ru-RU': russian,
};


export const useLocalization = (): I_StringObject => {
  const { $store } = useNuxtApp();
  if($store.getters.getLanguage === 'null') {
    $store.dispatch("A_SET_LANGUAGE", 'en-US')
  }
  const language: T_Language = $store.getters.getLanguage;
  return language ? locales[language] : locales['en-US'];
};
