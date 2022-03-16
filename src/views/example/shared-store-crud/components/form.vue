<script setup>
  import * as crudConsts from '/@/components/Crud/consts'
  import { crud } from '../store'

  function handleSave() {
    crud[crudConsts.CRUD_FUNCTION_SAVE]()
  }
</script>

<template>
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
