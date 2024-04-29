<template>
  <div class="mt-3 px-14 pb-6">
    <div class="p-0.5 border-b border-zinc-300">
      <h2 class="font-sans font-medium text-xl dark:text-white font-montserrat">
        {{ localization.settings }}
      </h2>
    </div>
    <div class="mt-6 ml-3">
      <div class="grid grid-cols-2 w-[600px] gap-x-16 gap-y-6 max-sm:grid-cols-1 max-sm:w-max">
        <ui-ui-input
          v-model="userSettingsForm.name"
          variant="underlineDefault"
          size="md"
          :error-text="localization[userSettingsError.name]"
          :placeholder="localization.name.toLowerCase()"
        />
        <ui-ui-input
          v-model="userSettingsForm.email"
          variant="underlineDefault"
          size="md"
          readonly
          :error-text="localization[userSettingsError.email]"
          :placeholder="localization.email.toLowerCase()"
        />
        <ui-ui-input
          v-model="userSettingsForm.phone"
          variant="underlineDefault"
          size="md"
          :error-text="localization[userSettingsError.phone]"
          :placeholder="localization.phone.toLowerCase()"
        />
      </div>
      <div class="mt-8">
        <NuxtLink
          to="/user/change-password"
          class="px-2 border-b border-blue-500 text-blue-500 font-medium hover:opacity-70"
          >{{ localization.changePassword }}</NuxtLink
        >
      </div>
      <div class="mt-8">
        <ui-ui-button
          variant="outlineSuccess"
          size="md"
          @click="onChangeUserDataFunc"
          >{{ localization.save }}</ui-ui-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: "auth",
});

import { I_AlertMessage } from "~/components/alert/models/interfaces";
import { useCookies } from "vue3-cookies"
import { I_UserSettingsForm } from "~/models/pages/user/settings/interfaces";
import { I_AlertConfigPayload } from "~/models/store/main/interfaces";

const localization = computed(() => useLocalization());
const { cookies } = useCookies()
const {
  $store,
  $nameValidationFunc,
  $emailValidationFunc,
  $phoneValidationFunc,
} = useNuxtApp();

const userToken = computed(() => $store.getters.getLoggedUserToken);
if(!userToken.value) navigateTo('/')

const userData = computed(() => $store.getters.getLoggedUser(userToken.value));

const userSettingsError = ref<I_UserSettingsForm>({
  name: "",
  email: "",
  phone: "",
});
const userSettingsForm = ref<I_UserSettingsForm>({
  name: userData.value['name'] ?? '',
  email: userData.value['email'] ?? '',
  phone: userData.value['phone'] ?? '',
});

const onChangeUserDataFunc = () => {
  const name = $nameValidationFunc(userSettingsForm.value.name);
  const email = $emailValidationFunc(userSettingsForm.value.email);
  const phone = $phoneValidationFunc(userSettingsForm.value.phone);
  userSettingsError.value.name = name;
  userSettingsError.value.email = email;
  userSettingsError.value.phone = phone;
  const alertMessage: I_AlertMessage[] = [];
  const alertConfig: I_AlertConfigPayload = {
    variant: 'success',
    descriptions: alertMessage,
  };
  if(userSettingsForm.value.email !== userData.value.email) {
    alertConfig.variant = 'error';
    alertMessage.push({title: localization.value.error, descriptions: [localization.value.emailCannotBeChanged]})
  } else if (!name && !email && !phone) {
    $store.dispatch("A_CHANGE_USER_DATA", userSettingsForm.value);
    alertMessage.push({ title: localization.value.success, descriptions: [localization.value.userDataChangeText]})
  } else {
    alertConfig.variant = 'error'
    alertMessage.push({title: localization.value.error, descriptions: [localization.value.errorInChanges]})
  }
  $store.dispatch("A_SET_ALERT_CONFIG", alertConfig);

};
</script>

<style scoped>
@import "assets/css/fonts.css";
</style>
