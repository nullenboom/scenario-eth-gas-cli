#!/usr/bin/env node


const cli = require('./lib/cli')
const contractInfos = require('./lib/contractInfos')
const testExecutor = require('./lib/testExecutor')
const tableGenerator = require('./lib/tableGenerator')
const setup = require('./lib/setupChecker')


cli.createCliHeader();

const run = async () => {
	
	if (!setup.isTruffleProject()) {
		process.exit();
	}

	if (!setup.isScenarioReporterInstalled()) {
		const setupStatus = await setup.setupScenarioReporter();
		if (!setupStatus) {
			console.log("Setup of scenario-eth-gas-reporter unsuccessful, modul will be closed")
			process.exit();
		}
	}
	
	setup.checkTruffleConfig();

	const job = await cli.askWhatJob();
	if (job.job === 'Run new Test') {
		const testsAnswer = await cli.askWhichTest();
		testExecutor.executeTests(testsAnswer);
	}
	if (job.job === 'See result report again') {
		const filesAnswer = await cli.askWhichFile();
		tableGenerator.generateTableForFiles(filesAnswer);
	}
	if (job.job === 'Overview over EDCCs') {
		contractInfos.displayContractMethodInfos();
	}


};

run();
