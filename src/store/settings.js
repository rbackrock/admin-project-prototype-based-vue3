import { defineStore } from 'pinia'
import { layoutType, themeConsts } from '/@/consts'

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      layoutType: layoutType.MIX_MENU,
      theme: themeConsts.DEFAULT_THEME
    }
  },

  getters: {
    isMenuLayout: (state) => (layoutState) => state.layoutType === layoutState 
  }
})