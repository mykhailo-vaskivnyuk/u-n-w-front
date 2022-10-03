const path = require("path");

const PATHS = {
	appEntryPoint: path.resolve("src/index.tsx"),
	appBuild: path.resolve("build"),
	appPublic: path.resolve("public"),
	appHtmlTemplate: path.resolve("public/template.html"),
	appDevEnv: path.resolve("webpack/env/.env.development"),
	appProdEnv: path.resolve("webpack/env/.env.production"),
	appFavicon: path.resolve("public/favicon.svg"),
};

module.exports = PATHS;
