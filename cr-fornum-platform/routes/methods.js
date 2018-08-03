/**
 * Created by liu on 2018/7/30.
 */

const methods = {
    getRequestData: getRequestData
};

// 处理请求，获取数据
function getRequestData(req) {

    // 判断请求方式
    let reqType = req.method.toUpperCase();


    // 不同请求方式获取数据

    let result = {};
    if (reqType === 'GET') {
        result = req.query;
    } else if (reqType === 'POST') {
        result = req.json(req.body);
    }

    // 返回处理结果,返回一个promise
    let p = new Promise(function (resolve, reject) {
        return resolve(result,reqType)
    });

    return p;

}

module.exports = methods;
