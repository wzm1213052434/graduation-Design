let mysqlOperation = require('./mysqlOperation');
/**
 * 登陆相关操作
 */
const loginFun = function(id) {
    let sql = 'SELECT * from person where id=' + id;
    return new Promise((reslove, reject) => {
        reslove(mysqlOperation(sql));
    })
}
module.exports = { loginFun }