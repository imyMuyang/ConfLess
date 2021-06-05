const fs = require("fs");
console.log("正在读取程序……");
var code = fs.readFileSync("./Confless.js", "utf-8");
console.log("正在删除注释……")
code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
code = code.replace(/[\n\r]/g, "");
code = code.replace(/ {2,}/g, "");
code = code.replace(/ \{/g, "{");
code = code.replace(/\} /g, "}");
code = code.replace(/ \(/g, "(");
code = code.replace(/\) /g, ")");
code = code.replace(/ = /g, "=");
code = code.replace(/ == /g, "==");
code = code.replace(/, /g, ",");
console.log("正在写出打包代码……");
fs.writeFileSync("./release.js", code);