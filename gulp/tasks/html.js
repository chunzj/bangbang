module.exports = function htmlLoader(gulp, $) {
  // Scan Your HTML For Assets & Optimize Them
  gulp.task('html', function() {
    var assets = $.useref.assets({
      searchPath: '{.tmp, app/public}'
    });
    return gulp.src([
      'app/public/views/**/*.html'
      ], {
        base: 'app'
      })
      .pipe(assets)
      // Concatenate And Minify JavaScript
      .pipe($.if('*.js', $.uglify({
        preserveComments: 'some'
      })))
      // Concatenate And Minify Styles
      .pipe($.if('*.css', $.csso()))
      .pipe(gulp.dest('dist/public'))
      .pipe($.ignore.exclude('*.js'))
      .pipe($.ignore.exclude('*.css'))
      .pipe(assets.restore())
      .pipe($.useref())
      // Minify Any HTML
      .pipe($.if('*.html', $.minifyHtml({
        quotes: true
      })))
      // Output Files
      .pipe(gulp.dest('dist'))
      .pipe($.size({
        title: 'html'
      }));
  });
};