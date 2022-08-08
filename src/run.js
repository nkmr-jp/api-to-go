const fetch = require('node-fetch');
const { program } = require('commander');
const fs = require('fs');
const jsonToGo = require('../vendor/json-to-go.js');
const buildPath = require('./buildPath');
const buildContent = require('./buildContent');

function run(url) {
  const apiUrl = url.replace(/\/$/, '')

  fetch(apiUrl)
    .then(res => res.json())
    .then(json => {
        const url = new URL(apiUrl);
        const path = buildPath(url)
        const res = jsonToGo(JSON.stringify(json), path.struct);
        const content = buildContent(res.go, path, url)
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

module.exports = run;