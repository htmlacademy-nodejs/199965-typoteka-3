'use strict';

const chalk = require(`chalk`);
const helpData = {
  '--version': `выводит номер версии`,
  '--help': `Список команд`,
  '--generate <count>': `формирует файл mocks.json`
};

module.exports = {
  name: `--help`,
  run() {
    console.log(chalk.gray(`Команды`));
    Object.keys(helpData).forEach((command) => console.log(chalk.gray(`${command}: ${helpData[command]}`)));
  }
};
