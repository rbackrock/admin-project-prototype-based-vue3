import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useSystemStore } from '/@/store/system'
import { useAuthStore } from '/@/store/auth'
import { useUserStore } from '/@/store/user'
import router from './creactor'

NProgress.configure({ showSpinner: false })

// 获取到用户信息以后，进行授权判断
function hasAuthRoute(systemStore, to) {
  const whitelist = [
    'Home',
    'NotFound',
    'ServerError'
  ]

  if (whitelist.indexOf(to.name) !== -1 || to.meta.requiresAuth === false) {
    return true
  }

  return to.name in systemStore.authMenuKeys
}

/**
 * 前置路由守卫
 * v4 版本路由只需要 return 即可，不需要 next 但是也保留有
 */
router.beforeEach(async (to) => {
  NProgress.start()

  const systemStore = useSystemStore()
  const authStore = useAuthStore()
  const userStore = useUserStore()

  const token = authStore.token
  const user = userStore.userInfo

  // 没有令牌，如果这个页面不需要验证，就正常路由
  if (!token && 'requiresAuth' in to.meta && to.meta.requiresAuth === false) {
    return true
  }

  // 如果没有令牌，直接跳转登录页面
  if (!token) {
    return {
      name: 'Login',
      replace: true
    }
  }

  // 获取系统基本信息在 app-layout.vue 里做
  if (!user && to.name === 'Login') {
    return {
      name: 'Home',
      replace: true
    }
  }

  return hasAuthRoute(systemStore, to)
})

// 后置
router.afterEach(() => {
  NProgress.done()
})
