<template>
  {{ window }}
  <div v-if="isActive" class="scrollTopButton" @click="scrollTop">
    <img class="upArrow" src="../assets/images/up-arrow.png" alt="" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
  setup() {
    const isActive = ref(false);

    onMounted(() => {
      addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 20) {
          isActive.value = true;
        } else {
          isActive.value = false;
        }
      });
    });

    const scrollTop = () => {
      document.documentElement.scrollTop = 0;
    };

    return { isActive, scrollTop };
  },
};
</script>

<style scoped>
.scrollTopButton {
  z-index: 99;
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 45px;
  height: 45px;
}
</style>
