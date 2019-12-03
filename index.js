#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
const table = require('scenario-eth-gas-table');


const files = require('./lib/files');
const inquirer = require('./lib/inquirer')
const utils = require('./lib/utils')

clear();

console.log(
	chalk.yellow(
		figlet.textSync('Scenario Gas CLI123', { horizontalLayout: 'full' })
	)
);

if (!files.directoryExists('scenario-gas-reports')) {
	console.log(chalk.red('No Reports found'));
	process.exit();
}

const run = async () => {

	const job = await inquirer.askWhatJob();
	if (job.job === 'Run new Test') {
		
		const testlist = fs.readdirSync('./test')
		
		const tests = await inquirer.askWhichTest(testlist)
		console.log(tests)
        var shell = require('shelljs')
		shell.cd("lib");
		shell.exec("start_rcp.sh")
		shell.cd('..');
		shell.exec("truffle migrate")
		shell.exec("truffle test")
		
		console.log(chalk.red('test'))
	}
	if (job.job === 'See result report again') {


		const filelist = fs.readdirSync('./scenario-gas-reports')

		const files = await inquirer.askWhichFile(filelist);
		files.files.forEach(file => {
			let rawdata = fs.readFileSync('./scenario-gas-reports/' + file);
			let json = JSON.parse(rawdata)
			console.log("Table for Json File: " + file)
			table.generateTableFromJson(json, true);
		})
	}
	if (job.job === 'Overview over EDCCs') {
		const contracts = utils.getContractMethodInfos("contracts");
		console.log("CONTRACTS: " + contracts);
	}


};

run();
