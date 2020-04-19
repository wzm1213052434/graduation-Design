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
    let sql = "INSERT INTO person(id,permission,password,name,delete_status) VALUES(?,?,?,?,1)"
    let arr = [mes.id,mes.permission,mes.password,mes.name]
    return new Promise((reslove, reject) => {
        reslove(mysqlOperation(sql,arr));
    })
}

const changeAccount = (mes) => {
    let sql = "UPDATE person SET permission=?,name=? WHERE id=?";
    let arr = [mes.permission,mes.name,mes.id];
    return new Promise((reslove, reject) => {
        reslove(mysqlOperation(sql,arr));
    })
}
module.exports = { getAllAccount , getOneAccount , deleteOneAccount , addOneAccount , changeAccount }