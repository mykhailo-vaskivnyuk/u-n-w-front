const webpack = require("webpack");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const PATHS = require("./paths.js");
const ENV = require("./env/env.js");
const ENV_STRINGIFY = require('./env/utils.js').stringifyEnv(ENV);
const IS_DEV = ENV.NODE_ENV === "development";
const IS_PROD = ENV.NODE_ENV === "production";
const IS_GENERATE_SOURCEMAP = IS_DEV || ( IS_PROD && ENV.GENERATE_SOURCEMAP === "true" );
const IS_USE_WP_ANALYZER = IS_PROD && ENV.USE_WP_ANALYZER === "true";


const config = {
	mode: IS_DEV ? "development" : "production",
	// bail: IS_PROD,
	devtool: IS_PROD
		? IS_GENERATE_SOURCEMAP ? "source-map" : false
		: IS_DEV && "eval-cheap-module-source-map",
	target: IS_DEV ? "web" : "browserslist",

	entry: {
		app: PATHS.appEntryPoint,
	},
	output: {
		path: PATHS.appBuild,
		filename: IS_PROD ? "assets/js/[name].[contenthash:8].js" : "assets/js/[name].js",
		// chunkFilename: IS_PROD ? "assets/js/[name].[contenthash:8].chunk.js" : "assets/js/[name].chunk.js",
		// publicPath: IS_DEV ? "/" : "./",
	},

	resolve: {
		plugins: [new TsconfigPathsPlugin({})],
		extensions: [".ts", ".js", ".tsx", ".jsx", ".json"],
		// modules: [
		// 	"node_modules",
		// ],
    // alias: { },
    fallback: {
      // path: require.resolve("path-browserify"),
      url: false,
      util: false,
      http: false,
      https: false,
    },
	},

	// performance: {
	// 	hints: IS_DEV ? false : "warning",
	// 	maxEntrypointSize: 1048576, /*1mb (app.js, app.css, vendors.js, runtime~app.js)*/
	// 	maxAssetSize: 524288, /*0.5mb (individual asset size)*/
	// },
  // ignoreWarnings: [/Failed to parse source map/],
  externals: { "react-native-sqlite-storage": "react-native-sqlite-storage" },

	// optimization: {
	// 	minimize: IS_PROD,
		// minimizer: [
		// 	new TerserPlugin({
		// 		terserOptions: {
		// 			ecma: 2018,
		// 		},
		// 	}),
		// ],
	// 	splitChunks: {
	// 		name: false,
	// 		chunks: "all",
  //     cacheGroups: {
  //       vendor: {
  //         name: "vendors",
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: "all",
  //         enforce: true,
  //         priority: 10,
  //       },
  //       "typeorm": {
  //         test: /[\\/]node_modules[\\/](typeorm)[\\/]/,
  //         name: "typeorm",
  //         chunks: "all",
  //         priority: 20,
  //       },
  //       "temabit": {
  //         test: /[\\/]node_modules[\\/](@temabit)[\\/]/,
  //         name: "temabit",
  //         chunks: "all",
  //         priority: 20,
  //       },
  //       "icons": {
  //         test: /[\\/]public[\\/](icons)[\\/]/,
  //         name: "icons",
  //         chunks: "all",
  //         priority: 20,
  //       },
  //     }
	// 	},
	// },

	module: {
		rules: [
      {
        test: /\.tsx?$/,
        include: PATHS.appSrc,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              target: "es2018"
            }
          }
        ]
      },
			{
				test: /\.svg$/,
				use: [{
					loader: "@svgr/webpack",
					options: {
						svgoConfig: {
							plugins: [
								{
									name: "preset-default",
									params: {
										overrides: {
											removeViewBox: false,
										},
									},
								},
							],
						}
					}
				}],
			},
	// 		{
	// 			test: /\.(woff(2)?|ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
	// 			use: [
	// 				{
	// 					loader: "file-loader",
	// 					options: {
	// 						name: "assets/fonts/[name][contenthash:8].[ext]"
	// 					}
	// 				}
	// 			]
	// 		},
	// 		{
	// 			test: /\.(png|jpe?g|gif|bmp|ico)$/,
	// 			use: [
	// 				{
	// 					loader: "file-loader",
	// 					options: {
	// 						name: "assets/images/[name][contenthash:8].[ext]"
	// 					}
	// 				}
	// 			]
	// 		},
  //     {
  //       test: /\.(webm)$/,
	// 			use: [
	// 				{
	// 					loader: "file-loader",
	// 					options: {
	// 						name: "assets/video/[name][contenthash:8].[ext]"
	// 					}
	// 				}
	// 			]
	// 		}
		]
	},
	plugins: [
		new HtmlWebpackPlugin(// Object.assign({},
			{
        title: 'YOU AND WORLD',
        filename: "index.html",
        favicon: PATHS.appFavicon,
        template: PATHS.appHtmlTemplate,
				// inject: true,
			},
			// IS_PROD
			// 	? {
			// 			minify: {
			// 				removeComments: true,
			// 				collapseWhitespace: true,
			// 				removeRedundantAttributes: true,
			// 				useShortDoctype: true,
			// 				removeEmptyAttributes: true,
			// 				removeStyleLinkTypeAttributes: true,
			// 				keepClosingSlash: true,
			// 				minifyJS: true,
			// 				minifyCSS: true,
			// 				minifyURLs: true,
			// 			},
			// 		}
			// 	: undefined
		),
		new CopyPlugin({
			patterns: [
        {
          from: "*/**/*.*",
          to: "assets/",
          context: PATHS.appPublic,
        },
        {
          from: `./*.*`,
          to: "",
          context: PATHS.appPublic,
          globOptions: {
            ignore: ["**/*.html"]
          },
        },
			]
		}),
    new ForkTsCheckerWebpackPlugin({
      async: IS_DEV,
    }),
		new webpack.DefinePlugin(ENV_STRINGIFY),
		// IS_PROD && new webpack.ProgressPlugin({
		// 	activeModules: false,
		// 	entries: true,
		// 	handler(percentage, message, ...args) {
		// 		console.log("\x1b[32m%s\x1b[31m%s\x1b[0m", `${(percentage * 100).toFixed(2)}% `,
		// 			new Date().toISOString().slice(-13,-1), message, ...args);
		// 	},
		// 	modules: true,
		// }),
		IS_USE_WP_ANALYZER && new BundleAnalyzerPlugin({
			analyzerMode: "static",
			reportFilename: "analyzer_stat.html"
		}),
	].filter(Boolean)
};

module.exports = config;