import {I_AuthState} from "~/models/store/auth/interfaces";
import {I_RegistrationForm} from "~/models/pages/registration/interfaces";
import {T_UserToken} from "~/models/store/auth/types";

export default {
    getUsers: (state: I_AuthState): I_RegistrationForm[] => {
        return state.users
    },
    getLoggedUserToken: (state: I_AuthState): T_UserToken => {
        return state.userToken
    },
    getLoggedUser: (state: I_AuthState) => (userToken: T_UserToken): I_RegistrationForm | '' => {
        return state.users.find((item:I_RegistrationForm): boolean => item.token === userToken) || ''
    }
}