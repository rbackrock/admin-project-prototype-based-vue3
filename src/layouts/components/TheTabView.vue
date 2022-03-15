<template>
  <div class="tab-wrapper">
    <a-tabs :activeKey="tabActiveKey" size="small" :tabBarStyle="{ 'padding-left': '16px' }" type="card" @change="handleChangeTab">
      <a-tab-pane class="tab-pane" v-for="pane in tabList" :key="pane.routeName" :closable="true">
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <span style="user-select: none;">
              {{ pane.title }}
              <ReloadOutlined v-show="tabActiveKey === pane.routeName" :spin="pane.spin" class="dropdown-menu-refresh-btn" @click.stop="handleReload(pane)" />
              <CloseOutlined v-show="!pane.fixed" class="dropdown-menu-close-btn" @click.stop="handleCloseCurrent(pane)" />
            </span>

            <template #overlay>
              <a-menu>
                <a-menu-item key="1" @click.stop="handleCloseOther(pane)">关闭其他</a-menu-item>
                <a-menu-item key="2" @click.stop="handleCloseAllToTheLeft(pane)">关闭到左侧</a-menu-item>
                <a-menu-item key="3" @click.stop="handleCloseAllToTheRight(pane)">关闭到右侧</a-menu-item>
                <a-menu-item key="4" @click.stop="handleReload(pane)">刷新当前页</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>
      <template #tabBarExtraContent>
        <a-dropdown>
          <MoreOutlined class="dropdown-menu-btn" />

          <template #overlay>
            <a-menu>
              <a-menu-item @click.stop="handleCloseOther">关闭其他</a-menu-item>
              <a-menu-item @click.stop="handleReload()">刷新当前页</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
    <div v-show="breadcrumbList && breadcrumbList.length > 1" class="breadcrumb-wrapper" style="padding: 0 24px 16px 24px; ">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="breadcrumb in breadcrumbList" :key="breadcrumb.routeName">{{ breadcrumb.title }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useTabViewsStore } from '/@/store/tab-views'
import { MoreOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import useTabView from '../composables/useTabView'
import useBreadcrumb from '../composables/useBreadcrumb'

export default {
  name: 'TheTabView',
  components: {
    MoreOutlined,
    CloseOutlined,
    ReloadOutlined
  },
  setup() {
    const tabViewsStore = useTabViewsStore()
    useTabView()
    const { breadcrumbList } = useBreadcrumb()

    return {
      tabList: computed(() => tabViewsStore.cacheViews),
      tabActiveKey: computed(() => tabViewsStore.activeViewKey),
      breadcrumbList
    }
  },
  methods: {
    refresh() {
      this.$router.replace({
        path: `/redirect${this.$route.fullPath}`
      })
    },

    handleReload(pane) {
      const currentPane = pane || this.tabList.find((paneItem) => paneItem.routeName === this.tabActiveKey)
      this.refresh()
      currentPane.spin = true
      window.setTimeout(() => {
        currentPane.spin = false
      }, 1000)
    },

    handleRefreshCurrent() {
      this.refresh()
    },

    handleChangeTab(activeRouteName) {
      tabViewsStore.active(activeRouteName)
      this.$router.push({
        name: activeRouteName
      })
    },

    handleCloseCurrent(pane) {
      tabViewsStore.closeCurrentTabView(pane.routeName)
      const lastCacheViewKey = tabViewsStore.getLastCacheViewKey
      this.$router.push({
        name: lastCacheViewKey
      })
    },

    handleCloseOther(pane) {
      const routeName = pane.routeName || tabViewsStore.currentActiveViewKey
      this.$store.dispatch('tab-views/closeOtherTabViews', routeName)
      const lastCacheViewKey = tabViewsStore.getLastCacheViewKey
      const currentActiveViewKey = tabViewsStore.currentActiveViewKey
      if (lastCacheViewKey !== currentActiveViewKey) {
        this.$router.push({
          name: lastCacheViewKey
        })
      }
    },

    handleCloseAllToTheLeft(pane) {
      tabViewsStore.closeAllToTheLeft(pane.routeName)
      const currentActiveViewKey = tabViewsStore.currentActiveViewKey
      if (pane.routeName !== currentActiveViewKey) {
        this.$router.push({
          name: pane.routeName
        })
      }
    },

    handleCloseAllToTheRight(pane) {
      this.$store.dispatch('tab-views/closeAllToTheRight', pane.routeName)
      const currentActiveViewKey = tabViewsStore.currentActiveViewKey
      if (pane.routeName !== currentActiveViewKey) {
        this.$router.push({
          name: pane.routeName
        })
      }
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
      // background: #fff;
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
  }
</style>
