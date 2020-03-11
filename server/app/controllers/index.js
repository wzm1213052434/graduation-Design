var { add, deleteOne, getAll } = require('../services/index');
var { exportWord } = require('../services/getDoc');
var express = require('express');
var router = express.Router();
/**
 * createChar 各接口
 */
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
router.get('/getDocument',exportWord)


/**
 * example各接口
 */
/**
 * 登录
 */
router.get('example/login',function(req,res) {
	res.json("登陆")
})
/**
 * admin部分
 */
router.get('example/admin/account/select/',function(req,res) {

})
router.delete('example/admin/account/delete',function(req,res) {
	res.json("删除");
})
router.post('example/admin/account/add',function(req,res) {

})
router.post("example/admin/account/change",function(req,res) {

})
router.post("example/admin/chars/add",function(req,res) {

})
router.delete("example/admin/chars/delete",function(req,res) {

})
router.get("example/admin/chars/select",function(req,res) {

})
/**
 * inspector端
 */

module.exports = router;
