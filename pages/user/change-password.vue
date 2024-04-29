<template>
  <div class="mt-3 px-14 pb-6">
    <div class="p-0.5 border-b border-zinc-300">
      <h2 class="font-sans font-medium text-xl dark:text-white font-montserrat">
        {{ localization.changePassword }}
      </h2>
    </div>
    <div class="mt-6 ml-3">
      <div class="grid grid-cols-1 gap-y-6 w-[250px]">
        <ui-ui-input
          v-model="changePasswordForm.oldPassword"
          variant="underlineDefault"
          size="md"
          class="relative"
          :type="oldPasswordType"
          :error-text="localization[changePasswordError.oldPassword]"
          :placeholder="localization.oldPassword.toLowerCase()"
        >
          <template #icon>
            <ui-ui-button
              custom="absolute top-2.5 right-1.5"
              size="sm"
              @click="onShowPasswordFunc('old')"
            >
              <ui-ui-icons
                :icon-name="oldPasswordIcon"
                icon-classes="w-5 h-5 dark:fill-white"
              />
            </ui-ui-button>
          </template>
        </ui-ui-input>
        <ui-ui-input
          v-model="changePasswordForm.newPassword"
          variant="underlineDefault"
          size="md"
          :type="newPasswordType"
          :error-text="localization[changePasswordError.newPassword]"
          :placeholder="localization.newPassword.toLowerCase()"
        >
          <template #icon>
            <ui-ui-button
              custom="absolute top-2.5 right-1.5"
              size="sm"
              @click="onShowPasswordFunc('new')"
            >
              <ui-ui-icons
                :icon-name="newPasswordIcon"
                icon-classes="w-5 h-5 dark:fill-white"
              />
            </ui-ui-button>
          </template>
        </ui-ui-input>
        <ui-ui-input
          v-model="changePasswordForm.confirmPassword"
          variant="underlineDefault"
          size="md"
          :type="confirmPasswordType"
          :error-text="localization[changePasswordError.confirmPassword]"
          :placeholder="localization.confirmPassword.toLowerCase()"
        >
          <template #icon>
            <ui-ui-button
              custom="absolute top-2.5 right-1.5"
              size="sm"
              @click="onShowPasswordFunc('confirm')"
            >
              <ui-ui-icons
                :icon-name="confirmPasswordIcon"
                icon-classes="w-5 h-5 dark:fill-white"
              />
            </ui-ui-button>
          </template>
        </ui-ui-input>
      </div>
      <div class="mt-8">
        <ui-ui-button
          variant="outlineSuccess"
          size="md"
          @click="onChangePasswordFunc"
        >
          {{ localization.save }}
        </ui-ui-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { T_InputType } from "~/components/ui/uiInput/models/types";
import { I_ChangePasswordForm } from "~/models/pages/user/change-password/interfaces";
import { I_AlertMessage } from "~/components/alert/models/interfaces";
import { I_AlertConfigPayload } from "~/models/store/main/interfaces";
import { useCookies } from "vue3-cookies"
import {T_UserToken} from "~/models/store/auth/types";
import {I_RegistrationForm} from "~/models/pages/registration/interfaces";

definePageMeta({
  middleware: "auth",
});

const localization = computed(() => useLocalization());
const { cookies } = useCookies()
const {
  $store,
  $passwordValidationFunc,
  $confirmPasswordValidationFunc,
} = useNuxtApp();

const oldPasswordType = ref<T_InputType>("password");
const newPasswordType = ref<T_InputType>("password");
const confirmPasswordType = ref<T_InputType>("password");
let oldPasswordIcon = ref("eye");
let newPasswordIcon = ref("eye");
let confirmPasswordIcon = ref("eye");
const onShowPasswordFunc = (name: string): void => {
  if (name === "old") {
    oldPasswordIcon.value =
      oldPasswordIcon.value === "eye" ? "eyeSlash" : "eye";
    oldPasswordType.value =
      oldPasswordType.value === "password" ? "text" : "password";
  } else if (name === "new") {
    newPasswordIcon.value =
      newPasswordIcon.value === "eye" ? "eyeSlash" : "eye";
    newPasswordType.value =
      newPasswordType.value === "password" ? "text" : "password";
  } else if (name === "confirm") {
    confirmPasswordIcon.value =
      confirmPasswordIcon.value === "eye" ? "eyeSlash" : "eye";
    confirmPasswordType.value =
      confirmPasswordType.value === "password" ? "text" : "password";
  }
};

const changePasswordError = ref<I_ChangePasswordForm>({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const changePasswordForm = ref<I_ChangePasswordForm>({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const userToken = computed(() => $store.getters.getLoggedUserToken)
if(!userToken.value) navigateTo('/')
const user = computed(() => $store.getters.getLoggedUser(userToken.value))

const onChangePasswordFunc = (): void => {
  const oldPassword =
    changePasswordForm.value.oldPassword === ""
      ? "requiredField"
      : changePasswordForm.value.oldPassword === user.value['password']
      ? ""
      : "passwordIsNotValid";
  const newPassword = $passwordValidationFunc(
    changePasswordForm.value.newPassword,
    changePasswordForm.value.confirmPassword,
  );
  const confirmPassword = $confirmPasswordValidationFunc(
    changePasswordForm.value.newPassword,
    changePasswordForm.value.confirmPassword,
  );

  changePasswordError.value.newPassword = newPassword;
  changePasswordError.value.confirmPassword = confirmPassword;
  changePasswordError.value.oldPassword = oldPassword;
  if (!newPassword && !confirmPassword && !oldPassword) {
    const alertMessage: I_AlertMessage[] = [
      {
        title: localization.value.success,
        descriptions: [localization.value.userDataChangeText],
      },
    ];
    const alertConfig: I_AlertConfigPayload = {
      variant: "success",
      descriptions: alertMessage,
    };
    $store.dispatch("A_SET_ALERT_CONFIG", alertConfig);
  }
};
</script>

<style scoped>
@import "assets/css/fonts.css";
</style>
