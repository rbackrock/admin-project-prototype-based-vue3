<template>
  <component
    :is="navigationComponent"
    class="main-layout"
  />
</template>

<script>
import { mapState } from 'vuex'
import { layoutType as layoutTypeConsts } from '/@/consts'
import Loading from './components/Loading.vue'
import Error from '/@/views/features/500.vue'
import NavigationSiderLayout from './navigation-sider-layout.vue'
import NavigationTopLayout from './navigation-top-layout.vue'
import NavigationMixLayout from './navigation-mix-layout.vue'

export default {
  name: 'AppLayout',
  components: {
    Loading,
    Error,
    NavigationSiderLayout,
    NavigationTopLayout,
    NavigationMixLayout
  },
  data() {
    return {
      hasReady: false,
      hasError: false
    }
  },
  computed: {
    ...mapState('settings', {
      navigationComponent: function (state) {
        const componentsMapper = []
        componentsMapper[layoutTypeConsts.SIDE_MENU] = 'navigation-sider-layout'
        componentsMapper[layoutTypeConsts.TOP_MENU] = 'navigation-top-layout'
        componentsMapper[layoutTypeConsts.MIX_MENU] = 'navigation-mix-layout'

        if (this.hasReady) {
          return componentsMapper[state.layoutType]
        }

        return 'loading'
      }
    })
  },
  methods: {
    handleTest() {
      this.hasReady = !this.hasReady
    }
  }
}
</script>

<style lang="less" scoped>
</style>
