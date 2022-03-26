import { useUserStore } from '/@/store/user'
import _ from 'lodash'

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
    let hasPermission = false

    if (value.every((item) => currentUserRule.indexOf(`${currentRouteName}:${item}`) !== -1)) {
      hasPermission = true
    }

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
