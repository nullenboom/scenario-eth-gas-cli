#!/usr/bin/env node


const cli = require('./lib/cli')
const contractInfos = require('./lib/contractInfos')
const testExecutor = require('./lib/testExecutor')
const tableGenerator = require('./lib/tableGenerator')


cli.createCliHeader();

if (!cli.checkScenarioGasReports()) {
	process.exit();
}

const run = async () => {

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
