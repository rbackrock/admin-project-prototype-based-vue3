<template>
  <component
    :is="navigationComponent"
    class="main-layout"
  />
</template>

<script>
import { mapState, useStore } from 'vuex'
import { layoutType as layoutTypeConsts } from '/@/consts'
import Loading from './components/Loading.vue'
import ServerError from '/@/views/features/500.vue'
import NavigationSiderLayout from './navigation-sider-layout.vue'
import NavigationTopLayout from './navigation-top-layout.vue'
import NavigationMixLayout from './navigation-mix-layout.vue'

export default {
  name: 'AppLayout',
  components: {
    Loading,
    ServerError,
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

        if (this.hasError) {
          return 'server-error'
        } else {
          if (this.hasReady) {
            return componentsMapper[state.layoutType]
          }

          return 'loading'
        }
      }
    })
  },
  async created() {
    const store = useStore()
    const user = this.$store.getters['user/userInfo']

    if (!user) {
      try {
        await store.dispatch('system/buildNavigationMenu')
        await store.dispatch('system/buildDictionary')
        await store.dispatch('user/getUser')
        await store.dispatch('user/rule')

        this.hasError = false
        this.hasReady = true
      } catch (error) {
        this.hasError = true
        this.hasReady = false

        throw error
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
