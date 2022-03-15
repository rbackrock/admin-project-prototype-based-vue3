<template>
  <div class="wrap">
    <div class="loading">
      <div class="bounceball" />
      <div class="text">
        数据准备中...
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
  @width: 15px;
  @height: 15px;
  @bounce_height: 30px;
  @loading_color: #1890ff;

  .wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .text {
    color: @loading_color;
    display: inline-block;
    margin-left: 5px;
  }

  .bounceball {
    position: relative;
    display: inline-block;
    height: 37px;
    width: @width;

    &:before {
      position: absolute;
      content: '';
      display: block;
      top: 0;
      width: @width;
      height: @height;
      border-radius: 50%;
      background-color: @loading_color;
      transform-origin: 50%;
      animation: bounce 500ms alternate infinite ease;
    }
  }

  @keyframes bounce {
    0% {
      top: @bounce_height;
      height: 5px;
      border-radius: 60px 60px 20px 20px;
      transform: scaleX(2);
    }
    35% {
      height: @height;
      border-radius: 50%;
      transform: scaleX(1);
    }
    100% {
      top: 0;
    }
  }
</style>
