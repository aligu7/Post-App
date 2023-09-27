<template>
  <ListView
    :posts="formattedPosts"
    :isPending="isPending"
    :noPostsMessage="`No posts found for '${$route.params.search}''`"
  />
</template>

<script>
import ListView from '@/components/ListView.vue';
import getCollection from '@/composables/getCollection';
import { computed, ref, watch } from 'vue';
export default {
  components: { ListView },
  props: ['search'],
  setup(props) {
    const { documents: posts } = getCollection('posts', 'createdAt');
    const { documents: users, isPending } = getCollection('users', 'joinDate');

    const formattedPosts = computed(() => {
      /* 
      
      TODO✅: When Input contains nothing or contains only spaces and submitting it, switch to the Home route
      TODO✅: Make back button
      TODO✅: Make button in Home and MyPosts at the bottom right corner so that user can scroll up instantly (Make a top trigger div element)
      TODO: Searching users

      */

      let newPosts = [];

      if (posts.value && users.value) {
        let searchPattern = new RegExp(props.search, 'gi');

        // Filter posts, which's names match with the search pattern
        let filteredPostsByMessage = posts.value.filter((post, index) => {
          return post.message.match(searchPattern);
        });

        // Return an array that contains IDs of users, which's names match with the search string
        let usersContainingSearchId = [];
        users.value.forEach((user) => {
          if (user.displayName.match(searchPattern)) {
            usersContainingSearchId.push(user.id);
          }
        });

        // Use the previous array of IDs to return an array of posts, created by those users.
        let filteredPostsByUsersNames = posts.value.filter((post) =>
          usersContainingSearchId.includes(post.userId)
        );

        newPosts = [...filteredPostsByMessage, ...filteredPostsByUsersNames];
        console.log(newPosts);
      }

      return newPosts;
    });

    return { formattedPosts, isPending };
  },
};
</script>
