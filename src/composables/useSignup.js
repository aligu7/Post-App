import { ref } from 'vue';
import { projectAuth } from '../firebase/config';
import lengthLimits from './getLengthLimits.js';

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
  error.value = null;
  isPending.value = true;

  try {
    if (displayName.length > lengthLimits.user.displayName) {
      throw Error(
        `Display name should have less than ${lengthLimits.user.displayName} characters`
      );
    }

    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (!res) {
      throw Error('Could not complete sign up');
    }

    await res.user.updateProfile({ displayName });
    error.value = null;
    isPending.value = false;
    return res;
  } catch (err) {
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
