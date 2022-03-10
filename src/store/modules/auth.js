import * as api from '/@/api/auth'
import * as auth from '/@/utils/auth'
import * as keys from '/@/utils/encrypt/keys'
import { encrypt } from '/@/utils/encrypt'

const state = () => ({
  token: auth.getEnduranceTokenOfStorage()
})

const getters = {
  token(state) {
    return state.token
  }
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}

const actions = {
  /* 登录成功主要做两件事
   * #1 把 jwt 令牌存储在 vuex 中
   * #2 把 jwt 令牌持久化在 sessionStorage 中，为了防止在登录成功之后，用户刷新页面反复登录的问题
   */
  async login({ commit }, { username, password }) {
    try {
      const { data } = await api.login({
        username,
        password: encrypt(keys.publicKeyForBackend, password)
      })
      auth.saveEnduranceTokenOfStorage(data)
      commit('SET_TOKEN', data)

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async logout({ commit }) {
    try {
      // TODO 可能要调用一些借口
      commit('user/SET_USER', null, { root: true })
      commit('SET_TOKEN', null)
      auth.clearEnduranceTokenOfStorage()
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
