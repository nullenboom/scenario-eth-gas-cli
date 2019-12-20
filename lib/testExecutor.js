const chalk = require('chalk');

var isWindows = /^win/.test(process.platform);

const startRCP = (shell) => {
	shell.cd("./lib");
	shell.exec("start_rcp.sh")
	shell.cd('..');
}


module.exports = {
	
	startRCP: () => {
		var shell = require('shelljs')
		shell.exec('npm run startRCP')
	},

	executeTests: async (tests) => {
		
		console.log(tests)
		var shell = require('shelljs')
		startRCP(shell);
		shell.exec("truffle migrate")
		if (!isWindows) {
			tests.forEach(test => {
				shell.exec("truffle test ./test/" + test)
			});
		} else {
			testName = tests.tests;
			shell.exec("truffle test ./test/" + testName)
		}




		console.log(chalk.red('Tests run successfully'))
	}
};

