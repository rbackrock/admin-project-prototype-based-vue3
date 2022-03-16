import {
  ref
} from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '/@/store/settings'
import { useSystemStore } from '/@/store/system'
import * as consts from '/@/consts'
import * as utils from '/@/utils/helper'

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
  const settingsStore = useSettingsStore()
  const systemStore = useSystemStore()
  const openMenuKeys = ref([])

  if (settingsStore.layoutType === consts.layoutType.SIDE_MENU
  || settingsStore.layoutType === consts.layoutType.MIX_MENU) {
    openMenuKeys.value = findParentMenuKeys(
      utils.findTreeNodePath(systemStore.navigationMenu, 'routeName', route.name),
      systemStore.getDictionaryValue('navigationMenuType', 'catalog')
    )
  }

  return {
    openMenuKeys
  }
}
