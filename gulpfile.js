const gulp = require('gulp'),
      sass = require('gulp-sass'),
      moduleImporter = require('sass-module-importer'),
      pug = require('gulp-pug'),
      concat = require('gulp-concat'),
      babel = require('gulp-babel'),
      autoprefixer = require('gulp-autoprefixer'),
      del = require('del'),
      series = require('gulp-series'),
      browserSync = require('browser-sync').create();

gulp.task('clean', function() {
  return del('dest')
});

gulp.task('html', function() {
  return gulp.src('./src/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dest'))
});

gulp.task('css', function() {
  return gulp.src('./src/css/manifest.sass')
    .pipe(sass({ importer: moduleImporter() }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dest/css'))
});

gulp.task('js', function() {
  return gulp.src('./src/js/*.js')
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dest/js'));
});



gulp.task('build',
  gulp.series('clean',
    gulp.parallel('html', 'css', 'js')
  )
);
gulp.task('watch', function() {
  gulp.watch('./src/css/*.sass', gulp.series('css'))
  gulp.watch('./src/*.pug', gulp.series('html'))
  gulp.watch('./src/js/*.js', gulp.series('js'))
});
gulp.task('serve', () => {
  browserSync.init({
    server: 'dest',
    port: 8080,
    ui: {
      port: 8081,
    },
  })
  browserSync.watch('dest/**/*.*').on('change', browserSync.reload)
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));
