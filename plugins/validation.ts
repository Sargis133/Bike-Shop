import { E_RegistrationError } from "~/models/plugins/validation/enums";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      emailValidationFunc: (value: string): string => {
        let errorText: string = "";
        let emailRegex: RegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (value && !emailRegex.test(value)) {
          errorText = E_RegistrationError["email is not valid"];
        } else if (value && emailRegex.test(value)) {
          errorText = "";
        } else if (!value) {
          errorText = E_RegistrationError["required field"];
        }
        return errorText;
      },
      nameValidationFunc: (value: string): string => {
        let errorText: string = "";
        let nameRegex: RegExp = /^[a-zA-Z]{2,16}$/;
        if (value && !nameRegex.test(value)) {
          errorText = E_RegistrationError["name is not valid"];
        } else if (value && nameRegex.test(value)) {
          errorText = "";
        } else if (!value) {
          errorText = E_RegistrationError["required field"];
        }
        return errorText;
      },
      phoneValidationFunc: (value: string): string => {
        let errorText: string = "";
        if (!value) {
          errorText = E_RegistrationError["required field"];
        } else if (value.length < 6) {
          errorText = E_RegistrationError["phone is not valid"];
        } else {
          errorText = "";
        }
        return errorText;
      },
      passwordValidationFunc: (
        passwordValue: string,
        confirmValue: string,
      ): string => {
        let errorText: string = "";
        let passwordRegex: RegExp =
          /^(?=.*[0-9])(?=.*[!@#$./%^&*])(?=.*[a-z])[0-9a-zA-Z!@#./$%^&*]{6,32}$/;
        if (passwordValue && passwordValue.match(passwordRegex)) {
          errorText = "";
          if (confirmValue && confirmValue !== passwordValue) {
            errorText = E_RegistrationError["passwords does not match"];
          } else {
            errorText = "";
          }
        } else if (passwordValue && !passwordValue.match(passwordRegex)) {
          errorText = E_RegistrationError["password is not valid"];
        } else if (!passwordValue) {
          errorText = E_RegistrationError["required field"];
        }
        return errorText
      },
      confirmPasswordValidationFunc: (passwordValue: string, confirmValue: string): string => {
        let errorText: string = ''
        let passwordRegex: RegExp =
            /^(?=.*[0-9])(?=.*[!@#$./%^&*])(?=.*[a-z])[0-9a-zA-Z!@#./$%^&*]{6,32}$/;
        if (confirmValue && confirmValue.match(passwordRegex) && confirmValue === passwordValue) {
          errorText = ''
        } else if (!confirmValue) {
          errorText = E_RegistrationError["required field"]
        } else {
          errorText = E_RegistrationError['passwords does not match']
        }
        return errorText
      }
    },
  };
});
