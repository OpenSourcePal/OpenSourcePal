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
		contentScript: path.resolve('./src/content/contentScript.tsx'),
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
							// insert: (element) => {
							// 	const extensionHostID = 'extension-host';
							// 	let extensionHost = document.getElementById(extensionHostID);

							// 	if (!extensionHost) {
							// 		// ONLY FOR CONTENT SCRIPT
							// 		extensionHost = document.createElement('div');
							// 		extensionHost.setAttribute('id', extensionHostID);
							// 		document.body.append(extensionHost);
							// 		extensionHost.attachShadow({ mode: 'open' });
							// 		// Add style tag to shadow host
							// 		extensionHost.shadowRoot.appendChild(element);
							// 	} else {
							// 		// FOR EVERy OTHER PAGES
							// 		document.head.append(element);
							// 	}
							// },
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
					to: path.resolve('output'),
				},
				{
					from: path.resolve('./.env'),
					to: path.resolve('output'),
				},
				{
					from: path.resolve('./src/redirect.html'),
					to: path.resolve('output'),
				},
				{
					from: path.resolve('./src/assets/tailwind.css'),
					to: path.resolve('output'),
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
		path: path.resolve(__dirname, 'output'),
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
