<template>
  <section class="form-section postform">
    <form class="form-wrapper" v-if="post" @submit.prevent="handleSubmit">
      <h1>Edit Post</h1>

      <div class="inputContainer">
        <label>Message</label>
        <textarea v-model="post.message" placeholder="Enter message" required />
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

      <div v-if="fileData" class="postImageContainer">
        <img @click="clearFile" class="closeImage" src="@/assets/images/close.svg" alt="" />
        <img class="postImage" :src="fileData" alt="" />
      </div>

      <input id="file-input" type="file" hidden ref="hiddenInp" @change="handleChange(hiddenInp)" />

      <button class="btn" v-if="!isPending">Edit</button>
      <div v-else>
        <Spinner size="60" color="" />
      </div>

      <p class="error" v-if="fileError">{{ fileError }}</p>
      <p class="error" v-if="error">{{ error }}</p>
    </form>
  </section>
</template>

<script>
import { ref, watch } from 'vue'
import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import getUser from '@/composables/getUser'
import Spinner from '@/components/Spinner.vue'
import useStorage from '@/composables/useStorage'
import getFile from '@/composables/getFile'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: { Spinner },
  setup() {
    const { file, fileData, fileError, handleChange, filteredFileName, clearFile } = getFile()
    const route = useRoute()
    const router = useRouter()
    const hiddenInp = ref(null)
    const { document: post } = getDocument('posts', route.params.id)
    const { uploadImage, url } = useStorage()
    const { updateDoc, error } = useDocument('posts', route.params.id)
    const { user } = getUser()
    const isPending = ref(false)

    watch(post, () => {
      fileData.value = post.value.photoURL
    })

    const handleSubmit = async () => {
      isPending.value = true
      if (file.value) {
        await uploadImage(file.value, 'postImages')
      }
      await updateDoc({
        message: post.value.message,
        photoURL: fileData.value
      })
      if (!error.value) {
        router.push({
          name: 'UserProfile',
          params: { id: user.value.uid }
        })
      }
      isPending.value = false
    }

    return {
      post,
      file,
      fileData,
      hiddenInp,
      filteredFileName,
      handleChange,
      clearFile,
      isPending,
      fileError,
      handleSubmit,
      error
    }
  }
}
</script>
