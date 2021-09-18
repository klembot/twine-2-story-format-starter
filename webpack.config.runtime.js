const {readFileSync} = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {Story} = require('twine-utils');

const htmlMinifyOptions = {collapseWhitespace: true};
const isRelease = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './src/runtime/index.js',
	mode: isRelease ? 'production' : 'development',
	output: {
		path: path.join(__dirname, './dist/runtime')
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: !isRelease,
			minify: isRelease && htmlMinifyOptions,
			template: './src/runtime/index.ejs',
			templateParameters(compilation, assets, options) {
				if (isRelease) {
					return {
						inlineAssets: true,
						storyData: '{{STORY_DATA}}',
						assets,
						compilation,
						options
					};
				}

				const exampleName = process.env.TWEE_EXAMPLE || 'hello-world';
				const exampleSource = readFileSync(
					path.join(__dirname, `./examples/${exampleName}.twee`),
					'utf8'
				);
				const story = new Story();

				story.attributes.name = exampleName;
				story.mergeTwee(exampleSource);
				story.setStartByName('Start');
				return {
					inlineAssets: false,
					storyData: `<div hidden>${story.toHtml()}</div>`
				};
			}
		})
	]
};
