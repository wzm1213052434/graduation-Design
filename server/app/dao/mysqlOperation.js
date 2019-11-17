let mysqlUtil = require('../Utils/getDatabaseConnection')
// 声明一个同步方法, 这里要求有 SQL 语句的基础
module.exports = async function mysqlOperation(sqlStr, arr) {
    // 获取连接, es6 新特性 awit 不能少
    let result;
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
    result = await new Promise((resolve, reject) => {
        if (!arr) {
            conn.query(sqlStr, function (err, ret) {
                if (err) {
                    // 回滚之前的数据库操作, 直至碰到 beginTransaction
                    return conn.rollback(() => {
                        resolve(err);
                    });
                }
                resolve(ret);
            });
        } else {
            conn.query(sqlStr, arr, function (err, ret) {
                if (err) {
                    // 回滚之前的数据库操作, 直至碰到 beginTransaction
                    return conn.rollback(() => {
                        resolve(err);
                    });
                }
                resolve(ret);
            });
        }

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
    return result;
};
