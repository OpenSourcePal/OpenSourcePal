const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
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
			{
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								ident: 'postcss',
								plugins: [tailwindcss, autoprefixer],
							},
						},
					},
				],
				test: /\.css$/i,
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve('src/static'),
					to: path.resolve('dist'),
				},
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
