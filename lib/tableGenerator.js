const fs = require('fs');
const table = require('scenario-eth-gas-table');
const fileHandling = require('./fileHandling')

var isWindows = /^win/.test(process.platform);

const generateTable = (fileName) => {
	const json = fileHandling.readJsonFromScenarioGasReportsFile(fileName);
	console.log("Table for Json File: " + fileName)
	table.generateTableFromJson(json, true);
} 

module.exports = {
	generateTableForFiles: async (files) => {
		if (!isWindows) {
			files.files.forEach(fileName => {
				generateTable(fileName)
			})
		} else {
				fileName = files.files;
				generateTable(fileName);
		}

	}
}
