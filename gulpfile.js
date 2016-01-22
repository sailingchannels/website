var gulp = require("gulp");
var gutil = require("gulp-util");
var gulpif = require("gulp-if");
var streamify = require("gulp-streamify");
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require("gulp-cssmin");
var less = require("gulp-less");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");
var source = require("vinyl-source-stream");
var babelify = require("babelify");
var browserify = require("browserify");
var watchify = require("watchify");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");

var production = process.env.NODE_ENV === "production";
console.log("production", production);

var dependencies = [
	"alt",
	"react",
	"react-dom",
	"react-router",
	"underscore"
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task("vendor-js", function() {
	return gulp.src([
			"bower_components/jquery/dist/jquery.js",
			"bower_components/bootstrap/dist/js/bootstrap.js",
			"bower_components/bootstrap-material-design/dist/js/material.min.js",
			"public/js/jquery.timeago.js",
			"public/js/anchorme.min.js",
			"bower_components/js-cookie/src/js.cookie.js",
			"bower_components/jquery-unveil/jquery.unveil.js"
		])
		.pipe(concat("vendor.js"))
		.pipe(gulpif(production, uglify({
			mangle: false
		})))
		.pipe(gulp.dest("public/js"));
});

/*
 |--------------------------------------------------------------------------
 | Combine all CSS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task("vendor-css", function() {
	return gulp.src([
			"bower_components/bootstrap/dist/css/bootstrap.min.css",
			"bower_components/bootstrap-material-design/dist/css/bootstrap-material-design.min.css",
			"public/css/main.css"
		])
		.pipe(concat("vendor.css"))
		.pipe(minifyCss({compatibility: "ie8"}))
		.pipe(gulp.dest("public/css"));
});


/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify-vendor", function() {
	return browserify()
		.require(dependencies)
		.bundle()
		.pipe(source("vendor.bundle.js"))
		.pipe(gulpif(production, streamify(uglify({
			mangle: false
		}))))
		.pipe(gulp.dest("public/js"));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify", ["browserify-vendor"], function() {
	return browserify("app/main.js")
		.external(dependencies)
		.transform(babelify)
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(gulpif(production, streamify(uglify({
			mangle: false
		}))))
		.pipe(gulp.dest("public/js"));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify-watch", ["browserify-vendor"], function() {
	var bundler = watchify(browserify("app/main.js", watchify.args));
	bundler.external(dependencies);
	bundler.transform(babelify);
	bundler.on("update", rebundle);
	return rebundle();

	function rebundle() {
		var start = Date.now();
		return bundler.bundle()
			.on("error", function(err) {
				gutil.log(gutil.colors.red(err.toString()));
			})
			.on("end", function() {
				gutil.log(gutil.colors.green("Finished rebundling in", (Date.now() - start) + "ms."));
			})
			.pipe(source("bundle.js"))
			.pipe(gulp.dest("public/js/"));
	}
});

gulp.task("default", ["vendor-js", "vendor-css", "browserify-watch"]);
gulp.task("build", ["vendor-js", "vendor-css", "browserify"]);
