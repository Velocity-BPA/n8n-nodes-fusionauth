const { src, dest } = require('gulp');
const rename = require('gulp-rename');

function buildIcons() {
	return src('nodes/**/*.svg')
		.pipe(rename((path) => {
			// Keep the same directory structure in dist
			path.dirname = path.dirname;
		}))
		.pipe(dest('dist/nodes/'));
}

exports['build:icons'] = buildIcons;
exports.default = buildIcons;
