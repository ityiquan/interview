/**
 * @file gulpfile
 */

const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

gulp.task('deploy', () => gulp.src('./_book/**/*')
        .pipe(ghPages())
        .on("error", (err) => {
            console.log('err',err);
        }));
