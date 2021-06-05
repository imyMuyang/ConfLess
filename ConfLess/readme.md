# ConfLess Readme

欢迎使用 ConfLess ！

Welcome to use ConfLess!

ConfLess 是一个简单的 Node.js Module ，帮助您更方便地存储、读取配置。

Confless is a simple module to help you to manage your configuration.

## Features

1. 读取配置 Reading configs
2. 使用 **配置基准** 控制配置 Using **Config Bases** to manage your configs
3. **自动检测** 配置基准 **Automatically detecting** Config Bases
4. **读取、设置配置** 并立刻 **更改到文件** 上 **Reading and changing configs** and **writing them to files**
5. **json、yml** 支持 **json&yml** supported

## Install

有许多方法安装 ConfLess ，请随意选择。

### Via npm

```bash
$ npm install confless
```
然后在你的程序里面引入它：

```javascript
const cl = require('confless');
```

### Via Gitee

通过 [此链接](https://gitee.com/hanyeawa/confless/raw/master/ConfLess.js) 下载 ConfLess 到你程序的 `./module` 文件夹（或者你其他想要的地址），然后在你的程序里面引入它：

```javascript
const cl = require('./module/ConfLess')
```

使用以上命令，您就可以快速安装 ConfLess 了。现在您可以使用您最喜欢的IDE/编辑器开始愉快的编程啦~

## Warning

ConfLess 仍在开发，虽然作者在尽力避免错误，但还是可能会出现一些意想不到的错误。如果你发现了错误，请给我发issue.

ConfLess is still developing, so it may has somesthing wrong. If you find it, you can open an issue to tell me.

* [Gitee](https://gitee.com/hanyeawa/ConfLess/)

# ConfLess API

ConfLess 为您提供了一堆简单好用的API，打包即用，快来试试吧！

ConfLess has some useful APIs, let's try it now! Note: I'm not good at English so please use your translation software to read it.

## setConfigbase(baseLocation)

- `baseLocation` | String fs.PathLike
- `Return` | Boolean

在程序根目录 `./` 上创建一个  ` configBase.tmp` 文件，文件的内容就是 `baseLocation ` 的值。设置一个新的“配置基准”。配置的读取与存储都需要用到 `baseLocation` ，所以请在调用其他方法前先调用此方法。

```javascript
// Set a config base
setConfigBase("./conf"); // return >> true
// Or delete the config base
setConfigBase(""); // return >> true, because we created this file just now
// If we delete it again?
setConfigBase(""); // return >> false, because ConfLess can't find this file
```

## getConfigbase()

- `Return` | String Boolean

读取  ` configBase.tmp` 文件，返回的内容就是本文件的值。获取“配置基准”的值。

```javascript
// First we set the config base
setConfigBase("./conf");
getConfigBase(); // return >> "./conf"
// Then we delete the base
setConfigBase("");
getConfigBsse(); // return >> false, because ConfLess can't find this file
```

## setConfig(configName, configItem,configValue)

- `configName` | String
- `configItem` | String
- `configValue` | Any
- `Return` | Boolean

读取  ` configBase.tmp` 文件，然后访问 `$configBase/configName.json` ，并尝试修改 `configItem` 的值为 `configValue` 。返回的内容是操作的成功与否。修改配置信息并保存到文件。（注：如果不设置 `configValue` 就意味着删除该配置项）

```javascript
setConfigBase("./conf");
// Set the config
setConfig("test","ZhangSan","Lisi");
getConfig("test","ZhangSan"); // return >> "Lisi".
// Delete the config
setConfig("test","ZhangSan");
getConfig("test","ZhangSan"); // return >> underfined.
```

## getConfig(configName, configItem)

- `configName` | String
- `configItem` | String
- `Return` | String Boolean

读取  ` configBase.tmp` 文件，然后访问 `$configBase/configName.json` ，并尝试获取 `configItem` 的值。返回的内容就是ta的值。获取配置信息。

```javascript
setConfigBase("./conf");
setConfig("test","ZhangSan","LiSi");
// Read the config
getConfig("test","ZhangSan"); // return >> "Lisi".
```

