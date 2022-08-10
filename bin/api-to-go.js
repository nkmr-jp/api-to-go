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
  .argument('[body]', 'HTTP request body. specify by json string or file(json|yml).')
  .option('-H, --headers <string|file>', 'http request headers. specify by json string or file(json|yml).')
  .option('-X, --method <string>', 'specify request method to use.')
  .option('-v, --verbose', 'make the operation more talkative.')
  .action(run)

program.parse();