<template>
  <div>
    <div class="title">特殊字符列表</div>
    <div class="addButton">
      <router-link to="/about" tag="button" class="btn btn-info">添加符号</router-link>
    </div>
    <div class="table-area">
      <table class="table table-striped" id="table">
        <tr>
          <th class="tableCol">序号</th>
          <th class="tableCol">名称</th>
          <th class="tableCol">符号</th>
          <th>操作</th>
        </tr>
        <tr class="tableRow" v-for="(item,index) in data" :key="index">
          <td class="tableCol">{{index}}</td>
          <td class="tableCol">{{item.name}}</td>
          <td class="tableCol" v-html="item.fuhao"></td>
          <td>
            <button class="btn btn-danger">删除</button>
            <button class="btn btn-success copyButton" @click="copy(item.fuhao)">复制</button>
          </td>
        </tr>
      </table>
    </div>
    <input type="text" style="opacity: 0;" id="tempValueInput" value />
  </div>
</template>
<script>
export default {
  name: "Test",
  data() {
    return {
      url: "",
      data: []
    };
  },
  mounted() {
    this.data = [
      {
        name: "name",
        fuhao:
          '<span class="katex"><span class="katex-mathml"><math><semantics><mrow><msub><mi>a</mi><mn>1</mn></msub><mspace width="2em"/><msup><mi>x</mi><mn>2</mn></msup><mspace width="1em"/><msubsup><mi>b</mi><mrow><mi>i</mi><mi>j</mi></mrow><mn>3</mn></msubsup><mspace width="1em"/><msup><mi>e</mi><mn>2</mn></msup><mo≯</mo><mo>=</mo><mo>(</mo><msup><mi>e</mi><mi>x</mi></msup><msup><mo>)</mo><mn>2</mn></msup><mspace width="1em"/><msup><mi>e</mi><msup><mi>x</mi><mn>2</mn></msup></msup></mrow><annotation encoding="application/x-tex">a_{1}qquad x^2 quad  b^{3}_{ij} quad e^{2}\neq (e^x)^2 quad e^{x^2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.20888em;vertical-align:-0.394772em;"></span><span class="mord"><span class="mord mathit">a</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.30110799999999993em;"><span style="top:-2.5500000000000003em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:2em;"></span><span class="mord"><span class="mord mathit">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141079999999999em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:1em;"></span><span class="mord"><span class="mord mathit">b</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8141079999999999em;"><span style="top:-2.441336em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathit mtight">i</span><span class="mord mathit mtight" style="margin-right:0.05724em;">j</span></span></span></span><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.394772em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:1em;"></span><span class="mord"><span class="mord mathit">e</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141079999999999em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel latin_fallback" style="position:absolute;padding-left:0.8em;"≯</span></span><span class="base"><span class="strut" style="height:0.36687em;vertical-align:0em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:1.23692em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathit">e</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.664392em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathit mtight">x</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141079999999999em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:1em;"></span><span class="mord"><span class="mord mathit">e</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.9869199999999999em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathit mtight">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8913142857142857em;"><span style="top:-2.931em;margin-right:0.07142857142857144em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>'
      }
    ];
  },
  methods: {
    copy(item) {
      var input = document.getElementById("tempValueInput");
      input.value = item;
      input.select();
      document.execCommand("copy"); // 执行浏览器复制命令
      alert("复制成功");
    },
    getInformation: () => {
      //Vue.$http.get();
      //   $.ajax({
      //     url: url,
      //     type: "get",
      //     data: {},
      //     success: function(data) {},
      //     error: function() {}
      //   });
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
  width: 50%;
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

.tableCol {
  border-right: 0.5px solid rgba(188, 188, 188, 0.3);
}
</style>