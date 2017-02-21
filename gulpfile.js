var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    changed       = require('gulp-changed'),
    browserify    = require('gulp-browserify'),

    postcss       = require('gulp-postcss'),
    pxtorem       = require('postcss-pxtorem'),
    colorFunction = require('postcss-color-function'),
    selectors     = require('postcss-custom-selectors'),
    autoprefixer  = require('autoprefixer'),
    size          = require('postcss-size'),

    ts            = require('gulp-typescript'),
    tsProject     = ts.createProject('tsconfig.json'),

    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    clean         = require('gulp-clean'),

    gutil         = require('gulp-util'),
    debug         = require('gulp-debug');

/*------------------------------------*\
    Html
\*------------------------------------*/
gulp.task('copy-html', function() {
  return gulp
    .src([
      'resources/views/**/*.html',
    ])
    .pipe(changed('public/views/', {extension: '.html'}))
    .pipe(debug({title: 'copy-html:'}))
    .pipe(gulp.dest('public/views'));
 });

/*------------------------------------*\
 Sass
\*------------------------------------*/
gulp.task('sass', function() {
  var processors = [
      autoprefixer({ browsers: ['last 20 versions'] }),
      selectors,
      size,
      colorFunction,
      //pxtorem({
      //    replace: true
      //})
  ];

  return gulp.src([
    'resources/assets/sass/app.scss'
    ])
    .pipe(concat('style.css'))
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', function (message) {
      gutil.log(gutil.colors.red(message));
      this.emit('end');
    })
    .pipe(postcss(processors))
    .pipe(debug({title: 'sass:'}))
    .pipe(gulp.dest('public/css/'));
});

/*------------------------------------*\
 Uglify
\*------------------------------------*/
gulp.task('compress-js', function() {
  return gulp.src([
    //Polyfill(s) for older browsers (Angular2)
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/systemjs/dist/system.src.js',
    'resources/assets/js/systemjs.config.js'
  ])
    .pipe(concat('global.min.js'))
    //.pipe(uglify())
    .pipe(debug({title: 'compress-js:'}))
    .pipe(gulp.dest('public/js/'));
});

/*------------------------------------*\
    Clean
\*------------------------------------*/
gulp.task('clean', function () {
  return gulp
      .src([
          'public/js/temp-ts/',
      ], { read: false })
      .pipe(clean());
});

/*------------------------------------*\
    Typescript
\*------------------------------------*/
gulp.task('typescript', ['clean'], function () {
  var tsResult = gulp.src('resources/assets/js/**/*.ts')
          .pipe(debug({title: 'compile-typescript:'}))
          .on('error', function (message) {
            gutil.log(gutil.colors.red(message));
            this.emit('end');
          })
          .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('public/js/temp-ts'));
});


/*------------------------------------*\
    Concat typescript
\*------------------------------------*/
gulp.task('concat-typescript', [ 'typescript' ], function () {
  return gulp
      .src('public/js/temp-ts/main.js')
      .pipe(browserify())
      // .pipe(uglify())
      .on('error', function (message) {
        gutil.log(gutil.colors.red(message));
        this.emit('end');
      })
      .pipe(concat('app.js'))
      .pipe(gulp.dest('public/js'));
});

/*------------------------------------*\
 Run default gulp tasks
\*------------------------------------*/

gulp.task('default', [
  'copy-html',
  'sass',
  'compress-js',
  'concat-typescript',
  'watch'
]);

/*------------------------------------*\
 Watch
\*------------------------------------*/

gulp.task('watch', function() {
  gulp.watch('resources/views/**/*.html', ['copy-html']);
  gulp.watch('resources/assets/sass/**/*.scss', ['sass']);
  gulp.watch('resources/assets/js/**/*.ts', ['concat-typescript']);
});