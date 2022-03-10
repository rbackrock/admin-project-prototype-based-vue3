import {
  ref
} from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import * as consts from '@/consts'
import * as utils from '@/utils/helper'

/**
 * 获取当前菜单所处分类中，父类的 key
 * @param {Array} navigationPath 当前菜单的路径
 * @returns 当前菜单所处分类中，父类的 key 集合
 */
function findParentMenuKeys(navigationPath = [], catelogTypeValue) {
  const parentMenuKeys = []
  for (let i = 0; i < navigationPath.length; i++) {
    const current = navigationPath[i]
    if (current.type === catelogTypeValue) {
      parentMenuKeys.push(current.routeName)
    }
  }

  return parentMenuKeys
}

export default function useOpenMenuKeysRepositories() {
  const route = useRoute()
  const store = useStore()
  const openMenuKeys = ref([])

  if (store.state.settings.layoutType === consts.layoutType.SIDE_MENU
  || store.state.settings.layoutType === consts.layoutType.MIX_MENU) {
    openMenuKeys.value = findParentMenuKeys(
      utils.findTreeNodePath(store.state.system.navigationMenu, 'routeName', route.name),
      store.getters['system/getDictionaryValue']('navigationMenuType', 'catalog')
    )
  }

  return {
    openMenuKeys
  }
}
