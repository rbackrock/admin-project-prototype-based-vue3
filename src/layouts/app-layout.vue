<script setup>
  import { ref, onMounted, computed } from 'vue'

  import { useSystemStore } from '/@/store/system'
  import { useUserStore } from '/@/store/user'
  import { useSettingsStore } from '/@/store/settings'
  import { layoutType as layoutTypeConsts } from '/@/consts'
  import Loading from './components/TheLoading.vue'
  import ServerError from '/@/views/features/500.vue'
  import NavigationSiderLayout from './navigation-sider-layout.vue'
  import NavigationTopLayout from './navigation-top-layout.vue'
  import NavigationMixLayout from './navigation-mix-layout.vue'

  const systemStore = useSystemStore()
  const userStore = useUserStore()
  const settingsStore = useSettingsStore()

  const hasReady = ref(false)
  const hasError = ref(false)

  onMounted(async () => {
    const user = userStore.userInfo

    if (!user) {
      try {
        await systemStore.buildNavigationMenu()
        await systemStore.buildDictionary()
        await userStore.fetchUser()
        await userStore.fetchRule()

        hasError.value = false
        hasReady.value = true
      } catch (error) {
        hasError.value = true
        hasReady.value = false

        throw error
      }
    }
  })

  const navigationComponent = computed(() => {
    const layoutType = settingsStore.layoutType
    const componentsMapper = []

    componentsMapper[layoutTypeConsts.SIDE_MENU] = NavigationSiderLayout
    componentsMapper[layoutTypeConsts.TOP_MENU] = NavigationTopLayout
    componentsMapper[layoutTypeConsts.MIX_MENU] = NavigationMixLayout

    if (hasError.value) {
      return ServerError
    } else {
      if (hasReady.value) {
        return componentsMapper[layoutType]
      }

      return Loading
    }
  })
</script>

<template>
  <component
    :is="navigationComponent"
    class="main-layout"
  />
</template>

<style lang="less" scoped>
</style>
