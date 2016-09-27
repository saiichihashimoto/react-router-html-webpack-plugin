import HtmlWebpackPlugin from 'html-webpack-plugin';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs';
import merge from 'webpack-merge';
import path from 'path';
import promisify from 'es6-promisify';
import webpack from 'webpack';

import ReactRouterHtmlWebpackPlugin from '../src';
import webpackConfig from './fixtures/webpack.config';

const expect = chai.expect;
chai.use(chaiAsPromised);

function runWebpack(config) {
	return promisify(webpack)(config)
		.then(stats => {
			if (stats.compilation.errors.length) {
				throw stats.compilation.errors[0];
			}
			return stats;
		});
}

describe('parity with html-webpack-plugin', () => {
	it('without arguments', () => {
		return Promise.all([
			runWebpack(merge(webpackConfig, { plugins: [new ReactRouterHtmlWebpackPlugin()] })),
			runWebpack(merge(webpackConfig, { output: { path: path.resolve(__dirname, '.tmp-for-parity') }, plugins: [new HtmlWebpackPlugin()] })),
		])
			.then(results => {
				expect(Object.keys(results[0].compilation.assets)).to.eql(Object.keys(results[1].compilation.assets));

				Object.keys(results[0].compilation.assets).forEach(filename => {
					expect(results[0].compilation.assets[filename].source()).to.eql(results[1].compilation.assets[filename].source());
				});
			});
	});

	beforeEach(function deleteFolder() {
		[path.resolve(__dirname, '.tmp'), path.resolve(__dirname, '.tmp-for-parity')].forEach(folder => {
			if (fs.existsSync(folder)) {
				fs.readdirSync(folder).forEach(file => {
					const curPath = [folder, file].join('/');

					if (fs.lstatSync(curPath).isDirectory()) {
						deleteFolder(curPath);
					} else {
						fs.unlinkSync(curPath);
					}
				});

				fs.rmdirSync(folder);
			}
		});
	});
});
