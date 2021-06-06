const fs=require("fs");const path=require("path");function setConfigBase(baseLocation){if(baseLocation==""){try{fs.rmSync(path.resolve(require.main.path,"configBase.tmp"))return(true);}catch(error){return(false)};}else{try{fs.writeFileSync(path.resolve(require.main.path,"configBase.tmp"),baseLocation);return(true);}catch(error){return(false);}};};function detectConfigBase(){const configBases=["config","configs","setting","settings","conf"];for(let i=0; i < configBases.length; i++){try{fs.accessSync(path.resolve(require.main.path,configBases[i]));setConfigBase(path.resolve(require.main.path,configBases[i]));return(true);}catch(error){continue;}};return(false);};function getConfigBase(){try{return(fs.readFileSync(path.resolve(require.main.path,"configBase.tmp"),"utf-8"));}catch(error){return(false);};};function getConfig(configName,configItem){var ext=getExtension();var nowExt;var configExtension;for(let i=0; i < ext.length; i++){nowExt=ext[i];try{fs.accessSync(path.resolve(getConfigBase(),configName + "." + nowExt));configExtension=require(path.resolve(__dirname,"Extensions",nowExt));break;}catch(error){continue;}}try{try{const configFile=fs.readFileSync(path.resolve(getConfigBase(),configName + "." + nowExt),"utf-8");var configFile_Prased=configExtension.parse(configFile);}catch(error){var configFile_Prased=new(Object);}const configValue=eval("configFile_Prased." + configItem);return(configValue);}catch(error){console.log(error)return(false);}};function setConfig(configName,configItem,configValue,configExtension){var exts=getExtension();var nowExt;var configExtension;if(configExtension != ""){nowExt="." + configExtensionconfigExtension=require(path.resolve(__dirname,"Extensions",configExtension));}else{for(let i=0; i < exts.length; i++){nowExt=exts[i];try{fs.accessSync(path.resolve(getConfigBase(),configName + "." + nowExt));configExtension=require(path.resolve(__dirname,"Extensions",nowExt));}catch(error){continue}};};try{try{const configFile=fs.readFileSync(path.resolve(getConfigBase(),configName + nowExt),"utf-8");var configFile_Prased=configExtension.parse(configFile);}catch(error){var configFile_Prased=new(Object);}if(configValue==""){eval("delete configFile_Prased." + configItem);fs.writeFileSync(path.resolve(getConfigBase(),configName + nowExt),configExtension.stringify(configFile_Prased));}else{eval("configFile_Prased." + configItem + "=" + configValue);fs.writeFileSync(path.resolve(getConfigBase(),configName + nowExt),configExtension.stringify(configFile_Prased));}return(true);}catch(error){console.log(error)return(false);}};function getExtension(){var extension=fs.readdirSync(path.resolve(__dirname,"Extensions"));extension=extension.map(function(i){return i.replace(".js","")});return extension;}module.exports ={setConfigBase,detectConfigBase,setConfig,getConfigBase,getConfig};