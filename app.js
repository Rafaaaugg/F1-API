var express = require('express');
var path = require('path');
require("dotenv").config()

var indexRouter = require('./routes/initF1');
var registerRouter = require('./routes/registerAPI');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/season', seasonRouter);
app.use('/driver', driverRouter);
app.use('/races', racesRouter);

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;