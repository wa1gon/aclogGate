import { ParseAcLog } from './parseAcLog';
/*
In the node.js intro tutorial (http://nodejs.org/), they show a basic tcp 
server, but for some reason omit a client connecting to it.  I added an 
example at the bottom.

Save the following server in example.js:

*/
let apiVer = '<CMD><APIVER></CMD>\r\n';
let list = '<CMD><LIST><INCLUDEALL></CMD>\r\n';
let readRadio = '<CMD><READBMF></CMD>\r\n';
var net = require('net');
var parser = require('./parseAcLog');

let acPrase = new ParseAcLog();


var client = new net.Socket();
client.connect(1100, '192.168.1.103', function () {
    acPrase.buffer = "";
    client.write(list);
});

client.on('data', (data: Buffer) => {
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