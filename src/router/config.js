import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useSystemStore } from '/@/store/system'
import { useAuthStore } from '/@/store/auth'
import { useUserStore } from '/@/store/user'
import router from './creactor'

NProgress.configure({ showSpinner: false })

// 白名单权限判断，在此白名单不用任何验证
function hasAuthForWhiteList(systemStore, to) {
  const whitelist = [
    'Login',
    'NotFound',
    'ServerError',
    'AuthError',
    'Loading'
  ]

  if (whitelist.indexOf(to.name) !== -1) {
    return true
  }

  return false
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

  // 如果成功登录但是非要访问登录页面，那就跳转到 loading 页面去获取系统基本数据，获取完跳转 Home 页面
  if (token && to.name === 'Login' && !systemStore.isReadySystemData) {
    return {
      name: 'Loading',
      replace: true,
      query: {
        routeName: 'Home'
      }
    }
  }

  // 如果是白名单列表中的路由就放行
  if (hasAuthForWhiteList(systemStore, to)) {
    return true
  }

  // 如果没有令牌，直接跳转登录页面
  if (!token) {
    return {
      name: 'Login',
      replace: true
    }
  }

  // 如果没有获取后端菜单的数据，就跳到 loading 页面进行数据准备
  if (!systemStore.isReadySystemData) {
    return {
      name: 'Loading',
      replace: true,
      query: {
        routeName: to.name
      }
    }
  }

  // 如果路由判断到这里就说明已经准备好了系统最基本的数据，可以进行菜单权限判断
  if (to.name in systemStore.authMenuKeys) {
    return true
  } else {
    return {
      name: 'AuthError',
      replace: true
    }
  }
})

// 后置
router.afterEach(() => {
  NProgress.done()
})
