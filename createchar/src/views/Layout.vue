<template>
  <div id="app">
    <el-menu
      default-active="/"
      class="left-menu"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="el-icon-document"></i>
        <span slot="title">特殊字符列表</span>
      </el-menu-item>
      <el-menu-item index="about">
        <i class="el-icon-circle-plus-outline"></i>
        <span slot="title">添加符号</span>
      </el-menu-item>
      <el-menu-item index="print">
        <i class="el-icon-printer"></i>
        <span slot="title">页面打印</span>
      </el-menu-item>
    </el-menu>
    <transition name="component-fade" mode="out-in">
        <router-view class="right-pane"/>
    </transition>
  </div>
</template>
<script>
    export default {
        name: 'Layout'
    }
</script>
<style scoped>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    position: relative;
}
.left-menu {
    position: fixed;
    width: 160px;
    height: 100%;
}
.right-pane {
    position: absolute;
    left: 160px;
    width: calc(100% - 160px);
}
.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .6s ease;
}
.component-fade-enter, .component-fade-leave-to {
    opacity: 0;
}
</style>
