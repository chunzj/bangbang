var AUTOPREFIXER_BROWSERS = [
  // 'ie >= 10',
  'ie_mob >= 10',
  // 'ff >= 30',
  'chrome >= 34',
  // 'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 2.3'
  // 'bb >= 10'
];
module.exports = function stylesLoader(gulp, $) {
  gulp.task('sass', function() {
    return $.rubySass('app/public/scss', {
      precision: 10,
      style: "expanded",
      quiet: true,
      trace: true
    }).on('error', console.error.bind(console))
      .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe(gulp.dest('app/public/styles'));
  });
  // Compile and Automatically Prefix Stylesheets
  gulp.task('styles', function() {
    return gulp.src(['app/public/styles/**/*.css'])
      .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe(gulp.dest('app/public/styles'))
      // Concatenate And Minify Styles
      .pipe($.if('*.css', $.csso(true)))
      .pipe(gulp.dest('dist/public/styles/bangbang.min.css'))
      .pipe($.size({
        title: 'styles'
      }));
  });
};