const path = require("path")
const fs = require("fs")
const solc = require("solc")

var filePath = path.resolve(__dirname,"Contract","index.sol");
var contractContent = fs.readFileSync(filePath,"utf-8");
const compileCode =  solc.compile(contractContent,1).contracts[":Lottery"]
module.exports = compileCode;
