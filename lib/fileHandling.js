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
	}
	
};
