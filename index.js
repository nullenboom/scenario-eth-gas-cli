#!/usr/bin/env node


const cli = require('./lib/cli')
const contractInfos = require('./lib/contractInfos')
const testExecutor = require('./lib/testExecutor')
const tableGenerator = require('./lib/tableGenerator')
const fileHandling = require('./lib/fileHandling')


var exit = false;

cli.createCliHeader();

const cliDialog = async () => {

	const job = await cli.askWhatJob();
	if (job.job === 'Run new Test') {
		const testsAnswer = await cli.askWhichTest();
		await testExecutor.executeTests(testsAnswer);
		return false;
	}
	if (job.job === 'See result report again') {
		const filesAnswer = await cli.askWhichFile();
		tableGenerator.generateTableForFiles(filesAnswer);
		return false;
	}
	if (job.job === 'Overview over EDCCs') {
		contractInfos.displayContractMethodInfos();
		return false;
	}
	
	if(job.job === 'Exit') {
		console.log("Module will be closed");
		return true;
	}


};

const checkDir = async () => {
	var truffleProject = fileHandling.isTruffleProject(); 
	var reports = fileHandling.isReportAvailable();
	
	if (!truffleProject && !reports) {
		console.log("Directory is not a Truffle Project and contains no scenario reports. Please use this Module in a Truffle Project or provide scenario-eth-gas-reports");
		process.exit();
	}
}

const run = async () => {
	
	checkDir()
	while (!exit) {
		exit = await cliDialog();
	}
}

run();




