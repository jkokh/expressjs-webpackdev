let gulp = require("gulp");
let ts = require("gulp-typescript");


gulp.task("default", function () {
    gulp.src(['./backend/**/*.ts'])
        .pipe(ts("tsconfig.json"))
        .pipe(gulp.dest('dist'));
});

gulp.task("copy", function () {
    gulp.src(['./backend/config/**/*',
        './backend/public/**/*',
        './backend/views/**/*',
        './backend/**/*.ejs',
        './package.json',
        './backend/**/*.txt'], {base: './backend', dot: true})
        .pipe(gulp.dest('dist'));
    gulp.src('package.json').pipe(gulp.dest('./dist'));
});
