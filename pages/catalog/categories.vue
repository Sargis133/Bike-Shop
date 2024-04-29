<template>
  <div class="px-14 max-md:px-0 max-md:mt-8">
    <div class="font-sans">
      <div class="px-4 py-2 border-b border-zinc-300">
        <h2 class="font-sans font-medium text-xl dark:text-white 2xl:text-4xl font-montserrat">
          {{ localization.categories }}
        </h2>
      </div>
      <div class="mt-6 ml-3 pb-6 grid xl:grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-2 sm:grid-cols-1 2xl:grid-cols-4">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-container w-[300px] border-2 border-zinc-150 shadow-lg rounded-lg p-1 relative"
        >
          <NuxtLink :to="'/catalog/' + category.id">
            <div class="flex justify-center">
              <img
                :src="'img/category/'+category.img"
                alt="category-img"
                class="w-full h-full"
              />
            </div>
            <div class="px-5 py-1">
              <p class="text-xl dark:text-white 2xl:text-3xl">{{ localization[category.name] }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {I_Category} from "~/models/store/catalog/categories/interfaces";
import {I_StringObject} from "~/models/composables/useLocalization/interfaces";

const { $store } = useNuxtApp();
const localization = computed<I_StringObject>(() => useLocalization())


$store.dispatch("A_SET_CATEGORIES")
const categories = computed<I_Category[]>(() => $store.getters.getCategories);


</script>

<style scoped>
@import "assets/css/fonts.css";

.category-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.3s;
  pointer-events: none;
}
.category-container:hover::before {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
