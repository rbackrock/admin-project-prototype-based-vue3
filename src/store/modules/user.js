import * as api from '/@/api/user'

const state = () => ({
  user: null,
  rule: []
})

const getters = {
  userInfo(state) {
    return state.user
  },

  userRule(state) {
    return state.rule
  }
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },

  SET_RULE(state, rule) {
    state.rule = rule
  }
}

const actions = {
  async getUser({ commit }) {
    try {
      const { data } = await api.queryUser()
      commit('SET_USER', data)

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async rule({ commit }) {
    try {
      const { data } = await api.queryRule()
      commit('SET_RULE', data)

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
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
