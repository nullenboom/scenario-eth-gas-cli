const fs = require('fs');
const inquirer = require('./inquirer')
const chalk = require('chalk');
/**/
module.exports = {
  startRCP: () => {
    	var shell = require('shelljs')
		shell.exec("start_rcp.sh")
  },

  askWhichTestAndExecute: async () => {
    	const testlist = fs.readdirSync('./test');
		const testsAnswer = await inquirer.askWhichTest(testlist)
		const tests = testsAnswer.tests;
		
		var shell = require('shelljs')
		shell.cd("./lib");
		shell.exec("start_rcp.sh")
		shell.cd('..');
		shell.exec("truffle migrate")
		tests.forEach(test => {
			console.log(test)
			shell.exec("truffle test ./test/"+test )
		});
		

		console.log(chalk.red('Tests run successfully'))
  }
};
