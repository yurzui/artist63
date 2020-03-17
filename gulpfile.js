var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    childProcess = require('child_process'),
    minifyHTML = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    runSequence = require('run-sequence'),
    gulpIf = require('gulp-if');

const targetDir = 'docs';

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return childProcess.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('browser-sync-reload', function () {
    browserSync.reload();
});

gulp.task('jekyll-rebuild', function () {
    runSequence(
    'jekyll-build',
    'sass',
    'htmlMinify',
    'jsMinify',
    'minify-css',
    'browser-sync-reload'
  );
});


gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: targetDir
        }
    });
});

gulp.task('htmlMinify', function() {
  gulp.src(`./${targetDir}/**/*.html`)
    .pipe(minifyHTML({
        conditionals: true,
        collapseWhitespace: false
    }))
    .pipe(gulp.dest(`./${targetDir}`))
});


var assets = {
    js: [
        'mixins.js',
        'base.js',
        'main-slider.js',
        'swipe.js',
        'photoswipe.min.js',
        'photoswipe-ui-default.min.js',
        'popup.js',
        'portfolio',
        'falling-leaves.js'
    ]
};

gulp.task('jsMinify', function() {
  gulp.src([
        './src/js/base.js',
        './src/js/swipe.js',
        './src/js/mixins.js',
        './src/js/main-slider.js',
        './src/js/photoswipe.min.js',
        './src/js/photoswipe-ui-default.min.js',
        './src/js/popup.js',
        './src/js/portfolio.js'//,
        //'./src/js/falling-leaves.js' листья осень
        ])
     .pipe(order(assets.js,{ base: './src/js' }))
    .pipe(concat("art.js"))
    .pipe(uglify({
          compress: {
            drop_console: false
          }
    }))
    .pipe(gulp.dest(`./${targetDir}/js`));
});

gulp.task('sass', function () {
    return gulp.src('./src/_scss/*.scss')
        .pipe(sass({
            includePaths: ['partials']
        }))
        .pipe(gulp.dest(`./${targetDir}/css`))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('minify-css', function() {
  return gulp.src(`./${targetDir}/css/*.css`)
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(`./${targetDir}/css`))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch('./src/_scss/*.scss', ['sass']);
    gulp.watch(['./src/**/*.html', './src/**/*.markdown', './src/**/*.md'], ['jekyll-rebuild']);
    gulp.watch(['./src/**/*.js'], ['jsMinify']);
});

gulp.task('dev', function() {
  runSequence(
    'browser-sync',
    'sass',
    'watch'
  );
});

gulp.task('default', function() {
  runSequence(
    'jekyll-build',
    'sass',
    'htmlMinify',
    'jsMinify',
    'minify-css'
  );
});
