<template>
  <AnimationBackground
    v-if="['Auth', 'CreatePost', 'EditPost', 'UserProfile', 'EditProfile'].includes($route.name)"
    amount="10"
    bgColor="white"
  />
  <div class="page-wrapper">
    <Navbar />
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

import AnimationBackground from '@/components/AnimationBackground.vue'

export default {
  components: {
    Navbar,
    Footer,
    AnimationBackground
  }
}
</script>
