const fetch = require('node-fetch');
const fs = require('fs');
const jsonToGo = require('../vendor/json-to-go.js');
const buildPath = require('./buildPath');
const buildContent = require('./buildContent');

function run(url, body, cliOpts) {
  const apiUrl = url.replace(/\/$/, '')

  const opts = {}
  if (cliOpts?.method) opts.method = cliOpts?.method
  if (cliOpts?.headers) opts.headers = JSON.parse(cliOpts.headers)
  if (body) opts.body = body
  if (body && !cliOpts?.method) opts.method = "POST"

  // console.log(opts) // debug

  // See: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch(apiUrl, opts)
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