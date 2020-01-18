<template>
  <div>
    <div class="title">特殊字符列表</div>
    <div class="table-area">
      <el-table 
		:data="data" 
		stripe 
		border 
		v-loading.body="isLoading" 
		element-loading-text="拼命加载中"
	>
        <el-table-column prop="id" label="序号" ></el-table-column>
        <el-table-column prop="markdown" label="markdown"></el-table-column>
        <el-table-column prop="renderHtml" label="符号显示">
          <template slot-scope="scope">
            <div v-html="scope.row.renderHtml"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              @click="handleEdit(scope.row)"
            >删除</el-button>
            <el-button size="mini" type="info" @click="copy(scope.row)">复制</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <input type="text" style="opacity: 0;" id="tempValueInput"/>
  </div>
</template>
<script>
export default {
  name: "Test",
  data() {
    return {
      url: "",
      data: [],
	isLoading: true
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    copy(row) {
      var input = document.getElementById("tempValueInput");
      input.value = row.renderHtml;
      input.select();
      document.execCommand("copy"); // 执行浏览器复制命令
      this.$message.success("复制成功");
    },
	handleEdit(row) {
		let getAll = this.getAll;
		this.$http.post("/deleteOneChar", {
				id: row.deleteId
			}).then(function() {
			getAll();
		}
    )
	},
	getAll() {
		let _this = this;
		this.isLoading = true;
		this.data = [];
		let data = this.data;
		this.$http.get("/getInformation", {}).then(function(res) {
			for (let i in res.data) {
				data.push(Object.assign({}, res.data[i],{deleteId: res.data[i].id}, { id: i }));
			}
			_this.isLoading = false;
		});
	}
  }
};
</script>

<style scoped>
.title {
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.table-area {
  width: 70%;
  height: 80%;
  margin: 1% auto;
  text-align: center;
  overflow: auto;
  background: white;
  box-shadow: 0 5px 12px 5px rgba(0, 0, 0, 0.3);
}

.addButton {
  position: absolute;
  top: 2%;
  left: 68%;
  margin-top: -0.8%;
}
</style>