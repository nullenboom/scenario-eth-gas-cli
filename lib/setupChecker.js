const fileHandling = require('./fileHandling')
const cli = require('./cli')
const chalk = require('chalk')

var reporterSearchString = "reporter: \"scenario-eth-gas-reporter\"";
var reporterString = ", mocha: { \n"
	+ "\t reporter: \"scenario-eth-gas-reporter\", \n"
	+ "\t reporterOptions: { \n"
	+ "\t \t excludeContracts: [\"Migrations\"] \n \t } } \n };"
var truffleProject = fileHandling.directoryExists('test') && fileHandling.directoryExists('contracts') && fileHandling.directoryExists('migrations');
var scenarioReporterInstalled = fileHandling.directoryExists('node_modules/scenario-eth-gas-reporter')
var script = fileHandling.directoryExists('scripts') && fileHandling.directoryExists('scripts/start_rcp.sh');




async function installReporter() {
	var shell = require('shelljs')
	console.log("Trying to install scenario-eth-gas-reporter locally. Please wait...")
	shell.exec("npm install scenario-eth-gas-reporter")
	console.log("scenario-eth-gas-reporter installed")
}

function getTruffleConfigName() {
	if (fileHandling.directoryExists('truffle.js')) {
		return 'truffle.js'
	} else if (fileHandling.directoryExists('truffle-config.js')) {
		return 'truffle-config.js'
	} else {
		return false;
	}
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
		var configName = getTruffleConfigName();
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

	isScenarioReporterInstalled: () => {
		return scenarioReporterInstalled;
	},


	isTruffleProject: () => {
		return truffleProject;
	},
	
	isReports: () => {
		return fileHandling.directoryExists('scenario-gas-reports');
	},
	
	getUsedPort: () => {
		var configName = getTruffleConfigName();
		if(!configName){
			return "";
		} else {
		var config = fileHandling.readTruffleConfig(configName);
		var splitConfigByPort = config.split('port:')[1];
		var port = splitConfigByPort.split(',')[0];
		var replaceWhitespaces = port.replace(/ /g, '');
		return parseInt(replaceWhitespaces, 10)
		}
	},
	
	scriptExists: () => {
		return script;
	},
};

