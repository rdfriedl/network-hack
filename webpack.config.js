const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const project = require("./project.config");

const inProject = path.resolve.bind(path, project.basePath);
const inProjectSrc = file => inProject(project.srcDir, file);

const IS_DEV = project.env === "development";
const IS_TEST = project.env === "test";
const IS_PROD = project.env === "production";

const USE_SOURCE_MAPS = IS_DEV || IS_TEST;

const config = {
	entry: {
		normalize: [inProjectSrc("normalize")],
		main: inProjectSrc(project.main)
	},
	devtool: USE_SOURCE_MAPS ? "source-map" : false,
	output: {
		path: inProject(project.outDir),
		filename: IS_DEV ? "[name].js" : "[name].[chunkhash].js",
		publicPath: project.publicPath
	},
	resolve: {
		extensions: [".*", ".less", ".js", ".json"],
		alias: {
			"../../theme.config$": inProjectSrc("styles/theme.config")
		}
	},
	externals: project.externals,
	module: {
		rules: []
	},
	node: {
		dgram: "empty",
		fs: "empty",
		net: "empty",
		tls: "empty",
		child_process: "empty"
	},
	optimization: {},
	plugins: [
		new Dotenv(),
		new webpack.EnvironmentPlugin(["NODE_ENV"]),
		new webpack.DefinePlugin(
			Object.assign({
				IS_DEV,
				IS_TEST,
				IS_PROD
			})
		)
	]
};

// JavaScript
// ------------------------------------
config.module.rules.push({
	test: /\.js$/,
	exclude: /node_modules/,
	use: [
		{
			loader: "babel-loader",
			query: {
				cacheDirectory: true
			}
		}
	]
});

// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
	filename: "styles/[name].[contenthash].css",
	allChunks: true,
	disable: IS_DEV
});

config.module.rules.push({
	test: /\.less$/,
	loader: extractStyles.extract({
		fallback: "style-loader",
		use: [
			{
				loader: "css-loader",
				options: {
					importLoaders: 0,
					sourceMap: USE_SOURCE_MAPS,
					minimize: IS_PROD
				}
			},
			{
				loader: "less-loader",
				options: {
					sourceMap: USE_SOURCE_MAPS,
					noIeCompat: true
				}
			}
		]
	})
});
config.plugins.push(extractStyles);

// Images
// ------------------------------------
config.module.rules.push({
	test: /\.(jpe?g|gif|png|ttf|eot)$/,
	loader: "url-loader",
	options: {
		limit: 8192
	}
});

// Fonts
// ------------------------------------
[
	["woff", "application/font-woff"],
	["woff2", "application/font-woff2"],
	["otf", "font/opentype"],
	["ttf", "application/octet-stream"],
	["eot", "application/vnd.ms-fontobject"],
	["svg", "image/svg+xml"]
].forEach(font => {
	const extension = font[0];
	const mimetype = font[1];

	config.module.rules.push({
		test: new RegExp(`\\.${extension}$`),
		loader: "url-loader",
		options: {
			name: "fonts/[name].[ext]",
			limit: 10000,
			mimetype
		}
	});
});

// HTML Template
// ------------------------------------
config.plugins.push(
	new HtmlWebpackPlugin({
		template: inProjectSrc("index.html"),
		inject: true,
		minify: {
			collapseWhitespace: true
		}
	})
);

// Dev Server
// ------------------------------------
if (IS_DEV) {
	config.devServer = {
		historyApiFallback: true
	};
}

// Production Optimizations
// ------------------------------------
if (IS_PROD) {
	config.plugins.push(
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		})
	);
}

module.exports = config;
