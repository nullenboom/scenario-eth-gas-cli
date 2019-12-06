const inquirer = require('inquirer');

const files = require('./files');

module.exports = {
  askWhatJob: () => {
    const questions = [
      {
        name: 'job',
        type: 'list',
        message: 'What do you want to do?',
        choices: [ 'Run new Test', 'See result report again','Overview over EDCCs' ],
        default: 'Run new Test'
      },
    ];
    return inquirer.prompt(questions);
  },

  askWhichTest: (testlist) => {
     const questions = [
      {
        type: 'checkbox',
        name: 'tests',
        message: 'Select the tests you want to run/analyze:',
        choices: testlist,
        default: [testlist[0]]
      }
    ];
    return inquirer.prompt(questions);
  },
  askWhichFile: (filelist) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'files',
        message: 'Select the files you want to analyze:',
        choices: filelist,
        default: [filelist[0]]
      }
    ];
    return inquirer.prompt(questions);
  },
};
