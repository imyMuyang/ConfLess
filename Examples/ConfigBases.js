const cl = require("../ConfLess")
// Hello. This is a example of ConfLess.
// In this example, I'll show you how to set config bases and edit them.
// Just follow it. I hope you'll like it.

// Set your config base to "./conf"
// cl.setConfigBase("./conf");

// Delate your config base
// cl.setConfigBase("");

// Automaticly set your config base
// cl.detectConfigBase();

// Now look at your root directory. You'll find "./configBase.tmp"
cl.detectConfigBase()
console.log(cl.getConfig("test","abc"))
// cl.getConfig("test","123")

