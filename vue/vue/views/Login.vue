<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@store/user.store"
import { setToken } from "@helpers/token.helper"
import { loginService } from "@services/auth.service"

const router = useRouter()
const userStore = useUserStore()
const user = reactive({ email: "", password: "" })

async function onLogin() {
  try {
    const userData = await loginService(user)
    if (!userData) return false

    const { id, username, token } = userData

    setToken(token)
    userStore.SET_USER(id, username)
    router.push({ name: "Home" })
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <form @submit.prevent="onLogin">
    <input class="input" v-model="user.email" type="email" placeholder="email" />
    <input class="input" v-model="user.password" type="password" placeholder="password" />
    <button class="button" type="submit">Submit</button>
  </form>

  <p class="mt-5">
    Don't have an account?
    <router-link class="is-underlined has-text-weight-semibold" to="/register"
      >Register</router-link
    >
  </p>
</template>
