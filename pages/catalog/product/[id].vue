<template>
  <div class="pb-6 px-14 max-lg:px-2 max-lg:mt-8">
    <div>
      <div class="px-4 py-2 border-b border-zinc-300">
        <h2 class="font-sans font-medium text-xl dark:text-white font-montserrat">
          {{ product.name }}
        </h2>
      </div>
      <div
        class="grid grid-cols-[1fr_400px] mt-6 gap-x-2 max-xl:grid-cols-[1fr_1fr] max-md:grid-cols-1"
      >
        <!--        Left content-->
        <div class="justify-center h-max">
          <div class="hidden max-md:block max-md:w-full max-md:h-[300px]">
            <Slider :images="sliderImages" :vertical="true" />
          </div>
          <div
            class="max-md:hidden w-[700px] h-[400px] max-xl:max-w-[600px] max-xl:max-h-[300px]"
          >
            <Slider :images="sliderImages" :vertical="false" />
          </div>
          <div
            class="border-t border-gray-500 mt-8 w-[750px] max-xl:w-full max-md:mt-4"
          >
            <div>
              <div class="mt-4">
                <h4
                  class="font-medium font-source-sans-reg text-2xl dark:text-white max-lg:text-[20px]"
                >
                  {{ localization.bikeOptions }}
                </h4>
              </div>
              <div class="mt-3">
                <h5
                  class="text-lg font-medium text-gray-600 dark:text-gray-400 max-lg:text-sm"
                >
                  {{ localization.industryAttributes }}
                </h5>
                <div class="grid grid-cols-2 mt-1  font-montserrat-medium">
                  <div
                    class="border border-gray-400 p-2 bg-zinc-300 font-medium text-lg text-gray-800 max-lg:text-sm"
                  >
                    {{ localization.frameMaterial }}
                  </div>
                  <div
                    class="border-b border-t border-r border-gray-400 p-2 font-medium text-lg dark:text-white max-lg:text-sm"
                  >
                    {{ localization.highCarbonSteel }}
                  </div>
                  <div
                    class="border border-t-0 border-gray-400 p-2 bg-zinc-300 font-medium text-lg text-gray-800 max-lg:text-sm"
                  >
                    {{ localization.forkMaterial }}
                  </div>
                  <div
                    class="border-b border-r border-gray-400 p-2 font-medium text-lg dark:text-white max-lg:text-sm"
                  >
                    {{ localization.aluminumAlloy }}
                  </div>
                  <div
                    class="border border-t-0 border-gray-400 p-2 bg-zinc-300 font-medium text-lg text-gray-800 max-lg:text-sm"
                  >
                    {{ localization.forkSuspension }}
                  </div>
                  <div
                    class="border-b border-r border-gray-400 p-2 font-medium text-lg dark:text-white max-lg:text-sm"
                  >
                    {{ localization.yes }}
                  </div>
                </div>
              </div>
              <div class="mt-3 relative font-montserrat-medium">
                <h5
                  class="text-lg font-medium text-gray-600 dark:text-gray-400 max-lg:text-sm"
                >
                  {{ localization.otherAttributes }}
                </h5>
                <div
                  :class="{
                    'overflow-hidden h-[140px] max-lg:h-[100px]': isOverflow,
                    'h-full': !isOverflow,
                  }"
                >
                  <div class="mt-1 grid grid-cols-2">
                    <div
                      class="border border-b-0 border-gray-400 p-2 bg-zinc-300 font-medium text-lg text-gray-800 max-lg:text-sm"
                    >
                      {{ localization.tireWidth }}
                    </div>
                    <div
                      class="border border-b-0 border-l-0 border-t border-r border-gray-400 p-2 font-medium text-lg dark:text-white max-lg:text-sm"
                    >
                      26*1.95"
                    </div>
                    <div
                      class="border border-b-0 border-gray-400 p-2 bg-zinc-300 font-medium text-lg text-gray-800 max-lg:text-sm"
                    >
                      {{ localization.placeOfOrigin }}
                    </div>
                    <div
                      class="border border-l-0 border-b-0 border-gray-400 p-2 font-medium text-lg dark:text-white max-lg:text-sm"
                    >
                      Tianjin, China
                    </div>
                    <div
                      class="border border-b-0 border-gray-400 p-2 bg-zinc-300 font-medium text-lg text-gray-800 max-lg:text-sm"
                    >
                      {{ localization.pedalType }}
                    </div>
                    <div
                      class="border border-l-0 border-b-0 border-gray-400 p-2 font-medium text-lg dark:text-white max-lg:text-sm"
                    >
                      {{ localization.ordinaryPedal }}
                    </div>
                    <div
                      class="border border-b-0 border-gray-400 p-2 bg-zinc-300 font-medium text-lg text-gray-800 max-lg:text-sm"
                    >
                      {{ localization.loadCapacity }}
                    </div>
                    <div
                      class="border border-l-0 border-b-0 border-gray-400 p-2 font-medium text-lg dark:text-white max-lg:text-sm"
                    >
                      200kg
                    </div>
                    <div
                      class="border border-gray-400 p-2 bg-zinc-300 font-medium text-lg text-gray-800 max-lg:text-sm"
                    >
                      {{ localization.brake }}
                    </div>
                    <div
                      class="border border-l-0 border-gray-400 p-2 font-medium text-lg dark:text-white max-lg:text-sm"
                    >
                      {{ localization.mechanicalDiscBrake }}
                    </div>
                  </div>
                  <template v-if="!isOverflow">
                    <div
                      class="bg-gray-500 opacity-80 flex justify-center w-full"
                    >
                      <ui-ui-button
                        size="sm"
                        custom="p-2 font-medium font-sans text-white max-lg:text-sm"
                        @click="changeOptionsOverflow"
                        >{{ localization.hide }}</ui-ui-button
                      >
                    </div>
                  </template>
                </div>
                <template v-if="isOverflow">
                  <div
                    class="bg-gray-500 opacity-80 bottom-0 flex justify-center w-full"
                  >
                    <ui-ui-button
                      size="sm"
                      custom="p-2 font-medium font-sans text-white max-lg:text-sm"
                      @click="changeOptionsOverflow"
                      >{{ localization.showMore }}</ui-ui-button
                    >
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <!--        Right content-->
        <div
          class="border border-gray-400 rounded-md shadow-[0_0_8px_1px_gray] px-3 [&>*:not(:first-child)]:mt-3 h-max pb-4 max-md:mt-4"
        >
          <div class="flex justify-center py-2 border-b border-gray-400">
            <h3 class="font-medium text-xl dark:text-white max-lg:text-lg font-source-sans-reg">
              {{ localization.productDescription }}
            </h3>
          </div>

          <div class="[&>div]:mt-2 [&>div>h4]:font-medium [&>div>p]:pl-4">
            <div>
              <h4 class="dark:text-white text-gray-700 font-source-sans-semibold">{{ localization.information }}</h4>
              <p class="dark:text-gray-400 max-lg:text-sm font-serif font-montserrat">
                {{ localization.bikeDescriptionText }}
              </p>
            </div>
            <div>
              <h4 class="dark:text-white text-gray-700 font-source-sans-semibold">{{ localization.model }}</h4>
              <p class="dark:text-gray-400 max-lg:text-sm font-montserrat">BT_234</p>
            </div>
            <div>
              <h4 class="dark:text-white text-gray-700 font-source-sans-semibold">{{ localization.size }}</h4>
              <p class="dark:text-gray-400 max-lg:text-sm font-montserrat">
                {{ product.size }}
              </p>
            </div>
            <div>
              <h4 class="dark:text-white text-gray-700 font-source-sans-semibold">{{ localization.gears }}</h4>
              <p class="dark:text-gray-400 max-lg:text-sm font-montserrat">16</p>
            </div>
            <div>
              <h4 class="dark:text-white text-gray-700 font-source-sans-semibold">{{ localization.brakeSystem }}</h4>
              <p class="dark:text-gray-400 max-lg:text-sm font-montserrat">
                {{ localization.discBrake }}
              </p>
            </div>
            <div>
              <h4 class="dark:text-white text-gray-700 font-source-sans-semibold">{{ localization.maxSpeed }}</h4>
              <p class="dark:text-gray-400 max-lg:text-sm font-montserrat">35km/h</p>
            </div>
            <div>
              <h4 class="dark:text-white text-gray-700 font-source-sans-semibold">{{ localization.gender }}</h4>
              <p class="dark:text-gray-400 max-lg:text-sm font-montserrat">
                {{ localization.universal }}
              </p>
            </div>

<!--            PRODUCT BUYING DETAILS-->
            <div class="border-t border-gray-400 pt-2 flex items-center">
              <div class="flex pr-3 items-center">
                <div
                  class="w-[25px] h-[25px] bg-gray-300 rounded-xl flex items-center justify-center"
                >
                  <ui-ui-button
                    custom="hover:opacity-50 p-2"
                    size="sm"
                    @click.stop="reduceProductCountFunc"
                    v-bind:disabled="productCount < '2'"
                  >
                    <ui-ui-icons
                      icon-name="minus"
                      icon-classes="w-4 h-4 fill-zinc-800"
                    />
                  </ui-ui-button>
                </div>
                <div class="px-2">
                  <div
                    class="w-[40px] font-medium text-lg flex items-center [&>div>div>input]:text-center h-[30px]"
                  >
                    <ui-ui-input
                      v-model="productCount"
                      variant="empty"
                      size="sm"
                      :readonly="true"
                    />
                  </div>
                </div>
                <div
                  class="w-[25px] h-[25px] bg-gray-300 rounded-xl flex items-center justify-center"
                >
                  <ui-ui-button
                    custom="hover:opacity-50 p-2"
                    size="sm"
                    @click.stop="increaseProductCountFunc"
                  >
                    <ui-ui-icons
                      icon-name="plus"
                      icon-classes="w-4 h-4 fill-zinc-800"
                    />
                  </ui-ui-button>
                </div>
              </div>
              <ui-ui-button
                custom="ml-1 hover:opacity-50"
                size="sm"
                @click="addProductToBasketFunc(product.id)"
              >
                <div class="flex items-end">
                  <ui-ui-icons
                    icon-name="basket"
                    icon-classes="w-6 h-6 fill-black dark:fill-white ml-1 "
                  />
                </div>
              </ui-ui-button>
              <ui-ui-button
                custom="hover:opacity-40 ml-2"
                size="sm"
                @click="addToFavoritesFunc(product.id)"
                ><ui-ui-icons
                  icon-name="heart"
                  icon-classes="w-6 h-6 dark:fill-white"
              /></ui-ui-button>
            </div>
          </div>
<!--          PURCHASE DETAILS-->
          <div>
            <div class="border-t border-gray-400 flex justify-center">
              <h3 class="font-medium font-source-sans-reg text-2xl dark:text-white max-lg:text-lg">
                {{ localization.purchaseDetails }}
              </h3>
            </div>

            <div class="[&>div]:mt-3">
              <div>
                <div class="flex gap-x-2">
                  <ui-ui-icons
                    icon-name="fast-truck"
                    icon-classes="w-6 h-6 dark:fill-white"
                  />
                  <h4 class="font-medium dark:text-white text-gray-800">
                    {{ localization.shipping }}
                  </h4>
                </div>
                <p class="ml-4 text-[13px] dark:text-gray-400 font-sans">
                  {{ localization.shippingText }}
                </p>
              </div>
              <div>
                <div class="flex gap-x-2">
                  <ui-ui-icons
                    icon-name="credit-card"
                    icon-classes="w-6 h-6 dark:fill-white"
                  />
                  <h4 class="font-medium dark:text-white text-gray-800">
                    {{ localization.payment }}
                  </h4>
                </div>
                <div class="flex gap-x-3 ml-4 mt-2">
                  <ui-ui-icons
                    icon-name="visa"
                    icon-classes="w-9 h-6 border border-gray-400 rounded dark:bg-white"
                  />
                  <ui-ui-icons
                    icon-name="master-card"
                    icon-classes="w-9 h-6 border border-gray-400 rounded dark:bg-white"
                  />
                  <ui-ui-icons
                    icon-name="paypal"
                    icon-classes="w-9 h-6 border border-gray-400 rounded dark:bg-white"
                  />
                </div>
                <p class="ml-4 mt-1 text-[13px] dark:text-gray-400 font-sans">
                  {{ localization.paymentText }}
                </p>
              </div>
              <div>
                <div class="flex gap-x-2">
                  <ui-ui-icons
                    icon-name="arrow-rotate"
                    icon-classes="w-6 h-6 dark:fill-white"
                  />
                  <h4 class="font-medium dark:text-white text-gray-800">
                    {{ localization.returnRefunds }}
                  </h4>
                </div>
                <p class="ml-4 mt-1 text-[13px] dark:text-gray-400 font-sans">
                  {{ localization.returnRefundsText }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

<!--      USER REVIEWS-->
      <div class="border-t border-gray-600 mt-6">
        <Reviews/>
      </div>
    </div>
  </div>
  <modals-confirm-modal
    v-model:is-show="isShowConfirmModal"
    @answer="sendToLoginPageFunc"
    title="Login"
    :buttons="['Login', 'Cancel']"
  >
    <template #body>
      <p>Please log in to your account to add a product to your favorites</p>
    </template>
  </modals-confirm-modal>
</template>

<script setup lang="ts">
import { I_Products } from "~/models/server/api/interfaces";
import { useCookies } from "vue3-cookies";
import { I_AlertConfigPayload } from "~/models/store/main/interfaces";
import { I_ProductInfoFromBasket } from "~/models/store/basket/interfaces";



const route = useRoute();
const { $store } = useNuxtApp();
const localization = computed(() => useLocalization());
const { cookies } = useCookies();

let productCount = ref("1");

$store.dispatch("A_SET_PRODUCT", route.params.id);
const product = ref<I_Products>($store.getters.getProduct);


let isOverflow = ref<boolean>(true);
let isShowConfirmModal = ref(false);

const sliderImages = ref<string[]>([
  "/img/products/slide-product1.jpeg",
  "/img/products/slide-product2.jpeg",
  "/img/products/slide-product3.jpg",
  "/img/products/slide-product4.jpg",
  "/img/products/slide-product5.jpg",
  "/img/products/slide-product6.jpg",
]);

const changeOptionsOverflow = (): boolean =>
  (isOverflow.value = !isOverflow.value);

const addToFavoritesFunc = (id: number): void => {
  const { cookies } = useCookies();
  if (!cookies.get("token")) {
    isShowConfirmModal.value = true;
  } else {
    $store.dispatch("A_ADD_PRODUCT_IN_FAVORITES", id);
    const alert: I_AlertConfigPayload = {
      variant: "success",
      descriptions: [
        {
          title: localization.value.favorites,
          descriptions: [localization.value.productAddedToFavorites],
        },
      ],
    };
    $store.dispatch("A_SET_ALERT_CONFIG", alert);
  }
};
const addProductToBasketFunc = (productId: number): void => {
  if (!cookies.get("token")) isShowConfirmModal.value = true;
  else {
    const productInfo: I_ProductInfoFromBasket = {
      productId,
      count: +productCount.value,
    };
    $store.dispatch("A_ADD_PRODUCT_IN_BASKET", productInfo);
  }
};
const reduceProductCountFunc = (): void => {
  productCount.value = +productCount.value - 1 + "";
};
const increaseProductCountFunc = (): void => {
  productCount.value = +productCount.value + 1 + "";
};
const sendToLoginPageFunc = (e: boolean) => {
  if (e) navigateTo("/login");
};
</script>

<style scoped>
@import "assets/css/fonts.css";

</style>
