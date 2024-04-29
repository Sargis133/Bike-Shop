import {I_AuthState} from "~/models/store/auth/interfaces";
import { I_RegistrationForm } from "~/models/pages/registration/interfaces";
import {I_UserSettingsForm} from "~/models/pages/user/settings/interfaces";
import {T_UserToken} from "~/models/store/auth/types";

export default {
  M_CREATE_NEW_USER(state: I_AuthState, payload: I_RegistrationForm): void {
    state.users.push(payload);
  },
  M_LOGGED_USER(state: I_AuthState, payload: {user: I_RegistrationForm, token: string}): void {
    state.users.find(item => {
      if(payload.user.email === item.email) item.token = payload.token
    })
  },
  M_LOG_OUT(state: I_AuthState, payload: string): void {
    state.users.find(item => {
      if(item.token === payload) delete item.token
    })
  },
  M_CHANGE_STATE_TOKEN(state: I_AuthState, payload: T_UserToken): void {
    state.userToken = payload
  },
  M_CHANGE_USER_DATA(state: I_AuthState, payload: I_UserSettingsForm): void {
    state.users.map(item => {
      if(item.email === payload.email) {
        item.name = payload.name;
        item.email = payload.email;
        item.phone = payload.phone;
      }
    })
  }
};
