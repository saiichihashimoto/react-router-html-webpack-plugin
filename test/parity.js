import HtmlWebpackPlugin from 'html-webpack-plugin';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import ReactRouterHtmlWebpackPlugin from '../src';
import { runWebpack } from './helpers';

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('parity with html-webpack-plugin', () => {
	it('without arguments', () => Promise.all([
		runWebpack({ plugins: [new ReactRouterHtmlWebpackPlugin()] }),
		runWebpack({ plugins: [new HtmlWebpackPlugin()] }),
	])
		.then((results) => {
			expect(Object.keys(results[0].compilation.assets)).to.eql(Object.keys(results[1].compilation.assets));

			Object.keys(results[0].compilation.assets).forEach((filename) => {
				expect(results[0].compilation.assets[filename].source()).to.eql(results[1].compilation.assets[filename].source());
			});
		}));
});
