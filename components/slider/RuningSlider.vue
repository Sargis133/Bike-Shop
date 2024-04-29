<template>
  <div class="items-wrap w-[300px]">
    <div class="items marquee">
      <div v-for="img in props.images" class="item">
        <img :src="img" alt="x">
      </div>
    </div>
    <div class="items marquee">
      <div v-for="img in props.images" class="item">
        <img :src="img" alt="x">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  images: string[]
}>()


</script>
<style scoped>
.items-wrap {
  position: relative;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: 20px;
}
.items-wrap:before,
.items-wrap:after {
  content: "";
  height: 100%;
  top: 0;
  width: 10%;
  position: absolute;
  z-index: 1;
  pointer-events: none;
}
.items-wrap:before {
  left: 0;
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
  );
}
.items-wrap:after {
  right: 0;
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
  );
}
.items {
  flex-shrink: 0;
  display: flex;
  gap: 20px;
  justify-content: space-around;
  min-width: 100%;
}
.item {
  padding-right: 5px;
  padding-left: 5px;
  flex: 0 0 auto;
  width: 100px;
  min-width: 150px;
  height: 100px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s ease-in-out;
}
.item:hover {
  transform: scale(1.4);
}
.marquee {
  animation: scroll 20s linear infinite;
}
.items-wrap:hover .marquee {
  animation-play-state: paused;
}
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - 20px));
  }
}
</style>