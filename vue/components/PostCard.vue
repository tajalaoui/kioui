<script setup>
import { onMounted, computed, ref, nextTick, watchEffect } from "vue"
import { useUserStore } from "@store/user.store"
import moment from "moment"
import { commentService, likeService } from "@services/post.service"

const userStore = useUserStore()

const emit = defineEmits(["inputBlurAutofocus"])
// const props = defineProps({ post: String })
const props = defineProps(["post"])

const postCharLimit = ref(211)

let commentInput = ref("")
let comments = ref([...props.post.comments])
const userId = userStore.$state.id
const postId = props.post._id
let isLiked = ref(false)
let postLikesCount = ref(props.post.likedBy.length)

// To update likes and comments live
watchEffect(async () => {
  const fromParentLikes = props.post.likedBy.length
  postLikesCount.value = fromParentLikes

  const fromParentComments = [...props.post.comments]
  comments.value = fromParentComments
})

async function postComment() {
  const commentBlueprint = { userId, postId, content: commentInput.value }
  const commentData = await commentService(commentBlueprint)
  comments.value.unshift(commentData)
  commentInput.value = ""
}

async function postLike() {
  const likeBlueprint = { userId, postId }
  const likeData = await likeService(likeBlueprint)
  isLiked.value = likeData.isUserLikedPost
  postLikesCount.value = likeData.likesCount
}

const isShowTextArea = ref(false)
let isViewMore = ref(false)

function viewMore() {
  isViewMore.value = !isViewMore.value
}

const textarea = ref(null)

async function toggleAutoFocus() {
  emit("inputBlurAutofocus")
  isShowTextArea.value = !isShowTextArea.value
  await nextTick()
  if (isShowTextArea.value) textarea.value.focus()
}

const getCurrentDate = computed(() => {
  const date = new Date(props.post.createdAt)
  return moment(date, "YYYYMMDD").fromNow()
})
</script>

<template>
  <div>
    <div class="card my-5">
      <div class="card-content">
        <p class="title has-text-left" :class="{ postContent: !isViewMore }">
          {{ post.content }}
        </p>
        <p
          v-html="isViewMore ? 'view less' : 'view more'"
          text
          @click="viewMore"
          class="has-text-primary view-more"
          v-show="post.content.length >= postCharLimit"
        ></p>
        <p class="subtitle has-text-left">
          Posted by
          <router-link :to="{ name: 'Profile', params: { id: post.user.username } }"
            ><span class="has-text-primary" id="username">{{
              post.user.username
            }}</span></router-link
          >
          {{ getCurrentDate }}
        </p>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="postLike"
          ><span class="material-icons">thumb_up</span>
          <span class="mb-3 pl-1">{{ postLikesCount }}</span></a
        >
        <a class="card-footer-item" @click="toggleAutoFocus"
          ><span class="material-icons">comment</span></a
        >
      </footer>
    </div>
    <!-- Comment section -->
    <div v-if="isShowTextArea">
      <div class="card mt-3" v-for="comment in comments" :key="comment._id">
        <div class="card-content">
          <p class="title is-5 has-text-left" :class="{ postContent: !isViewMore }">
            {{ comment.content }}
          </p>

          <p class="subtitle is-6 mt-1 has-text-left">
            Posted by
            <span class="has-text-primary" id="username">{{ comment.user.username }} </span>
            {{ moment(new Date(comment.createdAt), "YYYYMMDD").fromNow() }}
          </p>
        </div>
      </div>
      <form @submit.prevent="postComment">
        <textarea
          class="textarea my-5"
          ref="textarea"
          v-model="commentInput"
          id="textarea"
          placeholder="Enter your comment"
        ></textarea>
        <button class="button is-primary is-fullwidth" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<style>
.postContent {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  transition: all 3s;
}

.view-more:hover {
  cursor: pointer;
  text-decoration: underline;
}

#username:hover {
  cursor: pointer;
}
</style>
