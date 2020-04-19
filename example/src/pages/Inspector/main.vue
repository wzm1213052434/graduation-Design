<template>
  <div class="tab-pane">
    <el-tabs v-model="activeName" style="width:80%;margin:1% auto;">
      <el-tab-pane label="检验报告" name="first">
        <test-report></test-report>
      </el-tab-pane>
      <el-tab-pane label="检定结果通知" name="second">
        <test-result></test-result>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import testReport from './testReport';
import testResult from './testResult';
  export default {
    components:{
      testReport,
      testResult
    },
    data() {
      return {
        activeName: 'first'
      };
    }
  };
</script>
<style scoped>
 .tab-pane {
   width: 100%;
  }
  .tab-pane-tabs {
    width: 80%;
    margin: 0 auto;
  }
</style>