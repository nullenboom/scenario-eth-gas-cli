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

	askIfInstallScenarioReporter: () => {
		const question = [
			{
				name: 'install',
				type: 'confirm',
				message: 'Install Reporter?',
				default: false
			},
		];
		return inquirer.prompt(question);
	},
	
	askIfConfigureTruffleConfig: () => {
		const question = [
			{
				name: 'install',
				type: 'confirm',
				message: 'Configure Truffle Config to use reporter?',
				default: false
			},
		];
		return inquirer.prompt(question);
	},
	
	installReporter: () => {
		var shell = require('shelljs')
		console.log("Trying to install scenario-eth-gas-reporter locally. Please wait...")
		shell.exec("npm install scenario-eth-gas-reporter")
		console.log("scenario-eth-gas-reporter installed")
	},

	askWhatJob: () => {
		var choices = ['Run new Test','See result report again' , 'Overview over EDCCs', 'Exit'];
		if(!fileHandling.isReportAvailable()){
		   console.log("!!No Scenario-Gas-Reports found. Option for See result report again is disabled!!")
		   choices = ['Run new Test', 'Overview over EDCCs', 'Exit']
		}
		if(!fileHandling.isTruffleProject()){
			 console.log("!!Not a Truffle Project,  only option 'See result report again' is enabled!!")
		   choices = ['See result report again', 'Exit']
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
		testlist.push('All Test');
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
