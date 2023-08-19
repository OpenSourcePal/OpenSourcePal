const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Dotenv = require('dotenv-webpack');

const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		popup: path.resolve('./src/popup/popup.tsx'),
		options: path.resolve('./src/options/options.tsx'),
		background: path.resolve('./src/background/background.ts'),
		contentScript: path.resolve('./src/content/contentScript.ts'),
		onBoarding: path.resolve('./src/onboarding/onBoarding.tsx'),
	},
	module: {
		rules: [
			{
				use: [
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: { noEmit: false },
						},
					},
				],
				test: /\.(tsx|ts)$/,
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
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,

				type: 'asset/resource',
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
				{
					from: path.resolve('./.env'),
					to: path.resolve('dist'),
				},
				{
					from: path.resolve('./src/redirect.html'),
					to: path.resolve('dist'),
				},
			],
		}),
		new Dotenv(),
		...getHtmlPlugins(['popup', 'options', 'onBoarding']),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.html'],
	},
	output: {
		filename: '[name].js',
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
};

function getHtmlPlugins(chunks) {
	return chunks.map(
		(chunk) =>
			new HtmlWebpackPlugin({
				title: 'Open Source Pal',
				filename: `${chunk}.html`,
				chunks: [chunk],
			}),
	);
}
