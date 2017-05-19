import { ParseAcLog } from './parseAcLog';
/*
In the node.js intro tutorial (http://nodejs.org/), they show a basic tcp 
server, but for some reason omit a client connecting to it.  I added an 
example at the bottom.

Save the following server in example.js:

*/
let apiVer = '<CMD><APIVER></CMD>\r\n';
let list = '<CMD><LIST><INCLUDEALL></CMD>\r\n';
var net = require('net');
var parser = require('./parseAcLog');

var client = new net.Socket();
client.connect(1100, '127.0.0.1', function () {
    ParseAcLog.buffer = "";
    console.log('Connected');
    client.write(list);
});

client.on('data', (data: Buffer) => {
    let rc = ParseAcLog.fillBuf(data);
    if (rc) {
        let list = ParseAcLog.parseList();
        let i = 1;
        for (let cmd of list) {
            console.log(i + ": " + cmd);
            i++;
        }
    }
});


client.on('close', function () {
    console.log('Connection closed');
});