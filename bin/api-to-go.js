#! /usr/bin/env node
const run = require('../src/run');
const {Command} = require('commander');
const program = new Command();
const packageJson = require('../package.json');

// See: https://github.com/tj/commander.js
program
  .name('api-to-go')
  .version(packageJson.version,'-v, --version', 'output the current version')
  .description(packageJson.description)
  .argument('<url>', 'URL (required)')
  .argument('[body]', 'HTTP request body. specify by json string or file.')
  .option('-H, --headers <string>', 'http request headers. specify by json string or file.')
  .option('-X, --method <string>', 'specify request method to use.')
  .option('--config <string>', 'location of client config files.',"./.api-to-go.yml")
  .option('-D, --debug', 'enable debug mode')
  .action(run)

program.parse();