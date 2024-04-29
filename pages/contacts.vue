<template>
  <div class="contact-us">
  <div class="w-full flex justify-center items-center pt-10 max-sm:px-2">
    <div class="flex justify-center">
      <div
        class="border border-gray-300 dark:border-slate-700 rounded-md px-6 py-4"
      >
        <div class="flex justify-center">
          <h2 class="text-2xl text-gray-800 max-sm:text-lg">{{localization.contactUs}}</h2>
        </div>
        <div class="grid grid-cols-2 gap-x-6 mt-6">
          <div>
            <ui-ui-input
              v-model="userName"
              size="md"
              variant="default"
              :placeholder="localization.name"
              :error-text="localization[nameError]"
              @inputValue="nameValidationFunc"
            />
          </div>
          <div>
            <ui-ui-input
              v-model="userEmail"
              size="md"
              variant="default"
              :placeholder="localization.email"
              :error-text="localization[emailError]"
            />
          </div>
        </div>
        <div class="mt-6 relative">
          <div class="flex">
            <span class="text-red-700 font-medium text-sm">*</span>
            <p class="text-[11px] ml-1 text-gray-800">
              ({{ localization.minimum }} - 6) {{ localization.symbol }}
            </p>
          </div>
          <textarea
            v-model="userText"
            class="rounded-md p-2 outline-none w-[100%] min-h-[100px] dark:bg-slate-700 dark:text-white text-sm"
            :placeholder="localization.yourMessage"
          ></textarea>
          <p
            class="absolute left-2 text-sm text-red-600 dark:text-red-500 font-medium"
          >
            {{ localization[textError] }}
          </p>
        </div>
        <div class="mt-6 flex justify-end">
          <ui-ui-button
            variant="outlineLight"
            size="md"
            @click.stop="sendMessageFunc"
            >{{ localization.send }}</ui-ui-button
          >
        </div>
        <div class="mt-6 flex text-sm gap-x-6 justify-center max-sm:flex-col max-sm:items-center max-sm:gap-y-2">
          <div class="flex items-center gap-x-2">
            <ui-ui-icons
              icon-name="phone"
              icon-classes="fill-gray-800 w-3 h-3"
            />
            <p class="text-gray-900">- (+3-547-879-85)</p>
          </div>
          <div class="flex items-center gap-x-2">
            <ui-ui-icons icon-name="email" icon-classes="fill-gray-800" />
            <p class="text-gray-900">- support@mail.ru</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { I_AlertConfigPayload } from "~/models/store/main/interfaces";

const localization = computed(() => useLocalization());

const { $store, $emailValidationFunc, $nameValidationFunc } = useNuxtApp();

let userName = ref("");
let userEmail = ref("");
let userText = ref("");

let nameError = ref("");
let emailError = ref("");
let textError = ref("");

const nameValidationFunc = (value: string): void => {
  userName.value = value.replace(/[^a-zA-Z]+/g, "");
};
const sendMessageFunc = () => {
  nameError.value = $nameValidationFunc(userName.value);
  emailError.value = $emailValidationFunc(userEmail.value);
  if (userText.value == "") textError.value = 'requiredField';
  else if (userText.value.length < 6)
    textError.value = "minimum6Symbol";
  else textError.value = "";
  if (!nameError.value && !emailError.value && !textError.value) {
    const alert: I_AlertConfigPayload = {
      variant: "success",
      descriptions: [
        {
          title: localization.value.success,
          descriptions: [localization.value.yourMessageHasBeenSent],
        },
      ],
    };
    $store.dispatch("A_SET_ALERT_CONFIG", alert);
    userName.value = "";
    userEmail.value = "";
    userText.value = "";
  }
};
</script>

<style scoped>
.contact-us {
  width: 100%;
  height: 100%;
  background-image: url("/img/contacts/contact-us.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
