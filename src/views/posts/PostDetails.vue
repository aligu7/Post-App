<template>
  <div class="posts" v-if="post && user">
    <BackButton />
    <div class="post">
      <div class="row">
        <div class="col-1">
          <router-link :to="{ name: 'UserProfile', params: { id: post.userId } }">
            <img v-if="user.photoURL" :src="user.photoURL" alt="" class="userImage" />
            <img v-else src="@/assets/images/defaultUserImage.png" alt="" class="userImage" />
          </router-link>
        </div>
        <div class="col-2">
          <router-link :to="{ name: 'UserProfile', params: { id: post.userId } }">
            <p class="userName" v-if="ownership(post.userId)">You</p>
            <p class="userName" v-else>
              {{ user.displayName }}
            </p>
          </router-link>
          <p class="postDate">{{ post.createdAt }} ago</p>
        </div>
        <div class="col-3">
          <div v-if="ownership(post.userId)">
            <Dropdown :id="id" @handleDelete="handleDelete()" />
          </div>
        </div>
      </div>
      <div class="content">
        <textarea ref="postMessage" readonly class="message" :value="post.message"></textarea>
        <img v-if="post.photoURL" class="postImage" :src="post.photoURL" />
      </div>
      <div class="actionButtons">
        <div class="like" @click="handleLike">
          <img v-if="post.isLiked" class="static" src="@/assets/images/liked.svg" />
          <img v-else class="static" src="@/assets/images/like.svg" />
          <img class="hover" src="@/assets/images/likeHover.svg" />
          <span :style="{ color: post.isLiked ? '#0DE6CB' : '#515151' }">{{
            post.likes.length
          }}</span>
        </div>
        <a href="#">
          <div class="comment">
            <img class="static" src="@/assets/images/comment.svg" />
            <img class="hover" src="@/assets/images/commentHover.svg" />
            <span>{{ post.comments.length }}</span>
          </div>
        </a>
      </div>
      <!-- Add Comment -->
      <p class="commentsLength" v-if="post.comments.length > 0">
        {{ post.comments.length }} Comments
      </p>
      <p class="commentsLength" v-else>No Comments</p>
      <form class="addComment" @submit.prevent="handleComment">
        <div class="inputContainer">
          <textarea
            ref="commentInp"
            v-model="commentMessage"
            placeholder="Add a comment"
            required
          ></textarea>
        </div>
        <button class="btn">Comment</button>
      </form>
      <p class="error" v-if="error">{{ error }}</p>

      <!-- Comment List -->
      <div class="comments">
        <div class="comment" v-for="comment in post.comments" :key="comment">
          <div class="col-1">
            <router-link :to="{ name: 'UserProfile', params: { id: comment.userId } }">
              <img
                v-if="getUserById(comment.userId).photoURL"
                :src="getUserById(comment.userId).photoURL"
                alt=""
                class="commentUserImage"
              />
              <img
                v-else
                src="@/assets/images/defaultUserImage.png"
                alt=""
                class="commentUserImage"
              />
            </router-link>
          </div>
          <div class="col-2">
            <div class="row-1">
              <router-link
                :to="{ name: 'UserProfile', params: { id: comment.userId } }"
                class="commentUserName"
                v-if="ownership(comment.userId)"
                >You</router-link
              >
              <router-link
                :to="{ name: 'UserProfile', params: { id: comment.userId } }"
                class="commentUserName"
                v-else
              >
                {{ getUserById(comment.userId).displayName }}
              </router-link>

              <p class="postDate commentPostDate">
                {{ formatDistanceToNow(comment.createdAt.toDate()) }} ago
              </p>
              <svg
                v-if="ownership(comment.userId)"
                @click="handleDeleteComment(comment.id)"
                class="deleteComment"
                id="Layer_1"
                enable-background="new 0 0 512 512"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                fill="#515151"
              >
                <g>
                  <path
                    d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"
                  />
                  <path
                    d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"
                  />
                  <path
                    d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"
                  />
                  <path
                    d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"
                  />
                </g>
              </svg>
            </div>
            <div class="row-2">
              <textarea readonly class="commentMessage" :value="comment.commentMessage"> </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Spinner size="50" color="" />
  </div>
</template>

<script>
import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import Dropdown from '@/components/Dropdown.vue'
import Spinner from '@/components/Spinner.vue'
import { onUpdated, ref, watch } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'vue-router'
import uniqid from 'uniqid'
import BackButton from '@/components/BackButton.vue'
export default {
  props: ['id'],
  components: { Spinner, Dropdown, BackButton },
  setup(props) {
    const { document: post } = getDocument('posts', props.id)
    const { updateDoc, deleteDoc, error } = useDocument('posts', props.id)
    const { user: currentUser } = getUser()
    const { documents: users } = getCollection('users')
    const commentInp = ref(null)
    const commentMessage = ref(null)
    const user = ref(null)
    const router = useRouter()
    const postMessage = ref(null)

    const ownership = (userId) => {
      return currentUser.value && userId == currentUser.value.uid
    }

    onUpdated(() => {
      if (postMessage.value) {
        postMessage.value.style.height = postMessage.value.scrollHeight + 'px'
      }

      const commentMessages = document.querySelectorAll('.commentMessage')
      commentMessages.forEach((commentMessage) => {
        commentMessage.style.height = commentMessage.scrollHeight + 'px'
      })
    })

    // Formatting Posts
    watch(post, () => {
      post.value.createdAt = formatDistanceToNow(post.value.createdAt.toDate())
      let isLiked = false
      post.value.likes.forEach((like) => {
        if (like.userId == currentUser.value.uid) {
          isLiked = true
        }
        post.value.isLiked = isLiked
      })
    })

    // Automaticaly resizing add comment textarea when typing
    watch(commentInp, () => {
      commentInp.value.setAttribute(
        'style',
        'height:' + commentInp.value.scrollHeight + 'px;overflow-y:hidden;'
      )
      commentInp.value.addEventListener(
        'input',
        function (e) {
          if (e.target.value != '') {
            this.style.height = 'auto'
            this.style.height = this.scrollHeight + 'px'
          } else {
            this.style.height = ''
          }
        },
        false
      )
    })

    const getUserById = (id) => {
      let res
      if (users.value) {
        users.value.forEach((user) => {
          if (user.id == id) {
            res = user
          }
        })
      }
      return res
    }

    const handleComment = async () => {
      await updateDoc({
        comments: [
          {
            commentMessage: commentMessage.value,
            userId: currentUser.value.uid,
            createdAt: new Date(),
            id: uniqid()
          },
          ...post.value.comments
        ]
      })
      if (!error.value) {
        commentMessage.value = ''
        commentInp.value.style.height = 'auto'
      }
    }

    const handleDeleteComment = async (id) => {
      let comments = post.value.comments.filter((comment) => comment.id != id)
      await updateDoc({
        comments
      })
    }

    const handleDelete = async () => {
      const { deleteImage } = useStorage()
      await deleteDoc()
      await deleteImage(post.value.filePath)
      if (!error.value) {
        router.push({
          name: 'UserProfile',
          params: { id: currentUser.value.uid }
        })
      }
    }

    const handleLike = async () => {
      if (!post.value.isLiked) {
        await updateDoc({
          likes: [...post.value.likes, { userId: currentUser.value.uid }]
        })
      } else {
        let likes = post.value.likes.filter((like) => like.userId != currentUser.value.uid)
        await updateDoc({
          likes
        })
      }
    }

    watch(users, () => {
      users.value.forEach((userDoc) => {
        if (userDoc.id == post.value.userId) {
          user.value = userDoc
        }
      })
    })

    return {
      post,
      user,
      ownership,
      currentUser,
      commentMessage,
      handleLike,
      commentInp,
      handleComment,
      handleDeleteComment,
      handleDelete,
      error,
      getUserById,
      formatDistanceToNow,
      postMessage
    }
  }
}
</script>

<style scoped>
.posts {
  position: relative;
}

.commentsLength {
  font-size: 17px;
  margin-top: 17px;
}

.commentMessage {
  width: 100%;
}

.addComment {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 12px;
}

.addComment .inputContainer textarea {
  min-height: auto;
  resize: none;
  height: 40px;
}

.addComment .inputContainer {
  margin-top: 0;
  flex: 1;
  margin-right: 10px;
}

.addComment .btn {
  font-size: 14px;
  padding: 10px 17px;
}

.comments .comment {
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
}

.comments {
  margin-bottom: 14px;
}

.comments .row-1 {
  display: flex;
  align-items: center;
  position: relative;
  padding: 4px 0;
}

.comments .col-2 {
  flex: 1;
  width: 100%;
}

.comment .col-1 {
  margin-right: 14px;
}

.commentUserImage {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
}

.posts {
  margin-top: 25px;
}

.commentUserName {
  color: #515151;
  font-size: 17px;
  font-family: 'roboto-medium';
  margin-right: 7px;
}

.commentPostDate {
  font-size: 16px;
}

.deleteComment {
  position: absolute;
  top: 50%;
  right: 0;
  cursor: pointer;
  transition: all 0.1s ease;
  width: 22px;
  height: 22px;
}

.deleteComment:hover {
  fill: #0de6cb;
  transform: scale(1.1);
}

@media screen and (min-width: 1000px) {
  .backButton {
    position: absolute;
    top: 0;
    left: -30px;
  }
}

@media screen and (max-width: 1000px) {
  .posts {
    padding: 10px;
    margin-top: 0;
  }

  .post {
    padding: 16px;
    margin-top: 10px;
  }

  .commentsLength {
    font-size: 15px;
    margin-top: 5px;
  }

  .addComment {
    margin-top: 8px;
  }

  .addComment .inputContainer textarea {
    height: 33px;
    font-size: 12px;
  }

  .addComment .btn {
    font-size: 12px;
    padding: 7px 14px;
  }

  .comments .comment {
    padding: 10px 0;
  }

  .comment .col-1 {
    margin-right: 10px;
  }

  .commentUserImage {
    width: 45px;
    height: 45px;
  }

  .commentUserName {
    font-size: 14px;
    margin-right: 4px;
  }

  .deleteComment {
    width: 16px;
    height: 16px;
  }

  .commentPostDate {
    font-size: 13px;
  }

  .commentMessage {
    font-size: 14px;
  }
}
</style>
