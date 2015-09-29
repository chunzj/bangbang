module.exports = function copyLoader(gulp, $) {
  // Copy All Files At The Root Level (app)
  gulp.task('copy', function() {
    return gulp.src([
      'app/*'
      ], {
      base: 'app'
    }).pipe(gulp.dest('dist'))
      .pipe($.size({
        title: 'copy'
      }));
  });
};