<template>
  <div>
    <div class="flex justify-center py-2 gap-x-2">
      <ui-ui-button
          variant="light"
          size="md"
          v-bind:disabled="selected == 1"
          :class="{
                  'bg-zinc-300 dark:bg-zinc-400 disabled:hover:bg-zinc-300 dark:disabled:hover:bg-zinc-400':
                    selected == 1,
                }"
          @click="onChangePageFunc('prev')"
      >
        <ui-ui-icons
            icon-name="arrowLeft"
            icon-classes="dark:fill-white"
        />
      </ui-ui-button>
      <div class="flex gap-x-1">
        <div class="min-w-[30px]" v-for="page in pagesBtn">
          <ui-ui-button
              variant="light"
              size="sm"
              class="w-[30px]"
              :class="{
                      'bg-zinc-300 dark:bg-zinc-400 disabled:hover:bg-zinc-300 dark:disabled:hover:bg-zinc-400':
                        page == selected,
                    }"
              v-bind:disabled="page == 0 || selected == page"
              @click="onChangePageFunc(page)"
          >
            {{ page == 0 ? "..." : page }}
          </ui-ui-button>
        </div>
      </div>
      <ui-ui-button
          variant="light"
          size="md"
          v-bind:disabled="selected == count"
          @click="onChangePageFunc('next')"
      >
        <ui-ui-icons
            icon-name="arrowRight"
            icon-classes="dark:fill-white"
        />
      </ui-ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedPage: number,
  pageCount: number,
}>()
const emits = defineEmits<{
  (event: 'change-page', value: string | number): void
}>()

let selected = computed<number>(() => props.selectedPage);
let count = computed<number>(() => props.pageCount);
let pagesBtn = ref<number[]>([])

watch(
    [count, selected],
    ([pageCount, ]) => {
      if (pageCount < 7) {
       for(let i = 1; i <= pageCount; i++) pagesBtn.value.push(i)
      }
      else {
        if (selected.value >= pageCount - 2)
          pagesBtn.value = [
            1,
            0,
            pageCount - 3,
            pageCount -2,
            pageCount -1,
            pageCount
          ];
        else if (selected.value > 3 && selected.value < pageCount - 2)
          pagesBtn.value = [
            1,
            0,
            selected.value - 1,
            selected.value,
            selected.value + 1,
            0,
            pageCount,
          ];
        else if (selected.value <= 3)
          pagesBtn.value = [1, 2, 3, 4, 0, pageCount];
      }
    },
    { immediate: true },
);

function onChangePageFunc(page: string | number) {
  emits('change-page', page)
}


</script>

<style scoped>

</style>