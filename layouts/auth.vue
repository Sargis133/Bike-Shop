<template>
  <ClientOnly>
    <div
        class="min-h-[100vh] relative grid grid-rows-[50px_1fr] 2xl:grid-rows-[72px_1fr]"
    >
      <!--      HEADER-->
      <div class="">
        <lazy-header />
      </div>
      <!--      PAGE-CONTENT-->
      <div class="">
        <!--    PAGE    -->
        <div class="">
          <slot />
        </div>
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

const isLogged = computed(() => $store.getters.getLoggedUserToken);

const onHideAlertFunc = (id): void => $store.dispatch("A_HIDE_ALERT", id);
const alerts = computed(() => $store.getters.getAlert);
let lastId = computed(() => alerts.value.at(-1));
watch(lastId, (newValue) => {
  if (newValue) {
    setTimeout(onHideAlertFunc, 4000, newValue["id"]);
  }
});

const accordion = computed(() => accordionOptions);
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
.accordion-block::-webkit-scrollbar-thumb {
  background-color: rgb(128, 128, 128);
  border-radius: 8px;
}
.hide {
  width: 0;
  border: none;
}
</style>
