<script setup>
  import { computed } from 'vue'
  import { useSettingsStore } from '/@/store/settings'
  import { useAuthStore } from '/@/store/auth'
  import { useUserStore } from '/@/store/user'
  import { useRouter } from 'vue-router'
  import {
    DownOutlined,
    LogoutOutlined,
    UserOutlined
  } from '@ant-design/icons-vue'
  import { layoutType } from '/@/consts'

  const settingsStore = useSettingsStore()
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const router = useRouter()

  const userInfo = computed(() => userStore.userInfo)
  const isSiderLayout = computed(() => settingsStore.isMenuLayout(layoutType.SIDE_MENU))

  function handleLogout() {
    authStore.logout().then(() => {
      router.replace({
        name: 'Login'
      })
    })
  }
</script>

<template>
  <a-dropdown placement="bottomRight">
    <span class="username-wrapper">
      <a :class="{'ant-dropdown-link': true, 'black': isSiderLayout }" @click.prevent>
        <UserOutlined />
        {{ userInfo && userInfo.username }}
        <DownOutlined />
      </a>
    </span>

    <template #overlay>
      <a-menu>
        <a-menu-item @click="handleLogout">
          <span><LogoutOutlined style="margin-right: 8px;" />退出登录</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style lang="less" scoped>
  :deep(.bell-container) {
    width: 340px;
    padding: 10px 0;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 4px;

    .bottom {
      height: 46px;
      color: rgba(0,0,0,.85);
      line-height: 46px;
      text-align: center;
      border-top: 1px solid #f0f0f0;
      border-radius: 0 0 2px 2px;
      transition: all .3s;
      cursor: pointer;
    }
  }

  :deep(.ant-list-item) {
    padding-right: 24px;
    padding-left: 24px;
    overflow: hidden;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background: #e6f7ff;
    }
  }

  .icon-wrapper,
  .username-wrapper {
    display: inline-block;
    padding: 0 12px;
    cursor: pointer;
    transition: all .3s;

    .ant-dropdown-link {
      color: #fff;

      &.black {
        color: #000;
      }
    }

    &:hover {
      background: rgba(0, 0, 0, .025);
    }
  }
</style>
