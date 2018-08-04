/**
 * Created by liu on 2018/7/30.
 */
let express = require('express');
let router = express.Router();
let methods = require('../../routes/methods')
let dbMethods = require('../../model/user');
let session =require('express-session');

// 注册（未有校验密码加密）
router.get('/user/register', function (req, res) {
    methods.getRequestData(req).then(function (result, type) {

        // 获取数据
        // 查询数据库是否注册过,未注册则insert，注册过则返回已注册信息
        if (result && result.account && result.pwd) {
            let searchData = {
                account: result.account
            }
            dbMethods.find(searchData).then(function (findRes) {
                if (findRes.status === 'SUCCESS') {
                    if (findRes.data.length === 0) {
                        dbMethods.insert(result).then(function (insertRes) {
                            if (insertRes.status === 'SUCCESS') {
                                let data = {
                                    status: '200',
                                    result: 'SUCCESS',
                                    desc: '注册成功！'
                                }
                                res.set('Content-Type', 'application/json');
                                res.send(data);
                                res.end();
                            } else {
                                let data = {
                                    status: '200',
                                    result: 'ERROR',
                                    desc: '注册失败！'
                                }
                                res.set('Content-Type', 'application/json');
                                res.send(data);
                                res.end();
                            }
                        });
                    } else {
                        let data = {
                            status: '200',
                            result: 'ERROR',
                            desc: '该账号已经注册过！'
                        }
                        res.set('Content-Type', 'application/json');
                        res.send(data);
                        res.end();
                    }
                }
            });

        }

    })
});

// 登录
router.get('/user/login', function (req, res) {
    methods.getRequestData(req).then(function (result) {
        // 获取数据
        // 查询数据库是否注册过
        if (result && result.account && result.pwd) {
            dbMethods.find(result).then(function (findRes) {
                if (findRes.status === 'SUCCESS') {
                    if (findRes.data.length) {
                        req.session.save(function (err) {

                            console.log("ok")
                            let data={
                                status: '200',
                                result: 'SUCCESS',
                                desc: '登录成功！'
                            }
                            res.set('Content-type','application/json');
                            res.cookie('connect.sid', req.session.id, {
                                signed:true
                            })
                            res.send(data);
                            res.end();
                        });
                    } else{
                        let searchData={
                            account:result.account
                        }

                        // 登录错误原因：1、未注册 2、密码错误
                        dbMethods.find(searchData).then(function (findNextRes) {

                            if(findNextRes.status==='SUCCESS'){
                                if(findNextRes.data.length){
                                    let data={
                                        status: '200',
                                        result: 'ERROR',
                                        desc: '密码错误！'
                                    }
                                    res.set('Content-type','application/json');
                                    res.send(data);
                                    res.end();
                                } else {
                                    let data={
                                        status: '200',
                                        result: 'ERROR',
                                        desc: '该账号未注册！'
                                    }
                                    res.set('Content-type','application/json');
                                    res.send(data);
                                    res.end();
                                }

                            }

                        })


                    }
                }
            })
        }

    });
});

module.exports = router;
