<script setup>
  import { ref, reactive } from 'vue'

  const disabledAddVariable = reactive({
    disabled: false
  })
  const disabledModifyVariable = reactive({
    disabled: false
  })
  const disabledDeleteVariable = reactive({
    disabled: false
  })

  const value = ref('')
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
            v-permission-disable:[disabledAddVariable]="['add']" 
            :disabled="disabledAddVariable.disabled"
          >
            新增
          </a-button>
          <a-button
            v-permission-disable:[disabledModifyVariable]="['modify']"
            :disabled="disabledModifyVariable.disabled"
          >
            修改
          </a-button>
          <a-button
            v-permission-disable:[disabledDeleteVariable]="['delete']"
            :disabled="disabledDeleteVariable.disabled"
          >
            删除
          </a-button>
          <a-input
            v-model:value="value"
            v-permission-disable:[disabledDeleteVariable]="['delete']"
            :disabled="disabledDeleteVariable.disabled"
          />
        </a-space>
      </div>
      <h3 style="margin-top: 0.5em;">
        remove 如果没有权限则直接删除 DOM 节点
      </h3>
      <div>
        <a-space>
          <a-button v-permission-remove="['add']">
            新增
          </a-button>
          <a-button v-permission-remove="['modify']">
            修改
          </a-button>
          <a-button v-permission-remove="['delete']">
            删除
          </a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>
