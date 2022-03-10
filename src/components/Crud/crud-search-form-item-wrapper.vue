<template>
  <a-row type="flex" justify="start" :gutter="16">
    <slot></slot>
  </a-row>
</template>

<script>
export default {
  name: 'CrudSearchFormItemWrapper'
}
</script>
