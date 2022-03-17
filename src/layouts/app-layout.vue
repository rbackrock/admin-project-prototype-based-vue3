<script setup>
  import { computed } from 'vue'

  import { useSettingsStore } from '/@/store/settings'
  import { layoutType as layoutTypeConsts } from '/@/consts'
  import NavigationSiderLayout from './navigation-sider-layout.vue'
  import NavigationTopLayout from './navigation-top-layout.vue'
  import NavigationMixLayout from './navigation-mix-layout.vue'


  const settingsStore = useSettingsStore()

  const navigationComponent = computed(() => {
    const layoutType = settingsStore.layoutType
    const componentsMapper = []

    componentsMapper[layoutTypeConsts.SIDE_MENU] = NavigationSiderLayout
    componentsMapper[layoutTypeConsts.TOP_MENU] = NavigationTopLayout
    componentsMapper[layoutTypeConsts.MIX_MENU] = NavigationMixLayout

    return componentsMapper[layoutType]
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
