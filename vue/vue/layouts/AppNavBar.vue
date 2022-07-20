<script setup>
import { useRouter } from "vue-router"
import { useUserStore } from "@store/user.store"
import { logout } from "@helpers/auth.helper"

const userStore = useUserStore()
const router = useRouter()

function onLogout() {
  logout()
  router.push({ name: "Login" })
}
</script>

<template>
  <nav class="navbar navbar-end">
    <router-link to="/">Feed</router-link>
    <!-- <router-link to="/">Profile</router-link> -->
    <router-link :to="{ name: 'Profile', params: { id: userStore.id } }">Profile</router-link>
    <a @click="onLogout">Logout</a>
  </nav>
</template>
