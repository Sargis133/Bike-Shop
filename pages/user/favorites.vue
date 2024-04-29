<template>
  <div class="mt-3 px-14 pb-6 max-lg:px-2 max-lg:mt-8">
    <div class="p-0.5 border-b border-zinc-300">
      <h2 class="font-sans font-medium text-xl dark:text-white font-montserrat">
        {{ localization.favorites }}
      </h2>
    </div>
    <div class="mt-6 ml-3 pb-6">
      <template v-if="favoritesProducts.length == 0">
        <h2 class="text-xl dark:text-gray-300">{{ localization.thereAreNoProductsInFavorites }}</h2>
      </template>
      <div class="flex flex-wrap gap-y-10 gap-x-8 px-10 max-sm:justify-center">
        <div
          v-for="product in favoritesProducts"
          class="relative p-1 border border-gray-400 cursor-pointer shadow hover:dark:shadow-white hover:shadow-lg rounded-md w-[250px] max-md:w-full max-sm:w-[200px]"
          @click.stop="openProductPageFunc(product.id)"
        >
          <ui-ui-button
            custom="p-0.5 absolute top-[-10px] right-[-10px] bg-white border rounded-full p-1.5"
            size="sm"
            @click.stop="deleteFromFavoritesFunc(product.id)"
          >
            <ui-ui-icons
              icon-name="close"
              icon-classes="w-3 h-3 text-gray-600"
            />
          </ui-ui-button>
          <div class="h-full flex flex-col max-md:flex-row max-md:gap-x-4 max-md:justify-between max-sm:flex-col ">
            <div class="max-w-[150px] m-auto max-md:w-[300px] max-md:flex max-md:m-0 max-sm:w-[150px] max-sm:m-auto">
              <img :src="product.img" :alt="product.name" class="w-full" />
            </div>
            <div class="p-2 ">
              <div class="[&>p]:mt-1 dark:text-gray-300">
                <p>
                  <span class="font-medium">{{ localization.name }}</span> -
                  {{ product.name }}
                </p>
                <p>
                  <span class="font-medium">{{ localization.size }}</span> -
                  {{ product.size }}
                </p>
                <p>
                  <span class="font-medium">{{ localization.color }}</span> -
                  {{ localization[product.color] }}
                </p>
              </div>
            </div>
            <div class="flex justify-end items-end max-md:w-[50px] max-sm:w-full max-sm:items-end">
              <ui-ui-button
                custom="hover:opacity-40 p-1"
                size="sm"
                @click.stop="addProductToCartFunc(product.id)"
              >
                <ui-ui-icons
                  icon-name="basket"
                  icon-classes="w-5 h-5 dark:fill-white"
                />
              </ui-ui-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { I_StringObject } from "~/models/composables/useLocalization/interfaces";
import { I_Products } from "~/models/server/api/interfaces";
import { I_ProductInfoFromBasket } from "~/models/store/basket/interfaces";

definePageMeta({
  middleware: "auth",
});

const localization = computed<I_StringObject>(() => useLocalization());
const { $store } = useNuxtApp();

$store.dispatch("A_SET_FAVORITES_PRODUCTS");
const favoritesProducts = computed<I_Products[]>(
  () => $store.getters.getFavoritesProducts,
);

const deleteFromFavoritesFunc = (id: number): void => {
  $store.dispatch("A_DELETE_PRODUCT_FROM_FAVORITES", id);
};
const openProductPageFunc = (id: number): void => {
  navigateTo(`/catalog/product/${id}`);
};

const addProductToCartFunc = (productId: number) => {
  const productInfo: I_ProductInfoFromBasket = {
    productId,
    count: 1,
  };
  $store.dispatch("A_ADD_PRODUCT_IN_BASKET", productInfo);
};
</script>

<style scoped>
@import "assets/css/fonts.css";
</style>
