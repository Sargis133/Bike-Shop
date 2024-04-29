import {I_RegistrationForm} from "~/models/pages/registration/interfaces";
import {T_UserToken} from "~/models/store/auth/types";

export interface I_AuthState {
    users: I_RegistrationForm[],
    userToken: T_UserToken
}
