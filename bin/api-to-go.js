#! /usr/bin/env node
const run = require('../src/run');
const {Command} = require('commander');
const program = new Command();
const packageJson = require('../package.json');

// See: https://github.com/tj/commander.js
program
  .name('api-to-go')
  .version(packageJson.version)
  .description(packageJson.description)
  .argument('<url>', 'URL (required)')
  .argument('[body]', 'HTTP request body. Specify by json string.')
  .option('-H, --headers <json string>', 'http request headers')
  .option('-X, --method <string>', 'specify request method to use.')
  .action(run)

program.parse();