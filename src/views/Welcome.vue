<template>
  <header>
    <AnimationBackground amount="10" bgColor="#b9fff6" />
    <div class="col"></div>
    <div class="intro-container">
      <h1>Welcome to Post App</h1>
      <p>Share information with everyone</p>
      <button class="btn" @click="handleClick">Get Started</button>
    </div>
    <div class="img-container">
      <img src="@/assets/images/sendmessage.svg" />
    </div>
    <div class="col"></div>
  </header>
  <section class="about">
    <h1 class="section-title">About</h1>
    <div class="about-container">
      <div class="col"></div>
      <div class="col"></div>
      <img src="@/assets/images/about.svg" />
      <p>
        This is a posting app where you can send posts. You can also follow
        people, customize your profile etc. And there will be a huge update soon
        where you can add friends, comment and like others posts, and lots of
        stuff 😉!!
      </p>
      <div class="col"></div>
      <div class="col"></div>
    </div>
  </section>
</template>

<script>
import getUser from '@/composables/getUser';
import AnimationBackground from '@/components/AnimationBackground.vue';
import { useRouter } from 'vue-router';
export default {
  components: { AnimationBackground },
  setup() {
    const { user } = getUser();
    const router = useRouter();

    const handleClick = () => {
      if (user.value) {
        router.push({ name: 'Home' });
      } else {
        router.push({ name: 'Auth' });
      }
    };

    return { handleClick };
  },
};
</script>
