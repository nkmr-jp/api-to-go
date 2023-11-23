const yaml = require("js-yaml");
const fs = require("fs");

exports.loadJson = file => {
  const str = this.loadFile(file)
  if(!this.isJsonString(str)){
    throw new Error(`${file} is not json file.`);
  }
  return JSON.parse(str);
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

exports.capitalize = str => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

exports.isJsonString = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

exports.loadConfig = (url, configFile) => {
  return this.loadYaml(configFile)?.[url.hostname]
}