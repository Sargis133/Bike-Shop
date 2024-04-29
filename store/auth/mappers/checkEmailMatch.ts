import { I_RegistrationForm } from "~/models/pages/registration/interfaces";
import {I_StringObject} from "~/models/composables/useLocalization/interfaces";

const localization = computed<I_StringObject>(() => useLocalization())

export const checkEmailMatch = (email: string, users: I_RegistrationForm[]): string => {
  const isFreeEmail: boolean = !!users.find((item: I_RegistrationForm): boolean => item.email === email);
  if (isFreeEmail) {
    return localization.value.emailIsBusy;
  } else {
    return "";
  }
};
