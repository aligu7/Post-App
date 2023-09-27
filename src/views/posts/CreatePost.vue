<template>
  <section class="form-section postform">
    <form class="form-wrapper" @submit.prevent="handleSubmit">
      <h1>Create Post</h1>

      <div class="inputContainer">
        <label>Message</label>
        <textarea v-model="message" placeholder="Enter message" required />
      </div>

      <div class="inputContainer" style="margin-bottom: 10px">
        <label>Photo</label>
        <label for="file-input" class="fileButton">
          <p v-if="file">
            {{ filteredFileName(file.name, 11) }}
          </p>
          <p v-else>Select image</p>
          <img src="../../assets/images/addphoto2.svg" alt="" />
        </label>
      </div>

      <div v-if="file" class="postImageContainer">
        <img @click="clearFile" class="closeImage" src="@/assets/images/close.svg" alt="" />
        <img class="postImage" :src="fileData" alt="" />
      </div>

      <input id="file-input" type="file" hidden ref="hiddenInp" @change="handleChange(hiddenInp)" />

      <button class="btn" v-if="!isPending">Create</button>
      <div v-else>
        <Spinner size="60" color="" />
      </div>

      <p class="error" v-if="fileError">{{ fileError }}</p>
      <p class="error" v-if="error">{{ error }}</p>
    </form>
  </section>
</template>

<script>
import getFile from '@/composables/getFile'
import useStorage from '@/composables/useStorage'
import Spinner from '@/components/Spinner.vue'
import { onMounted, ref } from 'vue'
import useCollection from '@/composables/useCollection'
import { months } from '@/composables/getDate'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'
import { timestamp } from '@/firebase/config'
export default {
  components: { Spinner },
  setup() {
    const { file, fileData, fileError, handleChange, filteredFileName, clearFile } = getFile()
    const message = ref(null)
    const hiddenInp = ref(null)
    const { user } = getUser()
    const { uploadImage, url, filePath } = useStorage()
    const { error, addDoc } = useCollection('posts')
    const router = useRouter()
    const isPending = ref(false)

    onMounted(() => {
      file.value = null
    })

    const handleSubmit = async () => {
      let date = new Date()
      isPending.value = true
      if (file.value) {
        await uploadImage(file.value, 'postImages')
      }
      await addDoc({
        message: message.value,
        userId: user.value.uid,
        photoURL: url.value,
        createdAt: timestamp(),
        filePath: filePath.value,
        datePosted: `${months[date.getMonth()]} ${date.getDate()}`,
        likes: [],
        comments: []
      })
      if (!error.value) {
        console.log(user.value.uid)
        router.push({ name: 'UserProfile', params: { id: user.value.uid } })
        hiddenInp.value = null
        file.value = null
        message.value = null
      }
      isPending.value = false
    }

    return {
      file,
      fileData,
      fileError,
      handleChange,
      hiddenInp,
      handleSubmit,
      message,
      isPending,
      error,
      filteredFileName,
      clearFile
    }
  }
}
</script>

<style>
.form-section.postform {
  margin-top: 60px;
}

.form-section.postform .postImageContainer {
  position: relative;
}

.form-section.postform .postImageContainer .closeImage {
  background-color: white;
  border-radius: 50%;
  width: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

@media screen and (max-width: 1000px) {
  .form-section.postform .inputContainer .fileButton,
  .form-section.postform .inputContainer textarea {
    font-size: 11px;
  }

  .form-section.postform .postImageContainer .closeImage {
    width: 16px;
  }

  .form-section.postform .inputContainer .fileButton img {
    width: 15px;
  }

  .form-section.postform .form-wrapper .postImage {
    height: 150px;
  }
}
</style>
