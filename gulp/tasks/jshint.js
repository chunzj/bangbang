module.exports = function jshintLoader(gulp, $, opts) {
  var browserSync = opts.browserSync;
  var reload = browserSync.reload;
  gulp.task('jshint', function() {
    return gulp.src([
      'app/public/scripts/**/*.js',
      '!app/public/scripts/**/*.min.js'
      ])
      .pipe(reload({
        stream: true,
        once: true
      }))
      .pipe($.jshint({
        defaultFile:'.jshintrc'
      }))
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
  });
}