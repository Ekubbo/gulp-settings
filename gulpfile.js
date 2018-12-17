'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

gulp.task('styles', function(){
	return gulp.src('src/styles/**/*.styl', {base: 'src'})
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'))
});

gulp.task('clean', function(){
	return del('dist');
});

gulp.task('assets', function(){
	return gulp.src('src/assets/**')
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
	gulp.watch('src/styles/**/*.styl', gulp.series('styles'))
	gulp.watch('src/assets/**', gulp.series('assets'))
});

gulp.task('server', function(){
	browserSync.init({
		server: 'dist',
	});
	browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'assets')));
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));