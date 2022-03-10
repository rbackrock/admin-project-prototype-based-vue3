import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

function makeTabRouteMenu(routeMatched = [], navigationOnlyMenuFlat = []) {
  let routeMenu = null
  for (let i = routeMatched.length - 1; i >= 0; i--) {
    const current = routeMatched[i]
    const findMenu = navigationOnlyMenuFlat.find((menu) => menu.routeName === current.name)
    if (findMenu) {
      routeMenu = {
        title: findMenu.title,
        routeName: current.name,
        spin: false,
        fixed: findMenu.fixed
      }
    }
  }

  return routeMenu
}

export default function useTabView() {
  const route = useRoute()
  const store = useStore()

  onMounted(() => {
    const routeMatched = route.matched
    const navigationOnlyMenuFlat = store.getters['system/navigationOnlyMenuFlat']
    const routeMenu = makeTabRouteMenu(routeMatched, navigationOnlyMenuFlat)
    if (routeMenu) {
      store.dispatch('tab-views/init')
      store.dispatch('tab-views/add', routeMenu)
      store.dispatch('tab-views/active', routeMenu.routeName)
    }
  })

  watch(route, (viewRoute) => {
    const routeMatched = viewRoute.matched
    const navigationOnlyMenuFlat = store.getters['system/navigationOnlyMenuFlat']
    const routeMenu = makeTabRouteMenu(routeMatched, navigationOnlyMenuFlat)
    if (routeMenu) {
      store.dispatch('tab-views/add', routeMenu)
      store.dispatch('tab-views/active', routeMenu.routeName)
    }
  })
}
