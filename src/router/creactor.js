import { createRouter, createWebHistory } from 'vue-router'
import {
  base,
  requiresAuthRoutes
} from './router-table'

const router = createRouter({
  history: createWebHistory(),
  routes: [...requiresAuthRoutes, ...base]
})

export default router
