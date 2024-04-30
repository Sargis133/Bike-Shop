<template>
  <div class="mt-3 pb-6 px-14 max-lg:px-2 max-lg:mt-8">
    <div class="p-0.5 border-b border-zinc-300">
      <h2 class="font-sans font-medium text-xl dark:text-white font-montserrat">
        {{ localization.basket }}
      </h2>
    </div>
    <div class="mt-6">
      <div class="grid grid-cols-[2fr_1fr] max-sm:grid-cols-1">
        <div class="flex flex-col gap-y-4 w-full max-lg:flex-wrap max-lg:flex-row max-lg:gap-x-4 max-md:flex-col max-md:items-center max-sm:flex-wrap max-sm:items-start max-sm:flex-row max-sm:justify-center">
          <template v-if="!basketProducts || basketProducts.length == 0">
            <h3 class="font-medium text-lg dark:text-gray-400">
              {{ localization.productsNotFound }}
            </h3>
          </template>
          <template v-else>
            <div
              v-for="product in basketProducts"
              :key="product.id"
              class="p-2 border-2 border-gray-400 rounded-xl flex justify-between max-lg:flex-col max-lg:w-max "
            >
              <div
                class="flex cursor-pointer max-lg:flex-col"
                @click.stop="goToProductPageFunc(product.id)"
              >
                <div class="max-w-[150px] max-lg:flex max-lg:self-center">
                  <img :src="'../img/products/'+product.img" :alt="product.name" class="w-full" />
                </div>
                <div class="w-[200px] ml-3">
                  <div class="pt-2 dark:text-white">
                    <h4 class="text-lg font-medium">{{ product.name }}</h4>
                    <p><span>{{localization.size}} - </span>{{ product.size }}</p>
                    <p><span>{{localization.color}} - </span>{{ localization[product.color] }}</p>
                  </div>
                </div>
              </div>
              <div class="flex pt-2">
                <div class="flex">
                  <div
                    class="w-[30px] h-[30px] bg-gray-300 rounded-xl flex items-center justify-center"
                  >
                    <ui-ui-button
                      custom="hover:opacity-50 p-2"
                      size="sm"
                      v-bind:disabled="+productCounts[product.id] < 2"
                      @click.stop="reduceProductCountFunc(product.id)"
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
                        v-model="productCounts[product.id]"
                        variant="empty"
                        size="sm"
                        :readonly="true"
                      />
                    </div>
                  </div>
                  <div
                    class="w-[30px] h-[30px] bg-gray-300 rounded-xl flex items-center justify-center"
                  >
                    <ui-ui-button
                      custom="hover:opacity-50 p-2"
                      size="sm"
                      @click.stop="increaseProductCountFunc(product.id)"
                    >
                      <ui-ui-icons
                        icon-name="plus"
                        icon-classes="w-4 h-4 fill-zinc-800"
                      />
                    </ui-ui-button>
                  </div>
                </div>
              </div>
              <div class="flex flex-col justify-between">
                <div class="p-1">
                  <p class="text-lg font-medium tracking-wider dark:text-white">
                    {{ product.price }} $
                  </p>
                </div>
                <div class="flex items-end justify-end">
                  <ui-ui-button
                    custom="pr-1.5 hover:opacity-50"
                    size="sm"
                    @click.stop="addToFavoritesFunc(product.id)"
                  >
                    <ui-ui-icons
                      icon-name="heart"
                      icon-classes="w-5 h-5 fill-gray-500"
                    />
                  </ui-ui-button>
                  <ui-ui-button
                    custom="pr-1.5 hover:opacity-50"
                    size="sm"
                    @click="deleteProductFromBasketFunc(product.id)"
                  >
                    <ui-ui-icons
                      icon-name="trash"
                      icon-classes="w-5 h-5 fill-gray-500"
                    />
                  </ui-ui-button>
                </div>
              </div>
            </div>
            <Transition name="order">
            <template v-if="isShowOrderContent">
              <div
                class="flex justify-start border-2 w-max rounded-lg border-gray-400"
              >
                <Order/>
              </div>
            </template>
            </Transition>
          </template>
        </div>

        <template v-if="basketProducts.length > 0">
          <div class="flex justify-center max-sm:justify-center">
            <div
              class="pt-1 pb-4 px-4 border-2 border-gray-400 rounded-xl w-[300px] h-max bg-white dark:bg-slate-900 max-lg:w-[220px] max-md:w-[235px] max-sm:static max-sm:mt-4"
              :class="{ 'fixed top-16 max-lg:w-[220px]': pageIsScroll }"
            >
              <div class="flex flex-col">
                <div>
                  <p class="text-lg font-medium dark:text-white">
                    {{ localization.address }}:
                    <span class="dark:text-gray-300">USA</span>
                  </p>
                  <p class="dark:text-white">
                    {{ localization.payMethod }}:
                    <span class="dark:text-gray-300">{{localization.cash}}</span>
                  </p>
                </div>
                <div class="flex items-baseline gap-x-4 mt-4 justify-center">
                  <p class="text-lg font-medium dark:text-white">
                    {{ localization.total }}:
                  </p>
                    <span class="text-lg font-semibold dark:text-gray-300"
                          :class="{'tot-anime': totalAnimation}"
                      >{{ total }} $</span
                    >
                </div>
                <div class="flex justify-center mt-2 relative">
                  <div class="tooltip-parent">
                    <ui-ui-button
                      variant="purple"
                      size="lg"
                      :disabled="!total || !isCheckedTerms"
                      @click="orderProductsFunc"
                    >
                      <p class="px-6">{{ localization.continue }}</p>
                    </ui-ui-button>
                  </div>
                  <div
                    class="absolute bg-yellow-200 rounded-md shadow-md p-1 tooltip"
                  >
                    <p class="text-sm">{{ localization.pleaseCheckTheBox }}</p>
                  </div>
                </div>
                <div class="mt-3 flex">
                  <div>
                    <div class="mt-0.5">
                      <ui-ui-checkbox
                        class="w-[14px]"
                        id="orderTerms"
                        variant="primary"
                        @checked="isCheckedTermsFunc"
                      />
                    </div>
                  </div>
                  <div class="ml-1.5">
                    <p class="font-sans dark:text-gray-400 text-sm">
                      {{ localization.iAgreeWithTheRulesText }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <modals-confirm-modal
    v-model:is-show="isShowConfirmModal"
    @answer="answerConfirmModalFunc"
    :title="confirmModalTitle"
    :buttons="confirmModalButtons"
  >
    <template #body>
      <p>{{ confirmModalText }}</p>
    </template>
  </modals-confirm-modal>
  <modals-alert-modal v-model:is-show="isShowAlertModal">
    <template #body>{{ alertModalText }}</template>
  </modals-alert-modal>
</template>

<script setup lang="ts">
import { useCookies } from "vue3-cookies";
import { I_AlertConfigPayload } from "~/models/store/main/interfaces";
import {
  I_BasketProduct,
  I_ProductInfoFromBasket,
} from "~/models/store/basket/interfaces";

definePageMeta({
  middleware: "auth",
});

const localization = computed(() => useLocalization());
const { $store } = useNuxtApp();

onMounted(() =>
  window.addEventListener("scroll", function () {
    window.scrollY > 60
      ? (pageIsScroll.value = true)
      : (pageIsScroll.value = false);
  }),
);

let totalAnimation = ref(false)
let isShowOrderContent = ref(false);
let isShowAlertModal = ref(false);
let alertModalText = ref<string>("");
let confirmModalType = "";
let confirmModalText = ref<string>("");
let confirmModalTitle = ref<string>("");
let confirmModalButtons = ref<string[]>([]);
let isCheckedTerms = ref<boolean>(false);
let isShowConfirmModal = ref(false);
let pageIsScroll = ref(false);
const productCounts = ref<{ [key: string]: string }>({});

const basketProducts = computed<I_BasketProduct[]>(
  () => $store.getters.getBasketProducts,
);
basketProducts.value.forEach(
  (item: I_BasketProduct) => (productCounts.value[item.id] = item.count + ""),
);
const total = computed<number>(() =>
  basketProducts.value
    .map((item: I_BasketProduct) => (item.count ? item.count * item.price : 0))
    .reduce((a, c) => a + c, 0),
);
watch(total,() => {
  totalAnimation.value = true
  setTimeout(() => totalAnimation.value = false, 500)
})

watch(basketProducts, (newValue: I_BasketProduct[]) => {
  newValue.forEach(
    (item: I_BasketProduct) => (productCounts.value[item.id] = "" + item.count),
  );
});

const deleteProductFromBasketFunc = (productId: number): void => {
  $store.dispatch("A_DELETE_PRODUCT_FROM_BASKET", productId);
};
const addToFavoritesFunc = (id: number): void => {
  const { cookies } = useCookies();
  if (!cookies.get("token")) {
    confirmModalType = "login";
    confirmModalButtons.value = [
      localization.value.logIn,
      localization.value.cancel,
    ];
    confirmModalTitle.value = localization.value.logIn;
    confirmModalText.value = localization.value.alertLoginForFavorites;
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
const answerConfirmModalFunc = (e: boolean) => {
  if (e && confirmModalType == "login") navigateTo("/login");
  confirmModalType = "";
};
const reduceProductCountFunc = (id: number): void => {
  if (productCounts.value["" + id] == "1") {
    return;
  } else {
    const reduceProduct: I_ProductInfoFromBasket = {
      productId: id,
      count: -1,
    };
    $store.dispatch("A_ADD_PRODUCT_IN_BASKET", reduceProduct);
  }
};
const increaseProductCountFunc = (id: number): void => {
  const increaseCount: I_ProductInfoFromBasket = {
    productId: id,
    count: 1,
  };
  $store.dispatch("A_ADD_PRODUCT_IN_BASKET", increaseCount);
};
const goToProductPageFunc = (productId: number) =>
  navigateTo(`/catalog/product/${productId}`);

const isCheckedTermsFunc = (e: boolean) => {
  isCheckedTerms.value = e;
  if(!e) {
    isShowOrderContent.value = false
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }, 100)
  }
};

const orderProductsFunc = () => {
  if (!isCheckedTerms.value) {
    alertModalText.value = localization.value.pleaseCheckTheBox;
    isShowAlertModal.value = true;
  } else if (basketProducts.value.length == 0) {
    alertModalText.value = localization.value.noProductsToOrder;
  } else {
    isShowOrderContent.value = true;
    setTimeout(() => {
      window.scrollBy({
        top: document.body.scrollHeight,
        behavior: "smooth"
      })
    }, 800)

  }
};
</script>

<style scoped>
@import "assets/css/fonts.css";

.tooltip {
  visibility: hidden;
  opacity: 0;
  transition-property: all;
  transition-duration: 500ms;
  top: 53px;
}
.tooltip::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 40%;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #fef08a transparent;
}
.tooltip-parent:hover + .tooltip {
  visibility: visible;
  opacity: 1;
}

.order-enter-active,
.order-leave-active {
  overflow: hidden;
  height: 300px;
  transition: all 0.5s ease;
}

.order-enter-from,
.order-leave-to {
  opacity: 0;
  overflow: hidden;
  height: 0;
}


.tot-anime {
  animation-name: change;
  animation-duration: 500ms;
}
@keyframes change {
  0% {
    opacity: 0;
  }
  50% {
    transform: translateY(40px);
  }
  100% {
    transform: translateY(0);
  }
}

</style>
