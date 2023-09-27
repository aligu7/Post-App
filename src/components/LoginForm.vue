<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <h1>Login</h1>
    <div class="inputContainer">
      <label>Email</label>
      <input v-model="email" type="email" placeholder="Enter email" required />
    </div>
    <div class="inputContainer">
      <label>Password</label>
      <input
        v-model="password"
        type="password"
        placeholder="Enter password"
        required
      />
    </div>

    <button class="btn" v-if="!isPending">
      Login
    </button>
    <Spinner v-else size="50" color="#0DE6CB" />

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </form>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import useLogin from '@/composables/useLogin';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  components: { Spinner },
  setup() {
    const { error, login, isPending } = useLogin();
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        console.log('successully logged in!');
        router.push({ name: 'Home' });
      }
    };

    return { handleSubmit, email, password, error, isPending };
  },
};
</script>
