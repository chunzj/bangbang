'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles', ['sass']);

gulp.task('sass-inject', function () {
  var sassOptions = {
    style: 'expanded'
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.scss'),
    path.join('!' + conf.paths.src, '/app/**/_*.scss'),
    path.join('!' + conf.paths.src, '/app/index.scss')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };


  return gulp.src([
    path.join(conf.paths.src, '/app/index.scss')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    //.pipe($.rubySass(sassOptions)).on('error', conf.errorHandler('RubySass'))
    //.pipe(cssFilter)
    //.pipe($.sourcemaps.init({ loadMaps: true }))
    //.pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    //.pipe($.sourcemaps.write())
    //.pipe(cssFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.src, '/app/')))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('sass', ['sass-inject'], function () {
  var cssFilter = $.filter('**/*.css', { restore: true });

  return $.rubySass(path.join(conf.paths.src, '/app/index.scss'), {
    precision: 10,
    style: "expanded",
    quiet: true,
    trace: true
  }).on('error', console.error.bind(console))
    .pipe(cssFilter)
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(cssFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    .pipe(browserSync.reload({ stream: true }));
});
