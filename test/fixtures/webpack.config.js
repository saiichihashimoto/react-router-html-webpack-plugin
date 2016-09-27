import path from 'path';

export default {
	entry: {
		index: './test/fixtures/index.js',
	},
	output: {
		path:     path.resolve(__dirname, '../.tmp'),
		filename: '[name].js',
	},
};
