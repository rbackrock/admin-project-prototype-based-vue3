<script setup>
  import { ref, reactive } from 'vue'
  import CrudLayout from '/@/components/Crud/crud-layout.vue'
  import TableControl from '/@/components/TableControl/index.vue'
  import TableRecordControl from '/@/components/TableRecordControl/index.vue'

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

  const tableOptions = reactive({
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '电子邮件',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: '操作',
        key: 'action'
      }
    ],
    size: 'default'
  })
  const disabledTableControlAddVariable = reactive({
    disabled: false
  })

  const dataSource = [
    {
      name: '张三',
      email: 'zhangsan@email.com'
    },
    {
      name: '李四',
      email: 'lisi@email.com'
    },
    {
      name: '王五',
      email: 'wangwu@email.com'
    }
  ]
  const tableLoading = false

  function handleAdd() {
    console.log('add')
  }

  function query() {
    console.log('query')
  }

  function handleModifyRecord() {
    console.log('row modify')
  }

  function handleDeleteRecord() {
    console.log('row delete')
  }
</script>

<template>
  <div class="block">
    <a-card
      title="TableControl 和 TableRecordControl 组件权限指令示例"
      :bordered="true"
    />
  </div>
  <crud-layout>
    <template #content-layout>
      <table-control
        :table-options="tableOptions"
        :has-add-button="true"
        :permission-add="['PermissionTableControlAdd']"
        @add="handleAdd"
        @refresh="query"
      />
      <a-table
        :data-source="dataSource"
        :loading="tableLoading"
        :columns="tableOptions.columns"
        :size="tableOptions.size"
        row-key="id"
        :pagination="{ 'show-size-changer': true }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <table-record-control
              :record="record"
              :permission-view="['PermissionTableRecordControlView']"
              :permission-modify="['PermissionTableRecordControlModify']"
              :permission-delete="['PermissionTableRecordControlDelete']"
              @modify-record="handleModifyRecord"
              @delete-record="handleDeleteRecord"
            />
          </template>
        </template>
      </a-table>
    </template>
  </crud-layout>
  <div class="block">
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

<style lang="less" scoped>
  .block {
    margin: 0 auto;
    width: 100%;
    padding: 12px 12px 0 12px;
  }
</style>
