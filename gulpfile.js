const { src, dest } = require('gulp')
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const autoprefixer = require('gulp-autoprefixer')
const cssbeautify = require('gulp-cssbeautify')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const del = require('del')


function serve() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
}

function html() {
    return src('app/**/*.html')
        .pipe(dest('dist/'))
        .pipe(browserSync.reload({ stream: true }))
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(cssbeautify())
        .pipe(dest('dist/css'))
        .pipe(cssnano())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }))
}

function libs() {
    return src('app/libs/*.css')
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('dist/libs'))
        .pipe(browserSync.reload({ stream: true }))
}

function img() {
    return src('app/img/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/img'))
        .pipe(browserSync.reload({ stream: true }))
}

function js() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'node_modules/rateyo/src/jquery.rateyo.js',
        'app/js/**/*.*'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }))
}

function fonts() {
    return src('app/fonts/**/*.*')
        .pipe(dest('dist/fonts'))
        .pipe(browserSync.reload({ stream: true }))
}

function watchFiles() {
    gulp.watch('app/**/*.html', html)
    gulp.watch('app/scss/**/*.scss', styles)
    gulp.watch('app/img/**/*.*', img)
    gulp.watch('app/js/**/*.*', js)
}

function clean() {
    return del('dist/')
}

const build = gulp.series(clean, gulp.parallel(html, styles, libs, img, js, fonts))
const watch = gulp.parallel(build, watchFiles, serve)

exports.html = html
exports.styles = styles
exports.libs = libs
exports.img = img
exports.clean = clean
exports.js = js
exports.fonts = fonts


exports.build = build
exports.default = watch
