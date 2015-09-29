module.exports = function serveLoader(gulp, $, opts) {
  var browserSync = opts.browserSync;
  var reload = browserSync.reload;
  // Watch Files For Changes & Reload
  gulp.task('serve', ['sass'], function() {
    $.nodemon({
      watch: 'app',
      script: 'http-server -a localhost -p 3001 -c-1',
      ext: 'js html'
    }).on('restart', function() {
      console.log('nodemon restarted');
    });
    browserSync({
      browser: "google chrome",
      // browser: "chromium-browser",  for chromium
      port: 4001,
      proxy: "localhost:3001",
      reloadDelay: 2000, // Wait for the http server ready.
      notify: false,
      startPath: '/'
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
    });
    gulp.watch(['app/public/views/**/*.html'], reload);
    gulp.watch(['app/public/scss/**/*.scss'], ['sass', reload]);
    gulp.watch(['app/public/scripts/**/*.js'], ['jshint']);
    gulp.watch(['app/public/images/**/*'], reload);
  });
};