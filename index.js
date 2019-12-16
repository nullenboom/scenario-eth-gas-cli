#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
const table = require('scenario-eth-gas-table');


const files = require('./lib/files');
const inquirer = require('./lib/inquirer')
const utils = require('./lib/contractInfos')
const testExecutor = require('./lib/testExecutor')
const tableGenerator = require('./lib/tableGenerator')

clear();

console.log(
	chalk.yellow(
		figlet.textSync('Scenario Eth Gas CLI', { horizontalLayout: 'full' })
	)
);

if (!files.directoryExists('scenario-gas-reports')) {
	console.log(chalk.red('No Reports found'));
	process.exit();
}

const run = async () => {

	const job = await inquirer.askWhatJob();
	if (job.job === 'Run new Test') {
		
		testExecutor.askWhichTestAndExecute();
	}
	if (job.job === 'See result report again') {
		
		tableGenerator.askWhichTableAndGenerate();
		
	}
	if (job.job === 'Overview over EDCCs') {
		
		utils.displayContractMethodInfos();
	}


};

run();
