<template>
  <!--  BLACK LIST-->


  <div class="relative h-full px-14">
    <template v-if="!contentIsLoaded">
      <div
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-100 flex justify-center items-center"
      >
        <span class="loader"></span>
      </div>
    </template>
    <template v-else>
      <h2 class="mt-4 px-14">DASHBOARD</h2>
      <slider-runing-slider :images="sliderImages" />
    </template>

    <div v-for="num in arr">
      <p class="h-[200px]">{{ num }}</p>
    </div>
  </div>



</template>

<script setup lang="ts">

definePageMeta({
  middleware: "auth",
});

let scrollPos = ref(0)
const arr = ref(['1','2','3','4'])

onMounted(() =>
    window.addEventListener("scroll", function () {
      scrollPos.value = window.scrollY
    }),
);
watch(scrollPos, (newValue) => {
  if((newValue + window.innerHeight) >= document.body.offsetHeight) {
    contentIsLoaded.value = false
    setTimeout(() => {
      contentIsLoaded.value = true;
      arr.value.push('5','6','7')
    }, 2000);
  }

})

let contentIsLoaded = ref(true);

const sliderImages = ref<string[]>([
  "/img/products/slide-product1.jpeg",
  "/img/products/slide-product2.jpeg",
  "/img/products/slide-product3.jpg",
  "/img/products/slide-product4.jpg",
  "/img/products/slide-product5.jpg",
  "/img/products/slide-product6.jpg",
]);



function onChangedPage(v) {
  console.log(v)
}
</script>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;
}
.loader::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 5px solid #fff;
  animation: loader 2s linear infinite;
  animation-direction: alternate;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}
</style>
