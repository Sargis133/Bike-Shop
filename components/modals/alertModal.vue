<template>
  <div
      class="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-60"
      :class="{ hidden: !showModal }"
  >
    <div class="w-[400px] border-2 border-zinc-500 rounded bg-white">
      <div class="flex items-center justify-between px-2 py-1">
        <div class="text-lg font-semibold text-gray-800">
          <slot name="header-content" ><h3>{{ props.title }}</h3></slot>
        </div>
        <div>
          <ui-ui-button
              custom="hover:bg-zinc-300 px-1 py-1"
              size="sm"
              @click.stop="closeModalFunc"
          >
            <ui-ui-icons
                icon-name="close"
                icon-classes="w-3 h-3 text-gray-600"
            />
          </ui-ui-button>
        </div>
      </div>
      <div class="h-max bg-white border-t border-gray-400">
        <div class="px-2 py-3">
          <slot name="body" />
        </div>
        <div class="border-t border-gray-400">
          <slot name="footer">
            <div
                class="flex justify-end gap-x-2 py-1 px-1"
            >
              <slot name="footer-content">
                <ui-ui-button variant="primary" size="sm" @click.stop="closeModalFunc">
                  {{ localization.accept }}
                </ui-ui-button>
              </slot>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const localization = computed(() => useLocalization())

  const props = defineProps<{
    isShow: boolean;
    title?: string;
  }>();

  const emits = defineEmits<{
    (event: "update:is-show", value: boolean): void;
    (event: "answer", value: boolean): void;
  }>();

  let showModal = computed<boolean>(() => props.isShow);

  const closeModalFunc = (): void => {
    emits("answer", false);
    emits("update:is-show", false);
  };

</script>

<style scoped>

</style>