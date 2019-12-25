// Important modules this config uses
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = require("./webpack.base")({
	// In production, we skip all hot-reloading stuff
	entry: [path.join(__dirname, "/src/index.tsx")],

	// Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
	output: {
		filename: "index.js",
		path: path.join(__dirname, "/build")
	},

	devServer: {
		contentBase: path.join(__dirname, "src"),
		hot: true
	},

	plugins: [
		// Minify and optimize the index.html
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "/src/index.html"),
			inject: true
		})
	]
});
