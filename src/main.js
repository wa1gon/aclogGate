"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseAcLog_1 = require("./parseAcLog");
let apiVer = '<CMD><APIVER></CMD>\r\n';
let list = '<CMD><LIST></CMD>\r\n';
var net = require('net');
var parser = require('./parseAcLog');
var client = new net.Socket();
client.connect(1100, '127.0.0.1', function () {
    parseAcLog_1.ParseAcLog.buffer = "";
    console.log('Connected');
    client.write(list);
});
client.on('data', (data) => {
    let rc = parseAcLog_1.ParseAcLog.fillBuf(data);
    if (rc) {
        let list = parseAcLog_1.ParseAcLog.parseList();
        for (let cmd of list) {
            console.log(cmd);
        }
    }
});
client.on('close', function () {
    console.log('Connection closed');
});
//# sourceMappingURL=main.js.map