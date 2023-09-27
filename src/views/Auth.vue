<template>
  <section class="form-section">
    <div class="form-wrapper">
      <div v-if="showLogin">
        <LoginForm />
      </div>
      <div v-else>
        <SignupForm />
      </div>

      <div class="auth-nav">
        <a :class="{ active: showLogin == true }" @click="showLogin = true"
          >Login</a
        >
        <span>|</span>
        <a :class="{ active: showLogin == false }" @click="showLogin = false"
          >Signup</a
        >
      </div>
    </div>
  </section>
</template>

<script>
import SignupForm from '@/components/SignupForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import { ref } from 'vue';
export default {
  components: {
    SignupForm,
    LoginForm,
  },
  setup() {
    const showLogin = ref(true);

    return { showLogin };
  },
};
</script>

<style></style>
