const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const currentStatic = require('./gulp/config').root;
const crypto = require('crypto');
const passport = require('passport');

const config = require('./config.json');
const uploadDir = config.upload;

// подключаемся к БД
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@ds145359.mlab.com:45359/portfolio`)
  .catch(e => {
  console.error(e);
  throw e;
});

// подключаем модели БД
require('./models/blog');
require('./models/works');
require('./models/skills');
require('./models/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public/assets/img', 'favicon.png')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, currentStatic)));
app.use(session({
  secret: 'secret',
  key: 'keys',
  cookie: {
    path: '/',
    httpOnly: true,
    naxAge: null
  },
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// подключаем маршруты (routes)
const index = require('./routes/index');
const works = require('./routes/works');
const about = require('./routes/about');
const blog = require('./routes/blog');
const admin = require('./routes/admin');
const login = require('./routes/login');

app.use('/', index);
app.use('/works', works);
app.use('/about', about);
app.use('/blog', blog);
app.use('/admin', admin);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('404'); // рендер страницы 404
});
// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('500');
});


server.listen(config.http.port, config.http.host);
server.on('listening', function () {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});