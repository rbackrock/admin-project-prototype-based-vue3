import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSystemStore } from '/@/store/system'
import * as utils from '/@/utils/helper'

export default function useBreadcrumb() {
  const route = useRoute()
  const systemStore = useSystemStore()
  const breadcrumbList = ref([])

  onMounted(() => {
    breadcrumbList.value = utils.findTreeNodePath(systemStore.navigationMenu, 'routeName', route.name)
  })

  watch(route, (currentRoute) => {
    breadcrumbList.value = utils.findTreeNodePath(systemStore.navigationMenu, 'routeName', currentRoute.name)
  })

  return {
    breadcrumbList
  }
}
