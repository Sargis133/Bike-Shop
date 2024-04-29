<template>
  <div
    class="flex fixed w-full z-30 justify-between items-center shadow-md p-1 bg-white dark:shadow-white dark:bg-slate-900 max-sm:static max-sm:py-[5px]"
  >
    <div class="px-2 flex">
      <NuxtLink to="/">
        <ui-ui-icons
          icon-name="bike"
          icon-classes="w-10 h-10 2xl:w-16 2xl:h-16 dark:fill-white dark:hover:fill-gray-400 hover:fill-gray-500"
        />
      </NuxtLink>
    </div>
    <!--    Burger menu icon-->
    <div
      class="burger-menu sm:hidden px-2 relative w-[50px] h-[50px]"
      @click="isShowBurgerMenuFunc"
    >
      <div v-if="!isShowBurger" class="absolute z-[60] top-3 right-3">
        <ui-ui-icons icon-name="burger" icon-classes="w-6 h-6" />
      </div>
    </div>
    <!--    -------    -->
    <div class="flex justify-end px-3 py-1 max-sm:hidden">
      <div class="flex items-center px-1 max-lg:px-2 max-sm:px-2">
        <header-theme-mode />
      </div>
      <div class="flex items-center px-2 max-lg:px-4 max-sm:px-0.5">
        <ui-ui-button
          custom="p-0 2xl:px-6"
          size="sm"
          @click.stop="goToBasketFunc"
        >
          <div class="relative">
            <div
              class="absolute top-[-7px] left-[-8px] p-[3px] min-w-[15px] h-[15px] bg-red-600 text-[10px] flex items-center justify-center text-white rounded-xl 2xl:h-[25px]"
            >
              <span class="2xl:text-xl">{{ basketCount }}</span>
            </div>
            <ui-ui-icons
              icon-name="basket"
              icon-classes="w-6 h-6 fill-gray-700 dark:fill-white 2xl:w-10 2xl:h-10 "
            />
          </div>
        </ui-ui-button>
      </div>
      <div class="px-1">
        <ui-ui-select
          data-id="Language"
          variant="light"
          size="sm"
          :option-group="languageOptions"
          @optionValue="languageSelectFunc"
          ><span class="2xl:text-2xl">{{
            localization[language]
          }}</span></ui-ui-select
        >
      </div>
      <div class="px-1">
        <ui-ui-select
          data-id="Auth"
          variant="light"
          size="sm"
          :option-group="authOptions"
          @optionValue="onChangeAuthHrefFunc"
        >
          <ui-ui-icons
            icon-name="user"
            icon-classes="w-5 h-5 2xl:w-8 2xl:h-8 dark:fill-white"
          />
        </ui-ui-select>
      </div>
    </div>
  </div>
  <!--  Burger Menu-->
  <Transition name="burger">
    <template v-if="isShowBurger">
      <div
        class="bg-black bg-opacity-90 rounded absolute top-0 right-0 w-full h-full px-5 flex flex-col items-center gap-y-4 z-[50] py-2"
      >
        <div class="flex flex-col-reverse relative w-full">
          <div class="flex flex-col items-center gap-y-2">
            <div>
              <header-theme-mode />
            </div>
            <div>
              <ui-ui-button
                custom="p-0 2xl:px-6"
                size="sm"
                @click.stop="goToBasketFunc"
              >
                <div class="relative">
                  <div
                    class="absolute top-[-7px] left-[-8px] p-[3px] min-w-[15px] h-[15px] bg-red-600 text-[10px] flex items-center justify-center text-white rounded-xl 2xl:h-[25px]"
                  >
                    <span class="2xl:text-xl">{{ basketCount }}</span>
                  </div>
                  <ui-ui-icons
                    icon-name="basket"
                    icon-classes="w-6 h-6 fill-gray-700 fill-white 2xl:w-10 2xl:h-10 "
                  />
                </div>
              </ui-ui-button>
            </div>
            <div>
              <ui-ui-select
                data-id="Language"
                variant="whiteBottomLine"
                size="sm"
                :option-group="languageOptions"
                @optionValue="languageSelectFunc"
                ><span class="2xl:text-2xl">{{
                  localization[language]
                }}</span></ui-ui-select
              >
            </div>
            <div>
              <ui-ui-select
                data-id="Auth"
                variant="whiteBottomLine"
                size="sm"
                :option-group="authOptions"
                @optionValue="onChangeAuthHrefFunc"
              >
                <ui-ui-icons
                  icon-name="user"
                  icon-classes="w-5 h-5 2xl:w-8 2xl:h-8 fill-white"
                />
              </ui-ui-select>
            </div>
          </div>
          <div class="flex justify-end w-full">
            <div @click="isShowBurgerMenuFunc" class="mt-3">
              <ui-ui-icons
                icon-name="close"
                icon-classes="w-4 h-4 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Transition>
  <modals-confirm-modal
    v-model:is-show="isShowConfirmModal"
    @answer="sendToLoginPageFunc"
    :title="localization.logIn"
    :buttons="[localization.logIn, localization.cancel]"
  >
    <template #body>
      <p>{{ localization.alertLoginForBasket }}</p>
    </template>
  </modals-confirm-modal>
</template>

<script setup lang="ts">
import { useLocalization } from "~/composables/useLocalization";
import { T_Language } from "~/models/store/main/types";
import { E_Language } from "~/components/header/models/enums";
import { I_StringObject } from "~/models/composables/useLocalization/interfaces";
import { authOptionsFunc } from "~/components/header/config/options";
import { languageOptionsFunc } from "~/components/header/config/options";
import { I_Option } from "~/components/ui/uiSelect/models/interfaces";
import { useCookies } from "vue3-cookies";
import { I_BasketProduct } from "~/models/store/basket/interfaces";

const { cookies } = useCookies();
const { $store } = useNuxtApp();
const localization = computed<I_StringObject>(() => useLocalization());

if (!$store.getters.getLanguage) {
  $store.dispatch("A_SET_LANGUAGE", "en-US");
}

let isShowBurger = ref(false);
let isShowConfirmModal = ref(false);

const loggedUserState = ref(cookies.get("token"));
if (!!loggedUserState.value) {
  $store.dispatch("A_CHANGE_STATE_TOKEN", loggedUserState.value);
} else {
  $store.dispatch("A_CHANGE_STATE_TOKEN", null);
}
const userToken = computed(() => $store.getters.getLoggedUserToken);

const authOptions = computed<I_Option[]>(() =>
  authOptionsFunc(localization.value, userToken.value),
);
const languageOptions = computed<I_Option[]>(() =>
  languageOptionsFunc(localization.value),
);

const language = computed<string>(
  () => E_Language[$store.getters.getLanguage as keyof typeof E_Language],
);

const basketCount = computed<I_BasketProduct[] | 0>(() => {
  if (!!loggedUserState.value) return $store.getters.getBasketProducts.length;
  else return 0;
});
const languageSelectFunc = (value: T_Language): void => {
  $store.dispatch("A_SET_LANGUAGE", value);
};
const onChangeAuthHrefFunc = (value: string): void => {
  if (value === "logout") {
    $store.dispatch("A_LOG_OUT");
    navigateTo("/login");
  } else {
    navigateTo(`/${value}`);
  }
};
const goToBasketFunc = () => {
  if (!loggedUserState.value) isShowConfirmModal.value = true;
  else navigateTo("/basket");
};
const sendToLoginPageFunc = (e: boolean) => {
  if (e) navigateTo("/login");
};
const isShowBurgerMenuFunc = () => (isShowBurger.value = !isShowBurger.value);
</script>

<style scoped>
.burger-enter-active,
.burger-leave-active {
  transition: all 1s ease;
}

.burger-enter-from,
.burger-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
</style>
