var express = require('express');
var path = require('path');
require("dotenv").config()
//var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var databaseRouter = require('./routes/initF1');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/banco', databaseRouter);

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;