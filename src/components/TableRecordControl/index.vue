<script setup>
  import { ref, reactive, defineProps, defineEmits, computed } from 'vue'

  const INCLUDE_VIEW_NAME = 'view'
  const INCLUDE_MODIFY_NAME = 'modify'

  const props = defineProps({
    include: {
      type: Object,
      required: false,
      default() {
        return {
          view: true,
          modify: true,
          del: true
        }
      }
    },
    record: {
      type: Object,
      required: true
    },
    deleteMsg: {
      type: String,
      required: false,
      default: '确定要删除该条记录吗？'
    },
    permissionView: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    permissionModify: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    permissionDelete: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  })

  const disabledView = ref(false)
  const disabledModify = ref(false)
  const disabledDelete = ref(false)
  const emit = defineEmits(['view-record', 'modify-record', 'delete-record'])
  const disabledViewVariable = reactive({
    disabled: false
  })
  const disabledModifyVariable = reactive({
    disabled: false
  })
  const disabledDeleteVariable = reactive({
    disabled: false
  })

  const visibleViewDivider = computed(() => {
    if (this.isHiddenSingleInclude(INCLUDE_VIEW_NAME)) {
      return false
    }

    return true
  })

  const visibleModifyDivider = computed(() => {
    if (this.isHiddenSingleInclude(INCLUDE_MODIFY_NAME)) {
      return false
    }

    const { view, del } = props.include
    if (view && !del) {
      return false
    }

    return true
  })

  function isHiddenSingleInclude(includeName) {
    const { view, modify, del } = props.include
    if (includeName === INCLUDE_VIEW_NAME) {
      if (view && !modify && !del) {
        return true
      }
    } else if (includeName === INCLUDE_MODIFY_NAME) {
      if (modify && !view && !del) {
        return true
      }
    }

    return false
  }
</script>

<template>
  <slot name="attach-before" />
  <slot>
    <template v-if="include.view">
      <a-button
        v-permission-disable:[disabledViewVariable]="props.permissionView"
        :disabled="disabledViewVariable.disabled"
        class="btn"
        type="link"
        @click="$emit('view-record', props.record)"
      >
        查看
      </a-button>
      <a-divider type="vertical" />
    </template>

    <template v-if="include.modify">
      <a-button
        v-permission-disable:[disabledModifyVariable]="props.permissionModify"
        :disabled="disabledModifyVariable.disabled"
        class="btn"
        type="link"
        @click="$emit('modify-record', props.record)"
      >
        编辑
      </a-button>
      <a-divider type="vertical" />
    </template>

    <template v-if="include.del">
      <a-popconfirm
        :title="deleteMsg"
        ok-text="确定"
        cancel-text="取消"
        @confirm="$emit('delete-record', props.record)"
      >
        <a-button
          v-permission-disable:[disabledDeleteVariable]="props.permissionDelete"
          :disabled="disabledDeleteVariable.disabled"
          class="btn"
          type="link"
        >
          删除
        </a-button>
      </a-popconfirm>
    </template>
  </slot>
  <slot name="attach-after" />
</template>

<style lang="less" scoped>
  .btn {
    padding: 0;
    height: auto;
  }
</style>
