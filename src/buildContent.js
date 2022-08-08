function buildContent(struct, path, url) {
  let content = `package ${path.pkg}\n\n`
  if (struct.indexOf('time.') !== -1) {
    content = `${content}import "time"\n\n`
  }
  let comment = `// ${path.struct} is the go struct of api's payload.`
  if (path.path.pathFormat) {
    comment += `\n//\n// url: ${url.origin}${path.path.pathFormat}`
    comment += `\n// example: ${url.href}`
  } else {
    comment += `\n//\n// url: ${url.href}`
  }
  content = `${content}${comment}\n//\n${struct}`
  return content
}


module.exports = buildContent;