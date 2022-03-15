<script setup>
  import {
    ref,
    toRaw,
    reactive,
    toRefs,
    watch
  } from 'vue'
  import {
    PlusOutlined,
    ReloadOutlined,
    ColumnHeightOutlined,
    SettingOutlined
  } from '@ant-design/icons-vue'

  const props = defineProps({
    tableOptions: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  })

  const emit = defineEmits(['refresh'])

  const options = toRefs(props).tableOptions
  const reloadSpin = ref(false)
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

  // set columns checkbox
  const originTableColumns = toRaw(props.tableOptions && props.tableOptions.columns ? props.tableOptions.columns : [])
  const defaultCheckedList = originTableColumns.map((col) => col.title)
  
  const setColumnsVisible = ref(false)
  const allColumnsChecked = ref(true)
  const allColumnsCheckedIndeterminate = ref(false)
  const columnsCheckedList = ref(...defaultCheckedList)

  watch(columnsCheckedList.value, (newColumnsCheckedList) => {
    allColumnsCheckedIndeterminate.value = !!newColumnsCheckedList.length && newColumnsCheckedList.length < defaultCheckedList.length
    allColumnsChecked.value = newColumnsCheckedList.length === defaultCheckedList.length
    options.value.columns = originTableColumns.filter((current) => newColumnsCheckedList.indexOf(current.title) !== -1)
  })

  function handleRefresh() {
    emit('refresh')
    reloadSpin = true
    window.setTimeout(() => {
      reloadSpin = false
    }, 1000)
  }

  function handleCheckAllChangeColumnsChecked(evt) {
    columnsCheckedList = evt.target.checked === true ? defaultCheckedList : []
    allColumnsCheckedIndeterminate = false
  }

  function handleChangeTableSize(size) {
    options.size = size
  }

  function handleResetColumnsChecked() {
    columnsCheckedList = defaultCheckedList
    allColumnsCheckedIndeterminate = false
  }
</script>

<template>
  <div class="a-table-control-container">
    <slot>
      <a-button
        type="primary"
        @click.stop="$emit('add')"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        新建
      </a-button>
      <a-divider type="vertical" />
    </slot>
    <a-space>
      <a-tooltip title="刷新">
        <ReloadOutlined
          class="icon-button"
          style="fontSize: 16px" 
          :spin="reloadSpin"
          @click.stop="handleRefresh"
        />
      </a-tooltip>
      <a-tooltip
        v-if="options.size"
        title="表格密度"
      >
        <a-dropdown
          :overlay-style="{ width: '80px' }"
          :trigger="['click']"
        >
          <ColumnHeightOutlined
            class="icon-button"
            style="fontSize: 16px"
          />
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="currentSize in tableSizeResource"
                :key="currentSize.value"
              >
                <div
                  :style="{ color: options.size === currentSize.value ? '#1890ff' : 'rgba(0, 0, 0, 0.85)' }"
                  @click="handleChangeTableSize(currentSize.value)"
                >
                  {{ currentSize.name }}
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-tooltip>
      <a-tooltip
        v-if="options.columns"
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
                :key="col.title"
              >
                <a-checkbox
                  :value="col.title"
                >
                  {{ col.title }}
                </a-checkbox>
              </div>
            </a-checkbox-group>
          </template>
          <SettingOutlined
            class="icon-button"
            style="fontSize: 16px"
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
