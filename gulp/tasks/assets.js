'use strict';

module.exports = function() {
  $.gulp.task('assets', function() {
    return $.gulp.src(['./source/assets/**/*.*', '!./source/assets/img/sprite/*.*'])
      .pipe($.gulp.dest($.config.root + '/assets/'));
  });
};
