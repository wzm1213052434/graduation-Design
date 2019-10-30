var express = require('express');
var router = express.Router();
// let ywCompareXiazaiCon = require('../public/javascripts/Dao/yw_compare_xiazai')
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getInformation',function(req,res,next) {
    res.json(
        {
            name:"name",
            fuhao:'<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi mathvariant="normal">$</mi><mi mathvariant="normal">%</mi><mi mathvariant="normal">&amp;</mi><mi mathvariant="normal">_</mi><mo>{</mo><mo>}</mo><mi mathvariant="normal">#</mi></mrow><annotation encoding="application/x-tex">\$ \%  \&amp; \_ \{ \}  \# </annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.06em;vertical-align:-0.31em;"></span><span class="mord">$</span><span class="mord">%</span><span class="mord">&amp;</span><span class="mord" style="margin-right:0.02778em;">_</span><span class="mopen">{</span><span class="mclose">}</span><span class="mord">#</span></span></span></span>'
        }
    );
})
// router.get('/ywCompareXiazai',function (req,res,next) {
//   let result=[];
//   listfn = async () => {
//     let re = await ywCompareXiazaiCon.getYwCompareXiazai();
//     result.push(re);
//   }
//   listfn();
//   setTimeout(function () {
//     res.json(result);
//   },2000)
// })
module.exports = router;
