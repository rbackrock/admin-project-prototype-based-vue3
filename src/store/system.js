import { defineStore } from 'pinia'
import * as api from '/@/api/system'
import {
  getRspMenuTableKeys,
  makeNavigationMenu,
  getNavigationOnlyMenuFlat,
  getNavigationFlat
} from '/@/router/helper'
import { useUserStore } from './user'

export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      // 导航菜单
      navigationMenu: [],
      // 是否成功请求导航菜单
      isFetchNavigationMenu: false,
      // 扁平化用户有权限的导航菜单
      requiresAuthMenuOfKeys: [],
      // 字典数据
      dictionary: [],
      // 是否成功请求字典数据
      isFetchDictionary: false
    }
  },

  getters: {
    navigationMenuForTopLayout: (state) => (splitIndex) => {
      const navigationMenuOrigin = state.navigationMenu
      const splitLeft = [...navigationMenuOrigin].splice(0, splitIndex)
      const splitRight = [...navigationMenuOrigin].splice(splitIndex, navigationMenuOrigin.length)

      splitLeft.push({
        routeName: 'TopLayoutMore',
        title: '...',
        uniqueTag: 'More',
        type: 'catalog',
        children: splitRight
      })

      return splitLeft
    },

    authMenuKeys: (state) => state.requiresAuthMenuOfKeys,

    navigationOnlyMenuFlat: (state) => getNavigationOnlyMenuFlat(state.navigationMenu),

    navigationFlat: (state) => getNavigationFlat(state.navigationMenu),

    getDictionaryValue: (state) => (dictionaryTypeName, codeName) => state.dictionary[dictionaryTypeName].code[codeName].codeValue,

    getDictionaryTypeMapper: (state) => (dictionaryTypeName) => state.dictionary[dictionaryTypeName].code,

    // 是否准备好了系统数据
    // 包含，系统菜单数据，字典数据，用户数据，用户权限数据
    isReadySystemData(state) {
      const userStore = useUserStore()
      return state.isFetchNavigationMenu && state.isFetchDictionary && userStore.isFetchUser && userStore.isFetchRule
    }
  },

  actions: {
    async buildNavigationMenu() {
      const { data } = await api.queryMenu()
      this.navigationMenu = makeNavigationMenu(data)
      this.requiresAuthMenuOfKeys = getRspMenuTableKeys(data)
      this.isFetchNavigationMenu = true

      return data
    },

    async buildDictionary() {
      const { data } = await api.queryDictionary()
      const dictionary = {}
      for (let i = 0; i < data.length; i++) {
        const current = data[i]

        dictionary[current.typeName] = {
          typeDescription: current.typeDescription,
          code: {},
          list: current.code
        }

        for (let n = 0; n < current.code.length; n++) {
          const currentCode = current.code[n]
          dictionary[current.typeName].code[currentCode.codeName] = {
            codeDescription: currentCode.codeDescription,
            codeValue: currentCode.codeValue
          }
        }
      }
      this.dictionary = dictionary
      this.isFetchDictionary = true

      return data
    }
  }
})
