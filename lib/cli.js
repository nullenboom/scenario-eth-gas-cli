const clear = require('clear');
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const fileHandling = require('./fileHandling')


var isWindows = /^win/.test(process.platform);

module.exports = {

	createCliHeader: () => {
		clear();

		console.log(
			chalk.yellow(
				figlet.textSync('Scenario Eth Gas CLI', { horizontalLayout: 'full' })
			)
		);
	},

	checkIfTrullfeProject: () => {
		return true
	},

	checkScenarioGasReports: () => {
		if (!fileHandling.directoryExists('scenario-gas-reports')) {
			console.log(chalk.red('No Reports found'));
			return false;
		} else {
			return true;
		}
	},

	askWhatJob: () => {
		const questions = [
			{
				name: 'job',
				type: 'list',
				message: 'What do you want to do?',
				choices: ['Run new Test', 'See result report again', 'Overview over EDCCs'],
				default: 'Run new Test'
			},
		];
		return inquirer.prompt(module.exports._checkForWindows(questions));
	},

	askWhichTest: () => {
		const testlist = fs.readdirSync('./test');
		const questions = [
			{
				type: 'checkbox',
				name: 'tests',
				message: 'Select the tests you want to run/analyze:',
				choices: testlist,
				default: [testlist[0]]
			}
		];
		return inquirer.prompt(module.exports._checkForWindows(questions));
	},
	askWhichFile: () => {
		const filelist = fs.readdirSync('./scenario-gas-reports')


		const questions = [
			{
				type: 'checkbox',
				name: 'files',
				message: 'Select the files you want to analyze:',
				choices: filelist,
				default: [filelist[0]]
			}
		];
		return inquirer.prompt(module.exports._checkForWindows(questions));
	},


	_checkForWindows: (questions) => {
		if (!isWindows) {
			return questions;
		}
		else {
			questions[0].type = 'rawlist';
			return questions;
		}
	}

};
