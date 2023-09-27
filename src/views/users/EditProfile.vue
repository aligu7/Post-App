<template>
  <section class="form-section">
    <form class="form-wrapper" @submit.prevent="handleSubmit">
      <div v-if="user">
        <h1>Edit Profile</h1>
        <p class="profileImageParagraph">Profile Image</p>
        <div class="profileImage">
          <label
            for="file-input"
            v-if="fileData"
            class="profile"
            :style="{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${fileData})`,
            }">
            <img src="@/assets/images/addphoto.svg" alt="" />
          </label>
          <label for="file-input" v-else class="profile defaultImage">
            <img src="@/assets/images/addphoto.svg" alt="" />
          </label>
        </div>

        <p class="error" v-if="fileError">{{ fileError }}</p>
        <p style="margin-top: 10px" v-if="file && !fileError">
          {{ filteredFileName(file.name, 20) }}
        </p>
        <div class="inputContainer">
          <label>Name</label>
          <input
            v-model="user.displayName"
            placeholder="Enter display name"
            required />
        </div>

        <div class="inputContainer">
          <label>Bio</label>
          <textarea v-model="user.bio" placeholder="Enter biography" required />
        </div>

        <div class="inputContainer">
          <label>Location</label>
          <input v-model="user.location" placeholder="Enter your location" />
        </div>

        <input
          id="file-input"
          type="file"
          hidden
          ref="hiddenInp"
          @change="handleChange(hiddenInp)" />

        <button v-if="!isPending" class="btn">Save</button>
        <Spinner v-else size="50" color="" />
      </div>
      <div v-else>
        <Spinner size="60" color="" />
      </div>
      <p class="error" v-if="error">{{ error }}</p>
    </form>
  </section>
</template>

<script>
import { ref, watch } from 'vue';
import useStorage from '@/composables/useStorage';
import getFile from '@/composables/getFile';
import getUser from '@/composables/getUser';
import getDocument from '@/composables/getDocument';
import useDocument from '@/composables/useDocument';
import Spinner from '@/components/Spinner.vue';
import { useRouter } from 'vue-router';

export default {
  components: { Spinner },
  setup() {
    const { file, fileData, fileError, handleChange, filteredFileName } =
      getFile();
    const { uploadImage, url } = useStorage();
    const { user: currentUser } = getUser();
    const { document: user } = getDocument('users', currentUser.value.uid);
    const { updateDoc, error } = useDocument('users', currentUser.value.uid);
    const hiddenInp = ref(null);
    const isPending = ref(false);
    const router = useRouter();

    watch(user, () => {
      fileData.value = user.value.photoURL;
      file.value = null;
    });

    const handleSubmit = async () => {
      isPending.value = true;
      if (file.value) {
        await uploadImage(file.value, 'profilePictures', 'users');
      }

      await updateDoc({
        displayName: user.value.displayName,
        bio: user.value.bio,
        location: user.value.location,
        photoURL: url.value ? url.value : currentUser.value.photoURL,
      });

      if (!error.value) {
        router.push({
          name: 'UserProfile',
          params: { id: currentUser.value.uid },
        });
      }
      isPending.value = false;
    };

    return {
      handleSubmit,
      hiddenInp,
      file,
      fileError,
      user,
      handleChange,
      fileData,
      isPending,
      error,
      filteredFileName,
    };
  },
};
</script>

<style scoped>
.profileImageParagraph {
  text-align: left;
}

.profileImage .profile {
  margin: 0 auto;
  width: 180px;
  height: 180px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.profileImage .profile img {
  width: 24px;
}

.profileImage .defaultImage {
  background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
    url('../../assets/images/defaultUserImage.png');
}

.profileImageParagraph {
  font-size: 17px;
  margin: 20px 0 20px 0;
}

.form-section {
  margin-top: 40px;
}
</style>
