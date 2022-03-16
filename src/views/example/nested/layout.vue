<template>
  <div style="margin: 24px auto; width: 800px;">
    <a-card title="嵌套路由示例">
      <div>
        <a-space>
          <router-link :to="{ name: 'ExampleNestedList' }">
            列表
          </router-link>
          <router-link :to="{ name: 'ExampleNestedDetail' }">
            详情
          </router-link>
        </a-space>
      </div>
      <router-view />
    </a-card>
  </div>
</template>
