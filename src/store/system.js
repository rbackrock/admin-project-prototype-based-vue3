import { defineStore } from 'pinia'
import * as api from '/@/api/system'
import {
  getRspMenuTableKeys,
  makeNavigationMenu,
  getNavigationOnlyMenuFlat,
  getNavigationFlat
} from '/@/router/helper'

export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      navigationMenu: [],
      requiresAuthMenuOfKeys: [],
      dictionary: []
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

    getDictionaryTypeMapper: (state) => (dictionaryTypeName) => state.dictionary[dictionaryTypeName].code
  },

  actions: {
    async buildNavigationMenu() {
      try {
        const { data } = await api.queryMenu()
        this.navigationMenu = makeNavigationMenu(data)
        this.requiresAuthMenuOfKeys = getRspMenuTableKeys(data)

        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async buildDictionary() {
      try {
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
  
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
