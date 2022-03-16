<script setup>
  import { ref } from 'vue'

  const disabledAdd = ref(false)
  const disabledModify = ref(false)
  const disabledDelete = ref(false)
</script>

<template>
  <div style="margin: 24px auto; width: 90%;">
    <a-card
      title="permission 自定义指令示例"
      :bordered="true"
    >
      <h3 style="margin-top: 0.5em;">
        disable 如果没有权限则组件显示 disabled 状态
      </h3>
      <div>
        <a-space>
          <a-button
            v-permission:disabledAdd.disabled="['add']" 
            :disabled="disabledAdd"
          >
            新增
          </a-button>
          <a-button
            v-permission:disabledModify.disabled="['modify']"
            :disabled="disabledModify"
          >
            修改
          </a-button>
          <a-button
            v-permission:disabledDelete.disabled="['delete']"
            :disabled="disabledDelete"
          >
            删除
          </a-button>
        </a-space>
      </div>
      <h3 style="margin-top: 0.5em;">
        remove 如果没有权限则直接删除 DOM 节点
      </h3>
      <div>
        <a-space>
          <a-button v-permission.remove="['add']">
            新增
          </a-button>
          <a-button v-permission.remove="['modify']">
            修改
          </a-button>
          <a-button v-permission.remove="['delete']">
            删除
          </a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>
