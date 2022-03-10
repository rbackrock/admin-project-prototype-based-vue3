<script setup>
  import { ref } from 'vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh.js'
  dayjs.locale('zh')
  
  const locale = zhCN
</script>

<template>
  <div id="app-container">
    <a-config-provider :locale="locale">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<style lang="less" scoped>
  #app {
    height: 100%;
  }
</style>
