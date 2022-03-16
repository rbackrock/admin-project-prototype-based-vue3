<script setup>
  import { reactive } from 'vue'
  import TableControl from '/@/components/TableControl/index.vue'
  import TableRecordControl from '/@/components/TableRecordControl/index.vue'
  import * as crudConsts from '/@/components/Crud/consts'
  import { typeCrud as crud, selectedTypeId } from '../store'

  const columns = [
    {
      title: '字典类型',
      dataIndex: 'typeName',
      key: 'typeName'
    },
    {
      title: '字典名称',
      dataIndex: 'typeDescription',
      key: 'typeDescription'
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

  function handleAdd() {
    crud[crudConsts.CRUD_FUNCTION_OPEN_FORM_ADD]()
  }

  function handleModifyRecord(record) {
    crud[crudConsts.CRUD_FUNCTION_OPEN_FORM_MODIFY](record.id)
  }

  function handleDeleteRecord(record) {
    crud[crudConsts.CRUD_FUNCTION_DELETE](record.id)
  }

  function handleSave() {
    crud[crudConsts.CRUD_FUNCTION_SAVE]()
  }

  function handleTypeChange(selectedRowKeys) {
    selectedTypeId.value = selectedRowKeys
  }

  function query() {}
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
    :pagination="{ 'show-size-changer': true }"
    :row-selection="{ type: 'radio', selectedRowKeys: selectedTypeId, onChange: handleTypeChange }"
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
    title="字典类型"
    @ok="handleSave"
  >
    <a-form :label-col="{ span: 4 }">
      <a-form-item
        label="字典类型"
        v-bind="crud[crudConsts.CRUD_FORM_USE_FORM].validateInfos.typeName"
      >
        <a-input v-model:value="crud[crudConsts.CRUD_FORM].value.typeName" />
      </a-form-item>
      <a-form-item
        label="字典名称"
        v-bind="crud[crudConsts.CRUD_FORM_USE_FORM].validateInfos.typeDescription"
      >
        <a-input v-model:value="crud[crudConsts.CRUD_FORM].value.typeDescription" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
