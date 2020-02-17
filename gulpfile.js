var syntax = 'less'; // Syntax: sass or scss;

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    path = require('path'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    spritesmith	= require('gulp.spritesmith'),
    svgSprite	= require('gulp-svg-sprites'),
    svgmin		= require('gulp-svgmin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    ftp = require('vinyl-ftp'),
    cheerio		= require('gulp-cheerio'),
    replace		= require('gulp-replace');
    rsync = require('gulp-rsync');
    

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  })
});
// gulp.task('less', function() {
//   return gulp.src('app/less/**/main.less')
//     .pipe(sass({ outputStyle: 'compact' }).on("error", notify.onError()))
//     .pipe(rename({ suffix: '-less.min', prefix: '' }))
//     .pipe(autoprefixer(['last 15 versions']))
//     //.pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
//     .pipe(gulp.dest('app/css'))
//     .pipe(browserSync.stream())
// });

gulp.task('less', function () {
  return gulp.src('app/less/**/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(rename({ suffix: '-less.min', prefix: '' }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('scss', function() {
  return gulp.src('app/scss/**/main.scss')
    .pipe(sass({ outputStyle: 'compact' }).on("error", notify.onError()))
    .pipe(rename({ suffix: '-scss.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    //.pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
});

gulp.task('sass', function() {
  return gulp.src('app/sass/**/main.sass')
    .pipe(sass({ outputStyle: 'compact' }).on("error", notify.onError()))
    .pipe(rename({ suffix: '-sass.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    //.pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
});

gulp.task('styles-libs', function() {
  return gulp.src('app/sass/**/libs.sass')
    .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
});

gulp.task('js', function() {
  return gulp.src([
      'app/libs/jquery/dist/jquery.min.js',
      'app/libs/fancybox/jquery.fancybox.js',
      'app/libs/fancybox/jquery.fancybox.pack.js',
      'app/libs/slick-slider/slick.min.js',
      'app/libs/maskedinput/jquery.maskedinput.min.js',
    ])
    .pipe(concat('scripts.min.js'))
    // .pipe(uglify()) // Minify js (opt.)
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
  return gulp.src('app/**')
    .pipe(rsync({
      root: 'app/',
      hostname: 'username@yousite.com',
      destination: 'yousite/public_html/',
      // include: ['*.htaccess'], // Includes files to deploy
      exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
      recursive: true,
      archive: true,
      silent: false,
      compress: true
    }))
});

gulp.task('img', function() {
  return gulp.src('app/img/***') // Берем все изображения из app
    .pipe(cache(imagemin({ // С кешированием
      // .pipe(imagemin({ // Сжимаем изображения без кеширования
      interlaced: true,
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('code', function(){gulp 
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
    gulp.watch('app/' + syntax + '/**/*.' + syntax + '', gulp.parallel('sass'));
    gulp.watch('app/' + syntax + '/**/*.' + syntax + '', gulp.parallel('scss'));
    gulp.watch('app/' + syntax + '/**/*.' + syntax + '', gulp.parallel('less'));
    gulp.watch( ['app/scss/main.scss'], gulp.parallel('scss'));
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
    gulp.watch('app/*.html', gulp.parallel('code'));
});

gulp.task('start', gulp.parallel('watch', 'scss', 'sass', 'less', 'js', 'browser-sync'));
