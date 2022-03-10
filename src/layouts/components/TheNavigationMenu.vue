<script>
import { useRouter } from 'vue-router'
import useBuildMenu from '../composables/useBuildMenu'
import useHighlightMenu from '../composables/useHighlightMenu'
import useOpenMenuKeysRepositories from '../composables/useOpenMenuKeysRepositories'

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

const Menu = (props) => {
  const router = useRouter()
  const navigationMenu = props.menu
  const navigationMapper = props.navigationMenuMapper

  return (
    navigationMenu.map((navigation) => {
      if (navigation.type === navigationMapper.catalog.codeValue) {
        return (
          <a-sub-menu
            key={navigation.routeName}
            v-slots={{ title: () => <MenuSlot navigation={navigation} /> }}
          >
            <Menu menu={ navigation.children } navigationMenuMapper={ navigationMapper } />
          </a-sub-menu>
        )
      }

      if (navigation.type === navigationMapper.group.codeValue) {
        return (
          <a-menu-item-group
            key={navigation.routeName}
            v-slots={{ title: () => <MenuSlot navigation={navigation} /> }}
          >
            <Menu menu={ navigation.children } navigationMenuMapper={ navigationMapper } />
          </a-menu-item-group>
        )
      }

      if (navigation.type === navigationMapper.menu.codeValue) {
        return (
          <a-menu-item
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

// 递归菜单组件还是 jsx 好用
export default {
  name: 'NavigationMenu',
  setup() {
    // 构建菜单
    const { menuRef, navigationMenu, navigationMenuMapper } = useBuildMenu()
    // 高亮当前菜单
    const { selectedMenuKeys } = useHighlightMenu()
    // 展开当前菜单所在目录
    const { openMenuKeys } = useOpenMenuKeysRepositories()

    return () => (
      <a-menu
        theme="dark" // 没有像 V2 版本一样没有设置 v-bind="$attrs" 但是也会覆盖
        mode="inline"
        v-models={[[selectedMenuKeys.value, 'selectedKeys'], [openMenuKeys.value, 'openKeys']]}
      >
        <Menu ref={ menuRef } menu={ navigationMenu.value } navigationMenuMapper={ navigationMenuMapper } />
      </a-menu>
    )
  }
}
</script>

<style lang="less" scoped>
  .ant-menu {
    &,
    & * {
      user-select: none;
    }
  }
</style>
