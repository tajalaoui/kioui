<script setup>
import { onMounted, ref, defineAsyncComponent } from "vue"
import { createPostService, getPostService } from "../services/post.service"
import { useUserStore } from "../store/user.store"
const PostCard = defineAsyncComponent(() => import("@/components/PostCard.vue"))

onMounted(async () => {
  await getPosts()
})

async function getPosts() {
  const response = await getPostService()
  posts.value = response

  setTimeout(async () => {
    await getPosts()
  }, 5000)
}

const userStore = useUserStore()
let posts = ref()
const isCreatePost = ref(false)
const postContent = ref("")

async function handleInputBlurAutofocus() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

async function createPost() {
  try {
    const postBlueprint = { id: userStore.id, content: postContent.value }
    const post = await createPostService(postBlueprint)
    const newlyCreatedPost = await getPostService(post._id)
    posts.value.unshift(newlyCreatedPost)
    isCreatePost.value = false
    postContent.value = ""
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="is-inline-block add-post my-3">
    <span class="material-icons has-text-primary" @click="isCreatePost = !isCreatePost">
      post_add
    </span>
  </div>

  <div v-if="isCreatePost" class="my-5">
    <form @submit.prevent="createPost">
      <textarea
        v-model="postContent"
        class="textarea"
        placeholder="Enter your post"
        autofocus
      ></textarea>
      <button class="button mt-3" type="submit">Submit</button>
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
