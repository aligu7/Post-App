<template>
  <div class="userProfile">
    <div v-if="user" class="userContainer">
      <div class="left">
        <img class="userImage" v-if="user.photoURL" :src="user.photoURL" />
        <img
          class="userImage"
          v-else
          src="@/assets/images/defaultUserImage.png"
        />
        <h1 class="userName">{{ user.displayName }}</h1>
        <p class="userBio">
          {{ user.bio }}
        </p>
        <div class="other">
          <div class="location" v-if="user.location">
            <img src="@/assets/images/location.svg" />
            <p>{{ user.location }}</p>
          </div>
          <div class="date">
            <img src="@/assets/images/calendar.svg" />
            <p>Joined {{ user.joinDate }}</p>
          </div>
        </div>
        <router-link
          :to="{ name: 'EditProfile' }"
          class="btn editProfile"
          v-if="ownership"
          >Edit Profile</router-link
        >
      </div>
      <div class="right">
        <div class="wrapper">
          <div v-if="ownership">
            <h1 class="title">My Posts</h1>
            <router-link :to="{ name: 'CreatePost' }">
              <button class="btn">
                <p>Create post</p>
                <img src="@/assets/images/addphoto.svg" alt="" />
              </button>
            </router-link>
          </div>
          <div v-else class="otherUserTitle">
            <p class="title">
              Posts created by
              <b> {{ user.displayName }}</b>
            </p>
          </div>
        </div>
        <ListView
          :posts="posts"
          :isPending="isPending"
          :noPostsMessage="
            `${ownership ? 'You' : user.displayName} didn't create any posts.`
          "
          v-if="posts"
        />
      </div>
    </div>
    <div class="spinnerContainer" v-else>
      <Spinner size="90" color="" />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import getUser from '@/composables/getUser';
import getDocument from '@/composables/getDocument';
import getCollection from '@/composables/getCollection';
import { computed, onMounted, onUpdated, watch, watchEffect } from 'vue';
import { months } from '@/composables/getDate';
import Spinner from '@/components/Spinner.vue';
import ListView from '../../components/ListView.vue';
export default {
  components: { Spinner, ListView },
  setup() {
    const route = useRoute();
    const { user: loggedInUser } = getUser();
    const { document: user } = getDocument('users', route.params.id);
    const { documents: posts, isPending } = getCollection(
      'posts',
      'createdAt',
      ['userId', '==', route.params.id]
    );

    const ownership = computed(
      () => loggedInUser.value && loggedInUser.value.uid == route.params.id
    );

    watch(user, () => {
      let joinDate = user.value.joinDate.toDate();
      user.value.joinDate = `${
        months[joinDate.getMonth()]
      } ${joinDate.getDay()}, ${joinDate.getFullYear()}`;
    });

    watchEffect(() => {
      // console.log(route.params.id);
      // const { document: doc } = getDocument('users', route.params.id);
      // console.log(doc.value);
      // user.value = doc.value;
    });

    return { ownership, loggedInUser, user, posts, isPending };
  },
};
</script>
