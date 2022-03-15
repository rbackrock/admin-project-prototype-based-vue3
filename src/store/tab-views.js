import { defineStore } from 'pinia'
import { useSystemStore } from './system'

export const useTabViewsStore = defineStore('tabViews', {
  state: () => {
    return {
      cacheViews: [],
      cacheViewsKeys: [],
      activeViewKey: ''
    }
  },

  getters: {
    currentActiveViewKey: (state) => state.activeViewKey,

    getLastCacheViewKey: (state) => state.cacheViewsKeys[state.cacheViewsKeys.length - 1]
  },

  actions: {
    init() {
      const systemStore = useSystemStore()
      let fixedIndexCount = -1
      const navigationOnlyMenuFlat = systemStore.navigationOnlyMenuFlat

      for (let i = 0; i < navigationOnlyMenuFlat.length; i++) {
        const current = navigationOnlyMenuFlat[i]
        if (current.fixed) {
          fixedIndexCount += 1
          this.add({
            title: current.title,
            routeName: current.routeName,
            spin: false,
            fixed: current.fixed
          })
        }
      }
  
      if (fixedIndexCount !== -1) {
        this.active(navigationOnlyMenuFlat[fixedIndexCount].routeName)
      }
    },

    add(viewRoute) {
      if (this.cacheViewsKeys.indexOf(viewRoute.routeName) === -1) {
        this.cacheViews.push(viewRoute)
        this.cacheViewsKeys.push(viewRoute.routeName)
        this.activeViewKey = viewRoute.routeName
      }
    },

    del(deleteRouteNamesKey = []) {
      const fixedRouteNameKeys = []
      this.cacheViews = this.cacheViews.filter((route) => {
        if (route.fixed === true) {
          fixedRouteNameKeys.push(route.routeName)
          return true
        }

        return deleteRouteNamesKey.indexOf(route.routeName) === -1
      })
      this.cacheViewsKeys = this.cacheViewsKeys.filter((routeName) => {
        if (fixedRouteNameKeys.indexOf(routeName) !== -1) {
          return true
        }

        return deleteRouteNamesKey.indexOf(routeName) === -1
      })
    },

    active(routeName) {
      if (routeName) {
        this.activeViewKey = routeName
      } else if (this.cacheViewsKeys.length > 0) {
        this.activeViewKey = [...this.cacheViewsKeys][this.cacheViewsKeys.length - 1]
      }
    },

    closeCurrentTabView(routeName) {
      this.del([routeName])
    },

    closeOtherTabViews(reserveRouteName) {
      const deleteRouteNamesKey = this.cacheViewsKeys.filter((routeName) => routeName !== reserveRouteName)
      this.del(deleteRouteNamesKey)
    },

    closeAllToTheLeft(reserveRouteName) {
      const reserveRouteNameIndex = this.cacheViewsKeys.findIndex((k) => k === reserveRouteName)
      if (reserveRouteNameIndex > 0) {
        const deleteRouteNamesKey = this.cacheViewsKeys.filter((k, index) => index < reserveRouteNameIndex)
        this.del(deleteRouteNamesKey)
      }
    },

    closeAllToTheRight(reserveRouteName) {
      const reserveRouteNameIndex = this.cacheViewsKeys.findIndex((k) => k === reserveRouteName)

      if (reserveRouteNameIndex !== this.cacheViewsKeys.length - 1) {
        const deleteRouteNamesKey = this.cacheViewsKeys.filter((k, index) => index > reserveRouteNameIndex)
        this.del(deleteRouteNamesKey)
      }
    }
  }
})
