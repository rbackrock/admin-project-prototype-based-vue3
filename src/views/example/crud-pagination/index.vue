<script setup>
import { reactive, computed } from 'vue'
  import CrudLayout from '/@/components/Crud/crud-layout.vue'
  import CrudSearchFormItemWrapper from '/@/components/Crud/crud-search-form-item-wrapper.vue'
  import CrudSearchFormItem from '/@/components/Crud/crud-search-form-item.vue'
  import TableControl from '/@/components/TableControl/index.vue'
  import TableRecordControl from '/@/components/TableRecordControl/index.vue'
  import useCrud from '/@/components/Crud/composables/useCrud'
  import * as crudConsts from '/@/components/Crud/consts'
  import * as exampleApi from '/@/api/example'

  const searchFormModel = {
    name: '',
    email: ''
  }

  const formModel = {
    name: 'jeff',
    email: ''
  }

  const formModelRule = {
    id: [
      {
        required: false
      }
    ],
    name: [
      {
        required: true,
        message: '请输入姓名'
      }
    ],
    email: [
      {
        required: true,
        message: '请输入电子邮箱'
      }
    ]
  }

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

  const crud = useCrud({
    [crudConsts.CRUD_SEARCH_INJECTION_FORM_MODEL]: searchFormModel,
    [crudConsts.CRUD_INJECTION_FORM_MODEL]: formModel,
    [crudConsts.CRUD_INJECTION_FORM_RULE]: formModelRule,
    [crudConsts.CRUD_API_QUERY]: exampleApi.queryByPaging,
    [crudConsts.CRUD_API_QUERY_ONE]: exampleApi.queryOne,
    [crudConsts.CRUD_API_ADD]: exampleApi.add,
    [crudConsts.CRUD_API_MODIFY]: exampleApi.modify,
    [crudConsts.CRUD_API_DELETE]: exampleApi.del,
    [crudConsts.CRUD_INJECTION_SEARCH_PAGING_INIT]: function(crudReactive, crudPagingReactive) {
      crudPagingReactive[crudConsts.CRUD_SEARCH_PAGING_PAGE_SIZE] = 20
    }
  }, {
    hasPaging: true
  })

  const pagination = computed(() => ({
    total: crud[crudConsts.CRUD_SEARCH_PAGING_TOTAL].value,
    current: crud[crudConsts.CRUD_SEARCH_PAGING_PAGE_NUM].value,
    pageSize: crud[crudConsts.CRUD_SEARCH_PAGING_PAGE_SIZE].value,
    'show-size-changer': true
  }))
  
  function handleAdd() {
    crud[crudConsts.CRUD_FUNCTION_OPEN_FORM_ADD]()
  }

  function handleModifyRecord(record) {
    crud[crudConsts.CRUD_FUNCTION_OPEN_FORM_MODIFY](record.id)
  }

  function handleSave() {
    crud[crudConsts.CRUD_FUNCTION_SAVE]()
  }

  function handleDeleteRecord(record) {
    crud[crudConsts.CRUD_FUNCTION_DELETE](record.id)
  }

  function query() {
    crud[crudConsts.CRUD_FUNCTION_QUERY]()
  }

  function handleTableChange(paging) {
    crud[crudConsts.CRUD_FUNCTION_QUERY_AFTER_CHANGE_PAGE](paging)
  }
</script>

<template>
  <crud-layout>
    <template #search-layout>
      <a-form>
        <crud-search-form-item-wrapper>
          <crud-search-form-item>
            <a-form-item label="姓名">
              <a-input v-model:value="crud[crudConsts.CRUD_SEARCH_FORM].name" />
            </a-form-item>
          </crud-search-form-item>
          <crud-search-form-item>
            <a-form-item label="电子邮箱">
              <a-input v-model:value="crud[crudConsts.CRUD_SEARCH_FORM].email" />
            </a-form-item>
          </crud-search-form-item>
          <crud-search-form-item>
            <a-button
              type="primary"
              @click="query"
            >
              查询
            </a-button>
          </crud-search-form-item>
        </crud-search-form-item-wrapper>
      </a-form>
    </template>

    <template #content-layout>
      <table-control
        :table-options="tableOptions"
        :has-add-button="true"
        @add="handleAdd"
        @refresh="query"
      />
      <a-table
        :data-source="crud[crudConsts.CRUD_SEARCH_DATA].value"
        :loading="crud[crudConsts.CRUD_SEARCH_LOADING].value"
        :columns="tableOptions.columns"
        :size="tableOptions.size"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <table-record-control
              :record="record"
              @modify-record="handleModifyRecord"
              @delete-record="handleDeleteRecord"
            />
          </template>
        </template>
      </a-table>
    </template>

    <template #form-layout>
      <a-modal
        v-model:visible="crud[crudConsts.CRUD_FORM_VISIBLE].value"
        :confirm-loading="crud[crudConsts.CRUD_SAVE_BUTTON_LOADING].value"
        title="Crud 组件示例"
        @ok="handleSave"
      >
        <a-alert
          message="数据为 mock 数据，新增，修改，删除效果请查看 devtools NetWork 面板"
          type="info"
          style="margin: 0 0 20px 0;"
        />
        <a-form :label-col="{ span: 4 }">
          <a-form-item
            label="姓名" 
            v-bind="crud[crudConsts.CRUD_FORM_USE_FORM].validateInfos.name"
          >
            <a-input v-model:value="crud[crudConsts.CRUD_FORM].value.name" />
          </a-form-item>
          <a-form-item
            label="电子邮箱"
            v-bind="crud[crudConsts.CRUD_FORM_USE_FORM].validateInfos.email"
          >
            <a-input v-model:value="crud[crudConsts.CRUD_FORM].value.email" />
          </a-form-item>
        </a-form>
      </a-modal>
    </template>
  </crud-layout>
</template>
