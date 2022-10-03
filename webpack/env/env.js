const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const { appDevEnv, appProdEnv } = require("../paths");
const { version: VERSION } = require("../../package.json");

const { NODE_ENV } = process.env;

if (!NODE_ENV) {
	throw new Error(
		"The NODE_ENV environment variable is required but was not specified."
	);
}

const IS_DEV = NODE_ENV === "development";
const envPath = IS_DEV ? appDevEnv : appProdEnv;
const env = dotenv.config({ path: envPath });
const envExpanded = dotenvExpand.expand(env).parsed;
envExpanded.NODE_ENV = NODE_ENV;
envExpanded.VERSION = VERSION;

module.exports = envExpanded;
