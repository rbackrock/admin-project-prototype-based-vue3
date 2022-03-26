import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSystemStore } from '/@/store/system'
import * as helper from '../helper'

export default function useBreadcrumb() {
  const route = useRoute()
  const systemStore = useSystemStore()
  const breadcrumbList = ref([])

  onMounted(() => {
    breadcrumbList.value = helper.findTreeNodePath(systemStore.navigationMenu, 'routeName', route.name)
  })

  watch(route, (currentRoute) => {
    breadcrumbList.value = helper.findTreeNodePath(systemStore.navigationMenu, 'routeName', currentRoute.name)
  })

  return {
    breadcrumbList
  }
}
