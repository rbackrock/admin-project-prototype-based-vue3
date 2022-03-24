import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { useTabViewsStore } from './tab-views'
import * as api from '/@/api/auth'
import * as auth from '/@/utils/auth'
import * as keys from '/@/utils/encrypt/keys'
import { encrypt } from '/@/utils/encrypt'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: auth.getEnduranceTokenOfStorage()
    }
  },

  getters: {
  },

  actions: {
    async login({ username, password }) {
      const { data } = await api.login({
        username,
        password: encrypt(keys.publicKeyForBackend, password)
      })

      auth.saveEnduranceTokenOfStorage(data)
      this.token = data
    },

    async logout() {
      const userStore = useUserStore()
      const tabViewsStore = useTabViewsStore()

      tabViewsStore.reset()
      userStore.emptyUser()
      this.token = null
      // TODO 可能要调用一些接口
      auth.clearEnduranceTokenOfStorage()
    }
  }
})
