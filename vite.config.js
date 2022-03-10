const { resolve } = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

const REQUEST_BASE = 'http://localhost:8100'

export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
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
