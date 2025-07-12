<script setup>
const size = 300
const halfSize = size / 2
const spotlightX = ref(Infinity);
const spotlightY = ref(Infinity);

function onPointermove(event) {
  spotlightX.value = event.clientX;
  spotlightY.value = event.clientY;
}

useEventListener("scroll", () => {
  spotlightX.value = Infinity;
  spotlightY.value = Infinity;
});

useEventListener("pointermove", onPointermove);
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="spotlightX !== Infinity && spotlightY !== Infinity"
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
  </Transition>
</template>
