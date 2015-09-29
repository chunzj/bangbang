var runSequence = require('run-sequence');
module.exports = function defaultLoader(gulp, $) {
  // Build Production Files, the Default Task
  gulp.task('default', ['clean'], function(cb) {
    runSequence(['sass', 'jshint'], ['scripts','styles', 'html', 'images', 'fonts', 'copy'], cb);
  });
};