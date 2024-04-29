<template>
  <div class="flex px-14 justify-center items-center h-full mt-6 pb-2 max-sm:px-4">
    <div
      class="border border-gray:50 rounded-xl shadow-2xl w-[500px] px-[5em] py-[2em] max-sm:px-[40px] max-sm:w-full"
    >
      <div class="text-center pb-5">
        <h2 class="font-medium text-2xl dark:text-white max-sm:text-lg">
          {{ localization.signUp }}
        </h2>
      </div>
      <div class="[&>div]:mb-6">
        <ui-ui-input
          v-model="registrationForm.name"
          size="md"
          max-length="16"
          variant="default"
          :placeholder="localization.name"
          :error-text="localization[registrationErrors.errorName]"
          @inputValue="nameValidationFunc"
        />
        <ui-ui-input
          v-model="registrationForm.email"
          size="md"
          max-length="40"
          variant="default"
          :placeholder="localization.email"
          :error-text="localization[registrationErrors.errorEmail]"
          @inputValue="replaceEmailTextFunc"
        />
        <ui-ui-input
          v-model="registrationForm.phone"
          size="md"
          max-length="17"
          variant="default"
          :placeholder="localization.phone"
          :error-text="localization[registrationErrors.errorPhone]"
          @inputValue="phoneValidationFunc"
        />
        <ui-ui-input
          v-model="registrationForm.password"
          size="md"
          max-length="32"
          variant="default"
          :placeholder="localization.password"
          :error-text="localization[registrationErrors.errorPassword]"
          :type="inputPasswordType"
        >
          <template #icon>
            <ui-ui-button
              custom="absolute top-2 right-2"
              size="sm"
              @click="onShowPasswordFunc('password')"
            >
              <ui-ui-icons
                :icon-name="passwordEyeIcon"
                icon-classes="w-6 h-6 dark:fill-white"
              />
            </ui-ui-button>
          </template>
        </ui-ui-input>
        <ui-ui-input
          v-model="registrationForm.confirmPassword"
          size="md"
          max-length="32"
          variant="default"
          :placeholder="localization.confirmPassword"
          :error-text="localization[registrationErrors.errorConfirm]"
          :type="inputConfirmType"
        >
          <template #icon>
            <ui-ui-button
              custom="absolute top-2 right-2"
              size="sm"
              @click="onShowPasswordFunc('confirm')"
            >
              <ui-ui-icons
                :icon-name="confirmEyeIcon"
                icon-classes="w-6 h-6 dark:fill-white"
              />
            </ui-ui-button>
          </template>
        </ui-ui-input>
      </div>
      <div class="flex justify-center mt-6">
        <ui-ui-button
          size="md"
          variant="primary-rounded"
          @click="onSendFormFunc"
        >
          {{ localization.createAccount }}
        </ui-ui-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "auth"
});
import { T_InputType } from "~/components/ui/uiInput/models/types";
import { useLocalization } from "~/composables/useLocalization";
import { I_StringObject } from "~/models/composables/useLocalization/interfaces";
import {
  I_RegistrationErrors,
  I_RegistrationForm,
} from "~/models/pages/registration/interfaces";
import { I_AlertMessage } from "~/components/alert/models/interfaces";
import { I_AlertConfigPayload } from "~/models/store/main/interfaces";

const localization = computed<I_StringObject>(() => useLocalization());
const {
  $store,
  $emailValidationFunc,
  $nameValidationFunc,
  $phoneValidationFunc,
  $passwordValidationFunc,
  $confirmPasswordValidationFunc,
} = useNuxtApp();

let inputPasswordType = ref<T_InputType>("password");
let inputConfirmType = ref<T_InputType>("password");
let passwordEyeIcon = ref<string>("eye");
let confirmEyeIcon = ref<string>("eye");

const registrationForm = ref<I_RegistrationForm>({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});
const registrationErrors = ref<I_RegistrationErrors>({
  errorName: "",
  errorEmail: "",
  errorPhone: "",
  errorPassword: "",
  errorConfirm: "",
});

const nameValidationFunc = (value: string): void => {
  registrationForm.value.name = value.replace(/[^a-zA-Z]+/g, "");
};
const replaceEmailTextFunc = (value: string): void => {
  registrationForm.value.email = value.replace(/\s+/g, "");
};
const phoneValidationFunc = (value: string): void => {
  registrationForm.value.phone = value.replace(/\D+/g, "");
};
const onShowPasswordFunc = (inputName: string): void => {
  if (inputName === "password") {
    passwordEyeIcon.value =
      inputPasswordType.value === "password" ? "eyeSlash" : "eye";
    inputPasswordType.value =
      inputPasswordType.value === "password" ? "text" : "password";
  } else if (inputName === "confirm") {
    confirmEyeIcon.value =
      inputConfirmType.value === "password" ? "eyeSlash" : "eye";
    inputConfirmType.value =
      inputConfirmType.value === "password" ? "text" : "password";
  }
};

const onSendFormFunc = (): void => {
  const errorName = $nameValidationFunc(registrationForm.value.name);
  const errorEmail = $emailValidationFunc(registrationForm.value.email);
  const errorPhone = $phoneValidationFunc(registrationForm.value.phone);
  const errorPassword = $passwordValidationFunc(
    registrationForm.value.password,
    registrationForm.value.confirmPassword,
  );
  const errorConfirm = $confirmPasswordValidationFunc(
    registrationForm.value.password,
    registrationForm.value.confirmPassword,
  );
  registrationErrors.value.errorName = errorName;
  registrationErrors.value.errorEmail = errorEmail;
  registrationErrors.value.errorPhone = errorPhone;
  registrationErrors.value.errorPassword = errorPassword;
  registrationErrors.value.errorConfirm = errorConfirm;
  if (
    !errorName &&
    !errorEmail &&
    !errorPhone &&
    !errorPassword &&
    !errorConfirm
  ) {
    $store
      .dispatch("A_CREATE_NEW_USER", registrationForm.value)
      .then((resolve: string) => {
        if (resolve) {
          const alertMessage: I_AlertMessage[] = [
            {
              title: localization.value.error,
              descriptions: [resolve],
            },
          ];
          const alertConfig: I_AlertConfigPayload = {
            variant: "error",
            descriptions: alertMessage,
          };
          $store.dispatch("A_SET_ALERT_CONFIG", alertConfig);
          registrationErrors.value.errorEmail = "emailIsBusy";
        } else {
          navigateTo("/login");
        }
      });
  }
};
</script>

<style scoped></style>
