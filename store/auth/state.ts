import {I_AuthState} from "~/models/store/auth/interfaces";



const state: I_AuthState = {
    users: [
        {name: 'User', email: 'user', phone: '123123', password: 'password', confirmPassword: 'password'},
    ],
    userToken: null
}

export default state