const yaml = require("js-yaml");
const fs = require("fs");

function buildPath(apiUrl, configFile = "./.api-to-go.yaml") {
  const url = new URL(apiUrl);
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
  let ret;
  if (hostCfg !== undefined) {
    for (let i = 0; i < hostCfg.length; i++) {
      ret = _replacePath(url.pathname, hostCfg[i])
      if (ret) {
        ret["replacedUrl"] = `${url.hostname}${ret.replacedPath}`
        return ret
      }
    }
  }
  ret["replacedUrl"] = `${url.hostname}${url.pathname}`
  return ret
}

function _replacePath(pathname, format) {
  const replacedArr = []
  const pathArr = pathname.split('/')
  const formatArr = format.split('/')
  if (pathArr.length !== formatArr.length) {
    return false
  }
  for (let j = 0; j < formatArr.length; j++) {
    if (pathArr[j] === formatArr[j]) {
      replacedArr.push(pathArr[j])
      continue
    }
    const val = formatArr[j].match(/^{.*}$/)
    if (val === null) {
      break
    }
    replacedArr.push(formatArr[j].replace("{", "").replace("}", ""))
  }
  const replacedPath = replacedArr.join("/")
  console.log(`replaced : ${pathname} -> ${format} -> ${replacedPath}`)
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
