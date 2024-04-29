<template>
    <template v-if="alertConfig['variant']">
      <div class="">
        <div class="w-max p-4 mb-4 text-sm rounded-lg" :class="alertVariant">
          <div class="flex" role="alert">
            <div class="mt-0.5 mr-2">
              <ui-ui-icons
                :icon-name="alertConfig['variant']"
                :icon-classes="'w-4 h-4 ' + alertIcon"
              />
            </div>
            <div class="flex flex-col [&>div:not(:first-child)]:mt-2">
              <div v-for="option in alertMessages">
                <span class="font-medium">{{ option['title'] }}</span>
                <ul class="mt-1.5 ml-4 list-disc list-inside">
                  <li v-for="text in option['descriptions']">{{ text }}</li>
                </ul>
              </div>
            </div>
            <div class="">
              <ui-ui-button
                :custom="alertButton"
                type="button"
                aria-label="Close"
                size="md"
                @click="onCloseAlertFunc"
              >
                <span class="sr-only">Close</span>
                <ui-ui-icons icon-name="close" icon-classes="w-3 h-3" />
              </ui-ui-button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <span></span>
    </template>
</template>

<script setup lang="ts">
import {E_AlertButton, E_AlertIcon, E_AlertVariant} from "~/components/alert/models/enums";
import {I_AlertConfigPayload} from "~/models/store/main/interfaces";
import {I_AlertMessage} from "~/components/alert/models/interfaces";

const props = defineProps<{
  getAlertConfig: I_AlertConfigPayload
}>()
const emits = defineEmits<{
  (event: "hide"): void;
}>();


const alertConfig = computed(() => props.getAlertConfig)

const alertVariant = computed<string>(() => E_AlertVariant[alertConfig.value['variant']])
const alertIcon = computed<string>(() => E_AlertIcon[alertConfig.value['variant']])
const alertButton = computed<string>(() => E_AlertButton[alertConfig.value['variant']])
const alertMessages = computed<I_AlertMessage[]>(() => alertConfig.value['descriptions'])
const onCloseAlertFunc = (): void => emits("hide");


</script>

<style scoped>

</style>
