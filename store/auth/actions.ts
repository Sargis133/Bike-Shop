import { I_RegistrationForm } from "~/models/pages/registration/interfaces";
import { checkEmailMatch } from "~/store/auth/mappers/checkEmailMatch";
import { I_LoginForm } from "~/models/pages/login/interfaces";
import { checkUserData } from "~/store/auth/mappers/checkUserData";
import { I_UserSettingsForm } from "~/models/pages/user/settings/interfaces";
import { useCookies } from "vue3-cookies";
import {T_UserToken} from "~/models/store/auth/types";

const { cookies } = useCookies();

export default {
  A_CREATE_NEW_USER(
    context: {
      commit: (arg0: string, arg1: I_RegistrationForm) => void;
      getters: any;
    },
    payload: I_RegistrationForm,
  ): string {
    const newUser: I_RegistrationForm = Object.assign({}, payload);
    const getUsers: I_RegistrationForm[] = context.getters.getUsers;
    const findEmail: string = checkEmailMatch(payload.email, getUsers);
    if (!findEmail) {
      context.commit("M_CREATE_NEW_USER", newUser);
    }
    return findEmail;
  },
  A_CHECK_USER_DATA(
    context: {
      commit: (arg0: string, arg1: I_LoginForm) => void;
      getters: any;
      dispatch: any;
    },
    payload: I_LoginForm,
  ): I_RegistrationForm | string {
    const getUsers: I_RegistrationForm[] = context.getters.getUsers;
    const checkedUser: I_RegistrationForm | string = checkUserData(
      payload,
      getUsers,
    );
    if (typeof checkedUser !== "string") {
      context.dispatch("A_LOGGED_USER", checkedUser);
    }
    return checkedUser;
  },
  A_LOGGED_USER(
    context: {
      commit: (
        arg0: string,
        arg1: { user: I_RegistrationForm; token: string },
      ) => void;
      dispatch: any;
    },
    payload: I_RegistrationForm,
  ): void {
    const { $nameGenerationFunc } = useNuxtApp();
    const userToken: string = $nameGenerationFunc(payload.name);
    let date = new Date();
    date.setTime(date.getTime() + 3600 * 1000);
    cookies.set("token", userToken, date);
    context.dispatch("A_CHANGE_STATE_TOKEN", userToken);
    context.commit("M_LOGGED_USER", { user: payload, token: userToken });
  },
  A_LOG_OUT(context: {
    commit: (arg0: string, arg1: string) => void;
    dispatch: any;
  }): void {
    const token: string = cookies.get("token");
    cookies.remove("token");
    context.dispatch("A_CHANGE_STATE_TOKEN", null);
    context.commit("M_LOG_OUT", token);
  },
  A_CHANGE_STATE_TOKEN(
    context: { commit: (arg0: string, arg1: T_UserToken) => void },
    payload: T_UserToken,
  ): void {
    context.commit("M_CHANGE_STATE_TOKEN", payload)
  },
  A_CHANGE_USER_DATA(
    context: {
      commit: (arg0: string, arg1: I_UserSettingsForm) => void;
      dispatch: any;
    },
    payload: I_UserSettingsForm,
  ): void {
    context.commit("M_CHANGE_USER_DATA", payload);
  },
};
