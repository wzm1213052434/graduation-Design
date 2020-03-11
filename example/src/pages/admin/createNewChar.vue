<template>
    <div id="editor">
      <mavon-editor style="height: 100%;width:95%;margin:0 auto;" :toolbars="markdownOption" :ishljs="true" @save="save"></mavon-editor>
    </div>
</template>
    <script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "editor",
  components: {
    mavonEditor
  },
  methods: {
    save(value, render) {
      let _this = this;
      if (value) {
        this.$http
          .post("/postInformation", {
            markDownChars: value,
            htmlRender: render
          })
          .then(function(data) {
            console.log(data);
            _this.$message.success('保存成功');
            //alert('保存成功！');
          });
      } else {
        this.$message.error("没有输入");
      }
    }
  },
  data() {
    return {
      markdownOption: {
        bold: true,
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        code: true, // code
        table: true, // 表格
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true // 右对齐
      }
    };
  }
};
</script>
<style scoped>
#editor {
  margin: 2% auto;
  height: 95%;
}
</style>