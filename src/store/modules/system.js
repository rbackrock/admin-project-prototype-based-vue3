import * as api from '/@/api/system'
import {
  getRspMenuTableKeys,
  makeNavigationMenu,
  getNavigationOnlyMenuFlat,
  getNavigationFlat
} from '/@/router/helper'

const state = () => ({
  navigationMenu: [],
  requiresAuthMenuOfKeys: [],
  dictionary: {}
})

const getters = {
  navigationMenu(state) {
    return state.navigationMenu
  },

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

  authMenuKeys(state) {
    return state.requiresAuthMenuOfKeys
  },

  navigationOnlyMenuFlat(state) {
    return getNavigationOnlyMenuFlat(state.navigationMenu)
  },

  navigationFlat(state) {
    return getNavigationFlat(state.navigationMenu)
  },

  getDictionaryValue: (state) => (dictionaryTypeName, codeName) => state.dictionary[dictionaryTypeName].code[codeName].codeValue,

  getDictionaryTypeMapper: (state) => (dictionaryTypeName) => state.dictionary[dictionaryTypeName].code
}

const mutations = {
  SET_NAVIGATION_MENU(state, menu) {
    state.navigationMenu = menu
  },

  SET_REQUIRES_AUTH_MENU_OF_KEYS(state, keys) {
    state.requiresAuthMenuOfKeys = keys
  },

  SET_DICTIONARY(state, dictionary) {
    state.dictionary = dictionary
  }
}

const actions = {
  async buildNavigationMenu({ commit }) {
    try {
      const { data } = await api.queryMenu()
      commit('SET_NAVIGATION_MENU', makeNavigationMenu(data))
      commit('SET_REQUIRES_AUTH_MENU_OF_KEYS', getRspMenuTableKeys(data))

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async buildDictionary({ commit }) {
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
      commit('SET_DICTIONARY', dictionary)

      return Promise.resolve(data)
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
