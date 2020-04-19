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
      let _this = this;
      var orderId = "test";
      let datas = {};
      datas = this.form;
      let html = $("#test").html();
      datas.model += html;
      const req = new XMLHttpRequest();
      req.open('POST', 'http://localhost:3000/getDocument', true);
      req.responseType = 'blob';
      req.setRequestHeader('Content-Type', 'application/json');
      req.onload = function() {
        const data = req.response;
        const blob = new Blob([data]);
        const blobUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.style.display = 'none';
        a.download = '检查报告.pdf';
        a.href = blobUrl;
        a.click();
        document.body.removeChild(a);
      };
      req.send(JSON.stringify(datas));
      // $.ajax({
      //         type: "post",
      //         url:"http://localhost:3000/getDocument",
      //         responseType:'blob',
      //         data: datas,
      //         success: function(res) {
      //             //这里res.data是返回的blob对象
      //             var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
      //             var downloadElement = document.createElement('a');
      //             var href = window.URL.createObjectURL(blob); //创建下载的链接
      //             downloadElement.href = href;
      //             downloadElement.download = orderId+'.docx'; //下载后文件名
      //             document.body.appendChild(downloadElement);
      //             downloadElement.click(); //点击下载
      //             document.body.removeChild(downloadElement); //下载完成移除元素
      //             window.URL.revokeObjectURL(href); //释放掉blob对象
      //         },
      //         error: function(err) {

      //             console.log(err);
      //         }
      //     })
      // this.$http.post('/getDocument',datas).then(function(response) {
      //   // if(res && res.state) {
      //   //   var a = document.createElement('a');
      //   //   a.href = res.data;
      //   //   a.download = orderId;
      //   //   document.body.appendChild(a);
      //   //   a.click();
      //   //   document.body.removeChild(a);
      //   // }else {
      //   //   _this.$message('下载失败');
      //   // }
      //   let path = response.data.fileName;
      //   let a = document.createElement('a');
      //   a.href = path;
      //   a.download = response.data.fileName;
      //   document.body.appendChild(a);
      //   a.click();
      //   document.body.removeChild(a);
		  // })
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