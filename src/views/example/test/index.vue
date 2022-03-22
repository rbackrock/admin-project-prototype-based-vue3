<script setup>
  import { reactive } from 'vue'
  import CrudLayout from '/@/components/Crud/crud-layout.vue'
  // import TableControl from '/@/components/TableControl/index.vue'
  import TableControl from '/@/components/TableControl/control.vue'
  import { throttle } from '/@/utils/helper'

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

  const mockTable = [
    {
      key: 'name',
      name: 'jeff',
      email: 'a@q.com'
    }
  ]

  function onAdd() {
    console.log('add run')
  }

  function onQuery() {
    console.log('query run')
  }
</script>

<template>
  <crud-layout>
    <template #content-layout>
      <table-control
        :table-options="tableOptions"
        :has-add-button="true"
        @add="onAdd"
        @refresh="onQuery"
      />
      <div>{{ tableOptions.size }}</div>
      <div>{{ tableOptions.columns }}</div>
      <a-table
        :data-source="mockTable"
        :loading="false"
        :columns="tableOptions.columns"
        :size="tableOptions.size"
        row-key="key"
        :pagination="{ 'show-size-changer': true }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <div>
              action
            </div>
          </template>
        </template>
      </a-table>
    </template>
  </crud-layout>
</template>
