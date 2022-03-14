import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '/@/store'
import router from './creactor'

NProgress.configure({ showSpinner: false })

// 获取到用户信息以后，进行授权判断
function hasAuthRoute(to) {
  const whitelist = [
    'Home',
    'NotFound',
    'ServerError'
  ]

  if (whitelist.indexOf(to.name) !== -1 || to.meta.requiresAuth === false) {
    return true
  }

  return to.name in store.getters['system/authMenuKeys']
}

/**
 * 前置路由守卫
 * v4 版本路由只需要 return 即可，不需要 next 但是也保留有
 */
router.beforeEach(async (to) => {
  NProgress.start()

  const token = store.getters['auth/token']
  const user = store.getters['user/userInfo']

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

  if (!user) {
    if (to.name === 'Login') {
      return {
        name: 'Home',
        replace: true
      }
    }
  }

  return hasAuthRoute(to)
})

// 后置
router.afterEach(() => {
  NProgress.done()
})
