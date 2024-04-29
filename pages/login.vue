<template>
  <div class="flex px-14 justify-center h-[90vh] items-center max-sm:px-2">
    <div
      class="border border-gray:50 rounded-xl shadow-2xl w-[500px] px-[5em] py-[2em] max-sm:w-full max-sm:px-[35px] max-sm:py-[10px]"
    >
      <div class="text-center pb-5">
        <h2 class="font-medium text-2xl dark:text-white max-sm:text-lg">{{ localization.logIn }}</h2>
      </div>
      <div class="[&>div]:mb-6 max-sm:px-4">
        <ui-ui-input
            v-model="loginForm.email"
            size="md"
            max-length="40"
            variant="default"
            :placeholder="localization.email"
            :error-text="localization[loginErrors.email]"
        />
        <ui-ui-input
            v-model="loginForm.password"
            size="md"
            max-length="32"
            variant="default"
            :type="passwordInputType"
            :placeholder="localization.password"
            :error-text="localization[loginErrors.password]"
        >
          <template #icon>
            <ui-ui-button
                custom="absolute top-2 right-2"
                size="sm"
                @click="onShowPasswordFunc"
            >
              <ui-ui-icons
                  :icon-name="eyeIcon"
                  icon-classes="w-6 h-6 dark:fill-white"
              />
            </ui-ui-button>
          </template>
        </ui-ui-input>
      </div>
      <div class="flex justify-center mt-6">
        <ui-ui-button size="md" variant="primary-rounded" @click="onSendFormFunc">
          {{ localization.logIn }}
        </ui-ui-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: "auth"
})
import {I_StringObject} from "~/models/composables/useLocalization/interfaces";
import {useLocalization} from "~/composables/useLocalization";
import {T_InputType} from "~/components/ui/uiInput/models/types";
import {I_LoginErrors, I_LoginForm} from "~/models/pages/login/interfaces";
import {I_AlertMessage} from "~/components/alert/models/interfaces";
import {I_AlertConfigPayload} from "~/models/store/main/interfaces";


const localization = computed<I_StringObject>(() => useLocalization());
const { $store } = useNuxtApp()


const loginForm = ref<I_LoginForm>({
  email: '',
  password: ''
})
const loginErrors = ref<I_LoginErrors>({
  email: '',
  password: ''
})

let eyeIcon = ref<string>('eye')
let passwordInputType = ref<T_InputType>('password')

const onShowPasswordFunc = (): void => {
  if(passwordInputType.value == 'password') {
    eyeIcon.value = 'eyeSlash'
    passwordInputType.value = 'text'
  } else {
    eyeIcon.value = 'eye'
    passwordInputType.value = 'password'
  }
}

const onSendFormFunc = (): void => {
  if(loginForm.value.email === '') {
    loginErrors.value.email = 'requiredField'
  } else {
    loginErrors.value.email = ''
  }
  if(loginForm.value.password === '') {
    loginErrors.value.password = 'requiredField'
  } else {
    loginErrors.value.password = ''
  }

  if(loginForm.value.email != '' && loginForm.value.password != '') {
    $store.dispatch("A_CHECK_USER_DATA", loginForm.value)
        .then((resolve) => {
          if (typeof resolve === 'string') {
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
          } else {
            navigateTo('/')
          }
        })
  }
}

</script>

<style scoped></style>
