const fetch = require('node-fetch');
const fs = require('fs');
const jsonToGo = require('../vendor/json-to-go.js');
const buildPath = require('./buildPath');
const {loadJsonOrYaml, isJsonString, loadConfig} = require("./common");

let cliOpts

function run(urlStr, body, options) {
  let comment, url, path, cfg
  cliOpts = options

  let opts = {}
  try {
    opts = buildOpts(body, cliOpts)
  } catch (e) {
    console.log(e.message);
    return
  }

  try {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch(urlStr, opts)
      .then(res => {
        console.log()
        const apiUrl = urlStr.replace(/\/$/, '')
        url = new URL(apiUrl);
        cfg = loadConfig(url, cliOpts.config)
        path = buildPath(url, cliOpts.config)

        if (cfg?.["docs"] !== undefined) console.log(`Docs:     ${cfg?.["docs"]}`)
        if (path.path.pathFormat) console.log(`Format:   ${path.path.pathFormat}`)
        console.log(`Request:  ${opts.method} ${url}`)
        console.log(`Response: ${res.status} ${res.statusText}`)

        comment = buildComment(url, path, opts.method, res)
        return res.json()
      })
      .then(json => {
        const struct = jsonToGo(JSON.stringify(json), path.struct);
        const content = buildContent(struct.go, path, comment)
        write(json, path, content)
      })
    ;
  } catch (e) {
    console.log(e.message);
  }
}

function write(json, path, content) {
  fs.mkdirSync(path.dir, {recursive: true})
  fs.writeFile(path.jsonFilePath, JSON.stringify(json, null, "\t"), (err) => {
    if (err) throw err;
  });
  fs.writeFile(path.goFilePath, content, (err) => {
    if (err) throw err;
  });
  console.log()
  console.log("Saved:")
  console.log(`    Struct:  ${path.goFilePath}`)
  console.log(`    Payload: ${path.jsonFilePath}`)
}

function buildOpts(body, cliOpts) {
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
  if (!opts?.method) opts.method = "GET"
  return opts
}

function buildContent(go, path, comment) {
  let content = `// Code generated by api-to-go (https://github.com/nkmr-jp/api-to-go).\n\n`
  content += `package ${path.pkg}\n\n`
  if (go.indexOf('time.') !== -1) {
    content += `${content}import "time"\n\n`
  }

  content += `// ${go.split(" ")[1]} is the go struct of api's payload.\n//`
  content += comment
  content += go
  return content
}

function buildComment(url, path, method, res) {
  let comment = ""
  const cfg = loadConfig(url, cliOpts.config)
  if (cfg?.["docs"] !== undefined) {
    comment += `\n//  Docs:     ${cfg?.["docs"]}`
  }
  if (path.path.pathFormat) {
    comment += `\n//  Format:   ${path.path.pathFormat}`
  }
  comment += `\n//  Request:  ${method} ${url.href}`
  comment += `\n//  Response: ${res.status} ${res.statusText}`
  return `${comment}\n//\n`
}

module.exports = run;