const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/test.tsx',
	module: {
		rules: [
			{
				use: 'ts-loader',
				test: /\.tsx$/,
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve('src/assets/manifest.json'),
					to: path.resolve('dist'),
				},
				{ from: path.resolve('src/assets/icon.png'), to: path.resolve('dist') },
			],
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'index.js',
	},
};
