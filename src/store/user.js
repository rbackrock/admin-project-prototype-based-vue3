import { defineStore } from 'pinia'
import * as api from '/@/api/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      rule: []
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
    },

    async fetchRule() {
      const { data } = await api.queryRule()
      this.rule = data
    },

    emptyUser() {
      this.user = null
    }
  }
})
