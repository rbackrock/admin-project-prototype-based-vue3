<template>
  <div class="content-container">
    <tab-View />
    <div class="content-wrapper">
      <a-layout-content style="min-height: 100%;">
        <router-view v-slot="{ Component, route }" :key="$route.path">
          <keep-alive :include="cacheTabView">
            <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
          </keep-alive>
        </router-view>
      </a-layout-content>
      <!-- <a-layout-footer></a-layout-footer> -->
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { MoreOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import TabView from './TheTabView.vue'

export default {
  name: 'MainContent',
  components: {
    MoreOutlined,
    CloseOutlined,
    ReloadOutlined,
    TabView
  },
  setup() {
    const store = useStore()
    return {
      cacheTabView: computed(() => store.state['tab-views'].cacheViewsKeys)
    }
  }
}
</script>

<style lang="less" scoped>
  .content-container {
    height: calc(100vh - 48px);
    overflow: auto;

    .tab-wrapper {
      margin: 0px;
      padding-top: 6px;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,.12),0 0 3px 0 rgba(0,0,0,.04);

      .tab-pane {
        overflow: hidden;
        position: absolute;
      }

      .dropdown-menu-refresh-btn,
      .dropdown-menu-close-btn {
        margin-right: 0; margin-left: 8px; color: rgba(0,0,0,.45); font-size: 12px;
      }

      .dropdown-menu-btn {
        cursor: pointer;
        margin-right: 8px;
        padding: 12px;
        font-size: 16px;

        &:hover {
          color: #1890ff;
        }
      }
    }

    .content-wrapper {
      overflow: auto;
    }
  }
</style>
