<template>
  <div class="main-page w-full h-full">
    <div class="px-14 bg-black bg-opacity-50 pb-20  max-sm:px-8 max-sm:text-center ">
      <div class="py-10 flex justify-center">
        <h1 class="text-3xl font-serif text-gray-300 2xl:text-5xl max-sm:text-lg max-md:text-center">
          {{ localization.mainPageTitle }}
        </h1>
      </div>
      <div
        class="mt-14 flex gap-x-4 max-sm:mt-4 max-lg:flex-col "
      >
        <div class="hover-show-link w-[50%] relative max-lg:w-full cursor-pointer">
          <NuxtLink to="/catalog/0?type=0">
            <img src="/img/main/main-page-bike-1.jpg" alt="main-img" class="w-full rounded-md" />
          </NuxtLink>
          <div
            class="go-to-page absolute bg-black bg-opacity-80 flex items-center justify-center overflow-hidden rounded-md"
          >
            <NuxtLink
              to="/catalog/0?type=0"
              class="border-b border-b-white text-white text-xl min-w-max hover:opacity-50"
              >{{localization.watch + ' ' + localization.mountainBikes}}></NuxtLink
            >
          </div>
        </div>
        <div class="w-[50%] max-lg:w-full max-lg:mt-2">
          <div class="bg-black bg-opacity-70 p-2 rounded-md h-full">
            <h2 class="font-sans text-xl text-gray-300 pb-4 2xl:text-4xl 2xl:text-center max-md:text-center">
              "{{ localization.mountainBikeTitle }}"
            </h2>
            <p class="text-zinc-300 px-2 max-sm:text-sm 2xl:text-2xl">
              {{ localization.mountainBikeDescription }}
            </p>
          </div>
        </div>
      </div>
      <div
          class="mt-14 flex gap-x-4 max-sm:mt-4 max-lg:flex-col flex-row-reverse"
      >
        <div class="hover-show-link w-[50%] relative max-lg:w-full cursor-pointer">
          <NuxtLink to="/catalog/0?type=0">
            <img src="/img/main/main-page-bike-2.jpg" alt="main-img" class="w-full rounded-md" />
          </NuxtLink>
          <div
              class="go-to-page absolute bg-black bg-opacity-80 flex items-center justify-center overflow-hidden rounded-md"
          >
            <NuxtLink
                to="/catalog/0?type=2"
                class="border-b border-b-white text-white text-xl min-w-max hover:opacity-50"
            >{{localization.watch + ' ' + localization.electricBikes}}></NuxtLink
            >
          </div>
        </div>
        <div class="w-[50%] max-lg:w-full max-lg:mt-2">
          <div class="bg-black bg-opacity-70 p-2 rounded-md h-full">
            <h2 class="font-sans text-xl text-gray-300 pb-4 2xl:text-4xl 2xl:text-center max-md:text-center">
              "{{ localization.electricBikeTitle }}"
            </h2>
            <p class="text-zinc-300 px-2 max-sm:text-sm 2xl:text-2xl">
              {{ localization.electricBikeDescription }}
            </p>
          </div>
        </div>
      </div>
      <div
          class="mt-14 flex gap-x-4 max-sm:mt-4 max-lg:flex-col "
      >
        <div class="hover-show-link w-[50%] relative max-lg:w-full cursor-pointer">
          <NuxtLink to="/catalog/0?type=0">
            <img src="/img/main/main-page-bike-3.jpg" alt="main-img" class="w-full rounded-md" />
          </NuxtLink>
          <div
              class="go-to-page absolute bg-black bg-opacity-80 flex items-center justify-center overflow-hidden rounded-md"
          >
            <NuxtLink
                to="/catalog/0?type=3"
                class="border-b border-b-white text-white text-xl min-w-max hover:opacity-50"
            >{{localization.watch + ' ' + localization.urbanBikes}}></NuxtLink
            >
          </div>
        </div>
        <div class="w-[50%] max-lg:w-full max-lg:mt-2">
          <div class="bg-black bg-opacity-70 p-2 rounded-md h-full">
            <h2 class="font-sans text-xl text-gray-300 pb-4 2xl:text-4xl 2xl:text-center max-md:text-center">
              "{{ localization.urbanBikeTitle }}"
            </h2>
            <p class="text-zinc-300 px-2 max-sm:text-sm 2xl:text-2xl">
              {{ localization.urbanBikeDescription }}
            </p>
          </div>
        </div>
      </div>
      <div
          class="mt-14 flex gap-x-4 max-sm:mt-4 max-lg:flex-col flex-row-reverse"
      >
        <div class="hover-show-link w-[50%] relative max-lg:w-full cursor-pointer">
          <NuxtLink to="/catalog/0?type=0">
            <img src="/img/main/main-page-bike-4.jpg" alt="main-img" class="w-full rounded-md" />
          </NuxtLink>
          <div
              class="go-to-page absolute bg-black bg-opacity-80 flex items-center justify-center overflow-hidden rounded-md"
          >
            <NuxtLink
                to="/catalog/0?type=1"
                class="border-b border-b-white text-white text-xl min-w-max hover:opacity-50"
            >{{localization.watch + ' ' + localization.cruiserBikes}}></NuxtLink
            >
          </div>
        </div>
        <div class="w-[50%] max-lg:w-full max-lg:mt-2">
          <div class="bg-black bg-opacity-70 p-2 rounded-md h-full">
            <h2 class="font-sans text-xl text-gray-300 pb-4 2xl:text-4xl 2xl:text-center max-md:text-center">
              "{{ localization.cruiserBikeTitle }}"
            </h2>
            <p class="text-zinc-300 px-2 max-sm:text-sm 2xl:text-2xl">
              {{ localization.cruiserBikeDescription }}
            </p>
          </div>
        </div>
      </div>
<!--      Services-->
      <div
        class="grid grid-cols-3 gap-x-14 px-16 mt-10 [&>div]:border-2 [&>div]:border-zinc-400 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:px-0 max-md:gap-y-2 max-lg:gap-x-2"
      >
        <div
          class="flex flex-col bg-zinc-300 bg-opacity-30 px-6 pb-6 rounded-2xl shadow-white shadow max-xl:px-1"
        >
          <div class="text-center max-sm:flex max-sm:justify-center max-sm:items-center">
            <div class="flex justify-center p-2">
              <ui-ui-icons
                icon-name="fast-truck"
                icon-classes="w-16 h-16 fill-zinc-900 max-md:w-8 max-md:h-8"
              />
            </div>
            <h3 class="text-2xl font-medium text-zinc-900 2xl:text-5xl max-md:text-lg">
              {{localization.shipping}}
            </h3>
          </div>
          <div class="text-center mt-4 px-4 max-md:px-0">
            <p class="text-sm 2xl:text-3xl text-zinc-900 font-medium">
              "{{localization.mainPageShippingText}}"
            </p>
          </div>
        </div>
        <div
          class="flex flex-col bg-zinc-300 bg-opacity-30 px-6 pb-6 rounded-2xl shadow-white shadow max-sm:mt-2 max-xl:px-1"
        >
          <div class="text-center max-sm:flex max-sm:justify-center max-sm:items-center">
            <div class="flex justify-center p-2">
              <ui-ui-icons
                icon-name="credit-card"
                icon-classes="w-16 h-16 fill-zinc-900 max-md:w-8 max-md:h-8"
              />
            </div>
            <h3 class="text-2xl font-medium text-zinc-900 2xl:text-5xl max-md:text-lg">
              {{ localization.payment}}
            </h3>
          </div>
          <div class="text-center mt-4 px-4 max-md:px-0">
            <p class="text-sm 2xl:text-3xl text-zinc-900 font-medium">
              "{{localization.mainPagePaymentText}}"
            </p>
          </div>
        </div>
        <div
          class="flex flex-col bg-zinc-300 bg-opacity-30 px-6 pb-6 rounded-2xl shadow-white shadow max-sm:mt-2 max-xl:px-1"
        >
          <div class="text-center max-sm:flex max-sm:justify-center max-sm:items-center">
            <div class="flex justify-center p-2">
              <ui-ui-icons
                icon-name="arrow-rotate"
                icon-classes="w-16 h-16 fill-zinc-900 max-md:w-8 max-md:h-8"
              />
            </div>
            <h3 class="text-2xl font-medium text-zinc-900 2xl:text-5xl max-md:text-lg">
              {{localization.returnRefunds}}
            </h3>
          </div>
          <div class="text-center mt-4 px-4 max-md:px-0">
            <p class="text-sm text-zinc-900 font-medium 2xl:text-3xl max-md:text-sm">
              "{{localization.mainPageReturnRefundsText}}"
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-10">
        <h3 class="text-xl text-zinc-300 text-center px-8 2xl:text-4xl max-sm:text-[15px]">
          " {{localization.mainPageFooterText}} "
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const localization = computed(() => useLocalization())


</script>

<style scoped>
.main-page {
  background-image: url("/img/main/main-page-background-image.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.go-to-page {
  visibility: hidden;
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  transition-property: all;
  transition-duration: 900ms;
}
.hover-show-link:hover .go-to-page {
  visibility: visible;
  width: 100%;
}
</style>
