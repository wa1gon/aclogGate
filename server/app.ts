#!/bin/env node
import { AcLogConn } from './aclogApi/AcLogConn';
import { LogGateResp } from './logGateModels/LogGateResp';
import { HttpServer } from './httpServer';

var port = process.env.PORT || 3000;

let acConn = new AcLogConn();
acConn.port = 1100;
acConn.host = "192.168.1.101";

let server = new HttpServer(3000,"localhost");
server.createServer();
