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
      "@": path.resolve(__dirname, "./vue"),
      "@assets": path.resolve(__dirname, ""),
      "@components": path.resolve(__dirname, "./vue/components"),
      "@helpers": path.resolve(__dirname, ""),
      "@router": path.resolve(__dirname, ""),
      "@services": path.resolve(__dirname, ""),
      "@store": path.resolve(__dirname, ""),
      "@public": path.resolve(__dirname, ""),
    },
  },
})
