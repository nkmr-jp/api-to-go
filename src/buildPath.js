const {loadConfig, toPascalCase} = require("./common");

function buildPath(url, configFile, opts) {
  const hostCfg = loadConfig(url, configFile)
  const path = _buildPath(url, hostCfg)
  const pathArr = path.replacedUrl.split("/")
  const pkg = pathArr[pathArr.length - 2].replace(/\./g, '')
  const last = pathArr[pathArr.length - 1] || "index"
  const struct = toPascalCase(last)
  pathArr.pop()

  if (hostCfg.root !== undefined) {
    pathArr[0] = hostCfg.root
  }

  const dir = pathArr.join("/")
  let method = opts?.method.toLowerCase()

  return {
    path,
    struct,
    pkg,
    dir,
    jsonFilePath: `${dir}/${last}_${method}.json`,
    goFilePath: `${dir}/${last}_${method}.go`,
    queryJsonFilePath: `${dir}/${last}_${method}_query.json`,
    queryGoFilePath: `${dir}/${last}_${method}_query.go`,
    bodyJsonFilePath: `${dir}/${last}_${method}_body.json`,
    bodyGoFilePath: `${dir}/${last}_${method}_body.go`,
  }
}

function _buildPath(url, hostCfg) {
  let ret = {
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
  return {
    pathname: pathname,
    pathFormat: format,
    replacedPath: replacedPath,
  }
}

module.exports = buildPath;
