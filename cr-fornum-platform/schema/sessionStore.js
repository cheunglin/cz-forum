/**
 * Created by liu on 2018/8/1.
 */
let mongoose = require('../server');

let sessionStoreSchema = new mongoose.Schema({
    _id:String,
    test:String,
    expires: Date,
});

module.exports=mongoose.model('mySessions',sessionStoreSchema)