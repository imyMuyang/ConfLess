// ConfLess Extensions support for *.json files
module.exports = {parse,stringify}

function parse(loadedString) {
  try {
    return JSON.parse(loadedString);
  } catch (error) {
    return false;
  }
};

function stringify(loadedConfig) {
  return JSON.stringify(loadedConfig);
};