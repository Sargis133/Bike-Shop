<template>
  <div class="[&>div:first-child]:border-t-0 overflow-hidden">
    <div v-for="(option, index) in allOptions" class="dark:bg-slate-900 border-t border-zinc-400">
      <div
        class="px-2 py-1.5 flex items-center cursor-pointer dark:text-white dark:hover:text-gray-500 hover:text-gray-500 [&>svg]:hover:fill-zinc-400"
        @click="onShowListFunc(index)"
      >
        <template v-if="option.children ? option.children.length > 0 : false">
          <ui-ui-icons
            :icon-name="option.isShow ? 'arrowTop' : 'arrowBottom'"
            icon-classes="w-4 h-4 dark:fill-white fill-zinc-700"
          />
        </template>
        <h3
            class="whitespace-nowrap"
          :class="[!option.children ? 'ml-5' : 'pl-1']"
        >
          <template v-if="option.href">
            <NuxtLink :to="option.href">{{ option.title }}</NuxtLink>
          </template>
          <template v-else>
            {{ option.title }}
          </template>
        </h3>
      </div>

      <template v-if="option.children ? option.children.length > 0 : false">
        <div class="">
          <ul class="hidden" :id="''+index">
            <li
              v-for="child in option.children"
              class="text-sm pl-8 py-1 dark:text-gray-200 dark:hover:text-gray-500 hover:text-gray-500 "
            >
              <template v-if="child.href">
                <NuxtLink :to="child.href">{{ child.text }}</NuxtLink>
              </template>
              <template v-else>
                <p class="cursor-default">{{ child.text }}</p>
              </template>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { I_AccordionOptions } from "~/components/accordion/models/interfaces";


const props = defineProps<{
  options: I_AccordionOptions[];
}>();

const allOptions = computed<I_AccordionOptions[]>(() => props.options)
const onShowListFunc = (id: number) => {
  let elemId = document.getElementById(`${'' + id}`)
  if(elemId) elemId.classList.toggle("hidden")
};


</script>

<style scoped></style>
