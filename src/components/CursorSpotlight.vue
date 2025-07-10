<script setup>
const size = 300
const halfSize = size / 2
const spotlightX = ref(Infinity);
const spotlightY = ref(Infinity);

function updateSpotlight(event) {
  spotlightX.value = event.clientX;
  spotlightY.value = event.clientY;
}

useEventListener("pointermove", updateSpotlight);
</script>

<template>
  <div
    class="fixed pointer-events-none z-20 rounded-full"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      left: spotlightX - halfSize + 'px',
      top: spotlightY - halfSize + 'px',
      background:
        'radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0.12) 60%, rgba(37,99,235,0.01) 80%, rgba(37,99,235,0) 100%)',
      filter: 'blur(32px)',
    }"
  />
</template>
