import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    proxy: {
      '/sso': {
        target: 'https://sso.unipus.cn', // 后端接口地址
        changeOrigin: true, // 允许跨域
        // rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
      },
      '/api': {
        target: 'https://k12-teaching.unipus.cn/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/oauth': {
        target: 'https://k12-teaching.unipus.cn/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
