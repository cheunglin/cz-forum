/**
 * Created by liu on 2018/7/31.
 */
let mongoose = require('mongoose');
let DB_URL = 'mongodb://localhost:27017/repository'

mongoose.connect(DB_URL);

mongoose.connection.on('connected',function () {
    console.log('db is connected!')
});

mongoose.connection.on('error',function () {
    console.log('db is error!')
});

mongoose.connection.on('disconnected',function () {
    console.log('db is disconnected!')
});

module.exports=mongoose;