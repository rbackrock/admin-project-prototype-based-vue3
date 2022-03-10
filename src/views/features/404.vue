<template>
  <a-result status="404" title="404" sub-title="对不起，没有此页面">
    <template #extra>
      <a-button type="primary" @click="handleBackHome">回到首页</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'NotFount',
  methods: {
    handleBackHome() {
      this.$router.replace({
        name: 'Home'
      })
    }
  }
}
</script>
