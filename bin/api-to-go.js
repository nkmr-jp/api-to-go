#! /usr/bin/env node
const fetch = require('node-fetch');
const fs = require('fs');
const jsonToGo = require('../vendor/json-to-go/json-to-go.js');
const buildPath = require('../src/buildPath');

function run(url) {
  const apiUrl = url.replace(/\/$/, '')
  fetch(apiUrl)
    .then(res => res.json())
    .then(json => {
      const path = buildPath(apiUrl)
      const res = jsonToGo(JSON.stringify(json), path.struct);
      const content = _buildContent(res.go, path.pkg)
      fs.mkdirSync(path.dir, {recursive: true})
      fs.writeFile(path.jsonFilePath, JSON.stringify(json,null,"\t"), (err) => {
        if (err) throw err;
        console.log(`saved:     ${path.jsonFilePath}`)
      });
      fs.writeFile(path.goFilePath, content, (err) => {
        if (err) throw err;
        console.log(`generated: ${path.goFilePath}`)
      });
      }
    );
}

function _buildContent(struct, packageName) {
  let content = `package ${packageName}\n\n`
  if (struct.indexOf('time.') !== -1) {
    content = `${content}import "time"\n\n`
  }
  content = `${content}${struct}`
  return content
}

function _capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

if (process.argv.length !== 3) {
  console.log("parameter is wrong.")
  return
}

run(process.argv[2])