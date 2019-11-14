const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const del = require('del');
const fs = require('fs');
const exec = require('child_process').exec;

let leanrunnerBookDir = '../leanrunner-doc-zh-cn';

gulp.task('build-book', function(cb) {
    exec('gitbook build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})

gulp.task('clean-up', function() {
    return del([
        `./node_api/**/*`,
        './model_mgr/**/*',
        './shared/**/*'
      ]);
});

gulp.task('remove-md-from-book', function() {
    return del([
        `./_book/**/*.md`,
        './_book/**/.gitignore',
        './_book/gulpfile.js',
        './_book/package.json',
        './_book/package-lock.json',
        './_book/cover.jpg',
        './_book/cover_bdd.jpg',
        './_book/book-offline.json',
        './_book/book-online.json',
        './_book/preview.js'
      ]);
})

gulp.task('prepare-book-offline', function() {
    gulp.src([`./book-offline.json`])
    .pipe(rename('book.json'))
    .pipe(gulp.dest('./'));
})

gulp.task('prepare-book-online', function() {
    gulp.src([`./book-online.json`])
    .pipe(rename('book.json'))
    .pipe(gulp.dest('./'));
})

gulp.task('copy-leanrunner', function() {
    gulp.src([`${leanrunnerBookDir}/*node_api/**/*`,
        `${leanrunnerBookDir}/*model_mgr/**/*`,
        `${leanrunnerBookDir}/*shared/**/*`
        ])
    .pipe(gulp.dest('./'));
})

gulp.task('merge-toc', function() {
    //read content
    let mmToc = fs.readFileSync(`${leanrunnerBookDir}/model_manager_node_api.md`);
    gulp.src('./summary-origin.md')
    .pipe(replace('*model_manager_node_api*', mmToc))
    .pipe(rename('summary.md'))
    .pipe(gulp.dest('./'));
})

gulp.task('prepare', gulpSequence('clean-up', 'copy-leanrunner', 'merge-toc'));

gulp.task('build', gulpSequence('prepare', 'prepare-book-offline', 'build-book', 'remove-md-from-book'));
gulp.task('build-online', gulpSequence('prepare', 'prepare-book-online', 'build-book', 'remove-md-from-book'));