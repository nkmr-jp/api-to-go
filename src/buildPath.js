const yaml = require("js-yaml");
const fs = require("fs");

function buildPath(apiUrl, configFile = "./.api-to-go.yaml") {
  // TODO: configのパターンを検知してpathを変換

  const url = new URL(apiUrl);
  _buildPath(url, configFile)
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

function _buildPath(url, configFile) {
  const cfg = _loadConfig(configFile)
  const hostCfg = cfg?.[url.hostname]
  if (hostCfg !== undefined) {
    for (let i = 0; i < hostCfg.length; i++) {
      console.log(hostCfg[i])
    }
  }
}

module.exports = buildPath;
