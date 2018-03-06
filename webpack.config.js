const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/client.js',
	output: {
		filename: 'client.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: 'src/cli.js', to: '.' },
			{ from: 'src/server.js', to: '.' },
			{ from: 'node_modules/push.js/bin/serviceWorker.js', to: '.' }
		])
	]
};
