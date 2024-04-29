import { I_RegistrationForm } from "~/models/pages/registration/interfaces";
import { I_LoginForm } from "~/models/pages/login/interfaces";
import {I_StringObject} from "~/models/composables/useLocalization/interfaces";

const localization = computed<I_StringObject>(() => useLocalization())
export const checkUserData = (
  userData: I_LoginForm,
  users: I_RegistrationForm[],
): I_RegistrationForm | string =>
  users.find(
    (item: I_RegistrationForm): boolean =>
      item.email === userData.email && item.password === userData.password,
  ) ?? localization.value.userNotFound;
