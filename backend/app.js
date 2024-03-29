var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

var database = require('./db')

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

var app = express();

//Express Session Imports
var session = require('express-session');

const test = 1000 * 6000
// Express Sessions Setup
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'SES2Bsecretkeywowthisisasecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // for development only, set to true for https cookie setup
}))
app.use(connectLivereload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

database.connectToServer(function(err, client){
  if (err) {
    console.log(err);
  }
  else{
    database.createGridBucket(function(error){
      if (error) {
        console.log(error)
      }
      else {
        var indexRouter = require('./routes/index');
        var usersRouter = require('./routes/users');
        var recordingRouter = require('./routes/recording');
        var allocationRouter = require('./routes/exam_allocation');
        var changelogRouter = require('./routes/change_log');
        var examRouter = require('./routes/exam');

        app.use('/', indexRouter);
        app.use('/users', usersRouter);
        app.use('/recording', recordingRouter);
        app.use('/exam_allocation', allocationRouter)
        app.use('/change_log', changelogRouter)
        app.use('/exam', examRouter);

        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
          next(createError(404));
        });

        // error handler
        app.use(function (err, req, res, next) {
          // set locals, only providing error in development
          res.locals.message = err.message;
          res.locals.error = req.app.get('env') === 'development' ? err : {};

          // render the error page
          res.status(err.status || 500);
          res.render('error');
        });
      }
    });
  }
})

console.log("Starting Server ");
module.exports = app;
