var { loginFun } = require('./../dao/login');
const login = function(mes) {
    return  loginFun(mes.id)
}

module.exports = { login };