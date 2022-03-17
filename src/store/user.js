import { defineStore } from 'pinia'
import * as api from '/@/api/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      isFetchUser: false,
      rule: [],
      isFetchRule: false
    }
  },

  getters: {
    userInfo: (state) => state.user,

    userRule: (state) => state.rule
  },

  actions: {
    async fetchUser() {
      const { data } = await api.queryUser()
      this.user = data
      this.isFetchUser = true
    },

    async fetchRule() {
      const { data } = await api.queryRule()
      this.rule = data
      this.isFetchRule = true
    },

    emptyUser() {
      this.user = null
    }
  }
})
