import { I_StringObject } from "~/models/composables/useLocalization/interfaces";
import {I_Option} from "~/components/ui/uiSelect/models/interfaces";
import {T_UserToken} from "~/models/store/auth/types";

export const authOptionsFunc = (localization: I_StringObject, loggedUserState: T_UserToken):I_Option[] => {
  return !loggedUserState ? [
    { name: localization.signUp, value: "registration" },
    { name: localization.logIn, value: "login" },
  ] : [
    { name: localization.settings, value: 'user/settings' },
    { name: localization.favorites, value: "user/favorites", icon: 'heart', iconClass: 'w-5 h-5 pl-1 dark:fill-white' },
    { name: localization.logOut, value: "logout", icon: 'logout', iconClass: 'w-5 h-5 pl-1 dark:fill-white' },
  ]
};

export const languageOptionsFunc = (localization: I_StringObject): I_Option[] => {
  return [
    { name: localization.english, value: "en-US" },
    { name: localization.russian, value: "ru-RU" },
  ]
}


