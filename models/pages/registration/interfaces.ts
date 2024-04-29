export interface I_RegistrationForm {
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    token?: string
}
 export interface I_RegistrationErrors {
     errorName: string,
     errorEmail: string,
     errorPhone: string,
     errorPassword: string,
     errorConfirm: string
 }