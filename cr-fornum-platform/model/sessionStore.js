/**
 * Created by liu on 2018/8/1.
 */
let sessionStore = require('../schema/sessionStore');
let mongoose=require('mongoose');


function find(data) {
    let p = new Promise(function (resolve, reject) {

        sessionStore.findById(data,function (err, res) {
            if (err) {

                return resolve({status: 'ERROR',data:res})
            }
            else {
                return resolve({status: 'SUCCESS',data:res})
            }
        });
    });
    return p;
}

module.exports={
    find:find
}
