var { add, deleteOne, getAll } = require('../services/index');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/getInformation', function (req, res, next) {
    new Promise((reslove) => {
    	reslove(getAll());
    }).then((a) => {
    	res.json(a);
    })
})
router.post('/postInformation', function (req, res) {
    let result = add("" + req.body.markDownChars, "" + req.body.htmlRender);
    res.json(result);
})
router.post('/deleteOneChar',function(req,res) {
	new Promise((reslove) => {
		reslove(deleteOne(req.body.id));
	}).then((a) => {
		res.json(a);
	})
})
module.exports = router;
