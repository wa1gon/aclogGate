var net = require('net');
var express = require('express');
import { ParseAcLog } from "./parseAcLog";
import { LogGateResp } from '../logGateModels/LogGateResp';

export class AcLogConn {
    public port: number;
    public host: string;
    public buffer: string = "";

    private numOfDataReads: number = 0;
    private acParse = new ParseAcLog();
    private isConnected = false;
    private socket = new net.Socket();
    public open() {
        if (this.isConnected) return;
        if (!this.port) throw new Error("connection port is define");
        console.log("port: %d host: %s", this.port, this.host);
        this.socket.connect(this.port, this.host, () => {
            this.isConnected = true;
        });
    }

    public listAllDatabase(count: number, req, res) {


        let list: string;
        if (count)
            list = `<CMD><LIST><INCLUDEALL><VALUE>${count}</VALUE></CMD>\r\n`;
        else
            list = '<CMD><LIST><INCLUDEALL></CMD>\r\n';

        this.open();

        this.socket.on('data', (data: Buffer) => {
            this.numOfDataReads++;
            let rc = this.fillBuf(data);
            if (rc) {
                let qsos = this.processBuffer();

                res.writeHead(200, { 'Content-type': 'application/json' });
                res.write(JSON.stringify(qsos));
                res.end();

            }
        });

        this.numOfDataReads = 0;
        this.buffer = "";
        this.socket.write(list, (err) => {
            this.socket.end();
            this.isConnected = false;
        });
    }
    private processBuffer(): Array<LogGateResp> {
        let qsos = this.acParse.parseResp(this.buffer);
        this.buffer = "";
        return qsos;
    }
    public fillBuf(data: Buffer): boolean {

        let databuf = data.toString()
        this.buffer = this.buffer + databuf;
        if (this.buffer.indexOf("\r\n") === -1)
            return false;

        return true;
    }
}