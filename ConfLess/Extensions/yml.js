// ConfLess Extensions support for *.yml files
module.exports = { parse, stringify }
const jsyaml = require("js-yaml");

function parse(loadedString) {
  try {
    return jsyaml.load(loadedString);
  } catch (error) {
    return false;
  }
};

function stringify(loadedConfig) {
  return jsyaml.dump(loadedConfig);
};