<template>
  <form @submit.prevent="handleSubmit" class="searchInputContainer">
    <input
      @input="
        (e) => {
          search = e.target.value;
        }
      "
      class="searchInput"
      type="text"
      placeholder="Search..." />
    <img
      @click="handleSubmit"
      class="searchLogo"
      src="../assets/images/search.png"
      alt="" />
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onlyContainsSpaces } from '@/composables/utilityFunctions';
export default {
  setup() {
    const router = useRouter();
    const search = ref('');

    const handleSubmit = () => {
      if (onlyContainsSpaces(search.value)) {
        router.push({ name: 'Home' });
      } else {
        router.push({
          name: 'MatchingPosts',
          params: { search: search.value },
        });
      }
    };

    return { handleSubmit, search };
  },
};
</script>

<style scoped>
.searchInput {
  border-radius: 12px;
  font-size: 18px;
  padding: 10px 25px;
  border: 0;
  box-shadow: 0 2px 5px #61c8bb;
  color: gray;
  transition: all 0.16s ease;
  width: 100%;
  margin-right: -13px;
}

.searchInput::placeholder {
  color: gray;
}

.searchInput:focus {
  outline: 0;
}

.searchInputContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchLogo {
  width: 20px;
  transform: translateX(-30px);
  cursor: pointer;
  transition: all 0.3s ease;
}

.searchLogo:hover {
  transform: scale(1.1) translateX(-27px);
}

@media screen and (max-width: 1000px) {
  .searchLogo {
    width: 13px;
    transform: translateX(-30px);
  }

  .searchLogo:hover {
    transform: scale(1.1) translateX(-30px);
  }

  .searchInput {
    font-size: 15px;
    border: 1px solid #61c8bb;
  }
}
</style>
