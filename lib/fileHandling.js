const fs = require('fs');
const path = require('path');




module.exports = {
	getCurrentDirectoryBase: () => {
		return path.basename(process.cwd());
	},

	directoryExists: (filePath) => {
		return fs.existsSync(filePath);
	},

	readJsonFromScenarioGasReportsFile: (fileName) => {
		let rawdata = fs.readFileSync('./scenario-gas-reports/' + fileName);
		let json = JSON.parse(rawdata)
		return json;
	},

	readTruffleConfig: (name) => {
		let config = fs.readFileSync('./' + name, "utf8")
		return config;
	},
	
	saveTruffleConfig: (name, config) => {
	 	fs.writeFileSync(name, config);
	},
	
	isTruffleProject: () => {
		return module.exports.directoryExists('test') && module.exports.directoryExists('contracts') && module.exports.directoryExists('migrations');
	},
	
	isReportAvailable: () => {
		return module.exports.directoryExists('scenario-gas-reports');
	},
	
	isScenarioReporterInstalled: () => {
		return module.exports.directoryExists('node_modules/scenario-eth-gas-reporter');
	},
	
	scriptExists: () => {
		return module.exports.directoryExists('scripts') && module.exports.directoryExists('scripts/start_rcp.sh');
	},
	
	getTruffleConfigName: () => {
		if (module.exports.directoryExists('truffle.js')) {
			return 'truffle.js'
		} else if (module.exports.directoryExists('truffle-config.js')) {
			return 'truffle-config.js'
		} else {
			return false;
		}
	},
	
	getUsedPort: () => {
		var configName = module.exports.getTruffleConfigName();
		if(!configName){
			return "";
		} else {
			var config = module.exports.readTruffleConfig(configName);
			var splitConfigByPort = config.split('port:')[1];
			var port = splitConfigByPort.split(',')[0];
			var replaceWhitespaces = port.replace(/ /g, '');
			return parseInt(replaceWhitespaces, 10)
		}
	},
	
};
