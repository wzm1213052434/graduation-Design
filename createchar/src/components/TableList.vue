<template>
<div>
	<el-table 
		:data="gridData"
		stripe 
		border
		style="width: 100%;" 
		v-loading.body="isLoading" 
		element-loading-text="拼命加载中"
	>
		<el-table-column property="id" label="序号" width="50"></el-table-column>
		<el-table-column prop="renderHtml" label="符号显示">
			<template slot-scope="scope">
				<div v-html="scope.row.renderHtml"></div>
			</template>
		</el-table-column>
		<el-table-column label="操作" width="80">
			<template slot-scope="scope">
				<el-button size="mini" @click="onAdd(scope.row.renderHtml)" type="primary">添加</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-pagination
		style="margin-top: 1%;"
		background
		layout="prev, pager, next"
		:total="1000">
	</el-pagination>
</div>
</template>
<script>
export default {
	name:"TableList",
	data() {
		return {
			isLoading: false,
			gridData: []
		}
	},
	created() {
		this.getList();
	},
	methods: {
		getList: function() {
			let _this = this;
			this.isLoading = true;
			this.gridData = [];
			let data = this.gridData;
			this.$http.get("/getInformation", {}).then(function(res) {
				for (let i in res.data) {
					data.push(Object.assign({}, res.data[i],{deleteId: res.data[i].id}, { id: i }));
				}
				_this.isLoading = false;
			});
		},
		onAdd(html) {
			this.$emit('showArray',html);
		}
	}
}
</script>
<style>

</style>