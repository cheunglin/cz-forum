var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let bodyParser = require('body-parser');
let multer = require('multer');
let session = require('express-session');
let store = require('./sessionStore');
let sessionStoreDb = require('./model/sessionStore');

var apiUserRouter = require(__dirname + '/routes/api/user');

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'})

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(multer())

// 设置session
app.use(session({
    secret: 'cczrllhq',
    cookie: {
        maxAge: 1000 * 60 * 60 * 0.03
    },
    store: store,
    resave: false,
    saveUninitialized: false,
}));

// view engine setup
app.engine('handlebars', handlebars.engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser("cczrllhq"));
app.use(express.static(path.join(__dirname, 'public')));

// 拦截器,如果数据库无该session，重定向到登录页，如果有更新时间
app.all('*', function (req, res) {

    sessionStoreDb.find(req.session.id).then(function (result) {

        if (result.status === 'SUCCESS') {
            console.log(req.session.id)
            console.log(result.data)
            if(req.path === '/user/login'){
                if (result.data) {
                    let data = {
                        status: '200',
                        result: 'SUCCESS',
                        desc: '您已经登录！'
                    }
                    res.set('Content-type', 'application/json');
                    res.send(data);
                    res.end();
                } else {
                    req.next();
                }
            } else {
                if (result.data) {
                    req.next();
                } else{
                    let data = {
                        status: '200',
                        result: 'SUCCESS',
                        desc: '请先登录！'
                    }
                    res.set('Content-type', 'application/json');
                    res.send(data);
                    res.end();
                }
            }

        }

});

})

app.use('/', apiUserRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
