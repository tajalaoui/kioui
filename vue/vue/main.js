import { createApp } from "vue"
import App from "@/vue/App.vue"
import router from "@router/router"
import { createPinia } from "pinia"

createApp(App).use(router).use(createPinia()).mount("#app")
