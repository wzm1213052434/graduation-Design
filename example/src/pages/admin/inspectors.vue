<template>
<div class="table-pane">
  <div>
    查询ID号:<el-input v-model="searchId" placeholder="请输入查询ID" class="inlineInput" size="mini"></el-input>
    <el-button type="primary" plain size="mini" style="margin-left:3%;" @click="findAccount">查询</el-button>
    <el-button type="primary" plain size="mini" style="float:right;" @click="addAccount">添加鉴定员</el-button>
  </div>
  <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:3%;">
    <el-table-column
      label="序号"
      width="80"
    >
      <template slot-scope="scope">
        <div v-html="scope.$index - 0 + 1"></div>
      </template>
    </el-table-column>
    <el-table-column
      label="鉴定员ID"
      prop="id"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
    >
    </el-table-column>
    <el-table-column
      label="身份"
    >
      <template slot-scope="scope">
        <div v-if="scope.row.permission">
          管理员
        </div>
        <div v-else>
          鉴定员
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="115"
    >
      <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editOnAccount(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteOneAccount(scope.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title="修改信息"
    :visible.sync="centerDialogVisible"
    width="50%"
    center
  >
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="ID号" class="form-item">
          <el-input v-model="form.id" placeholder="请输入ID" ></el-input>
        </el-form-item>
        <el-form-item label="姓名" class="form-item">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="(modalType === 'newAccount')" label="密码" class="form-item">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="身份" class="form-item">
            <el-select v-model="form.permission" placeholder="请选择">
              <el-option label="鉴定员" :value="0"></el-option>
              <el-option label="管理员" :value="1"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveChange">修 改</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        centerDialogVisible: false,
        form: {
          id:"",
          name:"",
          permission:"",
          password:""
        },
        searchId: "",
        modalType: "newAccount"
      }
    },
    mounted() {
      this.getAllAccounts();
    },
    methods: {
      getAllAccounts() {
        let _this = this;
        this.$http.get("/example/admin/account/select/", {}).then(function(data) {
            _this.tableData = data.data;
		    })
      },
      deleteOneAccount(id) {
        let _this = this;
        this.$http({
          method:"delete",
          url:"/example/admin/account/delete",
          data: { id }
        }).then(function(data) {
          (data.data) ? 
            (_this.$message.success("删除成功！")&&_this.getAllAccounts()) 
            : 
            (_this.$message.error("删除失败，请重试！"));
        })
      },
      editOnAccount(rowMes) {
        this.centerDialogVisible = true;
        this.modalType = "editModal"; 
        Object.assign(this.form,rowMes);
      },
      saveChange() {
        let _this = this;
        this.$http({
          method:"post",
          url: (this.modalType !== 'newAccount') ? "/example/admin/account/change" : "/example/admin/account/add",
          data: { mes:_this.form }
        }).then(function(data) {
          (data.data) ? 
          (_this.$message.success("成功！")&&_this.getAllAccounts())
           : 
          (_this.$message.error("失败，请重试！"));
          _this.centerDialogVisible = false;
          for(let i in _this.form) {
            _this.form[i] = "";
          }
        })
      },
      findAccount() {
        let _this = this;
        this.$http({
          method:"get",
          url:"/example/admin/account/select/",
          params: { id: _this.searchId}
        }).then(function(data) {
            _this.tableData = data.data;
		    })
      },
      addAccount() {
        this.centerDialogVisible = true;
        this.modalType = "newAccount"; 
      }
    }
  }
</script>
<style scoped>
    .table-pane {
        width: 80%;
        margin: 2% auto;
    }
    .form-item {
      width: 50%;
    }
    .inlineInput {
      display: inline-block;
      width: 25%;
      margin-left: 3%;
    }
</style>