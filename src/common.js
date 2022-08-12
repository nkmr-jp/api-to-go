const yaml = require("js-yaml");
const fs = require("fs");
const path = require('path')

exports.loadJsonOrYaml = file => {
  switch (path.extname(file)) {
    case '.json':
      return this.loadJson(file)
    case '.yml':
      return this.loadYaml(file)
    case '.yaml':
      return this.loadYaml(file)
    default:
      throw new Error(`${file} is not json or yaml file`);
  }
}

exports.loadJson = file => {
  return JSON.parse(this.loadFile(file));
};

exports.loadYaml = file => {
  return yaml.load(this.loadFile(file));
}

exports.loadFile = file => {
  if (!fs.existsSync(file)) {
    throw new Error(`${file} is not exists.`);
  }
  return fs.readFileSync(file, 'utf8');
};

exports.isJsonString = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

exports.isYamlString = str => {
  try {
    yaml.load(str);
  } catch (e) {
    return false;
  }
  return true;
};

exports.loadConfig = (url, configFile) => {
  return this.loadYaml(configFile)?.[url.hostname]
}