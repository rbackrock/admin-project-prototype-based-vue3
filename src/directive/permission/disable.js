import { useUserStore } from '/@/store/user'
import _ from 'lodash'

function validPermission(value, currentRouteName, currentUserRule) {
  // 就算用了权限指令，也没有值，判断为有权限
  if (!value || value.length === 0) {
    return true
  }

  // 有值，那么和用户 role 数据进行对比判断有没有权限
  for (let i = 0; i < value.length; i++) {
    const currentPermission = value[i]
    if (currentUserRule.indexOf(`${currentRouteName}:${currentPermission}`) !== -1 || currentUserRule.indexOf(currentPermission) !== -1) {
      return true
    }
  }

  return false
}

function permission(el, binding, vnode) {
  const {
    value,
    instance: vm,
    modifiers,
    arg
  } = binding
  if (vm && value && _.isArray(value)) {
    const userStore = useUserStore()
    const currentUserRule = userStore.userRule
    const currentRouteName = vm.$route.name
    let hasPermission = validPermission(value, currentRouteName, currentUserRule)

    if (hasPermission === false) {
      // disable
      if (arg) {
        arg.disabled = true
      }
    }
  }
}

const install = function (Vue) {
  Vue.directive('permission-disable', {
    created(el, binding, vnode) {
      permission(el, binding, vnode)
    },

    mounted(el, binding, vnode) {
      permission(el, binding, vnode)
    },

    updated(el, binding, vnode) {
      permission(el, binding, vnode)
    }
  })
}

export default install
