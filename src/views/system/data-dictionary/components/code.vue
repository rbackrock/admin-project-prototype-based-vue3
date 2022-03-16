<script setup>
  import { reactive, watch } from 'vue'
  import TableControl from '/@/components/TableControl/index.vue'
  import TableRecordControl from '/@/components/TableRecordControl/index.vue'
  import * as crudConsts from '/@/components/Crud/consts'
  import { codeCrud, selectedTypeId } from '../store'

  const columns = [
    {
      title: '字典编码',
      dataIndex: 'codeDescription',
      key: 'codeDescription'
    },
    {
      title: '显示值',
      dataIndex: 'codeName',
      key: 'codeName'
    },
    {
      title: '实际值',
      dataIndex: 'codeValue',
      key: 'codeValue'
    },
    {
      title: '操作',
      key: 'action',
      width: '100px',
      align: 'center',
      slots: {
        customRender: 'action'
      }
    }
  ]

  const tableOptions = reactive({
    columns,
    size: 'small'
  })
  const crud = codeCrud

  watch(selectedTypeId, (newValue) => {
    // eslint-disable-next-line prefer-destructuring
    codeCrud[crudConsts.CRUD_SEARCH_FORM].value.typeId = newValue[0]
    codeCrud[crudConsts.CRUD_FUNCTION_QUERY]()
  })

  function handleAdd() {
    crud[crudConsts.CRUD_FUNCTION_OPEN_FORM_ADD]()
  }

  function handleModifyRecord(record) {
    crud[crudConsts.CRUD_FUNCTION_OPEN_FORM_MODIFY](record.id)
  }

  function handleDeleteRecord(record) {
    crud[crudConsts.CRUD_FUNCTION_DELETE](record.id)
  }

  function query() {
    if (selectedTypeId.length > 0) {
      codeCrud[crudConsts.CRUD_FUNCTION_QUERY]()
    }
  }
</script>

<template>
  <table-control
    :table-options="tableOptions"
    @add="handleAdd"
    @refresh="query"
  />

  <a-table
    row-key="id"
    :data-source="crud[crudConsts.CRUD_SEARCH_DATA].value"
    :loading="crud[crudConsts.CRUD_SEARCH_LOADING].value"
    :columns="tableOptions.columns"
    :size="tableOptions.size"
    :pagination="false"
  >
    <template #action="{ record }">
      <table-record-control
        :record="record"
        @modify-record="handleModifyRecord"
        @delete-record="handleDeleteRecord"
      />
    </template>
  </a-table>

  <a-modal
    v-model:visible="crud[crudConsts.CRUD_FORM_VISIBLE].value"
    :confirm-loading="crud[crudConsts.CRUD_SAVE_BUTTON_LOADING].value"
    title="字典编码"
    @ok="handleSave"
  >
    <a-form :label-col="{ span: 4 }">
      <a-form-item
        label="字典编码"
        v-bind="crud[crudConsts.CRUD_FORM_USE_FORM].validateInfos.codeDescription"
      >
        <a-input v-model:value="crud[crudConsts.CRUD_FORM].value.codeDescription" />
      </a-form-item>
      <a-form-item
        label="显示值"
        v-bind="crud[crudConsts.CRUD_FORM_USE_FORM].validateInfos.codeName"
      >
        <a-input v-model:value="crud[crudConsts.CRUD_FORM].value.codeName" />
      </a-form-item>
      <a-form-item
        label="实际值"
        v-bind="crud[crudConsts.CRUD_FORM_USE_FORM].validateInfos.codeValue"
      >
        <a-input v-model:value="crud[crudConsts.CRUD_FORM].value.codeValue" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
