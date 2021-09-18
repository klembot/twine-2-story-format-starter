const cpy = require('cpy');
const execa = require('execa');
const mkdirp = require('mkdirp');
const path = require('path');
const {promisify} = require('util');
const {readFile, writeFile} = require('fs-extra');
const rimraf = require('rimraf');
const formatProperties = require('../src/story-format.json');

const rimrafPromise = promisify(rimraf);

async function compileWebpack(configName) {
	try {
		await execa('webpack', ['--config', `webpack.config.${configName}.js`]);
	} catch (err) {
		console.error(`Compilation failed: ${err.message}`);
		process.exit(1);
	}
}

async function run() {
	process.env.NODE_ENV = 'production';
	console.log('Compiling runtime...');
	await compileWebpack('runtime');
	console.log('Compiling editor extensions...');
	await compileWebpack('editor-extensions');
	console.log('Assembling story format file...');

	const runtimeHtml = await readFile(
		path.join(__dirname, '../dist/runtime/index.html'),
		'utf8'
	);
	const extensionsJs = await readFile(
		path.join(__dirname, '../dist/editor-extensions/main.js'),
		'utf8'
	);
	const format = {
		...formatProperties,
		hydrate: extensionsJs,
		source: runtimeHtml
	};
	const formatDir = path.join(__dirname, `../dist/${format.version}`);

	await mkdirp(formatDir);
	await writeFile(
		path.join(formatDir, 'format.js'),
		`window.storyFormat(${JSON.stringify(format)})`,
		'utf8'
	);
	await cpy('src/logo.svg', formatDir);
	console.log('Cleaning up...');
	await rimrafPromise(path.join(__dirname, '../dist/editor-extensions'));
	await rimrafPromise(path.join(__dirname, '../dist/runtime'));
	console.log(`Compiled story format written to ${formatDir}/format.js.`);
	console.log(`Story format logo written to ${formatDir}/logo.svg.`);
}

run();
