/**
 * 新版文档中，路由数组中的顺序并不重要
 * https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%9C%A8%E5%8F%82%E6%95%B0%E4%B8%AD%E8%87%AA%E5%AE%9A%E4%B9%89%E6%AD%A3%E5%88%99
 */

import AppLayout from '/@/layouts/app-layout.vue'
import NotFoundError from '/@/views/features/404.vue'
import ServerError from '/@/views/features/500.vue'
import AuthError from '/@/views/features/401.vue'
import Login from '/@/views/login/index.vue'
import Loading from '/@/views/features/loading.vue'
import Home from '/@/views/home/index.vue'

// 基本路由
const base = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundError,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/401',
    name: 'AuthError',
    component: AuthError
  },
  {
    path: '/500',
    name: 'ServerError',
    component: ServerError
  },
  {
    path: '/loading',
    name: 'Loading',
    component: Loading
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: AppLayout,
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('/@/views/features/redirect.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'NotFound'
    },
    meta: {
      requiresAuth: false
    }
  }
]

// 首页
const home = [
  {
    path: '/',
    component: AppLayout,
    redirect: {
      name: 'Home'
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
        },
        component: Home
      }
    ]
  }
]

// 系统路由
const system = [
  {
    path: '/system',
    name: 'System',
    meta: {
    },
    component: AppLayout,
    redirect: {
      name: 'SystemDataDictionary'
    },
    children: [
      {
        path: 'data-dictionary',
        name: 'SystemDataDictionary',
        meta: {
        },
        component: () => import('/@/views/system/data-dictionary/index.vue')
      },
      {
        path: 'menu',
        name: 'SystemMenu',
        meta: {
        },
        component: () => import('/@/views/system/menu/index.vue')
      },
      {
        path: 'role',
        name: 'SystemRole',
        meta: {
        },
        component: () => import('/@/views/system/rule/index.vue')
      }
    ]
  }
]

// example 路由
const example = [
  {
    path: '/example',
    name: 'Example',
    meta: {
    },
    component: AppLayout,
    redirect: {
      name: 'ExampleCrud'
    },
    children: [
      {
        path: 'crud',
        name: 'ExampleCrud',
        meta: {
        },
        component: () => import('/@/views/example/crud/index.vue')
      },
      {
        path: 'test',
        name: 'ExampleTest',
        meta: {
        },
        component: () => import('/@/views/example/test/index.vue')
      },
      {
        path: 'shared-store',
        name: 'ExampleSharedStore',
        meta: {
        },
        component: () => import('/@/views/example/shared-store-crud/index.vue')
      },
      {
        path: 'permission',
        name: 'ExamplePermission',
        meta: {
        },
        component: () => import('/@/views/example/permission/index.vue')
      },
      {
        path: 'deep',
        name: 'ExampleDeep',
        meta: {
        },
        component: () => import('/@/views/example/deep/index.vue')
      },
      {
        path: 'group-menu',
        name: 'ExampleGroupMenu',
        meta: {
        },
        component: () => import('/@/views/example/group/index.vue')
      },
      {
        path: 'nested',
        name: 'ExampleNested',
        meta: {
        }, 
        component: () => import('/@/views/example/nested/layout.vue'),
        redirect: {
          name: 'ExampleNestedList'
        },
        children: [
          {
            path: 'list',
            name: 'ExampleNestedList',
            meta: {
            },
            component: () => import('/@/views/example/nested/list.vue')
          },
          {
            path: 'detail',
            name: 'ExampleNestedDetail',
            meta: {
            },
            component: () => import('/@/views/example/nested/detail.vue')
          }
        ]
      }
    ]
  }
]

const requiresAuthRoutes = [
  ...home,
  ...system,
  ...example
]
export {
  base,
  requiresAuthRoutes
}
