const childProcess = require('node:child_process');
const configPath = require.resolve("./electron.config");

const options = {
  env: { ...process.env },
  stdio: ["inherit", "inherit", "inherit", "ignore"],
};

const runElectron = () => {
  childProcess.spawn(require("electron"), [configPath], options);
};

module.exports = { runElectron };
