<template>
  <div class="com-content">
    <el-form ref="form" :model="form" label-width="120px" :inline="true">
      <el-form-item class="item" label="证书编号">
        <el-input style="display:inline-block;width:50%;" v-model="form.cerNo"></el-input>
      </el-form-item>
      <el-form-item class="item" label="送检单位">
        <el-input  style="display:inline-block;width:50%;"  v-model="form.testPlace"></el-input>
      </el-form-item>
      <el-form-item class="item" label="计量器具名称">
        <el-input  style="display:inline-block;width:50%;"  v-model="form.calTools"></el-input>
      </el-form-item>
      <el-form-item class="item" label="型号/规格">
        <el-input  style="display:inline-block;width:50%;"  v-model="form.model"></el-input>
        <div id="test" class="bas-alt-but">选择符号</div>
      </el-form-item>
      <el-form-item class="item" label="出厂编号">
        <el-input  style="display:inline-block;width:50%;"  v-model="form.outNo"></el-input>
      </el-form-item>
      <el-form-item class="item" label="制造单位">
        <el-input  style="display:inline-block;width:50%;"  v-model="form.proPlace"></el-input>
      </el-form-item>
      <el-form-item class="item" label="检验依据">
        <el-input  style="display:inline-block;width:50%;"  v-model="form.testAcco"></el-input>
      </el-form-item>
      <el-form-item class="item" label="检验结论">
        <el-input  style="display:inline-block;width:50%;"  v-model="form.testRes"></el-input>
      </el-form-item>
      <el-form-item class="item" label="批准人">
        <el-input  style="display:inline-block;width:50%;"  v-model="form.allowPer"></el-input>
      </el-form-item>
      <el-form-item class="item" label="核验员">
        <el-input  style="display:inline-block;width:50%;"  v-model="form.testPer1"></el-input>
      </el-form-item>
      <el-form-item class="item" label="检定员">
        <el-input  style="display:inline-block;width:50%;"  v-model="form.testPer2"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" round style="margin-left:40%;" @click="printPage">输出文件</el-button>
  </div>
</template>

<script>
import { MD1 , MD0} from './../../js/specialChar'
export default {
  name: "testReport",
  mounted() {
    this.init()
  },
  data() {
    return {
      form: {
          cerNo: "",
          testPlace: "",
          calTools: "",
          model: "",
          outNo: "",
          proPlace: "",
          testAcco: "",
          testRes: "",
          allowPer: "",
          testPer1: "",
          testPer2: ""
        }
    }
  },
  methods: {
    init() {
      MD1("test");
    },
    printPage() {
      for(let i in this.form) {
        if(!this.form[i]) {
          this.$message.error("请完善表单");
          return;
        }
      }
      let _this = this;
      var orderId = "test";
      let datas = {};
      datas = this.form;
      let html = $("#test").html();
      datas.model += html;
      this.$http({
        method: "post",
        url: '/getDocument',
        data: datas,
        responseType: "blob" // 二进制数据
      }).then(function(response) {
        _this.downloadFile(response);
		  })
    },
    downloadFile(data) {
      console.log(data);
      var _that = this;
      if (!data) {
        console.log('没数据');
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data.data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "检查报告.pdf");
      document.body.appendChild(link);
      link.click();
    }
  }
}
</script>

<style>
.com-content {
  width: 98%;
  height: 700px;
  overflow-y: auto;
}
.item {
  width: 45%;
}
</style>