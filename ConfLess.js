// ConfLess 0.0.2 By imyMuyang
const fs = require("fs");
const path = require("path");

/** 
 * 设置一个新的“配置基准”。配置的读取与存储都需要用到 `baseLocation` ，所以请在调用其他方法前先调用此方法。
 * @param {string} baseLocation 配置基准的位置
 * @returns {boolean} 存储 `baselocation` 地址文件的状态（成功与否）
 */
function setConfigBase(baseLocation) {
  if (baseLocation == "") {
    try {
      fs.rmSync(path.resolve(require.main.path, "configBase.tmp"))
      return (true);
    } catch (error) {
      return (false)
    };
  } else {
    try {
      fs.writeFileSync(path.resolve(require.main.path, "configBase.tmp"), baseLocation);
      return (true);
    } catch (error) {
      return (false);
    }
  };
};

/** 
 * 自动检测配置文件夹，如果有就自动设置 `baseLocation`。
 * 
 * 提示：本API在绝大部分情况下都可正常工作，但如果遇到特殊情况则可能无法正常工作。
 * @returns {boolean} 当检测到文件夹并成功写入数据就返回 `true`，否则返回 `false`。
 */
function detectConfigBase() {
  const configBases = ["config", "configs", "setting", "settings", "conf"];
  for (let i = 0; i < configBases.length; i++) {
    try {
      fs.accessSync(path.resolve(require.main.path, configBases[i]));
      setConfigBase(path.resolve(require.main.path, configBases[i]));
      return (true);
    } catch (error) {
      continue;
    }
  };
  return (false);
};

/** 
 * 获取“配置基准”。将读取目录下的文件并返回数据。可通过返回值查看配置基准的设置情况。
 * @returns {string | false} 当有数据时返回数据，其余情况返回 `false`。
 */
function getConfigBase() {
  try {
    return (fs.readFileSync(path.resolve(require.main.path, "configBase.tmp"), "utf-8"));
  } catch (error) {
    return (false);
  };
};

/** 
 * 从 `baseLocation` 中读取配置。
 * @param {string} configName 配置名
 * @param {string} configItem 配置项名
 * @returns {boolean} 当有数据时返回数据，其余情况返回 `false`。
 */
function getConfig(configName, configItem) {
  var ext = getExtension();
  var nowExt;
  var configExtension;
  for (let i = 0; i < ext.length; i++) {
    nowExt = ext[i];
    try {
      fs.accessSync(path.resolve(getConfigBase(), configName + "." + nowExt));
      configExtension = require(path.resolve(__dirname, "Extensions", nowExt));
      break;
    } catch (error) {
      continue;
    }
  }
  try {
    try {
      const configFile = fs.readFileSync(path.resolve(getConfigBase(), configName + "." + nowExt), "utf-8");
      var configFile_Prased = configExtension.parse(configFile);
    } catch (error) {
      var configFile_Prased = new(Object);
    }
    const configValue = eval("configFile_Prased." + configItem);
    return (configValue);
  } catch (error) {
    console.log(error)
    return (false);
  }
};

/** 
 * 从 `baseLocation` 中读取配置，通过用户检测（或自动指定）扩展读取配置，修改配置信息并保存到文件。（注：如果不设置 `configValue` 就意味着删除该配置项）
 * @param {string} configName 配置名
 * @param {string} configItem 配置项名
 * @param {string | boolean | number} configValue 配置项值
 * @param {string} [configExtension] 配置信息的拓展名（可选）
 * @returns {boolean} 当有数据时返回数据，其余情况返回 `false`。
 */
function setConfig(configName, configItem, configValue, configExtension) {
  var exts = getExtension();
  var nowExt;
  var configExtension;
  if (configExtension != "") { // 如果指定了扩展就加载用户扩展
    nowExt = "." + configExtension
    configExtension = require(path.resolve(__dirname, "Extensions", configExtension));
  } else { // 如果没指定就直接加载本地扩展
    for (let i = 0; i < exts.length; i++) {
      nowExt = exts[i];
      try {
        fs.accessSync(path.resolve(getConfigBase(), configName + "." + nowExt));
        configExtension = require(path.resolve(__dirname, "Extensions", nowExt));
      } catch (error) {
        continue
      }
    };
  };
  try {
    try {
      const configFile = fs.readFileSync(path.resolve(getConfigBase(), configName + nowExt), "utf-8");
      var configFile_Prased = configExtension.parse(configFile);
    } catch (error) {
      var configFile_Prased = new(Object);
    }
    if (configValue == "") {
      eval("delete configFile_Prased." + configItem);
      fs.writeFileSync(path.resolve(getConfigBase(), configName + nowExt), configExtension.stringify(configFile_Prased));
    } else {
      eval("configFile_Prased." + configItem + "=" + configValue);
      fs.writeFileSync(path.resolve(getConfigBase(), configName + nowExt), configExtension.stringify(configFile_Prased));
    }
    return (true);
  } catch (error) {
    console.log(error)
    return (false);
  }
};

/** 
 * 自动检测扩展文件夹，然后返回所有支持的扩展。
 * @returns {string[]} 扩展名串联起来的数组
 */
function getExtension() {
  var extension = fs.readdirSync(path.resolve(__dirname, "Extensions"));
  extension = extension.map(function (i) {
    return i.replace(".js", "")
  });
  return extension;
}
// 公开5个外部接口，隐藏1个内部接口
module.exports = {
  setConfigBase,
  detectConfigBase,
  setConfig,
  getConfigBase,
  getConfig
};