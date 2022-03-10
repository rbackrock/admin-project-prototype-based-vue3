<script setup>
  import { reactive, ref } from 'vue'
  import { throttle } from '/@/utils/helper'
  import { getCurrentInstance } from 'vue'
  import _ from 'lodash'

  const loginForm = reactive({
    username: 'admin',
    password: 'admin'
  })
  const loading = ref(false)
  const handleLogin = throttle.call(getCurrentInstance, function (...values) {
    console.log(values)
  })
</script>

<template>
  <a-card class="container">
    <a-alert
      message="用户名和密码均为 admin"
      type="info" 
      style="margin: 0 0 20px 0;" 
    />
    <a-form
      :model="loginForm"
      autocomplete="off"
      @finish="handleLogin"
    >
      <a-form-item
        label="用户名"
        :label-col="{ span: 6 }"
        name="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <a-input
          v-model:value="loginForm.username"
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="{ span: 6 }"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password
          v-model:value="loginForm.password"
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item
        :wrapper-col="{ offset: 6 }"
      >
        <a-button
          type="primary"
          html-type="submit"
          :loading="loading" 
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<style lang="less" scoped>
  .container {
    width: 400px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>
