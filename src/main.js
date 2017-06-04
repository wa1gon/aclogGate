"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseAcLog_1 = require("./parseAcLog");
let apiVer = '<CMD><APIVER></CMD>\r\n';
let list = '<CMD><LIST><INCLUDEALL></CMD>\r\n';
let readRadio = '<CMD><READBMF></CMD>\r\n';
var net = require('net');
var parser = require('./parseAcLog');
let acPrase = new parseAcLog_1.ParseAcLog();
var client = new net.Socket();
client.connect(1100, '192.168.1.103', function () {
    acPrase.buffer = "";
    client.write(list);
});
client.on('data', (data) => {
    let rc = acPrase.fillBuf(data);
    if (rc) {
        let list = acPrase.splitList();
        let i = 1;
        for (let cmd of list) {
            i++;
        }
        acPrase.buffer = "";
    }
});
client.on('close', function () {
    console.log('Connection closed');
});
//# sourceMappingURL=main.js.map