const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('autoprefixer', function() {
	return gulp.src('./css/*.css')
		.pipe(postcss([ autoprefixer() ]))
		.pipe(gulp.dest('./css'))
});

gulp.task('sass', function(){
  return gulp.src('./css/*.scss')
    .pipe(sass())
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: { baseDir: './' }
	});
});

gulp.task('watch', ['browserSync', 'sass', 'autoprefixer'], function(){
  gulp.watch('./css/*.scss', ['sass']); 
	gulp.watch('./css/*.css', ['autoprefixer']);
	gulp.watch('./*.html', browserSync.reload);
	gulp.watch('./javascripts/*.js', browserSync.reload);
})