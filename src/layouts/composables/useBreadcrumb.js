import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import * as utils from '@/utils/helper'

export default function useBreadcrumb() {
  const route = useRoute()
  const store = useStore()
  const breadcrumbList = ref([])

  onMounted(() => {
    breadcrumbList.value = utils.findTreeNodePath(store.state.system.navigationMenu, 'routeName', route.name)
  })

  watch(route, (currentRoute) => {
    breadcrumbList.value = utils.findTreeNodePath(store.state.system.navigationMenu, 'routeName', currentRoute.name)
  })

  return {
    breadcrumbList
  }
}
