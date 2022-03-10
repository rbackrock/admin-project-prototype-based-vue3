<template>
  <div class="footer-container">Copyright<CopyrightCircleOutlined /> vue3-scaffold</div>
</template>

<script>
import {
  CopyrightCircleOutlined
} from '@ant-design/icons-vue'

export default {
  name: 'ContentFooter',
  components: {
    CopyrightCircleOutlined
  }
}
</script>

<style lang="less" scoped>
  .footer-container {
    color: rgba(0,0,0,.45);
    font-size: 14px;
    text-align: center;
  }
</style>
