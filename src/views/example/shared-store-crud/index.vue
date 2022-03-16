<script setup>
  import { reactive } from 'vue'
  import { SearchOutlined } from '@ant-design/icons-vue'
  import * as crudConsts from '/@/components/Crud/consts'
  import CrudLayout from '/@/components/Crud/crud-layout.vue'
  import CrudSearchFormItemWrapper from '/@/components/Crud/crud-search-form-item-wrapper.vue'
  import CrudSearchFormItem from '/@/components/Crud/crud-search-form-item.vue'
  import TableControl from '/@/components/TableControl/index.vue'
  import TableRecordControl from '/@/components/TableRecordControl/index.vue'
  import ExampleSharedStoreCrudForm from './components/form.vue'
  import { crud } from './store'

  const columns = [
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
      key: 'action',
      width: '180px',
      slots: {
        customRender: 'action'
      }
    }
  ]

  const tableOptions = reactive({
    columns,
    size: 'default'
  })

  function query() {
    crud[crudConsts.CRUD_FUNCTION_QUERY]()
  }

  function handleAdd() {
    crud[crudConsts.CRUD_FUNCTION_OPEN_FORM_ADD]()
  }

  function handleModifyRecord(record) {
    crud[crudConsts.CRUD_FUNCTION_OPEN_FORM_MODIFY](record.id)
  }

  function handleDeleteRecord(record) {
    crud[crudConsts.CRUD_FUNCTION_DELETE](record.id)
  }
</script>

<template>
  <crud-layout>
    <template #search-layout="{ crudConsts }">
      <a-form>
        <crud-search-form-item-wrapper>
          <crud-search-form-item>
            <a-form-item label="姓名">
              <a-input v-model:value="crud[crudConsts.CRUD_SEARCH_FORM].value.name" />
            </a-form-item>
          </crud-search-form-item>
          <crud-search-form-item>
            <a-form-item label="电子邮箱">
              <a-input v-model:value="crud[crudConsts.CRUD_SEARCH_FORM].value.email" />
            </a-form-item>
          </crud-search-form-item>
          <crud-search-form-item>
            <a-button type="primary" @click="query"><template #icon><SearchOutlined /></template>查询</a-button>
          </crud-search-form-item>
        </crud-search-form-item-wrapper>
      </a-form>
    </template>

    <template #content-layout="{ crudConsts }">
      <table-control
        :table-options="tableOptions"
        @add="handleAdd"
        @refresh="query"
      />
      <a-table
        :data-source="crud[crudConsts.CRUD_SEARCH_DATA].value"
        :loading="crud[crudConsts.CRUD_SEARCH_LOADING].value"
        :columns="tableOptions.columns"
        :size="tableOptions.size"
        row-key="id"
        :pagination="{ 'show-size-changer': true }"
      >
        <template #action="{ record }">
          <table-record-control
            :record="record"
            @modify-record="handleModifyRecord"
            @delete-record="handleDeleteRecord"
          />
        </template>
      </a-table>
    </template>

    <example-shared-store-crudForm />
  </crud-layout>
</template>
