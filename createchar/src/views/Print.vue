<template>
	<div id="print-pane">
		输入框:
		<input type="text" class="input-pane" id="text">
		<button ref="inputHtml" class="input-pane-showArea" @click="dialogVisible=true;">选择符号</button>
		<br/>
		介绍:
		<div class="input-textArea" v-html="textAreaValue" @click="centerDialogVisible = true">
		</div>
		<el-dialog
			:visible.sync="centerDialogVisible"
			top="3%"
			width="60%"
			center
			:show-close="false"
			>
			<template slot="title">
				<div style="display: flex;">
					<div style="width: 45%;text-align: left;">编辑</div>
					<div>
						<el-button v-popover:popover type="primary" size="mini" class="choose-button">添加符号</el-button>
					</div>
				</div>
			</template>
			<textarea v-model="textareaInput" style="resize: none;width: 100%;height: 20rem;"></textarea>
			<span slot="footer" class="dialog-footer">
			<el-button @click="cancel">取 消</el-button>
			<el-button type="primary" @click="save">保 存</el-button>
			</span>
		</el-dialog>
		<el-popover
			placement="bottom"
			trigger="click"
			ref="popover"
		>
			<table-list></table-list>
		</el-popover>
		<el-dialog 
			title="提示"
			:visible.sync="dialogVisible"
			width="60%"
		>
			<table-list @showArray="showArray"></table-list>
		</el-dialog>
		<el-button type="primary">打印网页</el-button>
	</div>
</template>
<script>
	import TableList from '../components/TableList';
	export default {
		name:"Print",
		components: {
			TableList
		},
		data() {
			return {
				textAreaValue: '请输入文字.....',
				textareaInput: '',
				centerDialogVisible: false,
				dialogVisible: false
			}
		},
		methods: {
			cancel: function() {
				this.textAreaValue = "请输入文字.....";
				this.textareaInput = '';
				this.centerDialogVisible = false;
			},
			save: function() {
				this.centerDialogVisible = false;
			},
			onAdd: function() {
				
			},
			showArray(data) {
				this.$refs.inputHtml.innerHTML = data;
				this.dialogVisible = false;
			}
		},
		watch: {
			textareaInput(val) {
				this.textAreaValue = val;
			}
		}
	}
</script>
<style type="text/css" scoped>
	#print-pane {
		height: 100%;
	}
	.input-pane {
		border: 1px black solid;
		border-radius: 2px;
		background: white;
		display: inline-block;
		width: 8em;
		height: 1em;
		line-height: 1.5em;
		margin: 0 auto;
		cursor: pointer;
	}
	.input-pane-showArea {
		display: inline;
		border: none;
		background: white;
		outline: none;
		cursor: pointer;
	}
	.input-pane-showArea:hover {
		background: rgba(233,233,233,0.5);
	}
	.choose-button {
		display: inline-block;
		margin-left: 1%;
	}
	.input-textArea {
		width: 60%;
		height: 20%;
		border: 1px black solid;
		cursor: pointer;
		margin: 0 auto;
		color: #aaa;
		background: white;
		text-align: left;
		text-indent: 5px;
	}
	.input-textArea:hover {
		background: rgba(200,200,200,0.15);
	}
</style>