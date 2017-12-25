<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  body, html {
    padding: 0;
    margin: 0;
    font-family: "Titillium Web","Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    background: #f8fbff;
  }

  h1, h2, h3, h4, h5 {
    font-weight: 600;
  }

  .editr {
    background: #FFF;
    box-sizing: border-box;
  }

  .group__headline {
    margin-top: 0;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    color: rgb(131, 161, 165);
    font-weight: normal;
    border-bottom: 1px solid rgb(191, 215, 217);
  }

  .u__margin-bottom {
    margin-bottom: 35px;
  }

  .u__margin-top {
    margin-top: 35px;
  }
</style>
