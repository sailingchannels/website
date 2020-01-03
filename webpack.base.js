/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require("path");
const webpack = require("webpack");

const dev = process.env.NODE_ENV !== "production";

// Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
// 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
// see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
// in the next major version of loader-utils.'
process.noDeprecation = true;

module.exports = (options) => ({
	entry: options.entry,

	mode: dev ? "development" : "production",

	output: Object.assign(
		{
			// Compile into js/build.js
			path: path.resolve(process.cwd(), "./docs/"),
			publicPath: "./"
		},
		options.output
	),

	optimization: options.optimization || {},

	devServer: options.devServer || {},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				// Preprocess our own .css files
				// This is the place to add your own loaders (e.g. sass/less etc.)
				// for a list of loaders, see https://webpack.js.org/loaders/#styling
				test: /\.s?css$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
				use: "file-loader"
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: [
					"file-loader",
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false
							},
							pngquant: {
								quality: "65-90",
								speed: 4
							},
							gifsicle: {
								interlaced: false
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75
							}
						}
					}
				]
			}
		]
	},

	plugins: options.plugins.concat([
		// Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
		// inside your code for any environment checks; UglifyJS will automatically
		// drop any unreachable code.
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),

		new webpack.NamedModulesPlugin()
	]),

	resolve: {
		modules: ["app", "node_modules"],
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		mainFields: ["browser", "jsnext:main", "main"]
	},

	devtool: options.devtool,

	target: "web", // Make web variables accessible to webpack, e.g. window

	performance: options.performance || {}
});
