import fs from 'fs';
import merge from 'webpack-merge';
import path from 'path';
import promisify from 'es6-promisify';
import webpack from 'webpack';

import webpackConfig from './fixtures/webpack.config';

function deleteFolder(folder) {
	if (!fs.existsSync(folder)) {
		return Promise.resolve();
	}

	return promisify(fs.readdir, fs)(folder)
		.then((files) => Promise.all(files.map((file) => {
			const curPath = [folder, file].join('/');

			return promisify(fs.lstat, fs)(curPath)
				.then((stats) => stats.isDirectory() ? deleteFolder(curPath) : promisify(fs.unlink, fs)(curPath));
		})))
		.then(() => promisify(fs.rmdir, fs)(folder));
}

export function runWebpack(config) {
	const newConfig  = merge(webpackConfig, { output: { path: path.resolve(__dirname, '.tmp-' + Math.random()) } }, config);
	const outputPath = newConfig.output.path;

	return deleteFolder(outputPath)
		.then(() => promisify(webpack)(newConfig))
		.then((stats) => {
			if (stats.compilation.errors.length) {
				throw stats.compilation.errors[0];
			}
			return deleteFolder(outputPath)
				.then(() => stats);
		});
}
