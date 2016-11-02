"use strict";

var gulp = require('gulp'),
	notify = require("gulp-notify"),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	rev = require('gulp-rev-append'),
	sass = require('gulp-sass');

gulp.task('concat', function() {
	return gulp.src(['scss/includes/*.scss'])
	.pipe(concat('style.scss'))
	.pipe(gulp.dest('scss'))
	.pipe(notify('Concat!'));
});


gulp.task('scss', function() {
	return gulp.src('scss/style.scss')
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 10 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('app/css'))
	.pipe(notify('Compiled SCSS!'));
});

gulp.task('rev', function() {
  gulp.src('./index.html')
    .pipe(rev())
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
	gulp.watch('scss/includes/**/*.scss', ['concat']);
	gulp.watch('scss/style.scss', ['scss']);
});
gulp.task('default', ['concat', 'scss', 'rev', 'watch']);