const fileHandling = require('./fileHandling')
const cli = require('./cli')

var reporterSearchString = "reporter: \"scenario-eth-gas-reporter\"";
var reporterString = ", mocha: { \n"
	+ "\t reporter: \"scenario-eth-gas-reporter\", \n"
	+ "\t reporterOptions: { \n"
	+ "\t \t excludeContracts: [\"Migrations\"] \n \t } } \n };"


async function installReporter() {
	var shell = require('shelljs')
	console.log("Trying to install scenario-eth-gas-reporter locally. Please wait...")
	shell.exec("npm install scenario-eth-gas-reporter")
	console.log("scenario-eth-gas-reporter installed")
}

function addScenarioToConfig(name, config) {
	var replacedConfig = config.replace("};", reporterString);
	console.log("Add scenario-eth-gas-reporter with default values to truffle config")
	fileHandling.saveTruffleConfig(name, replacedConfig)
}

module.exports = {

	setupScenarioReporter: async () => {
		console.log("This module only works if scenario-eth-gas-reporter module is installed locally. Currently it is not installed..")
		const install = await cli.askIfInstallScenarioReporter();
		if (install.install) {
			installReporter();
		} else {
			console.log("scenario-eth-gas-reporter module not installed")
		}
		return install.install;
	},

	setupTruffleConfig: async () => {
		var configName = fileHandling.getTruffleConfigName();
		if (!configName) {
			console.log("Error reading truffle config")
			return false;
		}
		var config = fileHandling.readTruffleConfig(configName);

		if (!config.includes(reporterSearchString)) {
			console.log("Truffle-Config currently not configured for scenario-eth-gas-reporter")
			const install = await cli.askIfConfigureTruffleConfig();
			if (install.install) {
				addScenarioToConfig(configName, config)
				return true;
			}
		} else {
			console.log("Truffle Config is configured")
			return true;
		}

	},
};

