<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <h1>Sign up</h1>
    <div class="inputContainer">
      <label>Display name</label>
      <input v-model="displayName" placeholder="Enter display name" required />
    </div>
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
      Signup
    </button>
    <Spinner v-else size="50" color="#0DE6CB" />

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </form>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import useSignup from '@/composables/useSignup';
import useCollection from '@/composables/useCollection';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import getUser from '@/composables/getUser';
import { timestamp } from '../firebase/config';
export default {
  components: { Spinner },
  setup() {
    const { error, signup, isPending } = useSignup();
    const { addDoc } = useCollection('users');
    const { user } = getUser();
    const email = ref('');
    const password = ref('');
    const displayName = ref('');
    const router = useRouter();

    const handleSubmit = async () => {
      let location = null;
      let creds;
      // TODO: When user signes up the location will be added by defalult with "http://ip-api.com/json" api
      await signup(email.value, password.value, displayName.value).then(
        (cred) => {
          creds = cred;
        }
      );

      await addDoc(
        {
          displayName: creds.user.displayName,
          email: creds.user.email,
          photoURL: creds.user.photoURL,
          bio: 'Hi there! I am using Post App.',
          location,
          joinDate: timestamp(),
          likedPosts: [],
        },
        creds.user.uid
      );

      if (!error.value) {
        router.push({ name: 'UserProfile', params: { id: user.value.uid } });
      }
    };

    return {
      handleSubmit,
      email,
      password,
      displayName,
      error,
      isPending,
    };
  },
};
</script>
