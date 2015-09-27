// This file defines the `app.js` module.
// The actual script start the server in bin/www.
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Routes handlers.
var routes = require('./routes/index');
var users = require('./routes/users');

// app inherits from http server actually.
var app = express();

// Set the app's setting table.
// See [here](http://expressjs.com/4x/api.html#app.set)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Mount the middlewares.
// See [here](http://expressjs.com/4x/api.html#app.use)

// All requests will go through the following middlewares.

// uncomment after placing your favicon in /public
//```
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//```
app.use(logger('dev'));
// Parse post body as json if the post body is json
app.use(bodyParser.json());
// Parse urlencoded post body into object.
app.use(bodyParser.urlencoded({ extended: false }));
// Handle the cookies
app.use(cookieParser());
// Serve static files in the folder `public`. (eg. js, css, images, fonts and etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Req path specific middleware mounting.
app.use('/', routes);         // All requests to /.* is handled by `routes`
app.use('/users', users);     // All requests to /users/.* is handled by `users`

var exeV1 = require('./exercises/v1.js');
app.use('/api/v1', exeV1);    // Let's do some exercises

var exeV2 = require('./answers/v2.js');
app.use('/api/v2', exeV2);    // More exercise

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
