import { AcLogConn } from './aclogApi/AcLogConn';
var express = require('express');

let acConn = new AcLogConn();
acConn.port = 1100;
acConn.host = "192.168.1.101";
console.log("top of main")
acConn.listAllDatabase((err: string,result: string[]) => {
    
})

