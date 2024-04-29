import {I_AuthState} from "~/models/store/auth/interfaces";



const state: I_AuthState = {
    users: [
        {name: 'Marko', email: 'markomiller@mail.ru', phone: '123123', password: 'lolik1.', confirmPassword: 'lolik1.'},
        {name: 'Semi', email: 'miller@mail.ru', phone: '123123', password: 'lolik2.', confirmPassword: 'lolik2.'}
    ],
    userToken: null
}

export default state