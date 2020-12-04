const { src, dest,symlink, parallel, watch} = require('gulp');
const del = require('del');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//Browser Sync
function browser() {
    browserSync.init({
        server: {
            baseDir:"./"
        }
    })
    watch("*html").on('change', browserSync.reload);
}

// Sass (scss -> css)
function copie() {
    return src('img/*')
        .pipe(dest('imgDest/'))
}

function clean() {
    return del('img')
}

function linkExemple() {
    return src('index.html')
        .pipe(symlink('dossier1'));
}

function sass() {
    return src('./sass/import.scss')
        .pipe(gulpSass())
        .pipe(dest('./css/'))
        .pipe(browserSync.stream())
}

//Watch SASS
function watcher(done) {
    watch('./sass/', sass)
    done();
}

module.exports = {
    copie,
    clean,
    linkExemple,
    sass,
    watcher,
    browser: parallel(browser,watcher)
    //    build: parallel(css, sass)
}