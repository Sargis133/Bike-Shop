<template>
  <div class="flex items-baseline">
    <input :id="id" type="checkbox" :class="checkboxVariant" style="cursor: inherit" :checked="checked" @click="checkboxCheckedFunc"/>
    <template v-if="label">
      <label :for="id" class="ml-1" >{{ label }}</label>
    </template>
  </div>
</template>

<script setup lang="ts">
import { E_CheckboxVariant } from "~/components/ui/uiCheckbox/models/enums";
import { T_CheckboxVariant } from "~/components/ui/uiCheckbox/models/types";

const props = defineProps<{
  id: string;
  variant: T_CheckboxVariant;
  label?: string;
  isChecked?: boolean;
}>();
const emits = defineEmits<{
  (event: "checked", value: boolean): void;
}>()

const id = ref<string>(props.id || "");
const checkboxVariant = ref(
  E_CheckboxVariant[props.variant as keyof typeof E_CheckboxVariant],
);
const label = ref(props.label || "");
const checked = computed(() => props.isChecked)


const checkboxCheckedFunc = () => {
  let elem = document.getElementById(id.value)
  if(elem) emits("checked", elem.checked)
}



</script>

<style scoped></style>
