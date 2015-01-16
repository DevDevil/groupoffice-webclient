var gulp = require('gulp');
var inject = require("gulp-inject");

  
gulp.task('index', function () {
  var target = gulp.src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./app/**/*.js', './app/**/*.css'], {read: false});

  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./app'));
});


var shell = require('gulp-shell'); 
gulp.task('docs', shell.task([ 
 'node_modules/jsdoc/jsdoc.js '+ 
   '-c node_modules/angular-jsdoc/conf.json '+   // config file
   '-t node_modules/angular-jsdoc/template '+    // template file
   '-d build/docs '+                             // output directory
   './docs/index.md ' +                              // to include README.md as index contents
   '-r app/core'                              // source code directory
])); 
