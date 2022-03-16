/* eslint-disable no-alert */
/**
 * 编辑器例如 vscode 如果有报错属于正常现象
 */

import { useRouter } from 'vue-router'
import {
  Menu,
  MenuItem,
  MenuItemGroup,
  SubMenu
} from 'ant-design-vue'
import useBuildMenu from '../../composables/useBuildMenu'
import useHighlightMenu from '../../composables/useHighlightMenu'
import useOpenMenuKeysRepositories from '../../composables/useOpenMenuKeysRepositories'
import './index.less'

const MenuIcon = (props, context) => (
  props.icon(props, context)
)

const MenuSlot = (props) => {
  const { navigation } = props

  return (
    <span>
      {
        navigation.icon ? <MenuIcon icon={navigation.icon} /> : null
      }
      <span>{ navigation.title }</span>
    </span>
  )
}

const MenuContainer = (props) => {
  const router = useRouter()
  const navigationMenu = props.menu
  const navigationMapper = props.navigationMenuMapper

  return (
    navigationMenu.map((navigation) => {
      if (navigation.type === navigationMapper.catalog.codeValue) {
        return (
          <SubMenu
            key={navigation.routeName}
            v-slots={{ title: () => <MenuSlot navigation={navigation} /> }}
          >
            <MenuContainer menu={ navigation.children } navigationMenuMapper={ navigationMapper } />
          </SubMenu>
        )
      }

      if (navigation.type === navigationMapper.group.codeValue) {
        return (
          <MenuItemGroup
            key={navigation.routeName}
            v-slots={{ title: () => <MenuSlot navigation={navigation} /> }}
          >
            <MenuContainer menu={ navigation.children } navigationMenuMapper={ navigationMapper } />
          </MenuItemGroup>
        )
      }

      if (navigation.type === navigationMapper.menu.codeValue) {
        return (
          <MenuItem
            key={navigation.routeName}
            v-slots={{ default: () => <MenuSlot navigation={ navigation } /> }}
            onClick={ () => router.push({ name: navigation.routeName }) }
          />
        )
      }

      return null
    })
  )
}

export default {
  components: {
    Menu,
    MenuItem,
    MenuItemGroup,
    SubMenu
  },
  setup() {
    // 构建菜单
    const { menuRef, navigationMenu, navigationMenuMapper } = useBuildMenu()
    // 高亮当前菜单
    const { selectedMenuKeys } = useHighlightMenu()
    // 展开当前菜单所在目录
    const { openMenuKeys } = useOpenMenuKeysRepositories()

    return () => (
      <Menu
        theme="dark" // 没有像 V2 版本一样没有设置 v-bind="$attrs" 但是也会覆盖
        mode="inline"
        v-models={[[selectedMenuKeys.value, 'selectedKeys'], [openMenuKeys.value, 'openKeys']]}
      >
        <MenuContainer ref={ menuRef } menu={ navigationMenu.value } navigationMenuMapper={ navigationMenuMapper } />
      </Menu>
    )
  }
}


