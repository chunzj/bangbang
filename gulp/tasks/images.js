module.exports = function imagesLoader(gulp, $) {
  // Optimize Images
  gulp.task('images', function() {
    return gulp.src('app/public/images/**')
      .pipe($.if('*.png', $.imagemin({
        progressive: true,
        interlaced: true
      })))
      .pipe(gulp.dest('dist/public/images'))
      .pipe($.size({
        title: 'images'
      }));
  });
};