var gulp    		= require('gulp');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});
var browserSync     = require('browser-sync');
var dest = 'build/';

gulp.task('css', function() {
    gulp.src(plugins.mainBowerFiles().concat('src/styles/**/*.scss'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.filter('*.scss'))
 		.pipe(plugins.sass().on('error', plugins.sass.logError))
 		.pipe(plugins.autoprefixer('last 2 version'))
// 		.pipe(minifyCSS())
        .pipe(plugins.sourcemaps.write())
 		.pipe(plugins.rename('style.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
    var jsFiles = ['src/js/*'];
    gulp.src(plugins.mainBowerFiles().concat(jsFiles))
        .pipe(plugins.filter('*.js'))
        .pipe(plugins.concat('main.js'))
//        .pipe(plugins.uglify())
        .pipe(gulp.dest(dest + 'js'));
});

gulp.task('chinese', function () {
    gulp.src('src/*.jade')
//    .pipe(plugins.data( function(file) {
//        return require('./src/data/english.json');
//    } ))
    .pipe(plugins.jade({
        locals: require('./src/data/chinese.json')
  }))
    .pipe(gulp.dest('build/ch'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function () {
	gulp.src('src/*.jade')
//    .pipe(plugins.data( function(file) {
//        return require('./src/data/english.json');
//    } ))
    .pipe(plugins.jade({
        locals: require('./src/data/english.json')
  }))
	.pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream: true}));
});



gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "build"
		}
	});
});
gulp.task('watch', function() {
	gulp.watch('src/styles/**/*.scss', ['css']);
	gulp.watch('src/**/*.jade', ['html']);
});

gulp.task('start', ['browser-sync', 'watch']);