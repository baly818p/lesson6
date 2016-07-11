'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('gulp-main-bower-files');
var browserSync = require('browser-sync').create();
var flatten = require('gulp-flatten');
var logger = require('gulp-logger');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./public",
        port: 3010
    });
    gulp.watch('./frontend/stylesheets/**/*.scss', ['sass']);
    gulp.watch('./frontend/javascripts/**/*.js', ['public']);
});

gulp.task('main-bower-files',  function() {
     return gulp.src('./bower.json')
        .pipe(mainBowerFiles(['**/*.js']))
        .pipe(flatten())
        .pipe(logger())
        .pipe(gulp.dest('./frontend/javascripts'));
});

gulp.task('sass', function () {
    return gulp.src('./frontend/stylesheets/**/*.scss')
       .pipe(sourcemaps.init())
       .pipe(sass().on('error', sass.logError))
       .pipe(sourcemaps.write('./maps'))
       .pipe(gulp.dest('./public/css'))
       .pipe(browserSync.stream());
});

gulp.task('public', ['main-bower-files'], function(){
    return gulp.src('./frontend/javascripts/*.js')
    .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['serve', 'public']);
