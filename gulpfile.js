'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  browserSync: require('browser-sync').create(),
  nodemon: require('nodemon'),
  gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function (taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'js:foundation',
    'js:process',
    'assets',
    'css:foundation',
    'sprite:svg'
  ),
  $.gulp.parallel(
    'nodemon'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )

));

$.gulp.task('prod', $.gulp.parallel(
  'sass',
  'js:foundation',
  'js:process',
  'assets',
  'css:foundation',
  'sprite:svg'
));
