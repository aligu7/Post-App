<template>
  <div
    class="spinner"
    :style="{
      height: size + 'px',
      width: size + 'px',
      borderTopColor: color == '' ? '#0DE6CB' : color,
    }"
  ></div>
</template>

<script>
export default {
  props: ['size', 'color'],
};
</script>

<style>
.spinner {
  border: 5px solid transparent;
  border-radius: 50%;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinnerContainer {
  text-align: center;
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
