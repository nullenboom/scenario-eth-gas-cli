const fileHandling = require('./fileHandling')
const cli = require('./cli')

var reporterSearchString = "reporter: \"scenario-eth-gas-reporter\"";
var reporterString = ", mocha: { \n"
	+ "\t reporter: \"scenario-eth-gas-reporter\", \n"
	+ "\t reporterOptions: { \n" 
	+ "\t \t excludeContracts: [\"Migrations\"] \n \t } } \n };"
var truffleProject = fileHandling.directoryExists('test') && fileHandling.directoryExists('contracts') && fileHandling.directoryExists('migrations');
var scenarioReporterInstalled = fileHandling.directoryExists('node_modules/scenario-eth-gas-reporter')

async function installReporter() {
	var shell = require('shelljs')
	console.log("Trying to install scenario-eth-gas-reporter locally. Please wait...")
	shell.exec("npm install scenario-eth-gas-reporter")
	console.log("scenario-eth-gas-reporter installed")
}

function readTruffleConfig() {
		if(fileHandling.directoryExists('truffle-config.js')){
			return fileHandling.readTruffleConfig("truffle-config.js");
		} 
		else if(fileHandling.directoryExists('truffle.js')){
			return fileHandling.readTruffleConfig("truffle.js");
		} else {
			console.log("could not configure truffle config");
			return false;
		}
}

function configureTruffleConfig () {
		var config = readTruffleConfig();
		if (!config){
			console.log("Error reading truffle config")
		}
		if (!config.includes(reporterSearchString)) {
			console.log("Add scenario-eth-gas-reporter with defaul values to truffle config")
			addScenarioToConfig('truffle-config.js', config)
		} else {
			console.log("Config is fine")
		}
	}
	
function addScenarioToConfig(name, config) {
	 var replacedConfig = config.replace("};", reporterString);
	 fileHandling.saveTruffleConfig(name, replacedConfig)
	
}	

module.exports = {

	setupScenarioReporter: async () => {
		console.log("This module only works if scenario-eth-gas-reporter module is installed locally. Currently it is not installed..")
		const install = await cli.askIfInstallScenarioReporter();
		if (install.install) {
			installReporter();
			configureTruffleConfig();	
		}
		return install.install;
	},
	
	checkTruffleConfig: async() => {
		configureTruffleConfig();
	},


	isScenarioReporterInstalled: () => {
		return scenarioReporterInstalled;
	},


	isTruffleProject: () => {
		if (truffleProject) {
			return truffleProject;
		} else {
			console.log(chalk.red('No Truffle Project. Please use this Module in a Truffle Project.'));
			return truffleProject;
		}

	},


};

