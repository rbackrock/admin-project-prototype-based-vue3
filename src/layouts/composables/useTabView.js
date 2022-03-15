import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSystemStore } from '/@/store/system'
import { useTabViewsStore } from '/@/store/tab-views'

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
  const systemStore = useSystemStore()
  const tabViewsStore = useTabViewsStore()

  onMounted(() => {
    const routeMatched = route.matched
    const navigationOnlyMenuFlat = systemStore.navigationOnlyMenuFlat
    const routeMenu = makeTabRouteMenu(routeMatched, navigationOnlyMenuFlat)
    if (routeMenu) {
      tabViewsStore.init()
      tabViewsStore.add(routeMenu)
      tabViewsStore.active(routeMenu.routeName)
    }
  })

  watch(route, (viewRoute) => {
    const routeMatched = viewRoute.matched
    const navigationOnlyMenuFlat = systemStore.navigationOnlyMenuFlat
    const routeMenu = makeTabRouteMenu(routeMatched, navigationOnlyMenuFlat)

    if (routeMenu) {
      tabViewsStore.add(routeMenu)
      tabViewsStore.active(routeMenu.routeName)
    }
  })
}
