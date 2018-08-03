/**
 * Created by liu on 2018/7/31.
 */

let User = require('../schema/user');

// 新增
function insert(data) {

    let user = new User(data);
    let p = new Promise(function (resolve, reject) {
        user.save(function (err, res) {
            if (err) {

                return resolve({status: 'ERROR'})
            }
            else {
                return resolve({status: 'SUCCESS'})
            }
        });
    });

    return p;
}

// 修改
function find(data) {
    let p = new Promise(function (resolve, reject) {
        User.find(data, function (err, res) {
            if (err) {

                return resolve({status: 'ERROR'})
            }
            else {
                return resolve({status: 'SUCCESS',data:res})
            }
        });
    });
    return p;
}
// 删除
// 查找

module.exports = {
    insert: insert,
    find: find
}