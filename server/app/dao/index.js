let mysqlOperation = require('./mysqlOperation');

const addChar = (markdown, render) => {
    let sql = 'INSERT INTO strange_chars(markdown,renderHtml) VALUES(?,?)';
    let date = new Date();
    let arr = [markdown, render];
    return new Promise((reslove,reject) => {
        reslove(mysqlOperation(sql, arr));
    })
}

const deleteChar = (id) => {
    let sql = 'DELETE FROM strange_chars where id=' + id;
    return new Promise((reslove, reject) => {
        reslove(mysqlOperation(sql));
    })
}

const getChars = () => {
    let sql = 'SELECT * from strange_chars';
    return new Promise((reslove, reject) => {
        reslove(mysqlOperation(sql));
    })
}

module.exports = { addChar, deleteChar, getChars };