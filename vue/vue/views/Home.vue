<script setup>
import { onMounted, ref, defineAsyncComponent } from "vue"
import { createPostService, getPostService } from "@services/post.service"
import { useUserStore } from "@store/user.store"
const PostCard = defineAsyncComponent(() => import("@components/PostCard.vue"))

onMounted(async () => {
  await getPosts()
})

const userStore = useUserStore()

// Post
let posts = ref()
const postTitle = ref("")
const postContent = ref("")
const isCreatePost = ref(false)

async function createPost() {
  try {
    const postBlueprint = { id: userStore.id, title: postTitle.value, content: postContent.value }
    const post = await createPostService(postBlueprint)
    const newlyCreatedPost = await getPostService(post._id)
    posts.value.unshift(newlyCreatedPost)
    isCreatePost.value = false
    postTitle.value = ""
    postContent.value = ""
  } catch (e) {
    console.log(e)
  }
}

// Autofocus
async function handleInputBlurAutofocus() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

async function openCreatePostModal() {
  isCreatePost.value = !isCreatePost.value
  handleInputBlurAutofocus()
}

async function getPosts() {
  const response = await getPostService()
  posts.value = response

  setTimeout(async () => {
    await getPosts()
  }, 5000)
}
</script>

<template>
  <div class="add-post my-3">
    <button class="button is-primary">
      <span class="material-icons" @click="openCreatePostModal"> post_add </span>
    </button>
  </div>

  <div v-if="isCreatePost" class="my-5">
    <form @submit.prevent="createPost">
      <textarea
        v-model="postTitle"
        class="input"
        placeholder="Title"
        type="text"
        autofocus
      ></textarea>
      <textarea v-model="postContent" class="textarea" placeholder="Enter your post"></textarea>
      <button class="button has-text-primary mt-3" type="submit">Submit</button>
    </form>
  </div>

  <div class="card">
    <div class="card-content">
      <PostCard
        class="content py-3"
        v-for="post in posts"
        :key="post._id"
        :post="post"
        @inputBlurAutofocus="handleInputBlurAutofocus"
      />
    </div>
  </div>
</template>

<style>
.add-post:hover {
  cursor: pointer;
}
</style>
