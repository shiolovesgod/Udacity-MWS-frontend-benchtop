const gulp = require('gulp');
const sass = require('gulp-sass'); //no sass in this project
// const autoPre = require('gulp-autoprefixer'); // no needd for auto pre-fixer
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const uglifycss = require('gulp-uglifycss');
const server = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');

const nunjucksRender = require('gulp-nunjucks-render');
  const changeExt = require('gulp-dest'); //changeExt (<dest_folder>, <options>)


gulp.task('watch-files', (done) => {
  gulp.watch('src/js/**/*.js', gulp.series('scripts'));
  gulp.watch('src/css/**/*.css', gulp.series('styles'));
  gulp.watch('src/css/**/*.+(scss|sass)', gulp.series('build-css'));
  // gulp.watch('src/*.html', gulp.series('copy-skeleton'));
  gulp.watch('src/html/**/*.+(njk|html)', gulp.series('build-html'));
  gulp.watch('src/sw.js', gulp.series('copy-skeleton'));
  gulp.watch('README.md', ()=>{
    return gulp.src('README.md')
      .pipe(gulp.dest('dist/'));
  })
 
  done();
});

gulp.task('favicon', () => {

  return gulp.src('src/icon/*.png')
    .pipe(gulp.dest('build/icon/'))
    .pipe(gulp.dest('dist/icon'))
});

gulp.task('build-css',()=>{
  return gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css/'));
})

gulp.task('build-html', () => {
  return gulp.src('src/html/pages/*.+(html|njk)')
    .pipe(nunjucksRender({
      path: ['src/html']
    })).pipe(changeExt('build/',{ext:'.html'}))
    .pipe(gulp.dest('./'));
})


gulp.task('copy-skeleton', (done) => {
  //HTML files (plain)
  gulp.src('src/*.html')
    .pipe(gulp.dest('build/'));

  gulp.src('src/sw.js')
    .pipe(gulp.dest('build/'));

  gulp.src('src/site.webmanifest')
    .pipe(gulp.dest('build/'))

  done();
});

gulp.task('copy-images', () => {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('build/img/'));
});

gulp.task('styles', gulp.parallel('build-css',() => {
  return gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('build/css/'));
}));


gulp.task('scripts', () => {

  //concat utils
  gulp.src(['src/js/utils/third-party/*.js', 'src/js/utils/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('library.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js/'));

  //copy main files
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('build/js/'));

});

gulp.task('reload', (done) => {
  server.reload();
  done();
})


/*
 *
 * QUICK DEV CODE
 *
 */

//Run the build
gulp.task('default', gulp.parallel('copy-skeleton', 'build-css','styles', 'scripts', (done) => {

  console.log('starting the watch');
  gulp.watch('src/js/**/*.js', gulp.series('scripts', 'reload'));
  gulp.watch('src/css/**/*.css', gulp.series('styles', 'reload'));
  gulp.watch('src/css/**/*.+(scss|sass)', gulp.series('build-css', 'reload'));
  // gulp.watch('src/*.html', gulp.series('copy-skeleton','reload'));
  gulp.watch('src/html/**/*.+(njk|html)', gulp.series('build-html', 'reload'));
  gulp.watch('src/sw.js', gulp.series('copy-skeleton', 'reload'));
  console.log('now my watch has ended');
  server.init({
    server: {
      // https: true,
      baseDir: './build'
    }
  });
  done();
}));





/*
 *
 * BUILD CODE (no watching)
 *
 */

gulp.task('build', gulp.parallel('copy-skeleton','copy-images','styles', 'scripts','build-html','favicon', (done) => {

  server.init({
    server: {
      // https: true,
      baseDir: './build'
    }
  });
  done();
}));

/*
 *
 * PRODUCTION CODE
 *
 */


gulp.task('minify-js', () => {
  //concat utils
  gulp.src(['src/js/utils/third-party/*.js', 'src/js/utils/*.js'])
    // .pipe(sourcemaps.init())
    .pipe(concat('library.js'))
    .pipe(uglify())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js/'));    

  //copy main files
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));

});

gulp.task('minify-css', () => {
  return gulp.src(['src/css/*.scss', 'src/css/**/*.css'])
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('dist/css/'));
});


gulp.task('dist', gulp.parallel('minify-css', 'minify-js','favicon', (done) => {

  //copy readme
  gulp.src('README.md')
    .pipe(gulp.dest('dist/'));

  //build html pages
  gulp.src('src/html/pages/*.+(html|njk)')
    .pipe(nunjucksRender({
      path: ['src/html']
    })).pipe(changeExt('dist/',{ext:'.html'}))
    .pipe(gulp.dest('./'));

  //copy sw.js
  gulp.src('src/sw.js')
    .pipe(gulp.dest('dist/'));

  gulp.src('src/site.webmanifest')
    .pipe(gulp.dest('dist/'))

  //copy images
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img/'));

  done();

}));

gulp.task('launch-dist', gulp.series('dist', (done) => {
  server.init({
    server: {
      https: true,
      baseDir: './dist'
    }
  });
}));