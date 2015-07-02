var gulp    		= require('gulp');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});
var browserSync     = require('browser-sync');
var dest = 'build/';

gulp.task('css', function() {
    gulp.src(plugins.mainBowerFiles().concat('src/styles/**/*.scss'))
        .pipe(plugins.filter('*.scss'))
 		.pipe(plugins.sass().on('error', plugins.sass.logError))
 		.pipe(plugins.autoprefixer('last 2 version'))
// 		.pipe(minifyCSS())
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

gulp.task('html', function () {
	gulp.src('src/*.jade')
    .pipe(plugins.jade())
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