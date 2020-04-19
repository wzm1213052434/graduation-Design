var fs = require('fs');
var html = fs.readFileSync('./public/test.html', 'utf8'); // 引入html模板
var pdf = require('html-pdf'); // html-pdf
var createPDFProtocolFile = function (template, options, reg, filename) {
  /**
    template: html 模板
    options: 配置
    reg: 正则匹配规则
    filename: 输出pdf文件路径及文件名
  */
    // 将所有匹配规则在html模板中匹配一遍
    if (reg && Array.isArray(reg)) {
      reg.forEach(item => {
        template = template.replace(item.relus, item.match);
      });
    }
    pdf.create(template, options).toFile(filename, function(err) {
      if (err) {
          return err;
      }
      return filename;
    })
}
var options = {
    format: 'A4'
}; 

var reg = [
  {
    relus: /__CERNO__/g,
    match: "",
    name: "cerNo"
  },
  {
    relus: /__TESTPLACE__/g,
    match: "",
    name: "testPlace"
  },
  {
    relus: /__CALTOOLS__/g,
    match: "",
    name: "calTools"
  },
  {
    relus: /__MODEL__/g,
    match: "",
    name: "model"
  },
  {
    relus: /__OUTNO__/g,
    match: "",
    name: "outNo"
  },
  {
    relus: /__PROPLACE__/g,
    match: "",
    name: "proPlace"
  },
  {
    relus: /__TESTACCO__/g,
    match: "",
    name: "testAcco"
  },
  {
    relus: /__TESTRESULT__/g,
    match: "",
    name: "testRes"
  },
  {
    relus: /__ALLOWPER__/g,
    match: "",
    name: "allowPer"
  },
  {
    relus: /__TESTPER1__/g,
    match: "",
    name: "testPer1"
  },
  {
    relus: /__TESTPER2__/g,
    match: "",
    name: "testPer2"
  }
];          			

let exportWord = function (req) {
    let datas = req.body;
    for(let i in reg) {
      reg[i].match = datas[reg[i].name];
    }
    let count = Math.floor(Math.random() * 10);
    createPDFProtocolFile(html, options, reg, `./public/result/testCer${count}.pdf`);
    return `./public/result/testCer${count}.pdf`;
}

module.exports = { exportWord }