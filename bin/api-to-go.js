#! /usr/bin/env node
const fetch = require('node-fetch');
const fs = require('fs');
const jsonToGo = require('../vendor/json-to-go/json-to-go.js');

function run(url) {
  const apiUrl = url.replace(/\/$/, '')
  fetch(apiUrl)
    .then(res => res.json())
    .then(json => {
      const path = _parseUrl(apiUrl)
      const res = jsonToGo(JSON.stringify(json), path.struct);
      const content = _buildContent(res.go, path.pkg)
      fs.mkdirSync(path.dir, {recursive: true})
      console.log(json)
      console.log()
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

function _parseUrl(apiUrl) {
  const url = new URL(apiUrl);
  const path = `${url.hostname}${url.pathname}`
  const pathArr = path.split("/")
  const pkg = pathArr[pathArr.length - 2].replace(/\./g, '')
  const last = pathArr[pathArr.length - 1] || "index"
  const struct = _capitalize(last)
  pathArr.pop()
  const dir = pathArr.join("/")
  return {
    struct,
    pkg,
    dir,
    jsonFilePath: `${dir}/${last}_sample.json`,
    goFilePath: `${dir}/${last}.go`
  }
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