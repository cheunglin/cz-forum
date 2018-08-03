/**
 * Created by liu on 2018/8/1.
 */
let session=require('express-session');
let SessionStore=require('connect-mongodb-session')(session);

let store=new SessionStore({
    uri:'mongodb://localhost:27017/repository',
    collection:'mysessions',
});

store.on('connected', function() {
    store.client; // The underlying MongoClient object from the MongoDB driver
});

// Catch errors
store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
});

module.exports=store;
