import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import ReactRouterHtmlWebpackPlugin from '../src';
import { runWebpack } from './helpers';

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('routes', () => {
	it('should render route with component', () => runWebpack({ plugins: [new ReactRouterHtmlWebpackPlugin({ routes: './fixtures/routes-only-base' })] })
		.then((stats) => {
			expect(stats.compilation.assets).to.have.all.keys('index.js', 'index.html');
		}));

	it('should ignore route with no component', () => runWebpack({ plugins: [new ReactRouterHtmlWebpackPlugin({ routes: './fixtures/routes-only-base-no-component' })] })
		.then((stats) => {
			expect(stats.compilation.assets).to.have.all.keys('index.js');
		}));

	it('should render child routes', () => runWebpack({ plugins: [new ReactRouterHtmlWebpackPlugin({ routes: './fixtures/routes-two-children' })] })
		.then((stats) => {
			expect(stats.compilation.assets).to.have.all.keys('index.js', 'foo.html', 'foo/index.html', 'bar.html', 'bar/index.html');
		}));
});
