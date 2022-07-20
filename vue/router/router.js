import { createRouter, createWebHistory } from "vue-router"
import { getToken, verifyToken } from "@helpers/token.helper"
import { useUserStore } from "@store/user.store"

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: () => import("@views/Home.vue"),
      AppNavBar: () => import("../layouts/AppNavBar.vue"),
    },
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    components: {
      default: () => import("@views/Profile.vue"),
      AppNavBar: () => import("../layouts/AppNavBar.vue"),
    },
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@views/Login.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// TODO put the logic responsable for token verification in a service that will be called in token.composable
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getToken()) {
      const token = await verifyToken()
      const { userId, username } = token.data
      const userStore = useUserStore()
      userStore.SET_USER(userId, username)
      next()
    } else next({ name: "Login" })
  } else next()
})

export default router
