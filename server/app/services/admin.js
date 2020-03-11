let { getAllAccount, getOneAccount , deleteOneAccount , addOneAccount } = require('./../dao/admin');
let accountSelect = function(id) {
    if(!id) {
        return getAllAccount();
    }else {
        return getOneAccount(id);
    }
}



module.exports = { accountSelect }