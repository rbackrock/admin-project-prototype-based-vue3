import _ from 'lodash'

function permission(el, binding) {
  const {
    value,
    instance: vm,
    modifiers,
    arg
  } = binding
  if (vm && value && _.isArray(value)) {
    const currentUserRule = vm.$store.getters['user/userRule']
    const currentRouteName = vm.$route.name
    let hasPermission = false

    if (value.every((item) => currentUserRule.indexOf(`${currentRouteName}:${item}`) !== -1)) {
      hasPermission = true
    }

    if (hasPermission === false) {
      if (modifiers.disabled === true) {
        // disable
        if (arg) {
          vm[arg] = true
        }
      } else if (modifiers.remove === true) {
        // remove
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}

const install = function (Vue) {
  Vue.directive('permission', {
    created(el, binding) {
      permission(el, binding)
    },

    mounted(el, binding) {
      permission(el, binding)
    },

    updated(el, binding) {
      permission(el, binding)
    }
  })
}

export default install
