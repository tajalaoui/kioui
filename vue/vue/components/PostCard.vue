<script setup>
import { ref, nextTick, watchEffect } from "vue"
import { useUserStore } from "@store/user.store"
import moment from "moment"
import { commentService, likeService } from "@services/post.service"

const userStore = useUserStore()
const emit = defineEmits(["inputBlurAutofocus"])
const props = defineProps(["post"])

const userId = userStore.$state.id
const postId = props.post._id

// Like
let isLiked = ref(false)
let postLikesCount = ref(props.post.likedBy.length)

async function postLike() {
  const likeBlueprint = { userId, postId }
  const likeData = await likeService(likeBlueprint)
  isLiked.value = likeData.isUserLikedPost
  postLikesCount.value = likeData.likesCount
}

// Comment
let commentInput = ref("")
let comments = ref([...props.post.comments])

async function postComment() {
  const commentBlueprint = { userId, postId, content: commentInput.value }
  const commentData = await commentService(commentBlueprint)
  comments.value.unshift(commentData)
  commentInput.value = ""
}

// Post behavior
const postCharLimit = ref(211)
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

// To update likes and comments live
watchEffect(async () => {
  const fromParentLikes = props.post.likedBy.length
  postLikesCount.value = fromParentLikes

  const fromParentComments = [...props.post.comments]
  comments.value = fromParentComments
})
</script>

<template>
  <div>
    <!-- Post -->
    <div class="card my-5">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image ml-auto is-48x48">
              <img class="image" id="avatar" src="/avatar.svg" alt="avatar" />
            </figure>
          </div>
        </div>
        <div class="content">
          <p class="title has-text-left has-text-weight-bold">
            {{ post.title }}
          </p>
          <p
            class="has-text-left is-size-5 has-text-weight-medium"
            :class="{ postContent: !isViewMore }"
          >
            {{ post.content }}
          </p>
          <p
            v-html="isViewMore ? 'view less' : 'view more'"
            text
            @click="viewMore"
            class="has-text-primary view-more"
            v-show="post.content.length >= postCharLimit"
          ></p>
          <p class="subtitle is-6 has-text-left">
            Posted by
            <router-link class="m-0" :to="{ name: 'Profile', params: { id: post.user._id } }"
              ><span class="has-text-primary" id="username"
                >@{{ post.user.username }}</span
              ></router-link
            >
            {{ moment(new Date(props.post.createdAt), "YYYYMMDD").fromNow() }}
          </p>
        </div>
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
    <!-- Comment -->
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
