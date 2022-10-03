const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const { merge } = require("webpack-merge");
const { runElectron } = require("./electron");
const baseWebpackConfig = require("./webpack.config");
// const ESLintPlugin = require("eslint-webpack-plugin");

// const PATHS = require("./paths");
const ENV = require("./env/env.js");
const HOST = "localhost"; // "0.0.0.0";
// const PUBLIC = `${PROJECT}.local`;
const PORT = ENV.PORT || 3000;
const ELECTRON = ENV.ELECTRON === "true";
const OPEN = { target: [`http://localhost:${PORT}`]}

const devWebpackConfig = merge(baseWebpackConfig, {
	// plugins: [
	// 	new ESLintPlugin({
	// 		extensions: ["js", "jsx", "ts", "tsx"],
	// 		eslintPath: require.resolve("eslint"),
	// 		context: PATHS.appSrc,
	// 	}),
	// ],
	devServer: {
		hot: true,
		// allowedHosts: "all",
		// historyApiFallback: {
		// 	disableDotRule: true
		// },
		compress: false,
		open: !ELECTRON && OPEN,
		// server: HTTPS ? "https" : "http",
		// client: {
 		// 	logging: "none",
		// 	overlay: {
		// 		errors: true,
		// 		warnings: false,
		// 	},
		// 	progress: true,
		// },
    // // host: "local-ip",
    // // port: "auto",
    
    // // host: PUBLIC, // use with custom alias for localhost, convenient when working with cookies and storage (https://<PROJECT>.local:3000/)
    host: HOST, // use when debugging on mobile devices in the internal network (https?://<localhost>|<local-ip>:3000/)
    port: PORT,

		// devMiddleware: {
		// 	publicPath: "/",
		// },

		proxy: {
			"/api": {
				target: ENV.API,
			},
		},
	},
});

const compiler = webpack(devWebpackConfig);
const devServerOptions = { ...devWebpackConfig.devServer };
const server = new webpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log("\x1b[33m%s\x1b[0m", "Starting server...");
	await server.start();
	console.log('\x1b[32m%s\x1b[0m', 'Webpack Dev Server started successfully !');

	ELECTRON && runElectron();
};

runServer();
