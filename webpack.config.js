const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		popup: path.resolve('./src/popup.tsx'),
	},
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
		new HtmlWebpackPlugin({
			title: 'Open Source Pal',
			filename: 'popup.html',
			chunks: ['popup'],
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: '[name].js',
	},
};
