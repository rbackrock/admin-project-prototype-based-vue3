const { resolve } = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'

const PROXY_REQUEST_BASE = 'http://localhost:8000'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    })
  ],
  resolve: {
    alias: {
      '/@': resolve(__dirname, 'src')
    }
  },
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
        target: PROXY_REQUEST_BASE,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api')
      },
      '/auth': {
        target: PROXY_REQUEST_BASE,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, 'auth')
      }
    }
  }
})
