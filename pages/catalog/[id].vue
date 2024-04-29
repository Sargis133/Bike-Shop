<template>
  <div class="pb-6 px-14 max-sm:px-2 max-sm:mt-8">
    <div>
      <div class="px-4 py-2 border-b border-zinc-300">
        <h2 class="font-sans font-medium text-xl dark:text-white font-montserrat">
          <NuxtLink to="/catalog/categories" class="hover:text-zinc-500 2xl:text-4xl">
            {{ localization.categories }}</NuxtLink
          >
          <span class="2xl:text-4xl">{{ " - - > " + localization[categoryTitle] }}</span>
        </h2>
      </div>
      <div class="mt-6 grid grid-cols-[250px_auto] 2xl:grid-cols-[300px_auto] max-md:grid-cols-1 max-md:gap-y-8 ">
        <!--      Filters-->
        <div class="max-md:flex max-md:justify-center max-sm:flex max-sm:justify-center">
        <div
          class="filters-content  w-[250px] h-max border border-zinc-500 rounded-xl px-5 py-6 shadow-[0_1px_4px_5px] shadow-zinc-200 2xl:w-[300px] max-md:static"
          :class="{ 'fixed top-16 2xl:top-20 ' : filtersIsScroll}"
        >
          <template v-if="isHaveFilters">
            <div
              class="absolute w-full h-full flex items-center justify-center"
            >
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </template>
          <template v-else>
            <div style="grid-area: categoryFilter">
              <ui-ui-select
                data-id="filter_bike-type"
                size="sm"
                variant="outlineSuccess"
                :option-group="typeFilters"
                @optionValue="typeFilterFunc"
              >
                <span class="2xl:text-2xl max-sm:text-[12px]">{{ localization.type }}</span>
              </ui-ui-select>
            </div>
            <div style="grid-area: colorFilter">
              <ui-ui-select
                data-id="filter_bike-color"
                :option-group="colorFilters"
                size="sm"
                variant="outlineSuccess"
                multi="yes"
                @optionValue="colorFilterFunc"
              >
                <span class="2xl:text-2xl max-sm:text-[12px]">{{ localization.color }}</span>
              </ui-ui-select>
            </div>
            <div class="dark:text-white mb-2 mt-2 2xl:mt-6" style="grid-area: checkbox">
              <p class="font-medium 2xl:text-3xl max-sm:text-sm">{{ localization.size }}</p>
              <div class="grid grid-cols-4 gap-x-2 [&>div>label]:ml-1 2xl:mt-4">
                <div v-for="option in sizeFilters" class="cursor-pointer 2xl:text-2xl max-sm:text-sm">
                  <ui-ui-checkbox
                    :id="`bike-size-${option.name}`"
                    variant="primary"
                    :label="option.name"
                    :is-checked="route.query.size?.includes(option.name)"
                    @click="sizeFilterFunc(option.name)"
                  />
                </div>
              </div>
            </div>
            <div style="grid-area: minPrice" class="w-[100px] 2xl:w-full">
              <ui-ui-input
                v-model="minPrice"
                size="sm"
                variant="default"
                :placeholder="localization.minPrice"
                @inputValue="minPriceValidFunc"
              />
            </div>
            <div style="grid-area: maxPrice" class="w-[100px] 2xl:w-full">
              <div class="relative">
                <ui-ui-input
                  v-model="maxPrice"
                  size="sm"
                  variant="default"
                  :placeholder="localization.maxPrice"
                  @inputValue="maxPriceValidFunc"
                />
                <ui-ui-button
                  variant="primary"
                  class="absolute top-[10px] right-[-8px] w-[20px] h-[20px] flex items-center justify-center 2xl:w-[30px] 2xl:h-[30px] 2xl:top-[15px] 2xl:right-[-18px]"
                  size="sm"
                  @click="priceFilterFunc"
                  >></ui-ui-button
                >
              </div>
            </div>
          </template>
        </div>
        </div>
        <!--      Products  -->
        <div class="relative w-full">
          <template v-if="products != null && products.length == 0">
            <div
              class="absolute w-full h-full flex items-center justify-center"
            >
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </template>
          <template v-else-if="products == null">
            <h3 class="p-6 text-lg font-medium">
              {{ localization.productsNotFound }}
            </h3>
          </template>
          <template v-else>
            <div class="gap-x-4 gap-y-6 ml-10 max-sm:ml-0 max-sm:mt-6 max-xl:flex max-xl:flex-wrap xl:grid xl:grid-cols-4 2xl:flex 2xl:flex-wrap max-md:justify-center max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              <div
                v-for="product in products"
                class="border border-zinc-500 dark:bg-slate-900 rounded-xl cursor-pointer shadow-[0_5px_8px_3px] hover:shadow-[0_5px_12px_5px] hover:shadow-zinc-300 shadow-zinc-200 dark:shadow-none dark:hover:shadow-white dark:hover:shadow-[0_2px_px_5px] w-[220px] max-md:w-[180px] 2xl:w-max max-sm:flex max-sm:w-full max-sm:max-w-[300px] max-sm:px-2 max-sm:justify-between"
                @click.stop="openProductPageFunc(product.id)"
              >
                <div class="flex justify-center relative">
                  <img
                    :src="'/myBike-Shop-/img/products/' + product.img"
                    class="w-[150px] h-[150px] product-img 2xl:w-full 2xl:h-full max-sm:w-[100px]  max-sm:h-[100px]"
                    alt="product-img"
                  />
                </div>
                <div class="font-serif px-3 py-2 [&>p]:mt-1 dark:text-gray-400 2xl:text-2xl max-md:text-sm max-sm:text-[14px] max-sm:grid max-sm:grid-cols-1">
                  <p>{{ product.name }}</p>
                  <p>{{ localization.size }} : {{ product.size }}</p>
                  <p>
                    {{ localization.color }} :
                    {{ localization[product.color] }}
                  </p>
                  <p>{{ localization.price }} : {{ product.price }}</p>
                </div>
                <div class="flex justify-end max-sm:flex-col max-sm:justify-center max-sm:items-start">
                  <ui-ui-button
                    class="flex items-center hover:opacity-50"
                    custom="p-2 max-sm:p-0"
                    size="sm"
                    @click.stop="addProductToBasketFunc(product.id)"
                    ><ui-ui-icons
                      icon-name="basket"
                      icon-classes="w-5 h-5 fill-black dark:fill-white 2xl:w-9 2xl:h-9 max-sm:w-[25px] max-sm:h-[25px]"
                  /></ui-ui-button>
                  <ui-ui-button
                    custom="hover:[&>svg]:fill-red-700 pr-1.5 max-sm:pr-0 max-sm:pt-2"
                    size="sm"
                    @click.stop="addToFavoritesFunc(product.id)"
                  >
                    <ui-ui-icons icon-name="heart" icon-classes="w-5 h-5 dark:fill-white 2xl:w-9 2xl:h-9 max-sm:w-[25px] max-sm:h-[25px]" />
                  </ui-ui-button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <modals-confirm-modal
    v-model:is-show="isShowConfirmModal"
    @answer="sendToLoginPageFunc"
    :title="localization.logIn"
    :buttons="[localization.logIn, localization.cancel]"
  >
    <template #body>
      <p>{{ modalText }}</p>
    </template>
  </modals-confirm-modal>
</template>

<script setup lang="ts">
import { I_ProductFilters } from "~/models/store/catalog/products/interfaces";
import { I_Products } from "~/models/server/api/interfaces";
import {
  I_ChangedColors,
  I_ChangedSizes,
  I_ChangedTypes,
} from "~/models/store/catalog/filters/interfaces";
import { I_Category } from "~/models/store/catalog/categories/interfaces";
import {
  checkEmptyFiltersFunc,
  productFilters,
} from "~/components/templates/catalog/product/config/checkFilters";
import { useCookies } from "vue3-cookies";
import {I_AlertConfigPayload} from "~/models/store/main/interfaces";
import {I_ProductInfoFromBasket} from "~/models/store/basket/interfaces";

const route = useRoute();
const router = useRouter();
const localization = computed(() => useLocalization());
const { $store } = useNuxtApp();
const { cookies } = useCookies()

let filtersIsScroll = ref(false);
onMounted(() => window.addEventListener("scroll", function() {
  window.scrollY > 60 ? filtersIsScroll.value = true : filtersIsScroll.value = false
}))

let modalText = ref<string>("")
let isShowConfirmModal = ref(false);

const categoryTitle = computed<string>(() => {
  $store.dispatch("A_SET_CATEGORIES");
  const categories = $store.getters.getCategories.find(
    (item: I_Category) => item.id === +route.params.id,
  );
  return categories == undefined ? navigateTo("/catalog/categories") : categories.name;
});

$store.dispatch("A_SET_FILTERS");

const typeFilters = computed<I_ChangedTypes[]>(
  () => $store.getters.getTypeFilters || [],
);
const colorFilters = computed<I_ChangedColors[]>(() => {
  return $store.getters.getColorFilters.map((item: I_ChangedColors) => {
    return {
      ...item,
      isChecked: !!route.query.color?.includes(item.value),
    };
  });
});
const sizeFilters = computed<I_ChangedSizes[]>(
  () => $store.getters.getSizeFilters || [],
);
const minPrice = ref<string>(
  (route.query?.min ? route.query.min : "") as string,
);
const maxPrice = ref<string>(
  (route.query?.max ? route.query.max : "") as string,
);

const isHaveFilters = computed<boolean>(
  () =>
    typeFilters.value?.length == 0 ||
    colorFilters.value?.length == 0 ||
    sizeFilters.value?.length == 0,
);

const filters = ref<I_ProductFilters>(productFilters(route));
$store.dispatch("A_SET_PRODUCTS", filters.value);

const products = computed<I_Products[] | null>(
  () => $store.getters.getProducts,
);

watch(
  filters,
  (newValue: I_ProductFilters) => {
    const emptyFilters = checkEmptyFiltersFunc(newValue);
    const routeFilters = Object.assign(emptyFilters);

    router.push({
      path: `/catalog/${newValue.id}`,
      query: routeFilters,
    });
    $store.dispatch("A_SET_PRODUCTS", newValue);
  },
  { deep: true },
);

const minPriceValidFunc = (value: string): void => {
  minPrice.value = value.replace(/\D+/g, "");
};
const maxPriceValidFunc = (value: string): void => {
  maxPrice.value = value.replace(/\D+/g, "");
};
const typeFilterFunc = (value: string): void => {
  filters.value.type = value;
};
const colorFilterFunc = (value: string): void => {
  let colors: string[] = [...filters.value.color];
  if (colors.includes(value)) {
    colors = colors.filter((item) => item !== value);
  } else {
    colors.push(value);
  }
  filters.value.color = colors;
};
const priceFilterFunc = (): void => {
  filters.value.min = minPrice.value;
  filters.value.max = maxPrice.value;
};
const sizeFilterFunc = (value: string): void => {
  let sizes: string[] = [...filters.value.size];

  if (sizes.includes(value)) {
    sizes = sizes.filter((item) => item !== value);
  } else {
    sizes.push(value);
  }
  filters.value.size = sizes;
};
const openProductPageFunc = (id: number): void => {
  navigateTo(`/catalog/product/${id}`);
};

const addToFavoritesFunc = (id: number): void => {
  if (!cookies.get("token")) {
    modalText.value = localization.value.alertLoginForFavorites
    isShowConfirmModal.value = true;
  } else {
    $store.dispatch("A_ADD_PRODUCT_IN_FAVORITES", id);
    const alert: I_AlertConfigPayload = {
      variant: "success",
      descriptions: [
        {
          title: localization.value.favorites,
          descriptions: [localization.value.productAddedToFavorites]
        }
      ]
    }
    $store.dispatch("A_SET_ALERT_CONFIG", alert)
  }
};
const addProductToBasketFunc = (productId: number): void => {
  if(!cookies.get("token")) {
    modalText.value = localization.value.alertLoginForBasket
    isShowConfirmModal.value = true
  }
  else {
    const productInfo: I_ProductInfoFromBasket = {
      productId,
      count: 1,
    }
    $store.dispatch("A_ADD_PRODUCT_IN_BASKET", productInfo)
  }
}
const sendToLoginPageFunc = (e: boolean): void => {
  if (e) navigateTo("/login");
};


</script>

<style scoped>
@import "assets/css/fonts.css";

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #c8c8c8 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.filters-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content;
  grid-template-areas:
    "categoryFilter colorFilter"
    "checkbox checkbox"
    "minPrice maxPrice";
  grid-column-gap: 15px;
  grid-row-gap: 10px;
}

.product-img {
  transition-delay: 0.4s;
  transition-duration: 0.3s;
}
.product-img:hover {
  cursor: pointer;
  border: 1px solid darkgray;
  border-radius: 5px;
  transform: scale(1.3);
}
</style>
