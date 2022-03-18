<script setup>
  import { ref, watch, computed, toRaw } from 'vue'
  import {
    PlusOutlined,
    ReloadOutlined,
    ColumnHeightOutlined,
    SettingOutlined
  } from '@ant-design/icons-vue'

  const props = defineProps({
    tableOptions: {
      type: Object,
      required: true
    },
    hasAddButton: {
      type: Boolean,
      required: false,
      default: true
    }
  })

  const emit = defineEmits(['refresh', 'add'])

  const reloadSpin = ref(false)
  const setColumnsVisible = ref(false)
  const allColumnsChecked = ref(true)
  const allColumnsCheckedIndeterminate = ref(false)
  const originTableColumns = toRaw(props.tableOptions.columns)
  const columnsCheckedList = ref(originTableColumns.map(item => item.key))

  watch(columnsCheckedList, (newColumnsCheckedList) => {
    if (newColumnsCheckedList.length > 1) {
      // 全选多框框有三种形态，没有选中的多选框情况，全部选中多选框的情况，选择其中一部分多选框的情况
      const originTableColumnsLength = originTableColumns.length
      allColumnsCheckedIndeterminate.value = !!newColumnsCheckedList.length && newColumnsCheckedList.length < originTableColumnsLength
      if (newColumnsCheckedList.length === 0) {
        allColumnsChecked.value = false
      } else if (newColumnsCheckedList.length === originTableColumnsLength) {
        allColumnsChecked.value = true
      }

      // change
      // eslint-disable-next-line vue/no-mutating-props
      props.tableOptions.columns = originTableColumns.filter((current) => newColumnsCheckedList.indexOf(current.key) !== -1)
    }
  })

  const showDivider = computed(() => {
    return props.hasAddButton
  })

  const tableSizeResource = [
    {
      name: '默认',
      value: 'default'
    },
    {
      name: '中等',
      value: 'middle'
    },
    {
      name: '紧凑',
      value: 'small'
    }
  ]

  function handleAdd() {
    emit('add')
  }

  function handleRefresh() {
    emit('refresh')
    reloadSpin.value = true
    window.setTimeout(() => {
      reloadSpin.value = false
    }, 1000)
  }

  function handleChangeTableSize(size) {
    // eslint-disable-next-line vue/no-mutating-props
    props.tableOptions.size = size
  }

  function handleCheckAllChangeColumnsChecked(evt) {
    if (originTableColumns.length > 0) {
      if (evt.target.checked === true) {
        columnsCheckedList.value = originTableColumns.map(item => item.key)
        allColumnsCheckedIndeterminate.value = false
      } else {
        columnsCheckedList.value = [originTableColumns[0].key]
        allColumnsCheckedIndeterminate.value = true
      }
    }
  }

  function handleResetColumnsChecked() {
    columnsCheckedList.value = originTableColumns.map(item => item.key)
    allColumnsCheckedIndeterminate.value = false
  }
</script>

<template>
  <div class="a-table-control-container">
    <slot v-if="props.hasAddButton">
      <a-button
        type="primary"
        @click.stop="handleAdd"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        新建
      </a-button>
    </slot>
    <a-divider
      v-if="showDivider"
      type="vertical"
    />
    <a-space>
      <!-- 刷新 -->
      <a-tooltip title="刷新">
        <ReloadOutlined
          class="icon-button"
          style="font-size: 16px" 
          :spin="reloadSpin"
          @click.stop="handleRefresh"
        />
      </a-tooltip>
      <!-- 表格密度 -->
      <a-tooltip
        title="表格密度"
      >
        <a-dropdown
          :trigger="['click']"
          placement="bottom"
        >
          <ColumnHeightOutlined
            class="icon-button"
            style="font-size: 16px"
          />
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="currentSize in tableSizeResource"
                :key="currentSize.value"
              >
                <div
                  :style="{ color: props.tableOptions.size === currentSize.value ? '#1890ff' : 'rgba(0, 0, 0, 0.85)' }"
                  @click="handleChangeTableSize(currentSize.value)"
                >
                  {{ currentSize.name }}
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-tooltip>
      <!-- 表格列设置 -->
      <a-tooltip
        title="表格列设置"
      >
        <a-popover
          v-model:visible="setColumnsVisible"
          trigger="click"
          placement="bottomRight"
          arrow-point-at-center
        >
          <template #title>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <a-checkbox
                v-model:checked="allColumnsChecked"
                :indeterminate="allColumnsCheckedIndeterminate"
                @change="handleCheckAllChangeColumnsChecked"
              >
                表格列展示
              </a-checkbox>
              <a
                href="javascript:;"
                @click.stop="handleResetColumnsChecked"
              >
                重置
              </a>
            </div>
          </template>
          <template #content>
            <a-checkbox-group v-model:value="columnsCheckedList">
              <div
                v-for="col in originTableColumns"
                :key="col.key"
              >
                <a-checkbox
                  :value="col.key"
                >
                  {{ col.title }}
                </a-checkbox>
              </div>
            </a-checkbox-group>
          </template>
          <SettingOutlined
            class="icon-button"
            style="font-size: 16px"
          />
        </a-popover>
      </a-tooltip>
    </a-space>
  </div>
</template>

<style lang="less" scoped>
  .a-table-control-container {
    text-align: right;
    padding: 16px;

    .icon-button {
      cursor: pointer;
    }
  }
</style>