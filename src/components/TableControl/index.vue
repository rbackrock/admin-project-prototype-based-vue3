<template>
  <div class="a-table-control-container">
    <slot>
      <a-button type="primary" @click.stop="$emit('add')"><template #icon><PlusOutlined /></template>新建</a-button>
      <a-divider type="vertical" />
    </slot>
    <a-space>
      <a-tooltip title="刷新">
        <ReloadOutlined class="icon-button" style="fontSize: 16px" :spin="reloadSpin" @click.stop="handleRefresh" />
      </a-tooltip>
      <a-tooltip v-if="options.size" title="表格密度">
        <a-dropdown :overlayStyle="{ width: '80px' }" :trigger="['click']">
          <ColumnHeightOutlined class="icon-button" style="fontSize: 16px" />
          <template #overlay>
            <a-menu>
              <a-menu-item v-for="currentSize in tableSizeResource" :key="currentSize.value">
                <div :style="{ color: options.size === currentSize.value ? '#1890ff' : 'rgba(0, 0, 0, 0.85)' }" @click="handleChangeTableSize(currentSize.value)">{{ currentSize.name }}</div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-tooltip>
      <a-tooltip v-if="options.columns" title="表格列设置">
        <a-popover v-model:visible="setColumnsVisible" trigger="click" placement="bottomRight" arrow-point-at-center>
          <template #title>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <a-checkbox v-model:checked="allColumnsChecked" :indeterminate="allColumnsCheckedIndeterminate" @change="handleCheckAllChangeColumnsChecked">表格列展示</a-checkbox>
              <a href="javascript:;" @click.stop="handleResetColumnsChecked">重置</a>
            </div>
          </template>
          <template #content>
            <a-checkbox-group v-model:value="columnsCheckedList">
              <div v-for="col in originTableColumns" :key="col.title">
                <a-checkbox :value="col.title">{{ col.title }}</a-checkbox>
              </div>
            </a-checkbox-group>
          </template>
          <SettingOutlined class="icon-button" style="fontSize: 16px" />
        </a-popover>
      </a-tooltip>
    </a-space>
  </div>
</template>

<script>
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

export default {
  name: 'TableControl',
  components: {
    PlusOutlined,
    ReloadOutlined,
    ColumnHeightOutlined,
    SettingOutlined
  },
  props: {
    tableOptions: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  setup(props) {
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
    const columnsCheckBoxReactive = reactive({
      setColumnsVisible: false,
      allColumnsChecked: true,
      allColumnsCheckedIndeterminate: false,
      columnsCheckedList: defaultCheckedList
    })

    watch(toRefs(columnsCheckBoxReactive).columnsCheckedList, (newColumnsCheckedList) => {
      columnsCheckBoxReactive.allColumnsCheckedIndeterminate = !!newColumnsCheckedList.length && newColumnsCheckedList.length < defaultCheckedList.length
      columnsCheckBoxReactive.allColumnsChecked = newColumnsCheckedList.length === defaultCheckedList.length
      options.value.columns = originTableColumns.filter((current) => newColumnsCheckedList.indexOf(current.title) !== -1)
    })

    return {
      options,
      reloadSpin,
      tableSizeResource,
      // set columns checkbox
      originTableColumns,
      ...toRefs(columnsCheckBoxReactive),
      defaultCheckedList
    }
  },
  methods: {
    handleRefresh() {
      this.$emit('refresh')
      this.reloadSpin = true
      window.setTimeout(() => {
        this.reloadSpin = false
      }, 1000)
    },
    handleCheckAllChangeColumnsChecked(evt) {
      this.columnsCheckedList = evt.target.checked === true ? this.defaultCheckedList : []
      this.allColumnsCheckedIndeterminate = false
    },
    handleChangeTableSize(size) {
      this.options.size = size
    },
    handleResetColumnsChecked() {
      this.columnsCheckedList = this.defaultCheckedList
      this.allColumnsCheckedIndeterminate = false
    }
  }
}
</script>

<style lang="less" scoped>
  .a-table-control-container {
    text-align: right;
    padding: 16px;

    .icon-button {
      cursor: pointer;
    }
  }
</style>
