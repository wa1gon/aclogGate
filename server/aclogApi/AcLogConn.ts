var net = require('net');
import { ParseAcLog } from "./parseAcLog";
import { LogGateResp } from '../logGateModels/LogGateResp';

export class AcLogConn {
    public port: number;
    public host: string;
    public buffer: string="";

    private numOfDataReads: number = 0;
    private acParse = new ParseAcLog();
    private isConnected = false;
    //private readonly list: string = '<CMD><LIST><INCLUDEALL></CMD>\r\n';
    private socket = new net.Socket();

    public open() {
        if (this.isConnected) return;
        if (!this.port) throw new Error("connection port is define");

        this.socket.connect(this.port, this.host, () => {
            this.isConnected = true;
        });
    }
    public listAllDatabase(callback: (err: string, results: Array<LogGateResp>) => any) {

         const list = '<CMD><LIST><INCLUDEALL><VALUE>1050</VALUE></CMD>\r\n';
        // const list = '<CMD><LIST><INCLUDEALL><VALUE>2049</VALUE></CMD>\r\n';
        console.log(list)
        this.socket.on('data', (data: Buffer) => {
            this.numOfDataReads++;
            let rc = this.fillBuf(data);
            if (rc) {
                let qsos = this.processBuffer();
                this.buffer = "";
                callback(undefined, qsos);
            }
        });

        this.numOfDataReads = 0;
        console.log("sending ACLog command: " + list);
        this.socket.write(list);
    }
    private processBuffer() : Array<LogGateResp> {
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