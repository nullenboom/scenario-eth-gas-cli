const chalk = require('chalk');
const tcpPortUsed = require('tcp-port-used');
const setup = require('./setupChecker')


var isWindows = /^win/.test(process.platform);
var port = setup.getUsedPort();

const startRCP = (shell) => {
	if (setup.scriptExists()) {
		console.log("Starting local Blockchain");
		shell.cd("./scripts");
		shell.exec("start_rcp.sh " + port)
		shell.cd('..');
	} else {
		console.log("Script for starting Blockchain not in directory, please start your local Blockchain yourself")
		console.log("or download the script from https://github.com/nullenboom/scenario-eth-gas-cli")
	}
}

module.exports = {

	executeTests: async (tests) => {
		
		var shell = require('shelljs')
		var portUsed = await tcpPortUsed.check(port, '127.0.0.1');

		if (!portUsed) {
			startRCP(shell);
		}
		var portUsedAgain = await tcpPortUsed.check(port, '127.0.0.1');
		if (portUsedAgain) {
			console.log("Blockchain up, checking setup before starting \"truffle migrate\" ");
			if (!setup.isScenarioReporterInstalled()) {
				const setupStatus = await setup.setupScenarioReporter();
				if (!setupStatus) {
					console.log("Setup of scenario-eth-gas-reporter unsuccessful, modul will be closed")
					process.exit();
				}
			} else {
				console.log("scenario-eth-gas-reporter module is installed")
			}

			const configStatus = await setup.setupTruffleConfig();
			if (!configStatus) {
				console.log("Configuring of Truffle Config File unsuccessful, module will be closed")
				process.exit();
			}
			shell.exec("truffle migrate")
			console.log("Migrated, starting tests");
			if (!isWindows) {
				tests.forEach(test => {
					shell.exec("truffle test ./test/" + test)
				});
			} else {
				testName = tests.tests;
				console.log(testName);
				if(testName == 'All Test') {
					shell.exec("truffle test");
				} else {
					shell.exec("truffle test ./test/" + testName)
				}
			}
			console.log(chalk.green('Tests run successfully'))
		} else {
			console.log(chalk.red('Tests run unsuccessfully'))
		}



	}
};

