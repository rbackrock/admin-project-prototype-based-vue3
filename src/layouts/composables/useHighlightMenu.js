import {
  ref,
  watch,
  onMounted
} from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

/**
 * 获取当前高亮菜单的 route name
 * @param {Array} routeMatched route 中的 routeMatched
 * @param {Array} navigationOnlyMenuFlat 扁平化过的菜单树
 * @returns 当前高亮菜单的 route name
 */
function findCurrentMenuKeys(routeMatched = [], navigationOnlyMenuFlat = []) {
  const currentKeys = []
  for (let i = routeMatched.length - 1; i >= 0; i--) {
    const currentRouteMatched = routeMatched[i]

    for (let n = 0; n < navigationOnlyMenuFlat.length; n++) {
      const currentMenu = navigationOnlyMenuFlat[n]

      if (currentRouteMatched.name === currentMenu.routeName) {
        currentKeys.push(currentMenu.routeName)
      }
    }
  }

  return currentKeys
}

export default function useHighlightMenu() {
  const route = useRoute()
  const store = useStore()
  const selectedMenuKeys = ref([])
  const navigationOnlyMenuFlat = store.getters['system/navigationOnlyMenuFlat']

  onMounted(() => {
    const currentMenuKeys = findCurrentMenuKeys(route.matched, navigationOnlyMenuFlat)
    selectedMenuKeys.value = currentMenuKeys
  })

  watch(route, (viewRoute) => {
    const currentMenuKeys = findCurrentMenuKeys(viewRoute.matched, navigationOnlyMenuFlat)
    selectedMenuKeys.value = currentMenuKeys
  })

  return {
    selectedMenuKeys
  }
}
