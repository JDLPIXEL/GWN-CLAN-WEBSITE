const { src, dest, series, watch, parallel } = require("gulp");
const fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');

const IGNORES = [
	
];

// #################################################
// Clean Up
const cleanUp = function (cb) {
	src(['dist/*'], { read: false })
		.pipe(clean({ force: true }));
		
	cb();
}

const cleanUpStylesheet = function (cb) {
	src(['dist/css/*'], { read: false })
		.pipe(clean({ force: true }));
		
	cb();
}

const cleanUpScripts = function (cb) {
	src(['dist/js/*'], { read: false })
		.pipe(clean({ force: true }));
		
	cb();
}

const cleanUpFonts = function (cb) {
	src(['dist/fonts/*'], { read: false })
		.pipe(clean({ force: true }));
		
	cb();
}

const cleanUpImages = function (cb) {
	src(['dist/images/*'], { read: false })
		.pipe(clean({ force: true }));

	cb();
}

// #################################################
// Gen and copy
const genHTML = function (cb) {
	src(['src/**/*.html', '!src/includes/*.html', ...IGNORES])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
	.pipe(dest('dist'));

	cb();
}

const stylesheet = function (cb) {
	src(['src/css/**.css'])
		.pipe(concat('app.css'))
		.pipe(dest('dist/css'))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(dest('dist/css'));

	cb();
}

const scripts = function(cb) {
	src(['src/js/**.js'])
		.pipe(dest('dist/js'));
	
	cb();
}

const fonts = function(cb) {
	src(['src/fonts/*.{woff2,ttf,eot,woff,svg}'])
		.pipe(dest('dist/fonts'));
	
	cb();
}

const images = function(cb) {
	src(['src/images/*.{png,jpg,webp,gif,jpeg,svg}'])
		.pipe(dest('dist/images'));
	
	cb();
}


// #################################################
// Watch
function watchFiles(cb) {
	watch('src/**.html', genHTML);
	watch('src/css/**.css', stylesheet);
	watch('src/js/**.js', scripts);
	watch('src/images/*.{png,jpg,webp,gif,jpeg,svg}', images);
	watch('src/fonts/*.{woff2,ttf,eot,woff,svg}', fonts);
}


// #################################################
// Exprots
exports.build = parallel(genHTML, stylesheet, scripts, fonts, images)
exports.watch = series(cleanUp, build, watchFiles);
exports.html = genHTML;
exports.css = series(cleanUpStylesheet, stylesheet);
exports.js = series(cleanUpScripts, scripts);
exports.fonts = series(cleanUpFonts, fonts);
exports.fonts = series(cleanUpImages, images);
exports.clean = cleanUp;

exports.default = series(cleanUp, parallel(genHTML, stylesheet, scripts, fonts, images));
