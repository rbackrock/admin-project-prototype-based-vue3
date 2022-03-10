<template>
  <component :is="navigationComponent" class="main-layout"></component>
</template>

<script>
import { mapState } from 'vuex'
import { layoutType as layoutTypeConsts } from '@/consts'
import NavigationSiderLayout from './navigation-sider-layout.vue'
import NavigationTopLayout from './navigation-top-layout.vue'
import NavigationMixLayout from './navigation-mix-layout.vue'

export default {
  name: 'AppLayout',
  components: {
    NavigationSiderLayout,
    NavigationTopLayout,
    NavigationMixLayout
  },
  computed: {
    ...mapState('settings', {
      navigationComponent: (state) => {
        const componentsMapper = []
        componentsMapper[layoutTypeConsts.SIDE_MENU] = 'navigation-sider-layout'
        componentsMapper[layoutTypeConsts.TOP_MENU] = 'navigation-top-layout'
        componentsMapper[layoutTypeConsts.MIX_MENU] = 'navigation-mix-layout'

        return componentsMapper[state.layoutType]
      }
    })
  }
}
</script>

<style lang="less" scoped>
</style>
