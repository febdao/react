'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  src = {
    scss: '../scss/*.scss',
    css: '../css/',
    cssFile: '../css/**/*.css',
    htmlFile: '../demos/**/*.html',
  };

gulp.task('sass-dev', function(){
  gulp.src(src.scss)
    .pipe(sass({
      errLogToConsole: true
    }))
    .on('error', function(err){
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer({browsers: ['safari >= 8', 'last 3 versions', '> 2%']}))
    .pipe(gulp.dest(src.css))
});

gulp.task('local-dev', ['sass-dev'], function() {
  browserSync({
    server: {
      baseDir: "../",
    }
  });

  gulp.watch(src.scss, ['sass-dev']);
  gulp.watch(src.cssFile, reload);
  gulp.watch(src.htmlFile, reload);
});

gulp.task('default', ['local-dev']);
