<template>
  <div class="relative">
    <div class="relative">
      <input
        v-model="inputValue"
        :type="type"
        :class="currentClass"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :readonly="readonly"
        @blur="emitBlurFunc"
        @input="emitValueFunc"
      />
      <slot name="icon" />
    </div>
    <template v-if="props.errorText">
      <p class="absolute left-2 text-sm text-red-600 dark:text-red-500 font-medium">
        {{ errorText }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  T_InputSize,
  T_InputType,
  T_InputVariant,
} from "~/components/ui/uiInput/models/types";
import {
  E_InputSize,
  E_InputVariant,
} from "~/components/ui/uiInput/models/enums";

const props = defineProps<{
  modelValue: string;
  variant: T_InputVariant;
  size: T_InputSize;
  errorText?: string;
  type?: T_InputType;
  placeholder?: string;
  maxLength?: string;
  readonly?: boolean;
}>();

const emits = defineEmits<{
  (event: "update:model-value", value: string): void;
  (event: "blur", value: string): void
  (event: 'input-value', value: string): void
}>();

const emitValueFunc = (e): void => {
  emits('input-value', e.target.value)
}

const inputValue = computed<string>({
  get(): string {
    return props.modelValue;
  },
  set(value: string) {
    emits("update:model-value", value);
  },
});
const emitBlurFunc = (): void => {
  emits('blur', inputValue.value)
}

const maxLength = computed<string>(() => props.maxLength || '')
const readonly = computed<boolean>(() => props.readonly || false)
const variant = computed<string>(() => E_InputVariant[props.variant]);
const size = computed<string>(() => E_InputSize[props.size]);
const type = computed<string>(() => props.type || "text");
const placeholder = computed<string>(() => props.placeholder || "");
const classConfig = computed<string>(() => variant.value + " " + size.value);
const currentClass = computed(() => ({
  [classConfig.value]: !props.errorText,
  [E_InputVariant['error']]: props.errorText
}))
const errorText = computed<string>(() => props.errorText || '')
</script>

<style scoped></style>
