<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { setToken } from "../helpers/token.helper"
import { registerService } from "../services/auth.service"
import { useUserStore } from "../store/user.store"

const router = useRouter()
const userStore = useUserStore()
const user = reactive({ username: "", email: "", password: "" })

async function onRegister() {
  try {
    const userData = await registerService(user)
    const { id, username, token } = userData
    if (!token) return false

    setToken(token)
    userStore.SET_USER(id, username)
    router.push({ name: "Home" })
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <form @submit.prevent="onRegister">
    <input class="input" v-model="user.username" placeholder="username" type="text" />
    <input class="input" v-model="user.email" placeholder="email" type="email" />
    <input class="input" v-model="user.password" placeholder="password" type="password" />
    <button class="button" type="submit">Submit</button>
  </form>

  <p class="mt-5">
    You already have an account?
    <router-link class="is-underlined has-text-weight-semibold" to="/login">Login</router-link>
  </p>
</template>
