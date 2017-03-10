const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const currentStatic = require('./gulp/config').root;

const index = require('./routes/index');
// const users = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, currentStatic)));

app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  res.status(404).render('404'); // рендер страницы 404

});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('500');
});

server.listen(3000, 'localhost');
server.on('listening', function () {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});

// module.exports = app;
