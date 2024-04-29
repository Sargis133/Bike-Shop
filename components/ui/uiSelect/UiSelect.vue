<template>
  <div :id="id" class="relative inline-block">
    <ui-ui-button
      id="dropdownDelayButton"
      data-dropdown-toggle="dropdownDelay"
      data-dropdown-delay="500"
      data-dropdown-trigger="hover"
      :size="btnSize"
      class="flex items-center"
      :variant="btnVariant"
      @click="onToggleDropdownMenuFunc($event, id)"
    >
      <slot />
      <ui-ui-icons
        icon-name="arrowBottom"
        icon-classes="w-3 h-3 ml-2.5 2xl:w-6 2xl:h-6 fill-current dark:fill-white"
      />
    </ui-ui-button>

    <!-- Dropdown menu -->
    <Transition name="select">
      <div
        v-if="isShowDropDown"
        ref="elementToClose"
        :id="'dropdownDelay' + id"
        class="absolute w-max z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
        :class="dropdownPosition"
      >
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDelayButton"
        >
          <li
            v-for="option in options"
            :key="option.value"
            @click="emitOptionValueFunc(option.value)"
            class="[&>*]:cursor-pointer"
          >
              <template v-if="!props.multi">
                <p
                  class="flex items-center justify-start cursor-default px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white 2xl:text-2xl 2xl:py-4"
                >
                  {{ option.name }}
                  <template v-if="option.icon">
                    <ui-ui-icons
                      :icon-name="option.icon"
                      :icon-classes="
                        !option.iconClass ? 'w-5 h-5 ml-1.5' : option.iconClass
                      "
                    />
                  </template>
                </p>
              </template>
              <template v-else-if="props.multi">
                <div class="flex items-center justify-between p-1.5 text-[14px]">
                  <ui-ui-checkbox
                    :id="option.value"
                    variant="primary"
                    :isChecked="option.isChecked"
                  />
                  <p class="ml-2">{{ option.name }}</p>
                  <template v-if="option.icon">
                    <ui-ui-icons
                      :icon-name="option.icon"
                      :icon-classes="
                        !option.iconClass ? 'w-5 h-5 ml-1.5' : option.iconClass
                      "
                    />
                  </template>
                </div>
              </template>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { I_Option } from "~/components/ui/uiSelect/models/interfaces";
import {
  T_ButtonClass,
  T_ButtonSize,
} from "~/components/ui/uiButton/models/types";

let dropdownPosition = ref("left-0");

let isShowDropDown = ref<boolean>(false);

const props = defineProps<{
  optionGroup: I_Option[];
  dataId: string;
  variant?: T_ButtonClass;
  size?: T_ButtonSize;
  multi?: string;
}>();

const emits = defineEmits<{
  (e: "option-value", value: string): void;
}>();

const emitOptionValueFunc = (optionValue: string): void => {
  emits("option-value", optionValue);
  props.multi ? (isShowDropDown.value = true) : (isShowDropDown.value = false);
};

const options = computed<I_Option[]>(() => props.optionGroup);
const id = computed<string>(() => "uiSelect" + props.dataId);
const btnSize = computed<T_ButtonSize>(() => props.size || "md");
const btnVariant = computed<T_ButtonClass>(() => props.variant || "primary");

const onToggleDropdownMenuFunc = (e: any, id: string): void => {
  window.addEventListener("click", function (event: any) {
    if (!event.target.closest("#" + id)) {
      isShowDropDown.value = false;
    }
  });

  isShowDropDown.value = !isShowDropDown.value;
  // show left or right
  if (isShowDropDown.value === true) {
    let cords = innerWidth - e.target.getBoundingClientRect().right;
    dropdownPosition.value = cords < 300 ? "right-0" : "left-0";
  }
};
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: opacity 0.5s ease;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
}
</style>
