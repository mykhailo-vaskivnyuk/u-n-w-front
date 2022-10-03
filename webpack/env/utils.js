const stringifyEnv = (env) => {
  const envKeys = Object.keys(env);
	const strinigified = envKeys.reduce((obj, key) => Object.assign(
    obj, { [key]: JSON.stringify(env[key]) }
  ), {});
  return { "process.env": strinigified }
};

module.exports = { stringifyEnv };
