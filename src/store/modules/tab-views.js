const state = () => ({
  cacheViews: [],
  cacheViewsKeys: [],
  activeViewKey: ''
})

const getters = {
  currentActiveViewKey(state) {
    return state.activeViewKey
  },

  getLastCacheViewKey(state) {
    return state.cacheViewsKeys[state.cacheViewsKeys.length - 1]
  }
}

const mutations = {
  ADD_VIEW: (state, viewRoute) => {
    if (state.cacheViewsKeys.indexOf(viewRoute.routeName) === -1) {
      state.cacheViews.push(viewRoute)
      state.cacheViewsKeys.push(viewRoute.routeName)
      state.activeViewKey = viewRoute.routeName
    }
  },

  DELETE_VIEW: (state, deleteRouteNamesKey = []) => {
    const fixedRouteNameKeys = []
    state.cacheViews = state.cacheViews.filter((route) => {
      if (route.fixed === true) {
        fixedRouteNameKeys.push(route.routeName)
        return true
      }

      return deleteRouteNamesKey.indexOf(route.routeName) === -1
    })
    state.cacheViewsKeys = state.cacheViewsKeys.filter((routeName) => {
      if (fixedRouteNameKeys.indexOf(routeName) !== -1) {
        return true
      }

      return deleteRouteNamesKey.indexOf(routeName) === -1
    })
  },

  ACTIVE_VIEW: (state, routeName) => {
    if (routeName) {
      state.activeViewKey = routeName
    } else if (state.cacheViewsKeys.length > 0) {
      state.activeViewKey = [...state.cacheViewsKeys][state.cacheViewsKeys.length - 1]
    }
  }
}

const actions = {
  init({ commit, rootGetters }) {
    let fixedIndexCount = -1
    const navigationOnlyMenuFlat = rootGetters['system/navigationOnlyMenuFlat']
    for (let i = 0; i < navigationOnlyMenuFlat.length; i++) {
      const current = navigationOnlyMenuFlat[i]
      if (current.fixed) {
        fixedIndexCount += 1
        commit('ADD_VIEW', {
          title: current.title,
          routeName: current.routeName,
          spin: false,
          fixed: current.fixed
        })
      }
    }

    if (fixedIndexCount !== -1) {
      commit('ACTIVE_VIEW', navigationOnlyMenuFlat[fixedIndexCount].routeName)
    }
  },

  add({ commit }, viewRoute) {
    commit('ADD_VIEW', viewRoute)
  },

  del({ commit }, routeName) {
    commit('DELETE_VIEW', routeName)
  },

  active({ commit }, routeName) {
    commit('ACTIVE_VIEW', routeName)
  },

  closeCurrentTabView({ commit }, routeName) {
    commit('DELETE_VIEW', [routeName])
  },

  closeOtherTabViews({ commit, state }, reserveRouteName) {
    const deleteRouteNamesKey = state.cacheViewsKeys.filter((routeName) => routeName !== reserveRouteName)
    commit('DELETE_VIEW', deleteRouteNamesKey)
  },

  closeAllToTheLeft({ commit, state }, reserveRouteName) {
    const reserveRouteNameIndex = state.cacheViewsKeys.findIndex((k) => k === reserveRouteName)
    if (reserveRouteNameIndex > 0) {
      const deleteRouteNamesKey = state.cacheViewsKeys.filter((k, index) => index < reserveRouteNameIndex)
      commit('DELETE_VIEW', deleteRouteNamesKey)
    }
  },

  closeAllToTheRight({ commit, state }, reserveRouteName) {
    const reserveRouteNameIndex = state.cacheViewsKeys.findIndex((k) => k === reserveRouteName)

    if (reserveRouteNameIndex !== state.cacheViewsKeys.length - 1) {
      const deleteRouteNamesKey = state.cacheViewsKeys.filter((k, index) => index > reserveRouteNameIndex)
      commit('DELETE_VIEW', deleteRouteNamesKey)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
