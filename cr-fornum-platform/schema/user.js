/**
 * Created by liu on 2018/7/31.
 */
let mongoose=require('../server');

// user模块的数据库查询

// 用户的基本信息
let userSchema=new mongoose.Schema({
    account:String,
    pwd:String,
});

module.exports=mongoose.model('User',userSchema);
