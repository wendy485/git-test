var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
//transform and compress css  
gulp.task('style',function(){
     gulp.src('src/styles/*.less')
     .pipe(less())
     .pipe(cssnano())
     .pipe(gulp.dest('dist/styles'))
     .pipe(browserSync.reload({
     	stream:true
     }))
})
//compress and mixed script
gulp.task('script',function () {
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
     	stream:true
     }))
})
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
     	stream:true
     }))
})
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
     	stream:true
     }))
})
gulp.task('serve',function(){
	browserSync({
		server:{
			baseDir:['dist'],
		},
	},
		function(err,bs){
			 console.log(bs.options.getIn(["urls", "local"]));
	});
	gulp.watch('src/styles/*.less',['style'])
	gulp.watch('src/scripts/*.js',['script'])
	gulp.watch('src/images/*.*',['image'])
	gulp.watch('src/*.html',['html'])
})