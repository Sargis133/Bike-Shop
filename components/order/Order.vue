<template>
  <div class="py-6 flex justify-center items-center">
    <div class="rounded-md px-6">
      <div class="flex justify-center p-1">
        <h2 class="text-xl dark:text-gray-300 max-md:text-lg">{{ localization.pleaseFillInAllFields }}</h2>
      </div>
      <div class="mt-4">
        <div class="grid grid-cols-2 gap-x-6 max-md:text-sm max-md:grid-cols-1">
          <div>
            <p class="dark:text-gray-300">
              {{ localization.name }}
              <span class="text-red-700 font-medium text-xl">*</span>
            </p>
            <ui-ui-input
              v-model="userOrderData.name"
              variant="default"
              size="md"
              :error-text="localization[userOrderError.name]"
              @inputValue="nameValidationFunc"
            />
          </div>
          <div class="max-md:mt-4">
            <p class="dark:text-gray-300">
              {{ localization.surname }}
              <span class="text-red-700 font-medium text-xl">*</span>
            </p>
            <ui-ui-input
              v-model="userOrderData.surname"
              variant="default"
              size="md"
              :error-text="localization[userOrderError.surname]"
              @inputValue="surnameValidationFunc"
            />
          </div>
          <div class="mt-4">
            <p class="dark:text-gray-300">
              {{ localization.address }}
              <span class="text-red-700 font-medium text-xl">*</span>
            </p>
            <ui-ui-input
              v-model="userOrderData.address"
              variant="default"
              size="md"
              :error-text="localization[userOrderError.address]"
            />
          </div>
          <div class="mt-4">
            <p class="dark:text-gray-300">
              {{ localization.phone }}
              <span class="text-red-700 font-medium text-xl">*</span>
            </p>
            <ui-ui-input
              v-model="userOrderData.phone"
              variant="default"
              size="md"
              :error-text="localization[userOrderError.phone]"
              @inputValue="phoneValidationFunc"
            />
          </div>
        </div>
        <div class="flex justify-start mt-6">
          <div class="flex gap-x-4">
            <p class="dark:text-gray-300">
              {{ localization.payment }}
              <span class="text-red-700 text-xl font-medium">*</span>
            </p>
            <ui-ui-select
              @optionValue="paymentMethodFunc"
              :option-group="paymentOptions"
              size="sm"
              data-id="paymentSelect"
              >{{ localization[userOrderData.payment] }}</ui-ui-select
            >
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <ui-ui-button variant="purple" size="md" @click="confirmOrderFunc" >{{
            localization.order
          }}</ui-ui-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { I_Option } from "~/components/ui/uiSelect/models/interfaces";
import {I_AlertConfigPayload} from "~/models/store/main/interfaces";

const { $store, $nameValidationFunc, $phoneValidationFunc } = useNuxtApp();
const localization = computed(() => useLocalization());

const paymentOptions = computed<I_Option[]>(() => {
  return [
  {
    name: localization.value.cash,
    value: "cash",
  },
  {
    name: localization.value.transfer,
    value: "transfer",
  },
]});
const userOrderData = ref({
  name: "",
  surname: "",
  address: "",
  phone: "",
  payment: paymentOptions.value[0].value,
});
const userOrderError = ref({
  name: "",
  surname: "",
  address: "",
  phone: "",
});

const nameValidationFunc = (value: string) => {
  userOrderData.value.name = value.replace(/[^a-zA-Z]+/g, "");
};
const surnameValidationFunc = (value: string) => {
  userOrderData.value.surname = value.replace(/[^a-zA-Z]+/g, "");
};
const phoneValidationFunc = (value: string) => {
  userOrderData.value.phone = value.replace(/\D+/g, "");
};
const paymentMethodFunc = (e: string) => {
  userOrderData.value.payment = e;
};
const confirmOrderFunc = () => {
  userOrderError.value.name =
    $nameValidationFunc(userOrderData.value.name);
  userOrderError.value.surname =
    $nameValidationFunc(userOrderData.value.surname);
  userOrderError.value.phone =
    $phoneValidationFunc(userOrderData.value.phone);
  userOrderError.value.address = !userOrderData.value.address
    ? "requiredField"
    : "";
  if (
    !userOrderError.value.name &&
    !userOrderError.value.surname &&
    !userOrderError.value.address &&
    !userOrderError.value.phone
  ) {
    const alert: I_AlertConfigPayload = {
      variant: "success",
      descriptions: [
        {
          title: localization.value.success,
          descriptions: [localization.value.yourOrderIsAccepted]
        }
      ]
    }
    $store.dispatch("A_SET_ALERT_CONFIG", alert)
    $store.dispatch("A_DELETE_ALL_PRODUCTS_FROM_BASKEt")
  }
};
</script>

<style scoped></style>
