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
    async getUser() {
      try {
        const { data } = await api.queryUser()
        this.user = data
  
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async rule() {
      try {
        const { data } = await api.queryRule()
        this.rule = data
  
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },

    emptyUser() {
      this.user = null
    }
  }
})
