const clear = require('clear');
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const fileHandling = require('./fileHandling')


var isWindows = /^win/.test(process.platform);

var truffleProject = fileHandling.directoryExists('test') && fileHandling.directoryExists('contracts') && fileHandling.directoryExists('migrations');
var scenarioGasReports = fileHandling.directoryExists('scenario-gas-reports');

module.exports = {

	createCliHeader: () => {
		clear();

		console.log(
			chalk.yellow(
				figlet.textSync('Scenario Eth Gas CLI', { horizontalLayout: 'full' })
			)
		);
	},

	isTruffleProject: () => {
		if(truffleProject){
			return truffleProject;
		} else {
			console.log(chalk.red('No Truffle Project. Please use this Module in a Truffle Project.'));
			return truffleProject;
		}
		
	},

	askWhatJob: () => {
		var choices = ['Run new Test','See result report again' , 'Overview over EDCCs'];
		if(!scenarioGasReports){
		   console.log("!!No Scenario-Gas-Reports found. Option for See result report again is disabled!!")
		   choices = ['Run new Test', 'Overview over EDCCs']
		}
		const questions = [
			{
				name: 'job',
				type: 'list',
				message: 'What do you want to do?',
				choices: choices,
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
