<script setup>
  import { ref, useSlots } from 'vue'

  const slots = useSlots()

  const hasSearchLayout = ref('search-layout' in slots)
  const hasContentLayout = ref('content-layout' in slots)
  const hasFormLayout = ref('form-layout' in slots)
</script>

<template>
  <div
    v-if="hasSearchLayout"
    class="layout search"
  >
    <a-card :bordered="true">
      <slot
        name="search-layout"
      />
    </a-card>
  </div>
  <div
    v-if="hasContentLayout"
    class="layout content"
  >
    <a-card :bordered="true">
      <slot
        name="content-layout"
      />
    </a-card>
  </div>
  <slot
    v-if="hasFormLayout"
    name="form-layout"
  />
  <slot />
</template>

<style lang="less" scoped>
  .layout {
    padding: 12px 12px 0 12px;

    &.search {
      :deep(.ant-card-body) {
        padding-bottom: 24px;
      }
    }

    &.content {
      :deep(.ant-card-body) {
        padding: 0;
      }

      :deep(.ant-table-pagination) {
        padding: 0 24px;
      }
    }

    &:last-child {
      padding-bottom: 12px;
    }
  }
</style>
