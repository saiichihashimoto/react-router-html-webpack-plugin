import HtmlWebpackPlugin from 'html-webpack-plugin';
import reactRouterToArray from 'react-router-to-array';
import uniq from 'lodash.uniq';

export default class ReactRouterHtmlWebpackPlugin {
	constructor(options) {
		this.options = Object.assign({}, options);

		if (this.options.routes && !this.options.filename) {
			this.options.filename = ['[route].html', '[route]/index.html'];
		}

		if (this.options.routes) {
			// FIXME This needs to be required through the loaders
			// FIXME This needs to work with watch
			this.routes = reactRouterToArray(require(this.options.routes).default);
		}
	}
	apply(compiler) {
		uniq([].concat(this.options.filename || 'index.html').reduce(
			(filenames, filename) => {
				if (!filename.includes('[route]')) {
					return filenames.concat(filename);
				}
				return filenames.concat(this.routes.map((route) => filename.replace('[route]', route).replace(/\/\/+/, '/').replace(/^\//, '').replace(/^\./, 'index.')));
			},
			[]
		)).forEach((filename) => {
			compiler.apply(new HtmlWebpackPlugin(Object.assign({}, this.options, { filename })));
		});
	}
}
