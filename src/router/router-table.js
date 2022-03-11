/**
 * 新版文档中，路由数组中的顺序并不重要
 * https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%9C%A8%E5%8F%82%E6%95%B0%E4%B8%AD%E8%87%AA%E5%AE%9A%E4%B9%89%E6%AD%A3%E5%88%99
 */

import AppLayout from '/@/layouts/app-layout.vue'
import NotFoundError from '/@/views/features/404.vue'
// import ServerError from '/@/views/features/500'
import Login from '/@/views/login/index.vue'
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
  // {
  //   path: '/500',
  //   name: 'ServerError',
  //   component: ServerError
  // },
  // {
  //   path: '/redirect',
  //   name: 'Redirect',
  //   component: AppLayout,
  //   meta: {
  //     requiresAuth: false
  //   },
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('/@/views/features/redirect'),
  //       meta: {
  //         requiresAuth: false
  //       }
  //     }
  //   ]
  // },
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
  // {
  //   path: '/system',
  //   name: 'System',
  //   meta: {
  //   },
  //   component: AppLayout,
  //   redirect: {
  //     name: 'SystemDataDictionary'
  //   },
  //   children: [
  //     {
  //       path: 'data-dictionary',
  //       name: 'SystemDataDictionary',
  //       meta: {
  //       },
  //       component: () => import('/@/views/system/data-dictionary')
  //     },
  //     {
  //       path: 'menu',
  //       name: 'SystemMenu',
  //       meta: {
  //       },
  //       component: () => import('/@/views/system/menu')
  //     },
  //     {
  //       path: 'role',
  //       name: 'SystemRole',
  //       meta: {
  //       },
  //       component: () => import('/@/views/system/rule')
  //     }
  //   ]
  // }
]

// example 路由
const example = [
  // {
  //   path: '/example',
  //   name: 'Example',
  //   meta: {
  //   },
  //   component: AppLayout,
  //   redirect: {
  //     name: 'ExampleCrud'
  //   },
  //   children: [
  //     {
  //       path: 'crud',
  //       name: 'ExampleCrud',
  //       meta: {
  //       },
  //       component: () => import('/@/views/example/crud')
  //     },
  //     {
  //       path: 'shared-store',
  //       name: 'ExampleSharedStore',
  //       meta: {
  //       },
  //       component: () => import('/@/views/example/shared-store-crud')
  //     },
  //     {
  //       path: 'permission',
  //       name: 'ExamplePermission',
  //       meta: {
  //       },
  //       component: () => import('/@/views/example/permission')
  //     },
  //     {
  //       path: 'deep',
  //       name: 'ExampleDeep',
  //       meta: {
  //       },
  //       component: () => import('/@/views/example/deep')
  //     },
  //     {
  //       path: 'group-menu',
  //       name: 'ExampleGroupMenu',
  //       meta: {
  //       },
  //       component: () => import('/@/views/example/group')
  //     },
  //     {
  //       path: 'nested',
  //       name: 'ExampleNested',
  //       meta: {
  //       },
  //       component: () => import('/@/views/example/nested/layout'),
  //       redirect: {
  //         name: 'ExampleNestedList'
  //       },
  //       children: [
  //         {
  //           path: 'list',
  //           name: 'ExampleNestedList',
  //           meta: {
  //           },
  //           component: () => import('/@/views/example/nested/list')
  //         },
  //         {
  //           path: 'detail',
  //           name: 'ExampleNestedDetail',
  //           meta: {
  //           },
  //           component: () => import('/@/views/example/nested/detail')
  //         }
  //       ]
  //     }
  //   ]
  // }
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
