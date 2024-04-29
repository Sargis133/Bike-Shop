<template>
  <div class="bg-gray-200 dark:bg-slate-900 dark:shadow-white dark:shadow-[0px_2px_5px_5px] h-full flex justify-center p-2 items-center">
    <div class="grid grid-cols-2 gap-x-20 dark:text-white max-sm:grid-cols-1 max-sm:gap-y-2 max-sm:mt-2">
      <div class="flex flex-row text-md font-semibold w-max gap-x-4">
        <NuxtLink to="/about" class="hover:text-gray-600">About Us</NuxtLink>
        <NuxtLink to="/contacts" class="hover:text-gray-600">Contacts</NuxtLink>
      </div>
      <div class="flex items-center gap-x-2 max-sm:justify-center max-sm:gap-x-4 max-sm:pb-2" >
        <NuxtLink to="https://www.facebook.com/?locale=ru_RU" target="_blank" class="hover:opacity-60"
          ><ui-ui-icons icon-name="facebook" icon-classes="w-6 h-6"
        /></NuxtLink>
        <NuxtLink to="https://www.instagram.com/" target="_blank" class="hover:opacity-60"
          ><ui-ui-icons icon-name="instagram" icon-classes="w-5 h-5 dark:fill-white"
        /></NuxtLink>
        <NuxtLink to="https://twitter.com/?lang=ru" target="_blank" class="hover:opacity-60"
          ><ui-ui-icons icon-name="twitter" icon-classes="w-7 h-7"
        /></NuxtLink>
        <NuxtLink to="https://www.youtube.com/" target="_blank" class="hover:opacity-60"
          ><ui-ui-icons icon-name="youtube" icon-classes="w-7 h-7"
        /></NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
