<template>
  <div class="">
    <div class="relative">
      <img
        src="/img/about/about-1.jpg"
        alt="about-1-img"
        class="w-full max-h-[450px]"
      />
      <div class="absolute top-20 right-10 text-4xl max-w-[40%] 2xl:text-5xl max-lg:text-2xl max-md:text-gray-300 max-md:top-10 max-sm:top-2 max-sm:left-10 max-sm:max-w-full max-sm:text-gray-100">
        <p>"{{localization.sellingBicycles}}"</p>
        <p class="mt-2 ml-6 leading-[46px] max-sm:leading-none ">
          - {{localization.yourFirstStepToAHealthyLifestyle}}
        </p>
      </div>
    </div>
    <div class="bg-black bg-opacity-50 p-8 flex justify-center">
      <h2 class="text-3xl dark:text-gray-400 2xl:text-4xl max-lg:text-xl">{{localization.welcomeToTheAboutUsPage}}!</h2>
    </div>
    <div class="bg-black bg-opacity-50 grid grid-cols-3 gap-x-8 px-8 text-lg 2xl:text-2xl max-lg:text-sm max-md:flex max-md:flex-col max-md:gap-y-4">
      <div>
        <p class="dark:text-gray-400 font-serif">
          {{localization.aboutUsPageFirstText}}.
        </p>
      </div>
      <div>
        <p class="dark:text-gray-400 font-serif">
          {{localization.aboutUsPageSecondText}}.
        </p>
      </div>
      <div>
        <p class="dark:text-gray-400 font-serif">
          {{localization.aboutUsPageThirdText}}.
        </p>
      </div>
    </div>
    <div class="bg-black bg-opacity-50 flex justify-center py-10 max-md:px-4 max-md:text-center">
      <h3 class="text-xl dark:text-gray-400 max-lg:text-[16px]">
        "{{localization.aboutUsPageFooterText}}."
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">

const localization = computed(() => useLocalization())

</script>

<style scoped></style>
