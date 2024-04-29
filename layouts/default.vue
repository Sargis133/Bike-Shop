<template>
  <ClientOnly>
    <div
      class="min-h-[100vh] relative grid grid-rows-[50px_1fr_70px] 2xl:grid-rows-[72px_1fr_70px]"
    >
      <!--      HEADER-->
      <div class="">
        <lazy-header />
      </div>
      <!--      PAGE-CONTENT-->
      <div class="max-sm:flex">
        <!--    ACCORDION    -->
          <div class="w-[50px] h-full fixed z-30 max-sm:absolute max-sm:left-0 max-sm:h-max">
            <div class="flex h-full font-sans">
              <div
                class="h-full bg-gray-200 shadow-md dark:shadow-white dark:bg-slate-800"
              >
                <lazy-accordion
                  class="h-full accordion-block overflow-hidden hover:overflow-x-hidden hover:overflow-y-auto dark:border-l-0 dark:border dark:border-white"
                  :options="accordion"
                  :class="[isShowAccordion === 'false' ? 'hide' : '']"
                />
              </div>
              <ui-ui-button
                custom="border px-[10px] py-[9.5px] border-l-0 rounded-r-md h-max bg-white dark:bg-slate-900 hover:shadow-md"
                size="sm"
                @click="onOpenAccordionFunc"
              >
                <ui-ui-icons
                  :icon-name="
                    isShowAccordion === 'true' ? 'arrowLeft' : 'arrowRight'
                  "
                  icon-classes="w-4 h-4 dark:fill-white"
                />
              </ui-ui-button>
            </div>
          </div>
        <!--    PAGE    -->
        <div class="w-full h-full">
          <slot />
        </div>
      </div>
        <div>
          <Footer/>
        </div>
    </div>
  </ClientOnly>

  <div class="fixed top-2 right-2 z-50 flex flex-col-reverse">
    <TransitionGroup name="alert">
      <alert
        v-for="alert in alerts"
        :key="alert.id"
        :data-id="alert.id"
        :get-alert-config="alert"
        @hide="onHideAlertFunc(alert.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { accordionOptions } from "~/components/layouts/accordion/config/accordionOptions";

const { $store } = useNuxtApp();
const useLocal = useLocalStorage();
const localization = computed(() => useLocalization())


const onHideAlertFunc = (id: number) => $store.dispatch("A_HIDE_ALERT", id);
const alerts = computed(() => $store.getters.getAlert);
let lastId = computed(() => alerts.value.at(-1));
watch(lastId, (newValue) => {
  if (newValue) {
    setTimeout(onHideAlertFunc, 4000, newValue["id"]);
  }
});

const accordion = computed(() => accordionOptions(localization.value));
let isShowAccordion = ref(
  useLocal.getItemLocalStorage("isShowAccordion") || "false",
);
const onOpenAccordionFunc = () => {
  isShowAccordion.value = isShowAccordion.value === "true" ? "false" : "true";
  useLocal.setItemLocalStorage("isShowAccordion", isShowAccordion.value);
};
</script>

<style scoped>
.alert-move,
.alert-enter-active {
  transition: all 0.4s ease;
}
.alert-leave-active {
  transition: all 0.4s ease;
}

.alert-enter-from,
.alert-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
.alert-leave-active {
  height: 0;
}

.accordion-block {
  width: 200px;
  transition: width 0.6s ease;
}
.accordion-block::-webkit-scrollbar {
  background-color: #ddd;
  border-radius: 8px;
  width: 5px;
}
.accordion-block {
  scrollbar-color: rgb(128, 128, 128) #ddd;
  scrollbar-width: thin;
}
.accordion-block::-webkit-scrollbar-thumb {
  background-color: rgb(128, 128, 128);
  border-radius: 8px;
}
.hide {
  width: 0;
  border: none;
}
</style>
