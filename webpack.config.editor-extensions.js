const path = require('path');

module.exports = {
	entry: './src/editor-extensions/hydrate.js',
	mode: 'production',
	output: {
		chunkFormat: 'commonjs',
		iife: false,
		library: {
			type: 'this'
		},
		path: path.join(__dirname, './dist/editor-extensions')
	}
};
