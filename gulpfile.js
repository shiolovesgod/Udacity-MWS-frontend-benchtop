const gulp = require('gulp');
//const sass = require('gulp-sass'); //no sass in this project
// const autoPre = require('gulp-autoprefixer'); // no needd for auto pre-fixer
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const uglifycss = require('gulp-uglifycss');
const server = require('browser-sync');



gulp.task('copy-skeleton', (done) => {
  gulp.src('src/*.html')
    .pipe(gulp.dest('build/'));

  gulp.src('src/sw.js')
    .pipe(gulp.dest('build/'));

  done();
});

gulp.task('copy-images', () => {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('build/img/'));
});

gulp.task('styles', () => {
  return gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('build/css/'));
});


gulp.task('scripts', () => {
  return gulp.src('src/js/**/*.js')
    // .pipe(concat('all.js'))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('reload', (done) => {
  server.reload();
  done();
})


//Run the build
gulp.task('default', (done) => {

  gulp.parallel('copy-skeleton', 'copy-images', 'styles', 'scripts');
  console.log('starting the watch');
  gulp.watch('src/js/**/*.js', gulp.series('scripts', 'reload'));
  gulp.watch('src/css/**/*.css', gulp.series('styles', 'reload'));
  gulp.watch('src/*.html', gulp.series('copy-skeleton', 'reload'));
  gulp.watch('src/sw.js', gulp.series('copy-skeleton', 'reload'));
  console.log('now my watch has ended');
  server.init({
    server: {
      baseDir: './build'
    }
  });
  done();
});


/*
 *
 * PRODUCTION CODE
 *
 */


gulp.task('minify-js', () => {
  return gulp.src('src/js/**/*.js')
    // .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('minify-css', () => {
  return gulp.src('src/css/**/*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('dist', (done) => {

  gulp.parallel('minify-css', 'minify-js');

  //copy html
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'));

  //copy sw.js
  gulp.src('src/sw.js')
    .pipe(gulp.dest('dist/'));


  //copy images
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img/'));

  done();

});