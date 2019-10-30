let mysqlUtil = require('../Utils/getDatabaseConnection')
// 声明一个同步方法, 这里要求有 SQL 语句的基础
let getYwCompareScore = async function () {
    // 获取连接, es6 新特性 awit 不能少
    let result=[];
    let conn = await mysqlUtil();
    await new Promise((resolve, reject) => {
        conn.beginTransaction(err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    let result2 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT name FROM yw_compare_sorce where flag = '[w'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result1 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT sorce FROM yw_compare_sorce where flag = '[w'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result3 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT name FROM yw_compare_sorce where flag = '[y'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result4 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT sorce FROM yw_compare_sorce where flag = '[y'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result5 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT name FROM yw_compare_xiazai where flag = '[w'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result6 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT sorce FROM yw_compare_xiazai where flag = '[w'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result7 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT name FROM yw_compare_xiazai where flag = '[y'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result8 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT sorce FROM yw_compare_xiazai where flag = '[y'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    await new Promise((resolve, reject) => {
        conn.commit(err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    conn.release();
    for(let i=0;;i++){
        console.log("我变了！")
        if (!!result1[i]||!!result2[i]||!!result3[i]||!!result4[i]||!!result5[i]||!!result6[i]||!!result7[i]||!!result8[i]) {
            result.push({
                resultOfSorce: {
                    jia: {
                        name: result2[i],
                        sorce:result1[i]
                    },
                    y: {
                        name: result3[i],
                        sorce: result4[i]
                    }
                },
                resultOfXiaZai: {
                    jia: {
                        name: result5[i],
                        xiaZai: result6[i]
                    },
                    y: {
                        name: result7[i],
                        xiaZai: result8[i]
                    }
                }
            })
        }
    else{
            return result;
        }
    }
    return result;
};

module.exports = {
    getYwCompareScore
}
