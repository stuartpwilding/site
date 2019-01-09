var gulp = require('gulp');
var injectPartials = require('gulp-inject-partials');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
 
gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
    .pipe(injectPartials({
      removeTags: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('images', function(){
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./build/img'))
});

gulp.task('styles', function() {
  gulp.src('./src/sass/style.scss')
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('./scripts.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('build', ['html', 'images', 'styles', 'scripts']);

gulp.task('watch',function() {
  gulp.watch('src/**/*.html',['html']);
  gulp.watch('src/img/**/*',['images']);
  gulp.watch('src/sass/**/*.scss',['styles']);
  gulp.watch('src/js/*.js', ['scripts']);
});
