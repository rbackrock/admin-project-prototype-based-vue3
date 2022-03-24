<script setup>
  import CrudLayout from '/@/components/Crud/crud-layout.vue'
  import CrudSearchFormItemWrapper from '/@/components/Crud/crud-search-form-item-wrapper.vue'
  import CrudSearchFormItem from '/@/components/Crud/crud-search-form-item.vue'
  import * as crudConsts from '/@/components/Crud/consts'
  import DictionaryType from './components/type.vue'
  import DictionaryCode from './components/code.vue'
  import * as sharedStore from './store'

  const crud = sharedStore.typeCrud

  function handleQuery() {
    query()
  }

  function query() {
    crud[crudConsts.CRUD_FUNCTION_QUERY]()
  }
</script>

<template>
  <crud-layout>
    <template #search-layout>
      <a-form>
        <crud-search-form-item-wrapper>
          <crud-search-form-item>
            <a-form-item label="字典类型">
              <a-input v-model:value="crud[crudConsts.CRUD_SEARCH_FORM].typeName" />
            </a-form-item>
          </crud-search-form-item>
          <crud-search-form-item>
            <a-form-item label="字典名称">
              <a-input v-model:value="crud[crudConsts.CRUD_SEARCH_FORM].typeDescription" />
            </a-form-item>
          </crud-search-form-item>
          <crud-search-form-item>
            <a-button
              type="primary"
              @click="handleQuery"
            >
              查询
            </a-button>
          </crud-search-form-item>
        </crud-search-form-item-wrapper>
      </a-form>
    </template>

    <div class="content">
      <div class="type">
        <div class="wrapper">
          <dictionary-type />
        </div>
      </div>
      <div class="code">
        <div class="wrapper">
          <dictionary-code />
        </div>
      </div>
    </div>
  </crud-layout>
</template>

<style lang="less" scoped>
  .content {
    // min-height: calc(100vh - 48px - 100px - 94px);
    display: flex;
    justify-content:center;
    align-content:center;
    align-items:stretch;

    .type, .code {
      display: table-cell;
      flex: 1;

      .wrapper {
        height: 100%;
        background: #fff;
      }
    }

    .type {
      padding: 12px 6px 12px 12px;
    }

    .code {
      padding: 12px 12px 12px 6px;
    }
  }
</style>
