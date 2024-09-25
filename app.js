var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 打開body的容量限制(原本default設定為1MB)，注意此項設定必須要在所有的use上面，不然設定會無效
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//CORS的解法
const cors = require('cors');
app.use(cors());
// app.get('/your-endpoint', function(req, res) {
//   res.json = {message: "CORS enabled"};
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 將public內的檔案化為可讀取的網址
app.use(express.static('public'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
// app.use(uploadRouter.json({limit: '50mb'}));
// app.use(uploadRouter.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
