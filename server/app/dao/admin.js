let mysqlOperation = require('./mysqlOperation');
/**
 * 账号操作
 */
const getAllAccount = () => {
    let sql = "SELECT * FROM person"
    return new Promise((reslove, reject) => {
        reslove(mysqlOperation(sql));
    })
} 

const getOneAccount = (id) => {
    let sql = "SELECT * FROM person where id=" + id;
    return new Promise((reslove, reject) => {
        reslove(mysqlOperation(sql));
    })
}

const deleteOneAccount = (id) => {
    let sql = 'DELETE FROM person where id=' + id;
    return new Promise((reslove, reject) => {
        reslove(mysqlOperation(sql));
    })
}

const addOneAccount = (mes) => {
    let sql = `INSERT INTO person(permission,password,name,delete_status) VALUES(${mes.permission},${mes.password},${mes.name},${mes.delete_status})`
    return new Promise((reslove, reject) => {
        reslove(mysqlOperation(sql));
    })
}

module.exports = { getAllAccount, getOneAccount , deleteOneAccount , addOneAccount }