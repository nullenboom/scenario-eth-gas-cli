const fs = require('fs');
const table = require('scenario-eth-gas-table');
const inquirer = require('./inquirer')

module.exports = {
	askWhichTableAndGenerate: async () =>  {
		const filelist = fs.readdirSync('./scenario-gas-reports')

		const files = await inquirer.askWhichFile(filelist);
		files.files.forEach(file => {
			let rawdata = fs.readFileSync('./scenario-gas-reports/' + file);
			let json = JSON.parse(rawdata)
			console.log("Table for Json File1: " + file)
			table.generateTableFromJson(json, true);
		})
	}
}
