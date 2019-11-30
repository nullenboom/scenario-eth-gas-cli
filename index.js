#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer')

clear();

console.log(
  chalk.yellow(
    figlet.textSync('Scenario Gas CLI', { horizontalLayout: 'full' })
  )
);

if (!files.directoryExists('scenario-gas-reports')) {
  console.log(chalk.red('No Reports found'));
  process.exit();
}

const run = async () => {
	  const filelist = fs.readdirSync('./scenario-gas-reports')

  const credentials = await inquirer.askWhichFile(filelist);
  console.log(credentials);

};

run();

/*const run = async () => {
  try {
    // Retrieve & Set Authentication Token
    const token = await getGithubToken();
    github.githubAuth(token);

    // Create remote repository
    const url = await repo.createRemoteRepo();

    // Create .gitignore file
    await repo.createGitignore();

    // Set up local repository and push to remote
    await repo.setupRepo(url);
    console.log(chalk.green('All done!'));
  } catch(err) {
      if (err) {
        switch (err.status) {
          case 401:
            console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
            break;
          case 422:
            console.log(chalk.red('There already exists a remote repository with the same name'));
            break;
          default:
            console.log(err);
        }
      }
  }
};

run();*/
