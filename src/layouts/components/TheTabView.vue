<script setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useTabViewsStore } from '/@/store/tab-views'
  import { MoreOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons-vue'
  import useTabView from '../composables/useTabView'
  import useBreadcrumb from '../composables/useBreadcrumb'

  const tabViewsStore = useTabViewsStore()
  const route = useRoute()
  const router = useRouter()

  useTabView()
  const { breadcrumbList } = useBreadcrumb()
  const tabList = computed(() => tabViewsStore.cacheViews)
  const tabActiveKey = computed(() => tabViewsStore.activeViewKey)

  function refresh() {
    router.replace({
      path: `/redirect${route.fullPath}`
    })
  }

  function handleReload(pane) {
    const currentPane = pane || tabList.value.find((paneItem) => paneItem.routeName === tabActiveKey.value)
    refresh()
    currentPane.spin = true
    window.setTimeout(() => {
      currentPane.spin = false
    }, 1000)
  }

  function handleRefreshCurrent() {
    this.refresh()
  }

  function handleChangeTab(activeRouteName) {
    tabViewsStore.active(activeRouteName)
    router.push({
      name: activeRouteName
    })
  }

  function handleCloseCurrent(pane) {
    tabViewsStore.closeCurrentTabView(pane.routeName)
    const lastCacheViewKey = tabViewsStore.getLastCacheViewKey
    router.push({
      name: lastCacheViewKey
    })
  }

  function handleCloseOther(pane) {
    const routeName = pane.routeName || tabViewsStore.currentActiveViewKey
    tabViewsStore.closeOtherTabViews(routeName)
    const lastCacheViewKey = tabViewsStore.getLastCacheViewKey
    const currentActiveViewKey = tabViewsStore.currentActiveViewKey
    if (lastCacheViewKey !== currentActiveViewKey) {
      router.push({
        name: lastCacheViewKey
      })
    }
  }

  function handleCloseAllToTheLeft(pane) {
    tabViewsStore.closeAllToTheLeft(pane.routeName)
    const currentActiveViewKey = tabViewsStore.currentActiveViewKey
    if (pane.routeName !== currentActiveViewKey) {
      router.push({
        name: pane.routeName
      })
    }
  }

  function handleCloseAllToTheRight(pane) {
    tabViewsStore.closeAllToTheRight(pane.routeName)
    const currentActiveViewKey = tabViewsStore.currentActiveViewKey
    if (pane.routeName !== currentActiveViewKey) {
      router.push({
        name: pane.routeName
      })
    }
  }
</script>

<template>
  <div class="tab-wrapper">
    <a-tabs
      :active-key="tabActiveKey"
      size="small"
      :tab-bar-style="{ 'padding-left': '16px' }"
      type="card" 
      @change="handleChangeTab"
    >
      <a-tab-pane
        v-for="pane in tabList"
        :key="pane.routeName"
        class="tab-pane"
        :closable="true"
      >
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <span style="user-select: none;">
              {{ pane.title }}
              <ReloadOutlined
                v-show="tabActiveKey === pane.routeName"
                :spin="pane.spin"
                class="dropdown-menu-refresh-btn"
                @click.stop="handleReload(pane)"
              />
              <CloseOutlined
                v-show="!pane.fixed"
                class="dropdown-menu-close-btn"
                @click.stop="handleCloseCurrent(pane)"
              />
            </span>

            <template #overlay>
              <a-menu>
                <a-menu-item
                  key="1"
                  @click.stop="handleCloseOther(pane)"
                >
                  关闭其他
                </a-menu-item>
                <a-menu-item
                  key="2"
                  @click.stop="handleCloseAllToTheLeft(pane)"
                >
                  关闭到左侧
                </a-menu-item>
                <a-menu-item
                  key="3"
                  @click.stop="handleCloseAllToTheRight(pane)"
                >
                  关闭到右侧
                </a-menu-item>
                <a-menu-item
                  key="4"
                  @click.stop="handleReload(pane)"
                >
                  刷新当前页
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>
      <template #rightExtra>
        <a-dropdown
          :trigger="['click']"
          placement="bottom"
        >
          <div style="width: 110px; text-align: right;">
            <MoreOutlined class="dropdown-menu-btn" />
          </div>

          <template #overlay>
            <a-menu>
              <a-menu-item
                @click.stop="handleCloseOther"
              >
                关闭其他
              </a-menu-item>
              <a-menu-item
                @click.stop="handleReload()"
              >
                刷新当前页
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
    <div 
      v-show="breadcrumbList && breadcrumbList.length > 1"
      class="breadcrumb-wrapper"
      style="padding: 0 24px 16px 24px;"
    >
      <a-breadcrumb>
        <a-breadcrumb-item
          v-for="breadcrumb in breadcrumbList"
          :key="breadcrumb.routeName"
        >
          {{ breadcrumb.title }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>

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
