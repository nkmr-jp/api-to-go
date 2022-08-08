#! /usr/bin/env node
const run = require('../src/run');

if (process.argv.length !== 3) {
  console.log("parameter is wrong.")
  return
}

run(process.argv[2])