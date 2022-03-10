import { layoutType, themeConsts } from '/@/consts'

const state = () => ({
  layoutType: layoutType.MIX_MENU,
  theme: themeConsts.DEFAULT_THEME
})

const getters = {
  layoutType(state) {
    return state.layoutType
  },

  theme(state) {
    return state.theme
  },

  isMenuLayout: (state) => (layoutState) => state.layoutType === layoutState
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
