<template>
  <button :class="currentClasses">
    <slot />
  </button>
</template>

<script setup lang="ts">
import {
  T_ButtonClass,
  T_ButtonSize,
} from "~/components/ui/uiButton/models/types";
import {
  E_ButtonSize,
  E_ButtonVariant,
} from "~/components/ui/uiButton/models/enums";

const props = defineProps<{
  size: T_ButtonSize;
  variant?: T_ButtonClass;
  custom?: string;
}>();

const size = computed<string>(() => E_ButtonSize[props.size]);
const variant = computed<string>(() => E_ButtonVariant[props.variant]);

const currentClasses = computed<string>(
  () => props.custom || variant.value + " " + size.value,
);
</script>

<style scoped></style>
