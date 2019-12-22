const chalk = require('chalk');
const fileHandling = require('./fileHandling');
var tcpPortUsed = require('tcp-port-used');

var isWindows = /^win/.test(process.platform);

const startRCP = (shell) => {
	if (fileHandling.directoryExists('scripts') && fileHandling.directoryExists('scripts/start_rcp.sh')) {
		shell.cd("./scripts");
		shell.exec("start_rcp.sh")
		shell.cd('..');
	} else {
		console.log("Script for starting Blockchain not in directory, please start your locale Blockchain yourself")
		console.log("or download the script from https://github.com/nullenboom/scenario-eth-gas-cli")
	}
}

module.exports = {

	executeTests: async (tests) => {
		var shell = require('shelljs')
		var portUsed = await tcpPortUsed.check(8545, '127.0.0.1');

		if (!portUsed) {
			console.log("Starting locale Blockchain");
			startRCP(shell);
		}
		var portUsedAgain = await tcpPortUsed.check(8545, '127.0.0.1');
		if (portUsedAgain) {
			console.log("Blockchain up, starting \"truffle migrate\" ");

			shell.exec("truffle migrate")
			console.log("Migrated, starting tests");
			if (!isWindows) {
				tests.forEach(test => {
					shell.exec("truffle test ./test/" + test)
				});
			} else {
				testName = tests.tests;
				shell.exec("truffle test ./test/" + testName)
			}
		console.log(chalk.red('Tests run successfully'))	
		} else {
			console.log(chalk.red('Tests run unsuccessfully'))
		}


		
	}
};

