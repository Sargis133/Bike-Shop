<template>
  <div class="w-full h-full" id="slider" @mouseenter="stopSlideFunc" @mouseleave="startSlideFunc">
    <div
      class="w-full h-full flex"
      :class="{
        'flex-col': props.vertical,
        'flex-row-reverse': !props.vertical,
      }"
    >
      <div
        class="border border-gray-400 dark:border-white rounded relative shadow-[0_0_6px_2px_gray] h-full justify-center w-full flex items-center overflow-hidden"
      >
        <ui-ui-button
          size="md"
          custom="flex items-center px-4 py-4 bg-zinc-600 absolute top-auto left-0 opacity-90"
          @click="backImage"
        >
          <ui-ui-icons
            icon-name="arrowLeft"
            icon-classes="w-4 h-4 fill-white"
          />
        </ui-ui-button>
        <img
          :src="props.images[imageId]"
          class="w-full h-full object-cover rounded"
          alt="img"
        />
        <ui-ui-button
          size="md"
          custom="flex items-center px-4 py-4 bg-zinc-600 absolute top-auto right-0 opacity-90"
          @click="nextImage"
        >
          <ui-ui-icons
            icon-name="arrowRight"
            icon-classes="w-4 h-4 fill-white"
          />
        </ui-ui-button>
      </div>
      <div
        class="flex scroll-bar-slider"
        :class="{
          'flex-col max-w-[15%] max-h-[100%] min-w-[18%] gap-y-2 px-1 overflow-hidden hover:overflow-y-scroll overflow-x-hidden': !props.vertical,
          'justify-start gap-x-2 mt-2 max-w-[100%] min-h-[25%] max-h-[10%] overflow-hidden hover:overflow-x-scroll overflow-y-hidden':
            props.vertical,
        }"
      >
        <div
          v-for="img of props.images"
          class="p-[1px] cursor-pointer"
          :class="{'max-h-[20%] max-w-[100%] flex justify-center': !props.vertical, 'min-w-[20%]': props.vertical, 'border border-gray-400 rounded-md': props.images[imageId] === img}"
          @click="changeImage(img)"
        >
          <img :src="img" alt="img" class="w-max max-h-[100%] rounded-md" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[];
  vertical: boolean;
}>();

let imageId = ref<number>(0);
const backImage = () => {
  if (imageId.value - 1 == -1) imageId.value = props.images.length;
  imageId.value -= 1;
};
const nextImage = () => {
  if (imageId.value + 1 == props.images.length) imageId.value = -1;
  imageId.value += 1;
};
const changeImage = (src: string) => {
  imageId.value = props.images.findIndex((item) => item === src);
};

let isShowSlide = ref(true)
setInterval(() => {
  if(isShowSlide.value) {
    nextImage()
  }
}, 2000)
const stopSlideFunc = () => isShowSlide.value = false
const startSlideFunc = () => isShowSlide.value = true

</script>

<style scoped>


.scroll-bar-slider::-webkit-scrollbar {
  width: 3px;
  height: 5px;
}

.scroll-bar-slider::-webkit-scrollbar-thumb {
  background: rgb(128, 128, 128);
  border-radius: 10px;
}
.scroll-bar-slider::-webkit-scrollbar-track {
  background-color: darkgray;
  border-radius: 10px;
}

</style>
