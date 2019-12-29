// Important modules this config uses
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dev = process.env.NODE_ENV !== "production";

module.exports = require("./webpack.base")({
	// In production, we skip all hot-reloading stuff
	entry: [path.join(__dirname, "/src/index.tsx")],

	// Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
	output: {
		filename: "[name].[chunkhash].js",
		chunkFilename: "[name].[chunkhash].chunk.js"
	},

	optimization: {
		splitChunks: {
			chunks: "all"
		},
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false
					},
					warnings: false,
					mangle: true
				}
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},

	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),

		// Minify and optimize the index.html
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "/src/index.html"),
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true
		}),

		new webpack.ProvidePlugin({
			// make fetch available
			fetch: "exports-loader?self.fetch!whatwg-fetch"
		}),

		new MiniCssExtractPlugin({
			filename: dev ? "[name].css" : "[name].[hash].css",
			chunkFilename: dev ? "[id].css" : "[id].[hash].css"
		})
	],

	performance: {
		assetFilter: (assetFilename) => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)
	}
});
