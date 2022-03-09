import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import 'dotenv/config'

const REQUEST_BASE = 'http://localhost:8100'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: REQUEST_BASE,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api')
      },
      '/auth': {
        target: REQUEST_BASE,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, 'auth')
      }
    }
  }
})
