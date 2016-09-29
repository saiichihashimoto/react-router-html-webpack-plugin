import HtmlWebpackPlugin from 'html-webpack-plugin';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import ReactRouterHtmlWebpackPlugin from '.';
import { runWebpack } from '../test/helpers';

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('parity with html-webpack-plugin', () => {
	it('without arguments', () => Promise.all([
		runWebpack({ plugins: [new ReactRouterHtmlWebpackPlugin()] }),
		runWebpack({ plugins: [new HtmlWebpackPlugin()] }),
	])
		.then((results) => {
			expect(results[0].compilation.assets).to.have.all.keys('index.js', 'index.html');
			expect(results[1].compilation.assets).to.have.all.keys('index.js', 'index.html');
			expect(results[0].compilation.assets['index.html'].source()).to.equal(results[1].compilation.assets['index.html'].source());
		}));
});

describe('routes', () => {
	it('should render base route', () => runWebpack({ plugins: [new ReactRouterHtmlWebpackPlugin({ routes: '../test/fixtures/routes-only-base' })] })
		.then((stats) => {
			expect(stats.compilation.assets).to.have.all.keys('index.js', 'index.html');
		}));

	it('should render child routes', () => runWebpack({ plugins: [new ReactRouterHtmlWebpackPlugin({ routes: '../test/fixtures/routes-two-children' })] })
		.then((stats) => {
			expect(stats.compilation.assets).to.have.all.keys('index.js', 'index.html', 'foo.html', 'foo/index.html', 'bar.html', 'bar/index.html');
		}));
});
