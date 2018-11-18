let config = require('./config.js');
let gulp = require('gulp');

/* ========================================
=            Requiring stuffs            =
========================================*/

let concat = require('gulp-concat');
let del = require('del');
let less = require('gulp-less');
let mobilizer = require('gulp-mobilizer');
let path = require('path');
let seq = require('gulp-sequence');
let uglify = require('gulp-uglify');
let connect = require('gulp-connect');
let waitOn = require('wait-on');
let stripDebug = require('gulp-strip-debug');
let rename = require('gulp-rename');
let sourcemaps = require('gulp-sourcemaps');
let csso = require('gulp-csso');

/* ================================================
=            Report Errors to Console            =
================================================*/

gulp.on('error', function (e) {
    throw (e);
});

/* =========================================
=            Clean dest folder            =
=========================================*/

gulp.task('clean', function () {
    return del(['app/dist/**']);
});

/* ==================================
=            Copy libs           =
==================================*/

gulp.task('copy-angular', function () {
    return gulp.src(config.globs.angular)
        .pipe(gulp.dest(path.join('app/dist', 'libs/angular')));
});

gulp.task('copy-jquery', function () {
    return gulp.src(config.globs.jquery)
        .pipe(gulp.dest(path.join('app/dist', 'libs/jquery')));
});

gulp.task('copy-bootstrap_css', function () {
    return gulp.src(config.globs.bootstrap_css)
        .pipe(gulp.dest(path.join('app/dist', 'libs/bootstrap/css')));
});

gulp.task('copy-bootstrap_font', function () {
    return gulp.src(config.globs.bootstrap_font)
        .pipe(gulp.dest(path.join('app/dist', 'libs/bootstrap/fonts')));
});

gulp.task('copy-bootstrap_js', function () {
    return gulp.src(config.globs.bootstrap_js)
        .pipe(gulp.dest(path.join('app/dist', 'libs/bootstrap/js')));
});

gulp.task('copy-others', function () {
    return gulp.src(config.globs.others)
        .pipe(gulp.dest(path.join('app/dist', 'libs/')));
});

gulp.task('copy-other-libs', function () {
    return gulp.src(config.globs.otherlibs)
        .pipe(gulp.dest(path.join('app/dist', 'libs/custom')));
});


gulp.task('application', function () {
    return gulp.src(config.globs.application)
        .pipe(concat('application.js'))
        .pipe(stripDebug())
        .pipe(gulp.dest('app/dist'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/dist'));
});


gulp.task('css', function () {
    return gulp.src(config.globs.css)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('app/dist'))
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/dist'));
});


gulp.task('default', function (done) {
    seq('clean', 'copy-angular', 'copy-jquery', 'copy-bootstrap_css', 'copy-bootstrap_font', 'copy-bootstrap_js', 'copy-others', 'copy-other-libs', 'application', 'css', done);
});

/* ==========================================
=            Dev watch and connect          =
==========================================*/

gulp.task('dev', function (done) {
    let tasks = [];

    tasks.push('connect');
    tasks.push('watch');

    seq('build', tasks, done);
});

/* ==========================================
=            Web servers                   =
==========================================*/

gulp.task('connect', function () {
    connect.server({
        root: process.cwd(),
        host: '0.0.0.0',
        port: 3000,
        livereload: true
    });
});

/* ==============================================================
=            Setup live reloading on source changes            =
==============================================================*/

gulp.task('livereload:demo', function () {
    return gulp.src(config.globs.livereloadDemo)
        .pipe(connect.reload());
});

/* ===================================================================
=            Watch for source changes and rebuild/reload            =
===================================================================*/

gulp.task('watch', function () {
    gulp.watch(['./app/**/*']);
});

function waitFor(resources) {
    return function () {
        return new Promise(function (resolve, reject) {
            waitOn({
                resources: resources,
                timeout: 30000
            }, function (err) {
                if (err) {
                    process.exit(2);
                    return reject(err);
                }

                resolve();
            });
        });
    };
}
