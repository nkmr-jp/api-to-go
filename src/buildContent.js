const {loadYaml} = require("./util");

function buildContent(struct, path, url, configFile = "./.api-to-go.yml") {
  let content = `package ${path.pkg}\n\n`
  if (struct.indexOf('time.') !== -1) {
    content = `${content}import "time"\n\n`
  }
  const comment = _buildComment(path, url, configFile)
  content = `${content}${comment}\n//\n${struct}`
  return content
}

function _buildComment(path, url, configFile) {
  const cfg = loadYaml(configFile)?.[url.hostname]
  let comment = `// ${path.struct} is the go struct of api's payload.\n//`
  if (path.path.pathFormat) {
    comment += `\n//  Format: ${path.path.pathFormat}`
  }
  comment += `\n//  URL: ${url.href}`
  if (cfg?.["docs"] !== undefined) {
    comment += `\n//  Docs: ${cfg?.["docs"]}`
  }
  return comment
}


module.exports = buildContent;