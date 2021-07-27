var gulp       	 = require('gulp'),
		less			   = require('gulp-less'),
		browserSync  = require('browser-sync'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglifyjs'),
		cssnano      = require('gulp-cssnano'),
		rename       = require('gulp-rename'),
		del          = require('del'),
		imagemin     = require('gulp-imagemin'),
		pngquant     = require('imagemin-pngquant'),
		cache        = require('gulp-cache'),
		autoprefixer = require('gulp-autoprefixer'),
		babel        = require('gulp-babel'),
		fileinclude = require('gulp-file-include');

gulp.task('html', function(){
	return gulp.src('app/**/*.html')
			.pipe(fileinclude({
				prefix: '@@',
				basepath: '@file'
			}))
			.pipe(gulp.dest('dist/'))
});

gulp.task('less', function(){
	return gulp.src('app/less/**/*')
		.pipe(less())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
	return gulp.src('app/js/scripts.js')
		.pipe(concat('scripts.min.js'))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('fonts', function(){
	return gulp.src('app/fonts/**/*')
			.pipe(gulp.dest('dist/fonts/'))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
});

gulp.task('libsjs', ['scripts'], function() {
	return gulp.src([
		'app/libs/jquery/jquery-1.11.1.min.js',
		'app/libs/slick/slick.min.js',
		// 'app/libs/magnific-popup/jquery.magnific-popup.min.js',
	])
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('libscss', ['less'], function(){
	return gulp.src([
		'app/libs/slick/slick.css',
		// 'app/libs/magnific-popup/magnific-popup.css',
	])
		.pipe(concat('libs.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css/'))
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
			.pipe(cache(imagemin({
				interlaced: true,
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			})))
			.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'img', 'html', 'fonts', 'libscss', 'libsjs'], function() {
	gulp.watch('app/less/**/*.less', ['less']);
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('dist/*.html',['html'], browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('build', ['clean', 'img', 'html', 'fonts', 'libscss', 'libsjs'], function() {

	var buildCss = gulp.src([
		'app/css/*.css',
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src([
		'app/js/libs.min.js',
		'app/js/scripts.min.js',
		])
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
