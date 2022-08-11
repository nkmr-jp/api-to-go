const fetch = require('node-fetch');
const fs = require('fs');
const jsonToGo = require('../vendor/json-to-go.js');
const buildPath = require('./buildPath');
const buildContent = require('./buildContent');
const {loadJsonOrYaml, isJsonString} = require("./util");

function run(url, body, cliOpts) {
  const apiUrl = url.replace(/\/$/, '')
  let opts = {}

  try {
    opts = _buildOpts(body, cliOpts)
  } catch (e) {
    console.log(e.message);
    return
  }

  // See: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch(apiUrl, opts)
    .then(res => {
      console.log(`Status: ${res.status} ${res.statusText}`)
      return res.json()
    })
    .then(json => {
      const url = new URL(apiUrl);
      const path = buildPath(url)
      const res = jsonToGo(JSON.stringify(json), path.struct);
      const content = buildContent(res.go, path, url)
      fs.mkdirSync(path.dir, {recursive: true})
      fs.writeFile(path.jsonFilePath, JSON.stringify(json, null, "\t"), (err) => {
        if (err) throw err;
        console.log(`Saved: ${path.jsonFilePath}`)
      });
      fs.writeFile(path.goFilePath, content, (err) => {
        if (err) throw err;
        console.log(`Generated: ${path.goFilePath}`)
      });
    });
}

function _buildOpts(body, cliOpts) {
  const opts = {}
  if (cliOpts?.method) opts.method = cliOpts?.method
  if (cliOpts?.headers) {
    if (isJsonString(cliOpts.headers)) {
      opts.headers = JSON.parse(cliOpts.headers)
    } else {
      opts.headers = loadJsonOrYaml(cliOpts.headers)
    }
  }
  if (body) {
    if (!cliOpts?.method) {
      opts.method = "POST"
    }
    if (isJsonString(cliOpts.headers)) {
      opts.body = body
    } else {
      opts.body = JSON.stringify(loadJsonOrYaml(body))
    }
  }
  if (cliOpts?.debug) {
    if (opts) {
      console.error(opts)
      console.error()
    }
  }
  return opts
}

module.exports = run;