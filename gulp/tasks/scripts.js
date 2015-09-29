module.exports = function scriptsLoader(gulp, $) {
  // Minify JavaScript
  gulp.task('scripts', function() {
    return gulp.src([
      'app/public/scripts/**/*.js'
    ])
      // Concatenate And Minify Styles
      .pipe($.if('!*.min.js', $.uglify({
        preserveComments: 'some'
      })))
      .pipe(gulp.dest('dist/public/scripts/bangbang.min.js'))
      .pipe($.size({
        title: 'scripts'
      }));
  });
};