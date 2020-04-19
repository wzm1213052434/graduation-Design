let { getAllAccount, getOneAccount , deleteOneAccount , addOneAccount ,changeAccount} = require('./../dao/admin');
const getAccount = function(id) {
    if(!id) {
        return getAllAccount();
    }else {
        return getOneAccount(id);
    }
}
const deleteAccount = function(id) {
    return deleteOneAccount(id);
}
const addAccount = function(mes) {
    return addOneAccount(mes);
}
const changeOneAccount = function(mes) {
    return changeAccount(mes);
}
module.exports = { getAccount, deleteAccount, addAccount, changeOneAccount }