import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@assets": path.resolve(__dirname, "./vue/assets"),
      "@components": path.resolve(__dirname, "./vue/components"),
      "@helpers": path.resolve(__dirname, "./vue/helpers"),
      "@composables": path.resolve(__dirname, "./vue/composables"),
      "@router": path.resolve(__dirname, "./vue/router"),
      "@services": path.resolve(__dirname, "./vue/services"),
      "@store": path.resolve(__dirname, "./vue/store"),
      "@public": path.resolve(__dirname, "./public"),
    },
  },
})
