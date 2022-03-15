import {
  ref,
  nextTick,
  onMounted,
  onDeactivated
} from 'vue'
import { useSystemStore } from '/@/store/system'
import * as consts from '/@/consts'

async function reBuildMenu(menuRef, menuLiWidth, navigationMenu, store) {
  await nextTick()
  if (menuRef.value && menuRef.value.parentElement) {
    const menuUlWidth = menuRef.value.parentElement.offsetWidth
    let splitIndex = 0

    for (let i = 0, liTotalWidth = 0; i < menuLiWidth.length; i++) {
      liTotalWidth += menuLiWidth[i]

      if (liTotalWidth + 56 > menuUlWidth) {
        if (i > 1) {
          splitIndex = i
        }

        break
      }
    }

    if (splitIndex !== 0) {
      navigationMenu.value = store.getters['system/navigationMenuForTopLayout'](splitIndex)
    }
  }
}

export default function useBuildMenu() {
  const systemStore = useSystemStore()

  const navigationMenu = ref(systemStore.navigationMenu)
  const navigationMenuMapper = systemStore.getDictionaryTypeMapper('navigationMenuType')

  // top layout 使用
  const menuLiWidth = []
  const menuRef = ref(null)

  onMounted(async () => {
    if (store.state.settings.layoutType === consts.layoutType.TOP_MENU) {
      await nextTick()
      const liNodes = menuRef.value.parentElement.querySelectorAll('li')
      for (let i = 0; i < liNodes.length; i++) {
        menuLiWidth.push(liNodes[i].offsetWidth)
      }
      reBuildMenu(menuRef, menuLiWidth, navigationMenu, store)

      window.addEventListener('resize', reBuildMenu)
    }
  })

  onDeactivated(() => {
    if (store.state.settings.layoutType === consts.layoutType.TOP_MENU) {
      window.removeEventListener('resize', reBuildMenu)
    }
  })

  return {
    menuRef,
    navigationMenu,
    navigationMenuMapper
  }
}
