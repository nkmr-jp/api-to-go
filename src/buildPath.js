const yaml = require("js-yaml");
const fs = require("fs");

function buildPath(url, configFile = "./.api-to-go.yml") {
  const path = _buildPath(url, configFile)
  const pathArr = path.replacedUrl.split("/")
  const pkg = pathArr[pathArr.length - 2].replace(/\./g, '')
  const last = pathArr[pathArr.length - 1] || "index"
  const struct = _capitalize(last)
  pathArr.pop()
  const dir = pathArr.join("/")
  return {
    path,
    struct,
    pkg,
    dir,
    jsonFilePath: `${dir}/${last}_sample.json`,
    goFilePath: `${dir}/${last}.go`
  }
}

function _buildPath(url, configFile) {
  const cfg = _loadConfig(configFile)
  const hostCfg = cfg?.[url.hostname]
  let ret ={
    pathname: url.pathname,
    pathFormat: null,
    replacedPath: url.pathname,
    replacedUrl: `${url.hostname}${url.pathname}`,
  }
  if (hostCfg?.format !== undefined) {
    for (let i = 0; i < hostCfg.format.length; i++) {
      const replaced = _replacePath(url.pathname, hostCfg.format[i])
      if (replaced) {
        ret = replaced
        ret["replacedUrl"] = `${url.hostname}${replaced.replacedPath}`
        return ret
      }
    }
  }
  return ret
}

function _replacePath(pathname, format) {
  let replacedArr = []
  const pathArr = pathname.split('/')
  const formatArr = format.split('/')
  if (pathArr.length !== formatArr.length) {
    return
  }
  for (let j = 0; j < formatArr.length; j++) {
    if (pathArr[j] === formatArr[j]) {
      replacedArr.push(pathArr[j])
      continue
    }
    const val = formatArr[j].match(/^{.*}$/)
    if (val === null) {
      replacedArr = []
      break
    }
    replacedArr.push(formatArr[j].replace("{", "").replace("}", ""))
  }
  if (replacedArr.length === 0) return

  const replacedPath = replacedArr.join("/")
  console.log(`format:    ${format}`)
  return {
    pathname: pathname,
    pathFormat: format,
    replacedPath: replacedPath,
  }
}

function _capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

function _loadConfig(configFile) {
  try {
    return yaml.load(fs.readFileSync(configFile, 'utf8'));
  } catch (e) {
    console.log(e);
  }
}

module.exports = buildPath;
