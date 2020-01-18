var { addChar, deleteChar, getChars } = require('../dao/index');

const add = (markdown, render) => {
    let res = addChar(markdown, render);
    return res;
}

const deleteOne = (id) => {
    return deleteChar(id).then(function(res) {
        return res;
    })
}

const getAll = () => {
    return getChars().then(function (res) {
        let arr = [];
        for (let i in res) {
            res[i].markdown = res[i].markdown.toString("utf-8");
            res[i].renderHtml = res[i].renderHtml.toString("utf-8");
            arr.push(res[i]);
        }
        return arr;
    })
}



module.exports = { add, deleteOne, getAll }