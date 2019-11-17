let mysqlOperation = require('./mysqlOperation');

const addChar = async (markdown, render) => {
    let sql = 'INSERT INTO strange_chars(markdown,renderHtml) VALUES(?,?)';
    let arr = [markdown, render];
    setTimeout(function () {
        return mysqlOperation(sql, arr)
    }, 1000);
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