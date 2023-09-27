<template>
  <button></button>
  <ListView :posts="posts" :isPending="isPending" />
</template>

<script>
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';
export default {
  components: { ListView },
  setup() {
    const { documents: posts, isPending } = getCollection('posts', 'createdAt');

    return { posts, isPending };
  },
};
</script>
