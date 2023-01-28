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

function img() {
    return src('app/img/**/*.*')
        .pipe(imagemin())
        .pipe(dest('dist/img'))
        .pipe(browserSync.reload({ stream: true }))
}

function js() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'app/js/**/*.*'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
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

const build = gulp.series(clean, gulp.parallel(html, styles, img, js))
const watch = gulp.parallel(build, watchFiles, serve)

exports.html = html
exports.styles = styles
exports.img = img
exports.clean = clean
exports.js = js


exports.build = build
exports.default = watch
