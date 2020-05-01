var { add, deleteOne, getAll } = require('../services/index');
var { exportWord } = require('../services/getDoc');
var { getAccount, deleteAccount, addAccount, changeOneAccount } = require('../services/admin');
var { login } = require('../services/login');
var fs = require('fs');
var express = require('express');
var router = express.Router();

function readFile(filePath,resp) {
	fs.exists(filePath, function(exist) {
		if(exist) {
			fReadStream = fs.createReadStream(filePath);
			fReadStream.on('data', function(chunk) {
				resp.write(chunk, 'binary');
			});
			fReadStream.on('end', function() {
				resp.end();
			});
		} else {
			console.log('文件不存在！');
			setTimeout(() => {
				readFile(filePath,resp);
			}, 100);
		}
	});  
}
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
	new Promise((reslove) => {
		reslove(add("" + req.body.markDownChars, "" + req.body.htmlRender))
	}).then((result) => {
		res.json(result);
	})
})
router.post('/deleteOneChar',function(req,res) {
	new Promise((reslove) => {
		reslove(deleteOne(req.body.id));
	}).then((a) => {
		res.json(a);
	})
})
router.post('/getDocument',function(req,resp) {
	new Promise((reslove) => {
		reslove(exportWord(req))
	}).then((filePath) => {
		// setTimeout(function(){
		// 	res.setHeader('Content-Type', 'application/pdf');
		// 	res.download(filename);
		// },500)   
		//setTimeout(res.json(`./public/result/testCer${count}.pdf`),500) 
		console.log(filePath);
		let temp = filePath.split('/');
		let filename = temp[temp.length - 1];
		console.log(filename)
		resp.writeHead(200, { //设置响应头
			'Content-Type': 'application/octet-stream',//告诉浏览器这是一个二进制文件
			'Content-Disposition': 'attachment; filename=' + encodeURI(filename),//告诉浏览器这是一个需要下载的文件
		});
		readFile(filePath,resp);
	})
})
/**
 * /example各接口
 */
/**
 * 登录
 */
router.post('/example/login',function(req,res) {
	new Promise((reslove) => {
		reslove(login(req.body));
	}).then((datas) => {
		let data = datas[0];
		let mes = req.body;
		let result = {
			mes: ''
		}
		if(!data) {
			result.mes = 'NOT EXIST';
		}else if(mes.password === data.password) {
            let temp =  {
                            name: data.name,
                            permission: data.permission,
                            id: data.id
                        };
            result.mes = temp;
        }else if (mes.password !== data.password) {
            result.mes = 'WRONG';
		}
		res.json(result);
    })
})
/**
 * admin部分
 */
router.get('/example/admin/account/select/',function(req,res) {
	new Promise((reslove) => {
		reslove(getAccount(req.query.id))
	}).then((data) => {
		res.json(data)
	})
})
router.delete('/example/admin/account/delete',function(req,res) {
	new Promise((reslove) => {
		reslove(deleteAccount(req.body.id))
	}).then((data) => {
		if(data) {
			res.json(1)
		}else {
			res.json(0)
		}
	})
})
router.post('/example/admin/account/add',function(req,res) {
	new Promise((reslove) => {
		reslove(addAccount(req.body.mes))
	}).then((data) => {
		if(data) {
			res.json(1)
		} else {
			res.json(0)
		}
	})
})
router.post("/example/admin/account/change",function(req,res) {
	new Promise((reslove) => {
		reslove(changeOneAccount(req.body.mes))
	}).then((data) => {
		if(data) {
			res.json(1)
		} else {
			res.json(0)
		}
	})
})
/*关于获取ID并检重复的接口
router.post("",)*/
router.post("/example/admin/chars/add",function(req,res) {

})
router.delete("/example/admin/chars/delete",function(req,res) {

})
router.get("/example/admin/chars/select",function(req,res) {

})
/**
 * inspector端
 */

module.exports = router;
