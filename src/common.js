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

exports.toPascalCase = str => {
  return str
      .replace(/[\s_\-]+/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
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