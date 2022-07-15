<script setup>
import { useRouter } from "vue-router"
import { logout } from "../helpers/auth.helper"

const router = useRouter()

function onLogout() {
  logout()
  router.push({ name: "Login" })
}
</script>

<template>
  <nav class="navbar-end">
    <router-link to="/">Feed</router-link>
    <router-link to="/">Profile</router-link>
    <a @click="onLogout">Logout</a>
  </nav>
</template>
