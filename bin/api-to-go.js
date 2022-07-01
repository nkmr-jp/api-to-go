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
        const url = new URL(apiUrl);
        const path = buildPath(url)
        const res = jsonToGo(JSON.stringify(json), path.struct);
        const content = _buildContent(res.go, path, url)
        fs.mkdirSync(path.dir, {recursive: true})
        fs.writeFile(path.jsonFilePath, JSON.stringify(json, null, "\t"), (err) => {
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

function _buildContent(struct, path, url) {
  let content = `package ${path.pkg}\n\n`
  if (struct.indexOf('time.') !== -1) {
    content = `${content}import "time"\n\n`
  }
  let comment = `// ${path.struct} is the go struct of api's payload.`
  if (path.path.pathFormat) {
    comment += `\n//\n// url: ${url.origin}${path.path.pathFormat}`
    comment += `\n// example: ${url.href}`
  } else {
    comment += `\n//\n// url: ${url.href}`
  }
  content = `${content}${comment}\n//\n${struct}`
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