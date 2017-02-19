// Modules
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      concatcss = require('gulp-concat-css'),
      minifycss = require('gulp-clean-css'),
      htmlmin = require('gulp-htmlmin'),
      imagemin = require('gulp-imagemin'),
      uglify = require('gulp-uglify'),
      del = require('del'),
      runSeq = require('run-sequence'),
      source = require('vinyl-source-stream'),
      vbuffer = require('vinyl-buffer'),
      sourcemaps = require('gulp-sourcemaps'),
      ts = require('gulp-typescript'),
      tsProject = ts.createProject('tsconfig.json');

gulp.task('build-clean', () => {
  return del('dist', { force: true });
});

gulp.task('build-markup', () => {
  return gulp.src('src/html/**/*.html')
    // Minify
    .pipe(htmlmin({ collapseWhitespace: true }))
    // Output
    .pipe(gulp.dest('dist/html'));
});

gulp.task('build-styles', () => {
  return gulp.src('src/scss/**/*.scss')
    // Compile SASS
    .pipe(sass().on('error', sass.logError))
    // Concat
    .pipe(concatcss('style.css'))
    // Save non minified
    .pipe(gulp.dest('dist/css'))
    // Minify
    .pipe(minifycss())
    // Rename
    .pipe(rename('style.min.css'))
    // Output;
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build-scripts', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist/js'));
});

gulp.task('build-images', () => {
  return gulp.src('src/img/**/*')
    // Minify
    .pipe(imagemin())
    // Output
    .pipe(gulp.dest('dist/img'));
});

// Build all
gulp.task('build', () => {
  runSeq('build-clean', ['build-markup', 'build-styles', 'build-scripts', 'build-images']);
});

// Default to build all
gulp.task('default', ['build']);
